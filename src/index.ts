import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import mongoose from 'mongoose';
import { IndexRouter } from './routes/index.route';
import dotenv from 'dotenv';
// bodyParser is deprecated and replaced by express.json() and express.urlencoded()
// import bodyParser from 'body-parser'; 
import passport from './config/jwt.config';
import { cleanupJob } from './utils/uploadsCleanUp';
import path from 'path'; // Import path module

dotenv.config();
const app = express();

const DATABASE_URL = process.env.DATABASE_URL!;
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    // Production domains
    'https://meetali.online',
    'https://dashboard.meetali.online',

    // Development origins
    'http://localhost:4200', // Default for Angular CLI
    'http://localhost:3000', // Common for other frameworks like Next.js
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (e.g., Postman, curl, mobile apps)
        // or if the origin is in our list of allowed origins.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Otherwise, reject the request.
            callback(new Error('This origin is not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200, // For legacy browser support
};

// --- CORRECT MIDDLEWARE ORDER ---

// 1. Enable CORS for all requests
app.use(cors(corsOptions));

// 2. Set security-related HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                // Use the default directives provided by Helmet
                ...helmet.contentSecurityPolicy.getDefaultDirectives(), 
                
                // Override the imgSrc directive to allow your domain
                "img-src": ["'self'", "data:", "your-image-domain.com"], 
            },
        },
        // This might also be needed if you still have issues with images
        // not loading, as it relaxes another cross-origin policy.
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

// 3. Use modern body parsers. These will handle JSON and URL-encoded
//    bodies for routes that need them, but will be skipped for multipart/form-data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Initialize Passport
app.use(passport.initialize());

// 5. Serve static files (e.g., uploaded images)
// This makes the 'public' folder accessible via URL.
// For example, a file at 'dist/public/images/foo.png' will be available at '/images/foo.png'
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// 6. Define API routes. Multer will now correctly process the upload route within IndexRouter.
app.use('/api', IndexRouter);

// 7. Start the cleanup job
cleanupJob();

// Database & API Connection
mongoose.connect(DATABASE_URL)
	.then(() => {
		console.log('Connected to database');
		// Running Server
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error(`Error connecting to database: ${error}`));

export default app;

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
	'https://meetali.online', // Production domain
	'https://dashboard.meetali.online', // Dashboard domain
];

const allowedDevIps = [
	'41.38.70.22', // Your dev machine IP
	// Add more IPs if needed
];

const corsOptions = {
	origin: (origin: string | undefined, callback: Function) => {
		// Allow requests with no origin (like mobile apps, curl, Postman)
		if (!origin) return callback(null, true);

		// Allow requests from allowed origins
		if (allowedOrigins.includes(origin)) return callback(null, true);

		// Allow requests from dev IPs (for local development)
		try {
			const url = new URL(origin);
			if (
				url.hostname &&
				allowedDevIps.includes(url.hostname)
			) {
				return callback(null, true);
			}
		} catch (e) {
			// If origin is not a valid URL, reject
		}

		// Otherwise, reject
		callback(new Error('Not allowed by CORS'));
	},
	optionsSuccessStatus: 200,
};

// --- CORRECT MIDDLEWARE ORDER ---

// 1. Enable CORS for all requests
app.use(cors(corsOptions));

// 2. Set security-related HTTP headers
app.use(helmet());

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

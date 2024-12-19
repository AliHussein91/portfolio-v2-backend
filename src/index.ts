import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import { IndexRouter } from './routes/index.route'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import passport from './config/jwt.config';
import path from 'path';
import schedule from 'node-schedule';
import { deleteUnusedImages } from './utils/uploadsCleanUp';


dotenv.config()
const app = express();


const DATABASE_URL = process.env.DATABASE_URL!
const PORT = process.env.Port || 3000;
const uploadDir = path.join(__dirname, 'public', 'imgs');



let corsOptions = {
	origin: ['http://localhost:4200', 'http:/localhost'],
};

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(passport.initialize());

// Serve static files from the temp directory
app.use('/public/imgs', express.static(uploadDir));

// Routes
app.use('/api', IndexRouter)

// Schedule the cleanup job to run every hour
schedule.scheduleJob('0 * * * *', deleteUnusedImages);

// Database & API Connection
mongoose.connect(DATABASE_URL)
.then(() => {
	console.log('Connected to database')
		// Running Server
		app.listen(PORT, () => {
			console.log(`server running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => console.error(`Error ${error}`))

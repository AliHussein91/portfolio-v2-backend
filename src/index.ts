import express from 'express';
import helmet from "helmet";
import cors from 'cors'
import mongoose from 'mongoose'
import { IndexRouter } from './routes/index.route'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import passport from './config/jwt.config';

dotenv.config()
const app = express();
app.use(helmet())


const DATABASE_URL = process.env.DATABASE_URL!
const PORT = process.env.Port || 3000;

let corsOptions = {
	origin: ['http://localhost:4200', 'http:/localhost'],
};

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/api', IndexRouter)

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

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


const DATABASE_URL = process.env.DATABASE_URL!
const PORT = process.env.Port || 8080;

let corsOptions = {
    origin: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());
// Serve public files
app.use(express.static('public'));

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

export default app
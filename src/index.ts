import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL!

const app = express();


let corsOptions = {
	origin: ['http://localhost:4200', 'http:/localhost'],
};

mongoose.connect(DATABASE_URL)
.then(()=> console.log('Connected to database'))
.catch((err)=> console.error(`Error ${err}`))
app.use(cors(corsOptions))
app.use(express.json());

app.use('/api/v1/en', indexRouter)

const PORT = process.env.Port || 3000;

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});

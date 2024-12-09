import express from 'express';
import routes from './routes/index.mjs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path'


const app = express();

let corsOptions = {
	origin: ['http://localhost:4200', 'http:/localhost'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1/en', routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));


const PORT = process.env.Port || 3000;

app.listen(PORT, () => {
	console.log(`running on ${PORT}`);
});

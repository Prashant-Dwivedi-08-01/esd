import express from 'express';
import mongoose from 'mongoose';
import apiRouter from "./api/index.js";
import { endpoints } from './controllers/index.js';

const app = express();

app.use(express.json({extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/',endpoints)

const PORT = process.env.PORT || 5000; //here we use 5000 OR the other one, which will be used while deployment
// const CONNECTION_URL = 'mongodb://localhost:27017/esd';
const CONNECTION_URL = 'mongodb+srv://Prashant:Prashant123@cluster0.myzaa.mongodb.net/esd?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
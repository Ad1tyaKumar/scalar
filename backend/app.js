import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import commonRoutes from './routes/commonRoute.js';
import bodyParser from "body-parser";
dotenv.config({ path: './.env' })

const app = express();


app.use(
    cors({
        origin: process.env.FRONT_END_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use('/api/v1', commonRoutes);

export default app;
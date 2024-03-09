import app from './app.js';
import dotenv from 'dotenv';
import connDB from './config/database.js';

dotenv.config({ path: './.env' });

connDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT : ${process.env.PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {appRouter} from "./router/appRouter";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', appRouter)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start();
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {appRouter} from "./router/appRouter";
import {downloadRouter} from "./router/downloadRouter";


const app = express();
app.use(cors( {origin: '*'}));
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
})


app.use('/', appRouter)
app.use('/file',downloadRouter)

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
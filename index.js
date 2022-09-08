// const express = require('express'); // 3rd party package 
// const { MongoClient } = require("mongodb")

import express from "express";
import  { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { getAllMovies, addMovies, getMovieById, deleteMovieById, updateMovieById } from "./helper.js";
import { moviesRouter } from './routes/movies.js'


dotenv.config()
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
  
// const MONGO_URL ="mongodb://localhost"

async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongo is connected");
    return client;
  }

export const client =  await createConnection();

app.use(express.json())


// Rest Api endpoints

app.get("/", (request, response) =>  {
    response.send("Hello Everyone")
});

//specify movie router

app.use('/movies', moviesRouter)

//create a server
app.listen(PORT, () => console.log("Server started on port", PORT));







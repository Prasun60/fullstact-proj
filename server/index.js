import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Movie from "./models/movies.js"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(cors({
    origin: true,
  }))

app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded // middleware
app.use(bodyParser.json()) 

mongoose.connect(process.env.MONGO_LOCAL_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err)
})

app.get("/getmovies", (req, res) => {  // http://localhost:4000/getmovies
    Movie.find()
    .then((movies) => {
        res.send(movies)
    })
    .catch((err) => {
        console.log(err)
    })
})



app.post("/movies", (req, res) => { // http://localhost:4000/movies
    console.log(req.body)
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating
    })
    movie.save()
    .then(() => {
        res.send("Movie added successfully")
    })
    .catch((err) => {
        console.log(err)
    })
})

app.put("/movies/:id", (req, res) => {
    const id = req.params.id
    Movie.findOneAndUpdate({_id:id}, {
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating
        })
        .then(() => {
            res.send("Movie updated successfully")
        })
        .catch((err) => {
            console.log(err)
        })
})


app.delete("/movies/:iddd", (req, res) => {
    const id = req.params.iddd
    Movie.findByIdAndDelete({_id:id})
    .then(() => {
        res.send("Movie deleted successfully")
    })
    .catch((err) => {
        console.log(err)
    })
})


app.listen(process.env.PORT, () => {  //4000
    console.log("Server is running on port"+process.env.PORT)
} )

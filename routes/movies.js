import express from "express";
import { getAllMovies,getMovieById, deleteMovieById, addMovies, updateMovieById } from "../helper.js"

const router = express.Router();
router.get("/", async (request, response) =>  {

    if(request.query.rating){
        request.query.rating = +request.query.rating;
    }
   
    console.log(request.query)
    const movie = await getAllMovies(request);
    response.send(movie);
});


//inbuild middleware - say data is in JSON

//post method  - to insert data to db
router.post("/", async (request, response) =>  {  
    const newMovies = request.body;
    console.log(newMovies);
    //db.movies.insertMany(movies) 
   const result = await addMovies(newMovies);
   response.send(result);
    });

   
 // send only movie with the matched id 
router.get("/:id", async (request, response) =>  {    
    const { id } = request.params;
    console.log(id)
    //db.movies.findOne({id: "102"})
    const movie = await getMovieById(+id)
    
    console.log(movie)
    movie 
    ? response.send(movie) 
    : response.status(404).send({ message: "No movie found" });
});

//Delete a movie id

router.delete("/:id", async (request, response) =>  {    
    const { id } = request.params;
    console.log(id)
    //db.movies.deleteOne({id: "102"})
    const movie = await deleteMovieById(id)
    response.send(movie)
});

// update a movie id 
router.put("/:id", async (request, response) =>  {    
    const { id } = request.params;
    const updateMovie = request.body;
    //db.movies.updateOne({id: "102"}, { $set: updateMovie })
    const result = await updateMovieById(id, updateMovie)
    response.send(result)
});



 export const moviesRouter = router;
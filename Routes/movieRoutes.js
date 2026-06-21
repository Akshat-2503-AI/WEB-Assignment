const express  = require("express");
    const router   = express.Router();
    const Movie    = require("../models/Movie");

    // View All Movies
    router.get("/", async (req, res) => {
        try {
            const movies = await Movie.find().sort({ createdAt: -1 });
            res.render("index", { movies, searchQuery: "" });
        } catch (error) {
            console.log("Error fetching movies:", error.message);
            res.status(500).send("Server Error: " + error.message);  // shows exact error
        }
    });

    // Search Movie
    router.get("/movies/search", async (req, res) => {
        try {
            const searchQuery = req.query.q || "";
            const movies = await Movie.find({
                $or: [
                    { movieName: { $regex: searchQuery, $options: "i" } },
                    { director:  { $regex: searchQuery, $options: "i" } },
                    { genre:     { $regex: searchQuery, $options: "i" } },
                ],
            });
            res.render("index", { movies, searchQuery });
        } catch (error) {
            console.log("Error searching movies:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    });

    // Add Movie — Show Form
    router.get("/movies/add", (req, res) => {
        res.render("add");
    });

    // Add Movie — Handle Form
    router.post("/movies/add", async (req, res) => {
        try {
            const { movieName, director, genre, releaseYear, rating } = req.body;
            const newMovie = new Movie({ movieName, director, genre, releaseYear, rating });
            await newMovie.save();
            res.redirect("/");
        } catch (error) {
            console.log("Error adding movie:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    });

    // Edit Movie — Show Form
    router.get("/movies/edit/:id", async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            if (!movie) return res.status(404).send("Movie Not Found");
            res.render("edit", { movie });
        } catch (error) {
            console.log("Error loading edit form:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    });

    // Edit Movie — Handle Form
    router.post("/movies/edit/:id", async (req, res) => {
        try {
            const { movieName, director, genre, releaseYear, rating } = req.body;
            await Movie.findByIdAndUpdate(req.params.id, {
                movieName, director, genre, releaseYear, rating,
            });
            res.redirect("/");
        } catch (error) {
            console.log("Error updating movie:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    });

    // Delete Movie
    router.post("/movies/delete/:id", async (req, res) => {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.redirect("/");
        } catch (error) {
            console.log("Error deleting movie:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    });

    module.exports = router;

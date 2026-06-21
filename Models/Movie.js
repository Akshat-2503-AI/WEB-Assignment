const mongoose = require("mongoose");

    const movieSchema = new mongoose.Schema({
        movieName:   { type: String, required: true, trim: true },
        director:    { type: String, required: true, trim: true },
        genre:       { type: String, required: true, trim: true },
        releaseYear: { type: Number, required: true },
        rating:      { type: Number, required: true, min: 1, max: 10 },
    }, { timestamps: true });

    const Movie = mongoose.model("Movie", movieSchema);

    module.exports = Movie;

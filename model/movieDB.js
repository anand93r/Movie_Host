const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:admin@libraryapp.is8pbwr.mongodb.net/?retryWrites=true&w=majority");

const Schema =mongoose.Schema

var movieSchema = new Schema({
        movie: String,
		director: String,
		actor: String,
		actress: String,
		producer: String,
		camera: String,
		year: Number,
		language: String
})

var movieInfo = mongoose.model("movies",movieSchema)

module.exports=movieInfo


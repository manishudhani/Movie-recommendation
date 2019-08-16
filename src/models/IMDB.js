var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IMDB = new Schema({
    serialNumber: {type:Number,default:null},
    title: {type:String,default:null},
    rating: {type:mongoose.Types.Decimal128 ,default:null},
    totalVotes: {type:Number,default:null},
    genre1: {type:String,default:null},
    genre2: {type:String,default:null},
    genre3: {type:String,default:null},
    metaCritic: {type:Number,default:null},
    budget: {type:Number,default:null},
		runtime: {type:Number,default:null}
});

IMDB.index({title: 1, rating: 1 });
//indexing rating and title because mostly searches are title and rating based
module.exports = mongoose.model("IMDB",IMDB);

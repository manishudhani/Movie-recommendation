const express = require('express');
const app     = express();
const csv     =require('csvtojson');
const q2m     = require('query-to-mongo');

const IMDB   = require("./../models/IMDB");

app.use(express.json())



app.post('/search',(req,res,next)=>{
	let query_str = "";
	console.log(req.body);
	for(var key in req.body){
		if(key){
			query_str += key+'='+req.body[key]+'&'
		}
	}
	console.log(query_str);
	res.redirect('/filterCSV/search?'+query_str);
});
//
// app.get('/search',(req,res,next)=>{
// 	if(req.query.q){
// 		IMDB.find({
// 			title:{$regex:"^"+req.query.q.charAt(0).toUpperCase()+req.query.q.slice(1)}
// 		},(err,data)=>{
// 			if(err) return next(err);
// 			// var data = results.hits.hits.map((hit)=>{
// 			// 	return hit;
// 			// });
// 			res.render('home.ejs',{
// 				query:req.query.q,
// 				imdb_data:data
// 			});
// 		});
// 	}
// });
// Filtering
// app.get('/',function(req,res){
// 	let query = q2m(req.query);
// 	console.log(query);
//
// 	IMDB.find(query.criteria, query.options)
// 	.then(function(data) {
// 		console.log('Response sent');
// 		res.json(data);
// 	})
// 	.catch(function(err) {
// 		console.log('ERROR OCCURED - ' + err);
// 		res.json({"error" : true,"message" : "SORRY AN ERROR OCCURRED. Please check log files"});
// 	});
// });


app.get('/search',(req,res)=>{
	query_ = "";
	for(var key in req.query){
		if(key){
			if(key === 'totalVotes_from'){
				query_ += 'totalVotes>='+req.query[key]+'&';
			}else if(key === 'totalVotes_to'){
				query_ += 'totalVotes<='+req.query[key]+'&';
			}else if(key === 'metaCritic'){
				query_ += 'metaCritic>='+req.query[key]+'&';
			}else if(key  === "rating"){
				query_ += 'rating>='+req.query[key]+'&';
			}else if(key === 'genre1'){
				if(req.query[key]==='null' || req.query[key] === ""){

				}else{
						query_ += 'genre1='+req.query[key]+'&';
				}

			}else if(key === 'genre2'){
				if(req.query[key]==='null' || req.query[key] === ""){

				}else{
						query_ += 'genre2='+req.query[key]+'&';
				}

			}else if(key === 'genre3'){
				if(req.query[key]==='null' || req.query[key] === ""){

				}else{
						query_ += 'genre3='+req.query[key]+'&';
				}

			}			// query_ +=
		}
	}
	var x = query_.slice(0,query_.length-1);
	// console.log(query_.length);
	let query = q2m(x);
	console.log(JSON.stringify(query));
		// console.log("----------");
	// console.log(req.query);

	IMDB.find(query.criteria, query.options)
	.then(function(data) {
		console.log('Response sent');
		res.render('home.ejs',{imdb_data:data,query_obj:query});
	})
	.catch(function(err) {
		console.log('ERROR OCCURED - ' + err);
		res.json({"error" : true,"message" : "SORRY AN ERROR OCCURRED. Please check log files"});
	});
	// res.json("done");
})

module.exports = app;

const express = require('express');
const router  = express.Router();
const csv     =require('csvtojson');

const IMDB   = require("./../models/IMDB");


router.route('/').get(function(req,res){

  csv()
  .fromFile('./../CSV/IMDB-movieData.csv')
  .then((jsonObj)=>{
      var dataFromCSV=[];
      for(let i = 0; i<jsonObj.length;i++){
        //Cleaning and parsing string to integer
        jsonObj[i].Budget = parseInt(jsonObj[i].Budget.slice(1), 10);
        jsonObj[i].Runtime = parseInt(jsonObj[i].Runtime.slice(0, jsonObj[i].Runtime.length-4));
        dataFromCSV.push({
  						serialNumber:jsonObj[i].field1,
  						title: jsonObj[i].Title,
  						rating: jsonObj[i].Rating,
  						totalVotes: jsonObj[i].TotalVotes,
  						genre1: jsonObj[i].Genre1,
  						genre2: jsonObj[i].Genre2,
  						genre3: jsonObj[i].Genre3,
  						metaCritic: jsonObj[i].MetaCritic,
  						budget: jsonObj[i].Budget,
  						runtime: jsonObj[i].Runtime
          });
      }
      IMDB.insertMany(dataFromCSV)
					.then(function(docs) {
						console.log('Data from CSV successfully saved in mongoDB database.');
						res.json({"error":false, "message":'Data from CSV successfully saved in mongoDB database.', "data" : jsonObj});
					})
					.catch(function(err) {
						console.log('ERROR OCCURED - ' + err);
						res.json({"error" : true, "message" : "SORRY AN ERROR OCCURRED. Please check log files"});
      });
  })

	// bot.get(
  //   'search/tweets',
  //   {
  //     q: param.queryString+' -filter:retweets AND -filter:replies',
  //     count: param.searchCount
  //   },
  //   (err, data, response) => {
  //     if (err) {
  //       console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err);
	// 			res.status(500).send('Internal error cannot search tweets please see log for more description.')
  //     }
	// 		else {
	// 			let tweet = [];
	// 			for(let i = 0; i<data.statuses.length;i++){
	// 				tweet.push({
	// 					tweet_id: data.statuses[i].id_str,
	// 					text: data.statuses[i].text,
	// 					screen_name: data.statuses[i].user.screen_name,
	// 					userId: data.statuses[i].user.id_str,
	// 					hashtags: data.statuses[i].entities.hashtags,
	// 					user_mentions: data.statuses[i].entities.user_mentions,
	// 					timestamp: data.statuses[i].created_at,
	// 					quote_count: data.statuses[i].quote_count,
	// 					reply_count: data.statuses[i].reply_count,
	// 					retweet_count: data.statuses[i].retweet_count,
	// 					favourite_count: data.statuses[i].favourite_count
	// 				});
	// 			}
	// 			console.log(JSON.stringify(tweet,null,2));
  //
	// 			Tweet.insertMany(tweet)
	// 				.then(function(docs) {
	// 					console.log(param.searchCount.toString() + ' tweets successfully saved in mongoDB database.');
	// 					res.json({"error":false,"message" : param.searchCount.toString() + ' tweets successfully saved in mongoDB database.'});
	// 				})
	// 				.catch(function(err) {
	// 					console.log('ERROR OCCURED - ' + err);
	// 					res.json({"error" : false,"message" : "SORRY AN ERROR OCCURRED. Please check log files"});
	// 				});
	// 		}
	// 	}
	// )
});

module.exports = router;

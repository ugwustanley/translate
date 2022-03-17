const twitConfig = require("./config/twit.config.js");

const getTweet = require("./helper/getTweet.js");

const postTweet = require("./helper/postTweet.js");

require("dotenv").config();





const slangBot = async () =>{

    twitConfig.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
       if(err){
           console.log(err, "this is the error message")
       }
        console.log(data)
        
      })

    // twitConfig.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    //     console.log(data)
    //   })
    

    //  twitConfig.get('statuses/tweets', { q: 'hello' , count: 10}).then(t => console.log(t, "donnnne",) )
      


    try{
       const data = undefined
         getTweet(twitConfig).then(data => console.log(typeof data, data.length, data.statuses));
       if(data){ 
       
        console.log(data , "we have the data");
       const tweets = data.statuses;
       console.log(data , tweets, "we have the tweets");

       for(let tweet of tweets){
         try{
            const { text, id_str } = tweet;
            console.log("this is the text" , text)

            // const params = {
            //     id: id_str,
            //     status: newText
            // }
            const result = await postTweet(twitConfig,id_str);
            console.log(result, "result");

         }catch(err){
            console.log("tweet unsuccessful" , err);
         }
       }
    }
     
         
    }catch(error){
        console.log(error);
    }
}

slangBot();

setInterval(slangBot, 1000 * 60);


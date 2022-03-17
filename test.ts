import twitConfig from "./config/twit.config";

import getTweet from "./utils/getTweet";

import  postTweet from "./utils/postTweet";

import dotenv from 'dotenv'

dotenv.config()



const slangBot = async () =>{
   

    try{
       const data: any = await getTweet(twitConfig)
      
       if(data){ 
       
        console.log(data , "we have the data");
        // return data;
        const tweets = data.statuses;
        // console.log(data , tweets, "we have the tweets");

       for(let tweet of tweets){
           console.log(tweet.entities,tweet.entities.user_mentions[0].screen_name , "this is the screen name")

           if(tweet?.entities?.user_mentions?.length){

             const userMentions = tweet.entities.user_mentions;

             userMentions.forEach(async (userMention: any) => {
                 if(userMention.screen_name === "acronym_trans"){
                     console.log("Already replied to tweet")
                 }
                 else{
                    let { id_str , text  , user } = tweet;

                    text  = text.replace("@acronym_trans", '')

                    const newText = text.replace(/\s/g, '')

                    console.log(newText, "-this is our new tweet")

                    try{
        
                    const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);

                    if(result){
                        console.log(result, "result");
                    }

                    }catch(err){
                        console.log(err, "an error has occured")
                    }
                 }
             })
            // const { id_str , text  , user } = tweet;

            
           }
        }
    
    }
  
         
    }catch(error){
        console.log(error);
    }
}





const streamForTweet = async () =>{
 
    const stream = twitConfig.stream('statuses/filter', { track: '@acronym_trans'})
    
    stream.on("tweet", async function (tweet){

        if(tweet){


            console.log( "there is a stream");

            let { id_str , text  , user } = tweet;

            text  = text.replace("@acronym_trans", '')

            const newText = text.replace(/\s/g, '')

            console.log(newText, "-this is our new tweet")

            try{
   
            const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);

            if(result){
                console.log(result, "result");
            }

            }catch(err){
                console.log(err, "an error has occured")
            }

        }
        else{
            console.log("could not get tweet from stream")
        }
        
       
    })
}



//streamForTweet()

slangBot();

// setInterval(slangBot, 1000 * 60);


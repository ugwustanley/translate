import twitConfig from "./config/twit.config";

import getTweet from "./utils/getTweet";

import  postTweet from "./utils/postTweet";

import dotenv from 'dotenv'

dotenv.config()



const slangBot = async () =>{
   

    try{


       const data: any = await getTweet(twitConfig)
      
       if(data){ 
       
  
        const tweets = data?.statuses;

       for(let tweet of tweets){
         
        
          
           if(tweet){


                 if(tweet?.in_reply_to_status_id !== null){

                     console.log("this post already has a reply")

                 }
                 else{

                    let { id_str , text  , user } = tweet;

                    if(user?.screen_name !== "acronym_trans"){
                        
                        console.log(user.screen_name)

                        text  = text.replace("@acronym_trans", '')

                        const newText = text.replace(/\s/g, '')

                        //console.log(newText, "-this is our new tweet")

                        try{
            
                            const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);

                            if(result){
                                console.log("Reply has been posted => from custom fetch");
                            }

                        }catch(err:any){

                            console.log(err?.allErrors[0]?.message, "=> from custom fetch")

                        }
                }
             }
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

            if(user?.screen_name !== "acronym_trans"){

                text  = text.replace("@acronym_trans", '')

                const newText = text.replace(/\s/g, '')

                //console.log(newText, "-this is our new tweet")

                try{
    
                const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);

                if(result){

                    console.log("Reply has been posted => from stream");

                }

                }catch(err:any){
                    console.log(err?.allErrors[0]?.message, "=> from stream")
                }
        }

        }
        else{
            console.log("could not get tweet from stream")
        }
        
       
    })
}





slangBot();

setInterval(slangBot, 1000 * 60 * 5);

//streamForTweet()


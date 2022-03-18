import twitConfig from "./config/twit.config";

import getTweet from "./utils/getTweet";

import  postTweet from "./utils/postTweet";

import getTranslation from './utils/getTranslation';

import dotenv from 'dotenv'

dotenv.config()

const slangBot = async () =>{
   console.log("called")

    try{


       const data: any = await getTweet(twitConfig)
      console.log(data)
       if(data){ 
       
  
        const tweets = data?.statuses;

       for(let tweet of tweets){
         
         
          
           if(tweet){

                  tweet?.in_reply_to_status_id !== null
                 if(!tweet){

                     console.log("this post already has a reply")

                 }
                 else{

                    let { id_str , text  , user } = tweet;

                    if(user?.screen_name !== "decode_abbr"){
                        
                        console.log(user.screen_name)

                        text  = text.replace("@decode_abbr", '').toLowerCase();


                        let text2  = text.toString().replace("@decode_abbr", '').toLowerCase();

                        
                        const newText = text2.replace("@decode_abbr", '').replace(/\s/g, '').toLowerCase()

                        try {
                            console.log(newText, "text")

                            const result:any = await getTranslation(newText);

                            console.log(result, "results")
                    if(result) {

                       const text = `${newText}: ${result}`;

                        try{
    
                            const result = await postTweet(twitConfig, id_str, text , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){
                                
                                console.log(err?.allErrors[0]?.message, "=> from stream")
                         }

                    }
                    else{

                        const newText = "Sorry😢😢, I don't have this abbreviation in my catalogue. Check my bio if you want to add this word"

                        try{
    
                            const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){
                                console.log(err?.allErrors[0]?.message, "=> from stream")
                        }
                    } 
                } catch (error) {
                    console.log(error)
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
 
    const stream = twitConfig.stream('statuses/filter', { track: '@decode_abbr'})
    
    stream.on("tweet", async function (tweet){

        if(tweet){


            console.log( "there is a stream");

            let { id_str , text  , user } = tweet;

            if(user?.screen_name !== "decode_abbr"){

                let text2  = text.toString().replace("@decode_abbr", '').toLowerCase();

                // text2  = text.replace("@decode_abbr", '')
                // console.log(typeof text2)
                const newText = text2.replace("@decode_abbr", '').replace(/\s/g, '').toLowerCase()

                //console.log(newText, "-this is our new tweet")
                try {
                    console.log(newText, "text")
                    const result:any = await getTranslation(newText);
                    console.log(result, "results")
                    if(result) {

                       const text = `${newText}: ${result}`;

                        try{
    
                            const result = await postTweet(twitConfig, id_str, text , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){
                                
                                console.log(err?.allErrors[0]?.message, "=> from stream")
                         }

                    }
                    else{

                        const newText = "Sorry😢😢, I don't have this abbreviation in my catalogue. Check my bio if you want to add this word"

                        try{
    
                            const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){
                                console.log(err?.allErrors[0]?.message, "=> from stream")
                        }
                    } 
                } catch (error) {
                    console.log(error)
                }

              
        }

        }
        else{
            console.log("could not get tweet from stream")
        }
        
       
    })
}





slangBot();

//setInterval(slangBot, 1000 * 30);

//streamForTweet()

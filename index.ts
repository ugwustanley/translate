import twitConfig from "./config/twit.config";

import getTweet from "./utils/getTweet";

import  postTweet from "./utils/postTweet";

import { wrapTwitterErrors , errors } from 'twitter-error-handler';

import { successMessage , failureMessage} from './utils/getText';

import getTranslation from './utils/getTranslation'; 

import express from 'express';

import dotenv from 'dotenv';

dotenv.config()

const app = express()

const endpoint:any = 'statuses/filter'


const stopStartStream = (stream:any): void =>{
    stream.stop()
    console.log("stream stopped for a longer period of 30 minutes")

    const wait = setInterval(() => console.log("waiting..."), 1000 * 60 * 5)

    setTimeout(() => {
            stream.start() 
            console.log("stream long starting...") 
            clearInterval(wait)
    }, 1000 *  60 * 30); 
}



const streamForTweet = async () =>{

    console.log("Starting stream...")

    const stream = twitConfig.stream(endpoint, { track: '@decode_abbr'})
    
    stream.on("tweet", async function (tweet, error){
         
         console.log("there is a stream => from stream")
        
          if (error) {

                 console.log("error has occurred => from stream")

                try {
                    wrapTwitterErrors( error , endpoint) 

                } catch (err) {
                    if (err instanceof errors.ProblemWithAuth) {
                         console.log("Issue with authentication")
                
                    }

                    else if (err instanceof errors.RateLimited) {
                    stopStartStream(stream)
                    }
                    else {
                        stopStartStream(stream)
                    }
                }
          
         }

        if(tweet){


            console.log( "there is a tweet in stream");
           
            let { id_str , text  , user , entities , retweeted_status } = tweet;

             const mentions = entities.user_mentions 
              //console.log(mentions)

                if(mentions.length > 0){
                    for (let i = 0 ; i < mentions.length ; i++){

                    console.log(typeof mentions[i])

                    text = text.replace(`@${mentions[i].screen_name}` , "").replace("@decode_abbr", '')
            
                }
             }

            console.log(text, "removed mentions")

            if(
                user?.screen_name != "decode_abbr" &&
                text.toLowerCase().includes("decode") &&
                retweeted_status == undefined 
              ){

              

                //let text2  = text.toString().replace("@decode_abbr", '').replace("decode", '').toLowerCase();
                //console.log(text2)
               
                const newText = text.replace("@decode_abbr", '').replace('decode', '').replace(/\s/g, '').toLowerCase()
                console.log(newText)
                
                try {
                    console.log(newText, typeof newText, "text")

                    const result:any = await getTranslation(newText);

                    console.log(result, "results")

                    if(result) {

                       const text = await successMessage(newText , result);

                        try{
    
                            const result = await postTweet(twitConfig, id_str, text , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){
                                
                                
                                console.log( "error occurred at postTweet => from stream")

                                console.log(err, "error message => at postTweet")

                                
                                        if (err === "authentication issues") {

                                            console.log("Issue with authentication")
                                        }

                                        else if (err === "limited") {
                                                stopStartStream(stream)
                                        }
                                        else if (err === "data") {
                                            console.log("data issue")
                                             stopStartStream(stream)
                                        }
                                        else if (err === "unknown") {
                                            stopStartStream(stream)
                                        }
                                        else {
                                            stopStartStream(stream)
                                        }
                         }

                    }
                    else{

                        const newText = await failureMessage()

                        try{
    
                            const result = await postTweet(twitConfig, id_str, newText , user?.screen_name);
            
                                if(result){
            
                                    console.log("Reply has been posted => from stream");
            
                                }
            
                            }catch(err:any){

                                 console.log( "error occurred => from stream")

                                 console.log(err)

                                
                                if (err === "authentication issues") {

                                    console.log("Issue with authentication")
                                }

                                else if (err === "limited") {
                                        stopStartStream(stream)
                                }
                                else if (err === "data") {
                                    console.log("data issue")
                                        stopStartStream(stream)
                                }
                                else if (err === "unknown") {
                                    stopStartStream(stream)
                                }
                                else {
                                    stopStartStream(stream)
                                }
                        }
                    } 
                } catch (error) {
                    console.log(error , "Error from get Translation")
                }

              
        }

        }
        else{
            console.log("could not get tweet from stream")
        }
        
       
    })
}


function main(){
       streamForTweet()
}


const PORT = process.env.PORT || 9000

app.listen( PORT , () =>{
    console.log(`port running at ${PORT}`)
    main()
})




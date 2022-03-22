import twitConfig from "./config/twit.config";

import getTweet from "./utils/GetTweet";

import  postTweet from "./utils/PostTweet";

import { successMessage , failureMessage} from './utils/GetText'

import getTranslation from './utils/GetTranslation';

import express from 'express'

import dotenv from 'dotenv'

dotenv.config()

const app = express()


const streamForTweet = async () =>{
 
    const stream = twitConfig.stream('statuses/filter', { track: '@decode_abbr'})
    
    stream.on("tweet", async function (tweet, error){

        if(tweet){


            console.log( "there is a stream");
           
            let { id_str , text  , user , entities } = tweet;

             const mentions = entities.user_mentions 
              //console.log(mentions)

                if(mentions.length > 0){
                    for (let i = 0 ; i < mentions.length ; i++){

                    console.log(typeof mentions[i])

                    text = text.replace(`@${mentions[i].screen_name}` , "").replace("@decode_abbr", '')
            
                }
             }

            console.log(text, "removed mentions")

            if(user?.screen_name != "decode_abbr" && text.includes("decode")){

              

                let text2  = text.toString().replace("@decode_abbr", '').replace("decode", '').toLowerCase();

               
                const newText = text2.replace("@decode_abbr", '').replace('decode', '').replace(/\s/g, '').toLowerCase()

                
                try {
                    console.log(newText, typeof newText, "text")
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


function main(){
   // setInterval(slangBot, 1000 * 60 * 5);

     streamForTweet()
}


const PORT = process.env.PORT || 9000

app.listen( PORT , () =>{
    console.log(`port running at ${PORT}`)
    main()
})




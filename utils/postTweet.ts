'use strict';

import twit from 'twit';

import { wrapTwitterErrors , errors } from 'twitter-error-handler';



const postTweet = (twitConfig: twit, tweetId: string, text: string, screen_name:string): Promise<Error | object> => {

    const params = {
        status: `@${screen_name} ${text}`,
        in_reply_to_status_id: '' + tweetId
    }
    //console.log(params)

    const endpoint:any = 'statuses/update'

    return new Promise((resolve, reject) => {
        // reject("data")
        twitConfig.post(
            endpoint,
            params,
            (err:any, data) => {
               
                if (err) {
                   try {
                        wrapTwitterErrors( err , endpoint) 

                   } catch (error) {

                    if (error instanceof errors.ProblemWithAuth) {
                        reject("authentication issues")
                    }
                    else if (error instanceof errors.RateLimited) {
                        reject("limited")
                    }
                    else{
                        reject("unknown")
                    }
                   }
                } else { 

                  resolve(data);
                }
            }
        );

    })
}

export default postTweet;
'use strict';
import twit from 'twit';



const postTweet = (twitConfig: twit, tweetId: string, text: string, screen_name:string): Promise<any> => {

    const params = {
        status: `${text} @${screen_name}`,
        in_reply_to_status_id: '' + tweetId
    }

    return new Promise((resolve, reject) => {

        twitConfig.post(
            "statuses/update",
            params,
            (err, data) => {
                if (err) {
                   return reject(err);
                } else {
                    console.log(data , "done!!!")
                   return resolve(data);
                }
            }
        );

    })
}

export default postTweet;
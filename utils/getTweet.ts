'use strict';
import twit from 'twit'



const getTweet = (twitConfig: twit) => {

    const params = {
        q: `@acronym_trans`,
        count: 10
    }
    return new Promise((resolve, reject) => {

        twitConfig.get(
            "search/tweets",
            params
            ,
            (err, data) => {
                if (err) {
                    if (err instanceof Error) {
                        return reject(err);
                      }
                   return reject(err);
                } else {
                    console.log(data , "everything good")
                   return resolve(data);
                }
            }
        );
    });
}

export default getTweet;

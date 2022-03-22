'use strict';
import twit from 'twit'



const getTweet = (twitConfig: twit):Promise<Error | object> => {

    const params = {
        q: `@decode_abbr`,
        count: 20
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
                   return resolve(data);
                }
            }
        );
    });
}

export default getTweet;

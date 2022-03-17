
const postTweet = (twitConfig, tweetId) => {
    const params = {
         id: tweetId
    }
    return new Promise((resolve, reject) => {
        twitConfig.post(
            "statuses/update",
            params,
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    })
}
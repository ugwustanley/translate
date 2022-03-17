
const getTweet = (twitConfig) => {

    const params = {
        q: `@chiagozie_ugwu`,
        count: 10
    }
    return new Promise((resolve, reject) => {
        twitConfig.get(
            "statuses/tweets",
            params
            ,
            (err, data) => {
                if (err) {
                   return reject(err);
                } else {
                   return resolve(data);
                }
            }
        );
    });
}

module.exports = getTweet;
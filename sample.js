 const {TwitterApi } = require('twitter-api-v2');

require("dotenv").config();

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

client.v1.tweet('This tweet was written by a bot').then((val) => {
    console.log(val)
    console.log("success")
}).catch((err) => {
    console.log(err)
})

client.v2.singleTweet('1455477974489251841', {
    'tweet.fields': [
        'organic_metrics',
     ],
  }).then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err)
})
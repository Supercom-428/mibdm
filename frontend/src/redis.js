var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = redis.createClient({
    url: encodeURI(process.env.REDIS_URL),
    port: 6379,
});
var redisStore = new RedisStore({
    client: client,
    ttl: 86400
});

function getAllActiveSessions() {
    return new Promise((resolve, reject) => {
        redisStore.all(function(err, sessions) {
            if(err) reject(err);
            else resolve(sessions);
        });
    });
}

module.exports = { redisStore, getAllActiveSessions };

import * as Redis from 'ioredis';

export const redis = new Redis({
        port: 6379,
        host: "redis",
        connectTimeout : 10000
});
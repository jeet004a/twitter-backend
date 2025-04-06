"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
exports.redisClient = new ioredis_1.default("rediss://default:Ae7aAAIjcDE4YWU3ZWIzZjNkOGM0OWZkYmRlZjk5ZmE0MTc0YmM4Y3AxMA@sunny-lab-61146.upstash.io:6379");
// export 

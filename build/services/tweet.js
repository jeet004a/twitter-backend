"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class TweetService {
}
_a = TweetService;
TweetService.createTweet = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prismaClient.tweet.create({
        data: {
            content: data.content,
            imageURL: data.imageURL,
            author: { connect: { id: data.userId } }
        }
    });
});
TweetService.getAllTweets = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prismaClient.tweet.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
});
exports.default = TweetService;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../clients/db");
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    verifyGoogleToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        // console.log('hello')
        const resultToken = yield user_1.default.verifyGoogleAuthToken(token);
        return resultToken;
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // console.log(ctx)
        const id = (_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return null;
        const user = yield user_1.default.getUserById(id);
        return user;
    }),
    getUserById: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) { return user_1.default.getUserById(id); }),
};
const extraResolvers = {
    User: {
        tweet: (parent) => db_1.prismaClient.tweet.findMany({ where: { author: { id: parent.id } } }),
        followers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db_1.prismaClient.follows.findMany({ where: { following: { id: parent.id } },
                include: {
                    follower: true
                }
            });
            return result.map(el => el.follower);
        }),
        following: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db_1.prismaClient.follows.findMany({ where: { follower: { id: parent.id } },
                include: {
                    following: true
                }
            });
            return result.map(el => el.following);
        }),
        recommendedUsers: (parent, _, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx.user)
                return [];
            console.log('Hello');
            const myFollowings = yield db_1.prismaClient.follows.findMany({
                where: {
                    follower: { id: ctx.user.id }
                },
                include: {
                    following: {
                        include: { followers: { include: { following: true } } }
                    }
                }
            });
            const users = [];
            for (const followings of myFollowings) {
                for (const followingOfFollowedUsers of followings.following.followers) {
                    if (followingOfFollowedUsers.following.id !== ctx.user.id && myFollowings.findIndex(e => (e === null || e === void 0 ? void 0 : e.followingId) === followingOfFollowedUsers.following.id) < 0) {
                        users.push(followingOfFollowedUsers.following);
                    }
                }
            }
            // console.log('abc',myFollowings[0].following.followers)
            if (users) {
                return users;
            }
            return [];
        })
    }
};
const mutations = {
    followUser: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { to }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield user_1.default.followUser(ctx.user.id, to);
        return true;
    }),
    unfollowUser: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { to }, ctx) {
        if (!ctx.user || !ctx.user.id)
            throw new Error("User not authenticated");
        yield user_1.default.unfollowUser(ctx.user.id, to);
        return true;
    })
};
exports.resolvers = { queries, extraResolvers, mutations };

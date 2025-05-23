import axios from 'axios'
import { prismaClient } from '../../clients/db';
import JWTService from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';
import { User } from '@prisma/client';
import UserService from '../../services/user';




const queries={
    verifyGoogleToken: async(parent: any , {token}:{token: string})=>{
        // console.log('hello')
        const resultToken=await UserService.verifyGoogleAuthToken(token)
        return resultToken
    },

    getCurrentUser: async(parent:any, args:any,ctx:GraphqlContext)=>{
        // console.log(ctx)
        const id=ctx.user?.id
        if(!id) return null

        const user=await UserService.getUserById(id)

        return user
    },

    getUserById: async(parent:any, {id}:{id:string},ctx:GraphqlContext)=>UserService.getUserById(id),
}

const extraResolvers={
    User:{
        tweet:(parent:User)=>prismaClient.tweet.findMany( {where :{author:{id:parent.id}}}),
        followers: async (parent:User)=>{
            const result=await prismaClient.follows.findMany({where: {following:{id: parent.id}},
                include:{
                    follower: true
                }
            })
            return result.map(el=>el.follower)
        },
        following: async(parent:User)=>{
            const result=await prismaClient.follows.findMany({where: {follower:{id:parent.id}},
                include:{
                    following: true
                }
            })
            return result.map(el=> el.following)
        },

        recommendedUsers: async(parent: User, _:any, ctx: GraphqlContext)=>{
            if(!ctx.user) return []
            console.log('Hello')
            const myFollowings=await prismaClient.follows.findMany({
                where:{
                    follower:   {id:ctx.user.id}
                },
                include:{
                    following: {
                        include:{followers: {include:{following:true}}}}
                }
            })

            const users : User[]=[]

            for(const followings of myFollowings){
                for(const followingOfFollowedUsers of followings.following.followers){
                    if(followingOfFollowedUsers.following.id!==ctx.user.id && myFollowings.findIndex(e=> e?.followingId ===followingOfFollowedUsers.following.id) <0){
                        users.push(followingOfFollowedUsers.following)
                    }
                }
            }

            // console.log('abc',myFollowings[0].following.followers)
            if(users){
                return users
            }
            return []
        }
    }
}

const mutations={
    followUser:async(parent: any, {to}:{to: string},ctx:GraphqlContext)=>{
        if(!ctx.user || !ctx.user.id) throw new Error("User not authenticated");

        await UserService.followUser(ctx.user.id,to)
        return true
    },

    unfollowUser:async(parent: any, {to}:{to: string},ctx:GraphqlContext)=>{
        if(!ctx.user || !ctx.user.id) throw new Error("User not authenticated");

        await UserService.unfollowUser(ctx.user.id,to)
        return true
    }
}



export const resolvers={queries,extraResolvers, mutations}
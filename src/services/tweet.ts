import { prismaClient } from "../clients/db"

export interface CreateTweetPayload{
    content: string
    imageURL?: string
    userId: string
}

class TweetService{
    public static createTweet=async(data: CreateTweetPayload)=>{
        return await prismaClient.tweet.create({
            data:{
                content: data.content,
                imageURL: data.imageURL,
                author: {connect:{id: data.userId}}
            }
        })
    }

    public static getAllTweets=async()=>{
        return await prismaClient.tweet.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
    }
}

export default TweetService
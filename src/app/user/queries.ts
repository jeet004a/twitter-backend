export const queries=`#grapgql
    verifyGoogleToken(token: String!): String

    getCurrentUser:User

    getUserById(id: ID!): User

`
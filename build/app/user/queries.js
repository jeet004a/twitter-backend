"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#grapgql
    verifyGoogleToken(token: String!): String

    getCurrentUser:User

    getUserById(id: ID!): User

`;

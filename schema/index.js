import { GraphQLSchema } from "graphql";
import { query } from "./query/index.js";
import { mutation } from "./mutation/index.js";
const schemaMiddleWare = new GraphQLSchema({
    query : query ,
    mutation : mutation
})

export {
    schemaMiddleWare 
}
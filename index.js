import express from "express";
import { graphqlHTTP } from "express-graphql";
import { applyMiddleware } from "graphql-middleware";
import { expressPlayground } from "graphql-playground-middleware";
import { schemaMiddleWare } from "./schema/index.js"

const Schema = applyMiddleware(schemaMiddleWare)


const app = express();
app.use('/graphql',(req,res)=>{
    graphqlHTTP({
        graphiql  : true,
        schema : Schema,
        rootValue : global
    })(req,res)
})
app.get('/playground',expressPlayground({
  endpoint : '/graphql'
}))

app.listen(3000,()=>{
    console.log("listening to port 3000")
})
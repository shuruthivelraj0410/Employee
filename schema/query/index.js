import { GraphQLObjectType } from "graphql";
import {listEmployees} from "./listEmployees.js";
import { listBill } from "./listBill.js";

const query = new GraphQLObjectType({
    name :"query",
    fields:{
     listEmployees,
     listBill
    }
})

export {
    query
}
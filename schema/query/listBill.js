import { GraphQLInt, GraphQLObjectType } from "graphql"
import { GraphQLJSON } from "graphql-type-json"
import { billDetails } from "../../employeeDetails.js"
import { GraphQLNumber } from "../mutation/createBill.js"
const listBill = {
type : new GraphQLObjectType({
    name : "listBillType",
    fields:{
        billDetails :{
            type : GraphQLJSON,
            description : "List Bill Details"
        },
        TotalAmount : {
            type : GraphQLNumber,
            description : "Total Amount Spent from bills"
        }
    }
}),
resolve : ()=>{
    let response = {};
    let totalAmount = billDetails.length > 0 ? billDetails.reduce((sum,val)=> sum = sum + val.Amount,0) : 0
    response.billDetails = billDetails
    response.TotalAmount = totalAmount
    return response
}
}

export {
    listBill
}
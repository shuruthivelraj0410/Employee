import { GraphQLObjectType } from "graphql";
import { addEmployeeDetails } from "./getEmployeeDetails.js";
import {createBill} from "./createBill.js";
import { deleteEmployee } from "./deleteEmployee.js";

const mutation = new GraphQLObjectType({
    name :"mutation",
    fields : {
        addEmployeeDetails,
        createBill,
        deleteEmployee
    }
})

export {
    mutation
}
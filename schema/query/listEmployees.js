import { GraphQLObjectType } from "graphql";
import {GraphQLJSON} from "graphql-type-json"
import { employeeList } from "../../employeeDetails.js";

const listEmployees = {
type : new GraphQLObjectType({
    name :"listEmployees",
    fields :{
        employeeList : {
            type : GraphQLJSON,
            description : "Displays List of Employees"
        }
    }
}),
resolve: (parent,args,context,info)=>{
  let data = {};
  data.employeeList = employeeList
  return data
}
}

export {
    listEmployees
}
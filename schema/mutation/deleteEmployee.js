import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import  {
    employeeList,
    employeeEmailList
} from "../../employeeDetails.js";
import { GraphQLJSON } from "graphql-type-json";

const deleteEmployee = {
type : new GraphQLObjectType({
    name : "deleteEmployeeType",
    fields : {
        data : {
            type : GraphQLJSON,
            description : "Delete message"
        }
    }
}),
args : {
    FullName : {
        type : new GraphQLNonNull(GraphQLString),
        description : "Full Name of an employee"
    }, 
    emailId : {
        type : new GraphQLNonNull(GraphQLString),
        description : "Email Address of the employee"
    }
},
resolve : (parent, args, context, info)=>{
let response = {};
    let [employeeCheck] = employeeList.filter((val,index)=>{ 
        if(val.FullName.toLowerCase() == args.FullName.toLowerCase()){
            val.index = index
          return val
        }
    })
    let [employeeEmailCheck] = employeeEmailList.filter((val,index)=>{
        if(val.EmailAddress == args.emailId){
            val.index = index
            return val
        }
    })
    if(employeeCheck && employeeEmailCheck && employeeCheck.Id == employeeEmailCheck.Id){
        employeeList.splice(employeeCheck.index,1)
        employeeEmailList.splice(employeeEmailCheck.index,1)
        response.data = {
            message : "Employee deleted successfully."
        }
    }
    else{
        response.data = {
            message : "Invalid Employee Details."
        }
    }
    return response
}
}

export {
    deleteEmployee
}
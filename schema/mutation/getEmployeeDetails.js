import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLEnumType } from "graphql"
import { GraphQLJSON } from "graphql-type-json"
import  {
    employeeList,
    employeeEmailList
} from "../../employeeDetails.js"
const designationEnnum = new GraphQLEnumType({
    name : "designationEnnum",
    values:{
        SE1 :{
            value : "Software Enigneer 1"
        },
        SE2 :{
            value : "Software Enigneer 2"
        },
        SSE1  : {
            value : "Senior Software Engineer 1"
        },
        SSE2  : {
            value : "Senior Software Engineer 2"
        },
        TL :{
            value : "Team Lead"
        },
        Manager : {
            value : "Manager"
        }
    }
})

const departmentEnnum = new GraphQLEnumType({
   name :"departmentEnnum",
   values :{
    TECH : {
        value : "Technology"
    },
    SalesForce : {
        value : "SalesForce"
    },
    CE :{
        value : "Customer Experience"
    }
   }
})



function isEmailValid(email) {
    let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

function redundantEmployeeCheck(args){
   let emailCheck = employeeEmailList.map((val)=> val.EmailAddress == args.emailAddress)
   if(emailCheck.indexOf(true)!=-1){
   let dataCheck = employeeList.map((val)=>{
    if(val.Department == args.department && val.Designation == args.designation){
       let name = val.FullName.split(" ")
       return name[0]== args.firstName && name[1] == args.lastName ? true : false
    }
    else{
        return false
    }
   })
   return dataCheck.indexOf(true)!=-1 ? true : false
}else{
    return false
}
}

const addEmployeeDetails = {
type : new GraphQLObjectType({
    name :"getEmployeeDetailsType",
    fields : {
        data :{
            type : GraphQLJSON,
            description : "Result verification"
        }
    }
}),
args:{
firstName : {
    type : new GraphQLNonNull(GraphQLString),
    description : "FirstName of employee."
},
lastName :{
    type : new GraphQLNonNull(GraphQLString),
    description : "LastName of employee."
},
emailAddress : {
    type : new GraphQLNonNull(GraphQLString),
    description : "Email Address of employee."
},
designation : {
    type :  new GraphQLNonNull(designationEnnum), 
    description : "Designation of employee."
},
department :{
    type :  new GraphQLNonNull(departmentEnnum),
    description : "Department of employee."
}
},
resolve : (parent, args, context, info)=>{
let response = {};
let successMessage = {
    message : "Employee Added Successfully"
}

if(isEmailValid(args.emailAddress)){
if(redundantEmployeeCheck(args)){
    response.data = {
        message : "Employee details already Exist"
    }
    return response
}
let fullName = args.firstName+ " "+ args.lastName;
employeeList.push({
    Id : employeeList.length +1,
    FullName : fullName,
    Designation : args.designation,
    Department : args.department
})
employeeEmailList.push({
    Id : employeeEmailList.length +1,
    EmailAddress : args.emailAddress
})
response.data = successMessage
}
else{
    response.data = {
        message : "Invalid Email Address"
    }
}
return response
}
}

export {
    addEmployeeDetails
}
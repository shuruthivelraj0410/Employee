import { GraphQLScalarType, GraphQLNonNull, GraphQLObjectType, GraphQLString, Kind, GraphQLEnumType } from "graphql";
import { GraphQLJSON } from "graphql-type-json";
import { employeeList, billDetails, billSet } from "../../employeeDetails.js";

// Custom Scalar for handling both Int and Float values
const GraphQLNumber = new GraphQLScalarType({
    name: "Number",
    description: "Custom scalar type for handling both Int and Float values",
    serialize(value) {
        return value;
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT) {
            return parseFloat(ast.value);
        }
        return null;
    },
});

const billEnnumType = new GraphQLEnumType({
    name: "billEnnumType",
    values: {
        Food: {
            value: "Food",
        },
        Travel: {
            value: "Travel",
        },
        Others: {
            value: "Others",
        },
    },
});



const createBill = {
    type: new GraphQLObjectType({
        name: "createBillType",
        fields: {
            data: {
                type: GraphQLJSON,
                description: "bill created verification message",
            },
        },
    }),
    args: {
        Type: {
            type: new GraphQLNonNull(billEnnumType),
            description: "bill types",
        },
        Amount: {
            type: new GraphQLNonNull(GraphQLNumber),
            description: "Amount field that works for both int and float",
        },
        Employee: {
            type: new GraphQLNonNull(GraphQLString),
            description: "Employee name",
        },
    },
    resolve: (parent, args, context, info) => {
        let response = {};
        let checkEmployee = employeeList.filter((val) => val.FullName.toLowerCase().includes(args.Employee.toLowerCase()))
        if (checkEmployee.length > 0) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            let bill = {
                Type: args.Type,
                Amount: args.Amount,
                SubmittedBy: args.Employee,
                Date_of_submission: formattedDate,
                Department: checkEmployee[0].Department
            }
            const getUniqueBillId = (bill) => {
                return JSON.stringify(bill)
            };
            const billId = getUniqueBillId(bill);
            if (billSet[billId] == undefined || billSet[billId] == null || billSet[billId] == {}) {
                billDetails.push(bill);
                billSet[billId] = bill
                response.data = {
                    message: "Bill sent successfully",
                };
            } else {
                response.data = {
                    message: "Bill Already Exists",
                };
            }
        }
        else {
            response.data = {
                message: "Employee dosent exist in the record",
            }
        }
        return response;
    }
}


export { createBill, GraphQLNumber }

Steps to proceed : 
1. Clone the repository 
2. Go to the directory in the terminal
3.  Make sure you have installed nodejs in your machine 
4. Run npm i to install all dependencies
5. Then run npm start
6. Run this url in the browser http://localhost:3000/playground
7. You will find a graphql ui to send all api request and ib built schema documents. 
8.  Run the below sample queries in the playground ui . 

Sample queries : 

To add Employees 

mutation{
  addEmployeeDetails(firstName:"abcd",lastName:"hsabf",emailAddress:"hbashvj@gmail.com",designation:SE1,department:TECH)
{
  data
}}

To view the employee list

{
  listEmployees{
	employeeList
  }
}

To create Bills : 

mutation{
  createBill(Type:Travel,Amount:12400.5,Employee:"abcd"){
	data
  }
}

To view the bills : 

{
  listBill{
	TotalAmount
	billDetails
  }
}

To delete an employee : 
mutation{
  deleteEmployee(FullName:"shuruthi velraj",emailId:"shuruthivelraj0410@gmail.com"){
	data
  }
}




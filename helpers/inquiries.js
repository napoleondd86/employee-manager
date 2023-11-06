const inquirer = require("inquirer");
const connection = require("../db/connection")

let addEmployeesQuestions = [
  { ///// THIS IS JUST AN EXAMPLE
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: ["View all Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
     
  }]

function start() {
  inquirer.prompt(
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: ["View all Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
  }).then( resp => {
    console.log(resp)
    if(resp.choice === "View all Employees") {
      displayEmployees()
    } 
    // else if(thing 2){

    // } else {
    //   //last thing
    // }
    response.department.id
  })

}
start()

function displayEmployees(){
  connection.query("SELECT * FROM employees", (err, data) => {
    if (err) throw err;
    console.table(data);
    start()
  })
  console.log("I am displaying all employees")
}

function addEmployee(){
  inquirer.prompt(addEmployeesQuestions)
  .then(answers => {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, data) => {
      if (err) throw err;
      console.log("Employee added.");
      displayEmployees()
    })
  })
}
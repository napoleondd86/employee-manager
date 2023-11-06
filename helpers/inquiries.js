const inquirer = require("inquirer");
const connection = require("../db/connection")

let addEmployeesQuestions = [
  {
    type: "input",
    message: "What is the employee's first name",
    name: "first_name"
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last_name"
  },
  {
    type: "list",
    message: "What is the employee's Role ID?",
    name: "role_id",
    choices: ["1", "2", "3", "4", "5", "6", "7", "8"]
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager_id",
    choices: ["Kal Penn", "John Cho", "Paula Garces"]
  }
]

let updateEmployeeQuestions = [
  {

  }
]

function start() {
  inquirer.prompt(
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: ["View all Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role"]
  }).then( resp => {
    console.log(resp)
    if(resp.choice === "View all Employees") {
      displayEmployees()
    } else if (resp.choice === "View All Departments") {
      displayDepartments()
    } else if (resp.choice === "View All Roles") {
      displayRoles()
    } else if (resp.choice === "Add Employee") {
      addEmployee()
    } else if (resp.choice === "Add Role") {
      addRole()
    } else if (resp.choice === "Add Department") {
      addDeparment()
    } else {
      updateEmployeeRole()
    }
  })

}
start()

function displayEmployees(){
  connection.query("SELECT * FROM employees", (err, data) => {
    if (err) throw err;
    console.table(data);
    start()
  })
  console.log("I am displaying all Employees.")
}

function displayRoles(){
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    start()
  })
  console.log("I am displaying all Roles.")
}

function displayDepartments(){
  connection.query("SELECT * FROM department", (err, data) => {
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

function addRole(){

}

function addDeparment(){

}

function updateEmployeeRole(){

}
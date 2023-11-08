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
    message: "What is the employee's role?",
    name: "role_id",
    choices: async () => {
      const data = await connection.promise().query("SELECT * FROM role")
      return data[0].map((role) => ({value: role.id, name: role.title}))
    }
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "manager_id",
    choices: async () => {
      const data = await connection.promise().query("SELECT * FROM employee WHERE manager_id IS NULL");
      return data[0].map((employee) => ({value: employee.id, name: employee.first_name + " " + employee.last_name}))
    }
  }
]

let updateEmployeeQuestions = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "employee_id",
    choices: async () => {
      const data = await connection.promise().query("SELECT * FROM employee");
      console.log(data)
      return data[0].map((employee) => ({value: employee.id, name: employee.first_name + " " + employee.last_name}) )  
    }
  },
  {
    type: "list",
    message: "Which role do you want to assign the selected employee?",
    name: "role_id", 
    choices: async() => {
      const data = await connection.promise().query("SELECT * FROM role");
      return data[0].map((role) => ({value: role.id, name: role.title}))
    }
  }
]

let addRoleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "title"
  },
  {
    type: "input",
    message: "What is the salary of the role?", 
    name: "salary",
    validate: (input) => {
      if(isNaN(input) || input.includes(",")){
        return "Please enter a valid number without commas.";
      }
      if (Number(input) < 0) {
        return "Please enter a positive number for the salary.";
      }
      return true;
    }
  },
  {
    type: "list",
    message: "What is the role's Department?",
    name: "department_id",
    choices: async () => {
      const data = await connection.promise().query("SELECT * FROM department");
      console.log(data)
      return data[0].map((department) => ({value: department.id, name: department.name}))
    }
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



function displayEmployees(){
  connection.query("SELECT * FROM employee", (err, data) => {
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
  console.log("I am displaying all Departments.")
}


/////////////////// WORKS /////////////////////////
function addEmployee(){
  inquirer.prompt(addEmployeesQuestions)
  .then(answers => {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, data) => {
      if (err) throw err;
      console.log("Employee added.");
      displayRoles()
    })
  })
}

//////////////// FIX ROLE'S DEPARTMENT//////////////////////////
function addRole(){
  inquirer.prompt(addRoleQuestions)
  .then(answers => {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ? )", [answers.title, answers.salary, answers.department_id], (err, data) => {
      if (err) throw err;
      console.log("Role added.");
      displayRoles()
    })
  })
}


////////////////  WORKS  ///////////////////
function addDeparment(){
  inquirer.prompt({
    type: "input",
    message: "What is the name of the Department?",
    name: "department"
  }).then(answers => {
    console.log(answers)
    connection.query("INSERT INTO department (name) VALUES (?) ", [answers.department], (err, data) => {
      if (err) throw err;
      console.log("Department added.");
      displayDepartments()
    })
  })
}
////////////////// WORKS //////////////////////////////
function updateEmployeeRole(){
  inquirer.prompt(updateEmployeeQuestions)
  .then(answers => {
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.employee_id], (err, data) => {
      if (err) throw err;
      console.log("Employee Role Updated.");
      displayEmployees()
    })
  })
}

module.exports =  start;


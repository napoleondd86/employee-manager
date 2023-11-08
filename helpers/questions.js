const connection = require("../db/connection")




let addEmployeesQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
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
      let newData = data[0].map((employee) => ({value: employee.id, name: employee.first_name + " " + employee.last_name}))
      newData.push({value: null, name: "None"});
      return newData
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
      return data[0].map((department) => ({value: department.id, name: department.name}))    
    }
  }
]

module.exports = {
  addEmployeesQuestions,
  addRoleQuestions,
  updateEmployeeQuestions
}
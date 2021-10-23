require("dotenv").config();

const mysql = require('mysql2');
require("console.table");
const inquirer = require("inquirer");

  const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: process.env.PASSWORD,
      database: 'managment'
    },
    console.log('Connected to the managment database.')
  );



 const setEmployee = () => {
     db.query("SELECT role_title FROM roles;",(err, result) => {
        if (err) throw err;
        let roleArray = [];
         inquirer.prompt([
              {
                  name: "employee_fname",
                  type: "input",
                  message: "Enter employee's first name:",
              },
              {
                  name: "employee_lname",
                  type: "input",
                  message: "Enter employee's last name:"
              },
              {
                name: "employee_role",
                type: "list",
                message: "Select employee role:",
                choices: function() {
                    result.forEach((res)=>{
                      roleArray.push(res.role_title);
                    });
                    return roleArray;
                },
            },
              {
                  name: "employee_manager",
                  type: "number",
                  message: "Enter ID for employee manager:"
              }
          ])
          .then((response) => {
              db.query("INSERT INTO employees SET ?",
              {
                employee_fname: response.employee_fname,
                employee_lname: response.employee_lname,
                employee_role: roleArray.indexOf(response.employee_role)+1,
                employee_manager: response.employee_manager
              });
              promptQuestions();
          });
    });
};

const getEmployees = () => {
  
  db.query("SELECT * FROM employees;", (err, result) => {
      if (err) throw err;
      console.table(result);
      promptQuestions();
  });
}

const setDepartment = () => {
  inquirer
      .prompt(
          {
              name: "department",
              type: "input",
              message: "Add a department(name)"
          }
      ).then((response)=> {
          db.query("INSERT INTO departments SET ?", { department_name: response.department }, (err)=> {
              if (err) throw err;
              promptQuestions();
          });
      });
  };

  const getDepartments = () => {
    db.query("SELECT * FROM departments;", (err, result) => {
        if (err) throw err;
        console.table(result);
        promptQuestions();
    });
}

  const setRole =() => {
    let query = "SELECT name FROM employee_managerDB.department";

    db.query("SELECT department_name FROM departments", (err, result) => {
        if (err) throw err;
        let departmentArray = [];

        inquirer
            .prompt([
                {
                    name: "role_title",
                    type: "input",
                    message: "Input role title:"
                },
                {
                  name: "role_department",
                  type: "list",
                  choices: ()=> {
                    result.forEach((res)=>{
                      departmentArray.push(res.department_name);
                    });
                  return departmentArray;
                  },
                  message: "Select department the role belongs to:"
              },
                {
                    name: "role_salary",
                    type: "number",
                    message: "Input role salary:"
                }
            ]).then((result => {
                db.query("INSERT INTO roles SET ?", {
                    role_title: result.role_title,
                    role_salary: result.role_salary,
                    role_department: departmentArray.indexOf(result.role_department)+1
                }, (err) => {
                    if (err) throw err;
                    promptQuestions();
                });
            }));
    });
  };

  const getRoles = () => {
    db.query("SELECT roles.*, departments.department_name FROM roles LEFT JOIN departments ON roles.role_department = departments.department_id;", (err, result) => {
        if (err) throw err;
        console.table(result);
        promptQuestions();
    });
};



  function promptQuestions(){
    inquirer.prompt(
      {
        type: "list",
        name: "menu",
        message: "Choose an option from the menu",
        choices: [
          "View employees",
          "View departments",
          "View roles",
          "Add employee",
          "Add department",
          "Add role",
          "Change employee role",
          "Exit"
        ]
      }
    ).then((response) => {
      switch (response.menu) {
          case "View employees":
            getEmployees();
              break;

          case "Add employee":
              setEmployee();
              break;

          case "View departments":
              getDepartments();
              break;

          case "View roles":
              getRoles();
              break;

          case "Add employee":
              setEmployee();
              break;

          case "Add department":
              setDepartment();
              break;

          case "Add role":
              setRole();
              break;

          // case "Update employee role":
          //     changeRole();
          //     break;

          case "Exit":
            console.log("Prompt End");
              db.end();
              break;
      }
  });
}

  

  promptQuestions();
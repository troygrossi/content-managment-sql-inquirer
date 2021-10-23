require("dotenv").config();

const mysql = require('mysql2');
const cTable = require("console.table");
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
    console.log('Connected to the election database.')
  );



 async function newEmployee(){
    await db.query("SELECT role_title FROM roles;",(err, result) => {
        if (err) throw err;
        let roles = [];
         inquirer.prompt([
              {
                  name: "role",
                  type: "list",
                  message: "Select employee role",
                  choices: function() {
                      result.forEach((res, index)=>{
                        roles.push(res[index].role_title);
                      });
                      return roles;
                  },
              },
              {
                  name: "fname",
                  type: "input",
                  message: "Enter employee's first name",
              },
              {
                  name: "lname",
                  type: "input",
                  message: "Enter employee's last name"
              },
              {
                  name: "manager",
                  type: "number",
                  message: "Enter ID for employee manager?"
              }
          ]);
          // .then((response) {
          //     db.query("INSERT INTO employees (employee_fname, employee_lname, employee_role, first_name, last_name, industry_connected)",
          //     {
          //         first_name: response.firstname,
          //         last_name: response.lastname,
          //         role_id: roleArr.indexOf(response.role)+1,
          //         manager_id: response.manager
          //     });
          //     promptQuestions();
          // });
    });
};

const newDepartment = () => {
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

  const newRole =() => {
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


  function promptQuestions(){
    inquirer.prompt(
      {
        type: "list",
        name: "menu",
        message: "Choose an option from the menu",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add employee",
          "Add department",
          "Add role",
          "Change employee role",
          "Exit"
        ]
      }
    ).then((response) => {
      switch (response.menu) {
          case "Add employee":
              newEmployee();
              break;

          // case "View departments":
          //     viewDepartments();
          //     break;

          // case "View roles":
          //     viewRoles();
          //     break;

          // case "Add employee":
          //     newEmployee();
          //     break;

          case "Add department":
              newDepartment();
              break;

          case "Add role":
              newRole();
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
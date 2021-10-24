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
  

      db.query("SELECT employees.*, roles.role_title, roles.role_salary, CONCAT(manager.employee_fname, ' ', manager.employee_lname) AS manager FROM employees LEFT JOIN roles ON employees.employee_role = roles.role_id INNER JOIN employees manager ON manager.employee_id = employees.employee_manager ORDER BY employee_id;", (err, result) => {
      if (err) throw err;
      console.table(result);
      promptQuestions();
  });
}

const changeRole = () => {
  db.query("SELECT employee_fname, employee_id FROM employees", (err, result) => {
    console.log(result);
      if (err) throw err;
      let employeeArray = [];
      let employee_role = "";
      let employee_id = "";
      inquirer
          .prompt([
              {
                  name: "employee_id",
                  type: "list",
                  message: "Choose an employee to update role:",
                  choices: () => {
                    result.forEach((res)=>{
                      employeeArray.push(`ID: ${res.employee_id} First Name: ${res.employee_fname} `);
                    });
                      return employeeArray;
                  },
              },
              {
                  name: "employee_role",
                  type: "input",
                  message: "Input new role ID:"
              }
          ])
          .then((result) => {
            employee_id = result.employee_id.split(' ')[1];
            employee_role = result.employee_role;
              db.query("UPDATE employees SET employee_role = ? WHERE employee_id = ?", [employee_role, employee_id]);
              promptQuestions();
          })
  })

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
          "View all employees",
          "View all departments",
          "View all roles",
          "Add an employee",
          "Add a department",
          "Add a role",
          "Update employee role",
          "Exit"
        ]
      }
    ).then((response) => {
      switch (response.menu) {
          case "View all employees":
            getEmployees();
              break;

          case "Add an employee":
              setEmployee();
              break;

          case "View all departments":
              getDepartments();
              break;

          case "View all roles":
              getRoles();
              break;

          case "Add a department":
              setDepartment();
              break;

          case "Add a role":
              setRole();
              break;

          case "Update employee role":
              changeRole();
              break;

          case "Exit":
            console.log("Prompt End");
              db.end();
              break;
      }
  });
}

  promptQuestions();
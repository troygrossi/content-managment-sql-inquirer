[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Content Manager

## Developed By: Troy Grossi

### Walkthrough: https://watch.screencastify.com/v/4oz72I5LueP2wVUaJX6y

</br>
</br>

# Description

This is a challenge assignment provided by Trilogy under the UC Berkley coding bootcamp. The challange of this assignmnet is to create an sql database that holds managment information. You must also be able to navigate and populate the database using the command line interface. The web application must then meet the following criteria:
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
# Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [Contribution](#contribution)

- [License](#license)

<!---->

- [Questions](#questions)

# Installation

1) Download the project from github. 
2) Must have node and sql downloaded on your client. 
3) Type "npm install" from the root of the directory.
4) You must then create a .env file with a PASSWORD variable that holds your sql password.
5) Start the cli prompts by typing "node index" in the terminal.

### Dependencies: 
- console.table
- dotenv
- inquirer
- mysql2

# Usage

- Start the cli prompts by typing "node index" in the terminal.
- Follow the prompts to populate, edit, or view tables of the database.


# Contribution

Refer to:
[Contribution Convenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

# License

MIT

# Questions

Ask questions at our github

- GitHub Link: https://github.com/troygrossi/content-managment-sql-inquirer

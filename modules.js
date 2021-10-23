

module.exports = {

    newEmployee() {
        console.log("test");
        db.query("SELECT role_title FROM roles;", function(err, res) {
            if (err) throw err;
            let roleArr = [];
            inquirer
              .prompt([
                  {
                      name: "role",
                      type: "list",
                      choices: function() {
                          for (let i = 0; i < res.length; i++) {
                              roleArr.push(res[i].title);
                          }
                          return roleArr;
                      },
                      message: "What is the employee's role?"
                  },
                  {
                      name: "firstname",
                      type: "input",
                      message: "What is the employee's first name?",
                  },
                  {
                      name: "lastname",
                      type: "input",
                      message: "What is the employee's last name?"
                  },
                  {
                      name: "manager",
                      type: "number",
                      message: "What is the employee's manager's ID#?"
                  }
              ])
              .then(function(answer) {
                  db.query("INSERT INTO employee SET ?",
                  {
                      first_name: answer.firstname,
                      last_name: answer.lastname,
                      role_id: roleArr.indexOf(answer.role)+1,
                      manager_id: answer.manager
                  });
                  promptQuestions();
              });
        });
    },
}


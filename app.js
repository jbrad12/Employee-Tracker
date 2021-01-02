var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,


  user: "root",

 
  password: "password",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  runPrompt();
});

function runPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add?",
        "View?",
        "Update?",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add?":
        addPrompt();
        break;

      case "View?":
        viewPrompt();
        break;

      case "Update?":
        updatePrompt();
        break;

      case "Exit":
        connection.end();
        break;
      }
    });
}
function addPrompt() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to add?",
        choices: [
          "Add department?",
          "Add role?",
          "Add employee?",
          "Exit"
        ]
    })
      .then(function(answer) {
        switch (answer.action) {
        case "Add department?":
          addDepartment();
          break;
  
        case "Add role?":
          addRole();
          break;
  
        case "Add employee?":
          addEmployee();
          break;
  
        case "Exit":
          connection.end();
          break;
        }
    });
}
function viewPrompt() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to view?",
        choices: [
          "View departments?",
          "View roles?",
          "View employees?",
          "Exit"
        ]
    })
      .then(function(answer) {
        switch (answer.action) {
        case "View departments?":
          viewDepartment();
          break;
  
        case "View roles?":
          viewRole();
          break;
  
        case "View employees?":
          viewEmployee();
          break;
  
        case "Exit":
          connection.end();
          break;
        }
    });
}
function updatePrompt() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to update?",
        choices: [
          "Update employee roles?",
          "Update employee managers?",
          "Exit"
        ]
    })
      .then(function(answer) {
        switch (answer.action) {
        case "Update employee roles?":
          updateRoles();
          break;
  
        case "Update employee managers?":
          updateManagers();
          break;
  
        case "Exit":
          connection.end();
          break;
        }
    });
}

// Start View Functions

function viewRole() {

  var query = "SELECT * FROM role";
    connection.query(query,function(err, res) {
        if (err) throw err;
        console.table(res)
        runPrompt()
    });
};

function viewDepartment() {

  var query = "SELECT * FROM department";
    connection.query(query,function(err, res) {
        if (err) throw err;
        console.table(res)
        runPrompt()
    });
};

function viewEmployee() {

  var query = "Select first_name, last_name, name FROM employee INNER JOIN department on employee.role_id = department.id";
    connection.query(query,function(err, res) {
        if (err) throw err;
        console.table(res)
        runPrompt()
    });
};

//End View Functions

//Start Add Functions

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department (name) VALUE (?)";
      connection.query(query, [answer.department], function(err, res) {
        if (err) throw err;
        
        viewDepartment();
      });
    });
}

function addRole() {
    inquirer
      .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role you would like to add?"
      },
      {
        name: "id",
        type: "input",
        message: "What department ID of the role you would like to add?"
      }])
      .then(function(answer) {
        var query = "INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)";
        connection.query(query, [answer.title, answer.salary, answer.id], function(err, res) {
          if (err) throw err;
          
          viewRole();
        });
      });
}

function addEmployee() {
    inquirer
      .prompt([
      {
        name: "f_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "l_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role id?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager id?"
      },
    ])
      .then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id , manager_id) VALUE (?, ?, ?, ?)";
        connection.query(query, [answer.f_name, answer.l_name, answer.role_id, answer.manager_id], function(err, res) {
          if (err) throw err;
          
          viewEmployee();
        });
      });
}

//End Add Functions

//Start Update functions




function updateManagers() {
  inquirer
  .prompt([
      {
          name: "name",
          type: "input",
          message: "which employee would you like to update?"
      }, 
      {
          message: "enter the new manager ID:",
          type: "number",
          name: "manager_id"
      }
  ])
    .then(function (answer) {
      connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [answer.manager_id, answer.name], function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt()
      })
     
  })

}

function updateRoles() {
  inquirer
  .prompt([
      {
          name: "name",
          type: "input",
          message: "which employee would you like to update?"
      }, 
      {
          message: "enter the new role ID:",
          type: "number",
          name: "role_id"
      }
  ])
    .then(function (answer) {
      connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.role_id, answer.name], function (err, res) {
        if (err) throw err;
        console.table(res);
        runPrompt()
      })
     
  })

}



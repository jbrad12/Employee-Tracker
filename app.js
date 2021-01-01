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
        case "Update employee roles":
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

  var query = "SELECT * FROM employee";
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
        message: "What is the employee's first name?"
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

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM topsongs WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM topsongs GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM topsongs WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM topsongs WHERE ?", { song: answer.song }, function(err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function albumSearch() {
    inquirer
      .prompt({
        name: "album",
        type: "input",
        message: "What artist would you like to search for?"
      })
      .then(function(answer) {
       
        connection.query("SELECT * FROM topalbums INNER JOIN topsongs ON topalbums.year = topsongs.year WHERE  topsongs.artist = ? AND topalbums.artist = ? ORDER BY topsongs.year;", [answer.album ,answer.album ], function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            console.log(
                " || Year: " +
                res[i].year +
                " || Album: " +
                res[i].album +
                " || Song: " +
                res[i].song +
                " || Artist: " +
                res[i].artist
              
            );
          }
         
        });
      });
  }
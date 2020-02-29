const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection was succesfull dude!");
      promptMainMenu();
  });

promptMainMenu = () => {

  inquirer
    .prompt({
      name: "mainMenuSelection",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "Quit"
      ]
    })
    .then(response => {
       switch (response.mainMenuSelection) {
         case "Quit": 
          connection.end();
          break;
        case "Add department":
          promptForNewDepartment();
          break;
        case "View departments":
          viewAllDepartments();
          break;
        case "Add employee":
          promptToAddEmployee();
          break;
        default:
          connection.end();
       }
    }) 
}

promptForNewDepartment = () => {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(response => {
      // Add to the database
      let queryString = `INSERT INTO employeeDB.department (name) VALUES ("${response.newDepartment}")`;
                              //values from our object below are substituted into "?" above.
      let query = connection.query(queryString, (err, res) => {

        if (err) {
          console.log(err);
        }
        promptMainMenu();
      })
    })
}

viewAllDepartments = () => {
  let queryString = `SELECT * FROM employeeDB.department`;
                              //values from our object below are substituted into "?" above.
  let query = connection.query(queryString, (err, res) => {

    if (err) {
      console.log(err);
    }
    else {
      console.table(res)
    }
    promptMainMenu();
  });
    
}

promptToAddEmployee = () => {
  /*
  //Query the DB for a list of roles
  //roleQuery = "SELECT title FROM...."
  //let  connection1 = connection.query(roleQuery, (err, roles) => {
    if (err) {

    } else {
      managerQuery = "SELECT lastName FROM...."
      let connecton2 = connection.query(managerQuery, (err, managers) => {
        if (err) {

        } else {
          inquirer
          .prompt({
            name: "employeeFirstName",
            type: "input",
            message: "What is the employee's first name?"
          },
          {
            name: "employeeLastName",
            type: "input",
            message: "What is the employee's last name?"
          },
          {
            name: "employeeRole",
            type: "list",
            message: "What is the employee's role?",
            choices: []
          },
          {
            name: "employeeManager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: []
          })
          .then(response => {


          });
        }
      })
    }
  })
    //After that completes Query the DB for a list of managers
      //After that completes prompt the user for all the questions about the new employee

      */
  

}
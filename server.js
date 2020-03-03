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
        // DONE
        "Add department",
        // DONE
        "Add role",
        "Add employee",
        // DONE
        "View departments",
        // done
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
        case "Add role":
          promptForNewRole();
          break;
        case "View departments":
          viewAllDepartments();
          break;
        case "Add employee":
          promptToAddEmployee();
          break;
        case "View roles":
          viewAllRoles();
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

promptForNewRole = () => {

  //Query the db for the departments
  let query = "SELECT * FROM employeeDB.department";

  connection.query(query, (err, res) => {
    console.log(res);
    if (err) {
      console.log(err);
      promptMainMenu();
    } else {

      let choiceList = [];

      for (var i = 0; i < res.length; i++) {
        let deptNameString = res[i].name;
        choiceList.push(deptNameString);
      }
            
      //promptMainMenu();

      inquirer
        .prompt([
          {
          name: "newRole",
          type: "input",
          message: "What is the title of the role you want to add?"
        },
        { 
          name: "newRoleSalary",
          type: "input",
          message: "What is the salary?"
        },
        { 
          name: "newRoleDepartmentID",
          type: "rawlist",
          message: "What is the deparment ID that the new role being added belongs to?",
          choices: choiceList,
          filter: (val) => {
            let choiceIndex = choiceList.indexOf(val);
            let deptID = res[choiceIndex].id;
            return deptID;
          }
        }

      ])
        .then(response => {
          console.log(response);
          // Add to the database
          let queryString = `INSERT INTO employeeDB.employeeRole (title, salary, departmentID) VALUES ("${response.newRole}", "${response.newRoleSalary}", "${response.newRoleDepartmentID}")`;

          let query = connection.query(queryString, (err, res) => {

            if (err) {
              console.log(err);
            }
            console.log("Role has been added!!!!")
            promptMainMenu();
          })

        })
        
    }

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

    //Query the db for the departments
    let query = "SELECT * FROM employeeDB.employeeRole";
  
    connection.query(query, (err, res) => {
      if (err) {
        console.log(err);
        promptMainMenu();
      } else {
  
        let role = [];
  
        for (var i = 0; i < res.length; i++) {
          let roleTitleString = res[i].title;
          role.push(roleTitleString);
        }

        let query2 = "SELECT * FROM employeeDB.employee";

        connection.query(query2, (err2, res2) => {
          if (err) {
            console.log(err2);
            promptMainMenu();
          } else {
      
            let manager = [];
      
            for (var i = 0; i < res2.length; i++) {
              let managerName = res2[i].firstName + " " + res2[i].lastName;
              manager.push(managerName);
            }
            manager.push("None");
            
            inquirer
              .prompt([
                {
                  name: "newEmployeeFirstName",
                  type: "input",
                  message: "What is the first name?"
                },
                { 
                  name: "newEmployeeLastName",
                  type: "input",
                  message: "What is thhe last name?"
                },
                { 
                  name: "listOfRoles",
                  type: "rawlist",
                  message: "What is the role of the new employee you want to add?",
                  choices: roles,
                  filter: (val) => {
                    let choiceIndex = roles.indexOf(val);
                    let roleID = res[choiceIndex].id;
                    return roleID;
                  }
                },
                {
                  name: "newEmployeeManager",
                  type: "rawlist",
                  message: "Who is the employee's manager?",
                  choices: managers,
                  filter: (val) => {
                    if (val === "None") {
                      return undefined;
                    }
                    let choiceIndex = managers.indexOf(val);
                    let employeeID = res2[choiceIndex].id;
                    return employeeID;
                  }
                }
              ])
              .then(response => {


                promptMainMenu();
              })
              

            

          }

        })

      }

    });

    
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

viewAllRoles = () => {
  let queryString = `SELECT * FROM employeeDB.employeeRole`;
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
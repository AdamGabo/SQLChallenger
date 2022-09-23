const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'password',
      database: 'employeeDatabase'
    },
    console.log('Connected to the database.')
  );



//ENSURE THE SERVER IS CONNECTED ONCE IT IS RUN IT 
  db.connect(function (err) {
    if (err) throw err;
    console.log("connection " + connection.threadId);
    runPrompt();
});

const viewEmployees = "View All Employees"; 
const viewDepartments = "View All Departments"; 
const viewAllRoles = "View All Roles";
const addRole = "Add a Role"; 
const addEmployee = "Add an Employee"; 
const addDepartment = "Add a Department";
const updateEmployeeRole = "Update Employee Role";
const done = "Done"; 


function runPrompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "Please choose an option?",
        choices: [
            viewEmployees,
            viewDepartments,
            viewAllRoles,
            addRole,
            addEmployee,
            addDepartment,
            updateEmployeeRole,
            done]
    }).then (function ({option}){
        switch (option) {
            case viewEmployees:
              //Create function that view the employee database 
              viewEmployeeFunc(); 
              break;

            case done:
                connection.end();
                break;

    }
}); 
}
//QUERIES TO SHOW AND MODIFY DATATABLES 

//EXAMPLE query from module 
db.query(`SELECT * FROM employee`, (err, rows) => {
    console.log(rows);
});
//examples 
db.query( 'SELECT * FROM users WHERE id = 1' ).then( rows => {
    // ... use the result ...
  } );

const rows = await db.query( 'SELECT * FROM users WHERE id = 1' );






// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`port number: ${PORT}`);
  });

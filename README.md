# EmployeeTracker
User interface that utilizes node.js , inquirer package and  MySql that make it easy for non-developers to view and interact with information stored in databases.

## User Walkthrough

When the user navigates to the console , the first command they need to run for this user interface to work is npm i inquirer and mysql packages . Once that is completed, the user should first run the command npm server.js . If the connection to the database was succesfull the application should showcase a message indicating that the connection was made ("connection was succesfull dude!"). Right after this message appears the user is asked to choose among a series of actions that allow him to manipulate and manage the content of the stablished employee database. The user has the option to add departments, add roles, add employees, view departments, view roles, view employees. This database has three tables that contain departments, roles and employees. All three tables are interconnected as some of the actions the user can take requires these three tables to exchange data.  This simple yet effective console application makes it easy for non-developers to manage employee database with precision and ease.

## How to use

![Alt text](/assets/Screenshot1.jpg)

## Adding a department:

Step 1 - User is prompted to input what is the name of the department they would like to add for which they can enter the name of the department they desire to include. 

![Alt text](/assets/Screenshot2.jpg)

click enter

Department is added!

## Adding a role:

Step 1 - Navigate using the up and down arrow keys to the "Add Role" option and click enter. A list of the already existing roles should appear.

![Alt text](/assets/Screenshot3.jpg)

Step 2 - The user us prompted to enter the title of the role they want to add. The user should enter the name of the role being added and click enter.

![Alt text](/assets/Screenshot4.jpg)

Step 3 - The user is prompted to enter the salary of the role being added in numeric value and click enter. Do notenter currency symbol. 

![Alt text](/assets/Screenshot5.jpg)

Step 4 - The user is prompted to choose the department the new role belongs to. Navigate using the up and down arrow keys. Click enter.

![Alt text](/assets/Screenshot6.jpg)

Message saying "Role has been added!!!! should appear.

## Adding employee:

Step 1 - Navigate using the up and down arrow keys to the "Add employee" option and click enter. User is prompted to enter the first name of the employee being added.

![Alt text](/assets/Screenshot7.jpg)

Step 2 -Enter first name and press "Enter"

![Alt text](/assets/Screenshot8.jpg)

Step 3 - Enter the last name of employee being added and press "Enter"

![Alt text](/assets/Screenshot9.jpg)

Step 3 - User is able to choose the role of the new employee they are adding by navigating the options using the up and down keys. Press enter once you have navigated to the role.

Step 4 - User is able to choose the new employee's manager based on all of the employees that are in the data base. Navigate using the up and and down keys. Press enter once you have navigated to the manager's name. The user also has the option to choose None for employees that dont have managers. 

![Alt text](/assets/Screenshot10.jpg)

A message notifying the user "New employee has been added!!!" should appear the main menu should appear.

![Alt text](/assets/Screenshot11.jpg)

## Vew Departments:

Step 1 - Navigate to the view departments option using the arrow keys an click enter. A list of all departments should appear and the main menu should appear again.

![Alt text](/assets/Screenshot12.jpg)

## View roles:

Step 1 - Navigate to the view roles option using the arrow keys an click enter. A list of all the latest list of roles should appear and the main menu should appear again.

![Alt text](/assets/Screenshot13.jpg)

## View employee:

Step 1 - Navigate to the view employees option using the arrow keys an click enter. A list of all the latest list of employees should appear with their corresponding ID, first name, last name , title , salary and manager if they have one. The main menu should appear again.

![Alt text](/assets/Screenshot14.jpg)

## Update employees 

Not yet available, coming soon!


















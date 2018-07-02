# contact management
project exercise for my job interview


Contact Management System

This codebase is created to demonstrate an intranet application built with .Net Web API that interacts with the database server to add, edit, delete and list all contacts. It also has a UI built with HTML, JQuery and Ajax features with all the basic validations for testing the Rest API services.


# Project Structure
	
1.	Create a .Net web application with Web API setup.
2.	Set up the database and create the required table (in my case a local Db).
3.	Create the database context with the help of Entity Framework for connecting to Database from the .Net application for performing the CRUD operations.
4.	Create a folder containing all the Interfaces created for implementing the Repository Pattern.
5.	Create a folder containing all the Repository classes created for implementing the Interface methods as a part of Repository Pattern implementation.
6.	Set up the Ninject dependency Resolver for implementing dependency injection for loose coupling of code and cleaner controller.
7.	The Interface contains all the methods declared for performing the CRUD operations.
8.	The Repository Class contains a Database context instance for interacting with the Database and all the methods definitions, declared in Interface for performing the CRUD operations.
9.	Create a BaseApi Controller that inherits the ApiController and contains a generic method for accepting dependencies.
10.	Create the API controller that inherits the BaseApi Controller and contains all the dependencies through Constructor Dependency Injection.
11.	The API controller implements asynchronous Web API by using async await keyword. The Action methods in Controller use the async keyword in the method signature and the method is returning Task.
12.	The Web API method calls further methods using await keyword. Those methods (methods of the Repository Class)  have also implemented async await pattern in them.
13.	The API controller contains all the action methods with the required Http verbs to be called from the UI for different CRUD operations.
14.	The API controller uses all the methods of the Repository Class for performing the CRUD operations, thus keeping the controller code as cleaner as possible. 
15.	For testing the Web API rest services, Postman can be used but to have a visual experience I have created an UI page with HTML and JQuery with all the basic validations.
16.	I am using Ajax for calling the Web API rest services.

# To do:
Need  to implement Single Sign On and Role based feature for this intranet application.



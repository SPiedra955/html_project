# html_project

# Introduction

This is a project in which we have to design the Front-end part of a Back-end given by our teacher and design a working sample application, with this application we are going to use Servlets and Apache Tomcat Server to create it.
With this application we can send messages from one account to another as the main function, there are also some features like register a new user, add a friend by his e-mail and show the history of messages between users.

# Downloads

* Apache Tomcat Server version 9.
* Eclipse IDE for Enterprise Java and Web Developers.
* gson-2.9.1.jar
* mysql-connector-j-8.0.31.jar
* [ddl.sql]()

# Amics

This is the name of this project, because it's an app that allow us send messages with our friends and it's divided in three pages that are ```Login.html```, ```registro.html``` and ```xat.html```.

### Log in

This is the main page where we can access our application, it is a simple login page that is connected to a database of users, once the user is verified, the chat page is accessed.

This is the aspect of the page:

![image](https://github.com/SPiedra955/html_project/assets/114516225/78f0922e-6e1a-4600-bf46-3b0a4432485c)

If you are not registered in the database you can sign up clicking the button "Sign up".

### Sign up

On this page you can create a new user by filling in the fields and choosing your country of origin through a bar with a list of all the countries.

Once registered the page redirects you to ```Login.html``` to access the database, otherwise if you have not clicked the register button you can return to the main page.

![image](https://github.com/SPiedra955/html_project/assets/114516225/6b666c46-11a6-4202-a61e-b6610d1183c7)

### Chat

We access to this page if we succes with our login and this are his functions:

* Add a friend by their e-mail, but this friend must be registered in our database.
* The option to select a friend to initiate a chat and send a message to.
* Display the message sent between two users and hide the conversation.

___Choose a friend and send them a message___:

![image](https://github.com/SPiedra955/html_project/assets/114516225/d68e4d39-af0e-468b-af47-e5eeafa9e561)

___Our friend receive the message and answer it___:

![image](https://github.com/SPiedra955/html_project/assets/114516225/cb2a3128-2cb8-4dd9-9153-b0443c84ddac)


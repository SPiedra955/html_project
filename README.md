# Table of contents
 * [**Introduction**](#introduction)
 * [**Downloads**](#downloads)
 * [**Amics**](#amics)
    * [**Login**](#login)
    * [**Sign up**](#sign-up)
    * [**Chat**](#chat)
    * [**Database**](#database)

# Introduction

This is a project in which we have to design the front-end part of a back-end given by our teacher and design a working sample application, with this application we are going to use Servlets, HTML, CSS, Java, JavaScript, Maven and Apache Tomcat Server to create it.
With this application we can send messages from one account to another as the main function, there are also some features like register a new user, add a friend by his e-mail and show the history of messages between users.

# Downloads

* Apache Tomcat Server version 9
* Apache Maven 3.8.7
* Eclipse IDE for Enterprise Java and Web Developers
* gson-2.9.1.jar
* mysql-connector-j-8.0.31.jar
* [ddl.sql](https://github.com/SPiedra955/html_project/blob/master/scripts/xat.sql)

# Amics

This is the name of this project, it is an application that allows us to send messages with our friends and it is divided into three pages which are ````Login.html````,```` register.html```` and ````xat.html````.

### Login

This is the main page where we can access our application, it is a simple login page that is connected to a database of users, once the user is verified, the chat page is accessed.

___This is the aspect of the page___

![image](https://github.com/SPiedra955/html_project/assets/114516225/8aa473cd-85e5-4e4d-938a-dae3bc8341c2)

If you are not registered in the database you can sign up clicking the button "Sign up".

### Sign up

On this page you can create a new user by filling in the fields and choosing your country of origin through a bar with a list of all the countries.

Once registered the page redirects you to ```Login.html``` to access the database, otherwise if you have not clicked the register button you can return to the main page.

![image](https://github.com/SPiedra955/html_project/assets/114516225/9049d54f-62a3-4a94-bc0f-908940d51cf7)

### Chat

We access to this page if we succes with our login and this are his functions:

* Add a friend by their e-mail, but this friend must be registered in our database.
* The option to select a friend to initiate a chat and send a message to.
* Display the message sent between two users and hide the conversation.

___Choose a friend and send them a message___

![image](https://github.com/SPiedra955/html_project/assets/114516225/8827bb7c-9eeb-463a-b2ae-60972916a37e)

___Our friend receive the message and answer it___

![image](https://github.com/SPiedra955/html_project/assets/114516225/b16a3467-fae2-4064-842f-57b8b8c1bbca)

### Database

Inside the folder scripts you can find the a SQL file for create the database to use in this project,but we need one more table that isn't in our script it's the following:

````
CREATE TABLE message (
    id INT(11) AUTO_INCREMENT,
    origen VARCHAR(50),
    desti VARCHAR(50),
    text VARCHAR(50),
    PRIMARY KEY (id)
);
````




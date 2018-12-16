# The Stockpile

#### Project Description
***
The Stockpile is a mock web storefront that was a project for CSCI 3308. We used this to learn full stack web development and practice project management/working as a team.
***
#### Organization
***
The file structure is organized with Node.js in mind.  We have routes and scripts in files with their respective name.  Within views, there are a few places for the views that are rendered to the website.  Within layouts, there are templates such as the NavBar that are added to many different web pages using EJS.  In styles, there are CSS files.  There are ejs files in the main views folder that are full pages that are loaded on the website.

The database folder has the script for creating the database on our Heroku application.  Server.js is the main entry point for all of the code, and database.js has the information for connecting to the database.
***
#### Build/Test Code
***
To test the code locally, we have lines that are commented out in the server.js file as well as the database.js file.  There are two different sections to set up the port and database config locally.  Using this we can run a local version of the site on a Node.js application.

To find our automatic testing with Selenium, refer to the folder titled “Testing_Screenshots”. This folder contains all the screenshots from our Selenium testing as well as the python script to run the tests. Running these tests requires installing the gecko driver (Firefox) for Selenium and Python.

To find the user test acceptance testing is a document which is under Admin Page Testing in the TARMAC_TheStockpile for milestone 5. It is starts on page 9 and one goes through the test case by hand. These test cases will be used to test if the admin pages work. It can be added to if there are new requirements and checks if the cases work after a commit. Print out the file below and one can go through and test if the code works. 
Blank document for  user acceptance testing
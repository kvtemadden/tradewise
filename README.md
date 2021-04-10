
# Tradewise - Full Stack Web Application

# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Instructions](#instructions)
- [Credits](#credits)
- [Contributions](#contributions)
- [Tests](#tests)
- [License](#license)
---
## Screenshot of deployed app:
![Screenshot of working tradewise app](/public/images/projectscreenshot.PNG)

You can access the Tradewise app [here](https://uob-tradewise.herokuapp.com/dashboard)

You can access the GitHub Repo via [this link](https://github.com/kvtemadden/tradewise)

## Description:

The aim of Tradewise is to provide a simple and easy to use platform, for customers to find
a tradesman for any given household job. Similarly, the site allows tradesmen to connect with
customers; a tradesman can add a quote to a customer's job posting and receive 
a notification if it has been accepted. 

The application utilises the Model, View and Controller (MVC) architectural design principles
to ensure the application is scalable and maintainable in the long-run. The front-end uses 
express-handlebars npm to render dynamic web content, in line with the server-side endpoints. 
This is achieved through a combination of layouts and partials, which provide the HTML and
CSS when rendered. 

Moving onto the backend, sequelize npm is used to construct the database tables and entity
relationships for the user data. The server-side routing is handled by express.js, which
interacts with the database tables to create, read, update and delete data.

---

## Installation:
### desktop
* node.js
* MySQL server
* MySQL Workbench

### npm
* bcrypt
* connect-session-sequelize  
* dotenv  
* express  
* express-handlebars  
* express-session  
* fs  
* generate-password  
* hbs  
* mysql2  
* sequelize

---
## Instructions:
1. From the command-line in the root directory of the repository, run npm install to 
install the npm dependencies from the package.json
2. Retrieve the SQL commands found inside db > schema.sql and run them in MySQL to
create the database.
3. Seed the database with node seeds/seed.js
4. Initialise the server with node server
5. Navigate to port 3001 (default) in your web browser.


---
## Credits:
#### Development Team

* Drew Bassett - (Github: drewbassett24)  
* Kate Madden - (Github: kvtemadden)  
* Matthew Jones - (Github: mj-0001)  
* Zarin Salim - (Github: zs274)

---
## Contributions:
* Please feel free to fork this repository and  
pass any suggestions or bugs onto the development team.


---
## Tests:
* Currently none


---
## License:  

MIT  

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  

https://opensource.org/licenses/MIT

---

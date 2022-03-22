 # Jeffrey's Final Exam for WAD
This company application is part of the final exam of Web Application Development course. The application simulates a business company which has the functionality to add, edit, delete products from the database. The purpose of this project is to understand the basic concepts of building a web application. In this course, we are using MERN stack to build the website.

- MongoDB: A document-oriented database used to store the application data.

- ExpressJS: A framework layered on top of NodeJS, used to build the backend of a site using NodeJS functions and structures.

- NodeJS: The JavaScript runtime environment. It is used to run JavaScript on a machine rather than in a browser.

- ReactJS: A library used to build UI components that create the user interface of the web application.

# Author
- Jeffrey Zhi Yee Chong 6310023

# Features
There are 4 pages in as follow:
- Login - simulates the login page with username and password checking in the database.
- Quotation Management - A page that retrieves all quotation data from the database and display in table sorted by date of creation. This page shows the quantity, item, price/unit and the total amount of the products as record. In this page, users are able to delete any record from the database.
- Quotation-add - A page which allows users to add quotation into a cart before submitting to the database. In this page, users can select the product from a list (retrieve from product database), price, quantity. Once finish, user can save all items in the cart to the quotation database.


# Api list
## Products API

`GET /products` - retrieve all products from the database.

`POST /products` - insert a product into the database. A product consists of code, name, and price.

`PUT /products` - update the product details (code, name, price).

`DELETE /products/:id` - delete a product from the database using product_ID.

## Quotation API

`GET /quotations` - retrieve all quotations from the database.

`POST /quotations` - insert a quotation into the database. A quotation consists of product, price, and quantity.

`DELETE /quotations/:id` - delete a quotation from the database using quotation_ID.

# Deployment
The application is deployed using hiroku service: https://company-6310023.herokuapp.com/

# How To Get Start
## Install
Clone the project and run `npm install` or run `yarn` to install dependencies.

## Run the App
    npm dev (for npm)
    yarn dev (for yarn)

## Frontend Github repository
https://github.com/jeffreyjczy/wad-company-2022/tree/main/app

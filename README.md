## Getting started

Follow these steps to set up The Project on your machine:

Create a .env file: Copy the .env.example file and rename it to .env. Update the environment variables in this file to match your local setup.

Install Dependencies: Run yarn install to install all project dependencies. This step may take a few minutes.

Run the Project: Use one of the following commands to run the project locally:

yarn dev: This command will start the development server with hot reloading enabled.<br />
yarn start: This command will start the production server.

## Description

Backend onlineshop built with ExpressJs & MongoDB<br />

This backend project includes the following features:<br />

1. User Registration. Users can register with an admin role or a customer. Customers are required to fill in all fields, including shipping addresses, while admins are not.
2. User Login <br />
3. Update User Accounts. Users can update their account information after logging in.<br />
4. Create products. Can only be done with the admin user role and after logging in first.<br />
5. Update products. Can only be done with the admin user role and after logging in first.<br />
6. Delete product. Can only be done with the admin user role and after logging in first.<br />
7. Read the list of products.<br />
8. Read the details of the product<br />
9. Create orders. There are types of orders, purchase orders and pre orders.
   Products that are out of stock can only be pre-ordered, and products that are available can only be purchase orders.
   Orders can only be made after logging in.<br />
10. Read orders based on user ID. Read orders based on user ID can only be done after logging in

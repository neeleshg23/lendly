## Lendly - Borrowing with Ease, Securely

### CSCI 201 Spring 2023 Team 7 Final Project

In a first terminal:
- `cd backend`
- `mvn clean install`
- `mvn spring-boot:run`

In a second terminal:
- `cd frontend`
- `npm install .`
- `npm start`

Database connection:
- Ensure a MySQL database `lendly` at port 3306 with tables `Users` and `Items` is enabled and started.
- In `backend/src/main/resources/application.properties`, update your `spring.datasource.username` as well as your `spring.datasource.password` with the user credentials granted to your DB.
- In `backend/src/main/resources/application.yml`, update your `username` and `password` with these same credentials.

Postman API testing:
- Install [Postman](https://www.postman.com/downloads/).
- Launch Postman and click on the 'Import' button in the top left corner.
- Select the `Lendly.postman_collection.json` file located in the `postman` folder.
- After importing, you'll see the 'Lendly' collection in the left sidebar. Click on the collection and start testing the API endpoints.



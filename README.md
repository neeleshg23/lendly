## Lendly - Borrowing with Ease, Securely

### CSCI 201 Spring 2023 Team 7 Final Project

In a first terminal:
- `cd backend`
- `mvn clean install`
- `mvn spring-boot:run`

In a second terminal:
- `cd frontend`
- `npm inbstall .`
- `npm start`

Postman API testing:
- Install [Postman](https://www.postman.com/downloads/).
- Launch Postman and click on the 'Import' button in the top left corner.
- Select the `Lendly.postman_collection.json` file located in the `backend/postman` folder.
- After importing, you'll see the 'Lendly' collection in the left sidebar. Click on the collection and start testing the API endpoints.

Database connection:
- Ensure your device's IP address has been added to the list of authorized hosts in [Google Cloud Dashboard](https://console.cloud.google.com).
- Either start it from [Google Cloud Dashboard](https://console.cloud.google.com) or `gcloud sql instances patch lendly-db --activation-policy ALWAYS`
- Stop it in the [Google Cloud Dashboard](https://console.cloud.google.com) or `gcloud sql instances patch lendly-db --activation-policy NEVER`
- Advanced settings: Google Cloud Shell or `gcloud sql connect lendly-db --user=root`

Deployment steps:
- Start App Engine instance in [App Engine Settings within Google Cloud Dashboard](https://console.cloud.google.com/appengine/settings)
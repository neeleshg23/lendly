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
- Validate credentials as well as Project ID:
  - `gcloud auth login` 
  - Confirm terminal output: `Your current project is [lendly-383321].` 
  - Otherwise, `gcloud config set project lendly-383321`
- Build a static frontend
  - `cd frontend`
  - `npm install .`
  - `npm run build`
  - `cp -r build ../backend/src/main/resources/static`
- Deploy backend
  - `cd backend`
  - `gcloud app deploy app.yml --quiet`



```
lendly
├─ .git
├─ .github
│  └─ workflows
│     └─ build-deploy.yml
├─ .gitignore
├─ README.md
├─ backend
│  ├─ .gcloudignore
│  ├─ .mvn
│  │  └─ wrapper
│  │     └─ maven-wrapper.properties
│  ├─ app.yml
│  ├─ mvnw
│  ├─ mvnw.cmd
│  ├─ pom.xml
│  ├─ postman
│  │  └─ Lendly.postman_collection.json
│  └─ src
│     └─ main
│        ├─ java
│        │  └─ com
│        │     └─ lendly
│        │        └─ backend
│        │           ├─ ItemController.java
│        │           ├─ ItemRepository.java
│        │           ├─ ItemRepositoryJdbcImpl.java
│        │           ├─ LendlyBackendApplication.java
│        │           ├─ UserController.java
│        │           ├─ UserRepository.java
│        │           ├─ UserRepositoryJdbcImpl.java
│        │           └─ model
│        │              ├─ Item.java
│        │              └─ User.java
│        └─ resources
│           └─ application.properties
└─ frontend
   ├─ .gcloudignore
   ├─ README.md
   ├─ app.yml
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  ├─ index.html
   │  ├─ logo192.png
   │  ├─ logo512.png
   │  ├─ manifest.json
   │  └─ robots.txt
   └─ src
      ├─ App.css
      ├─ App.js
      ├─ App.test.js
      ├─ ItemListing.css
      ├─ Rachel.css
      ├─ components
      │  ├─ About.jsx
      │  ├─ Home.jsx
      │  ├─ Item.jsx
      │  ├─ ItemListing.jsx
      │  ├─ Login.jsx
      │  ├─ Market.jsx
      │  ├─ NavBar.jsx
      │  ├─ Profile.jsx
      │  ├─ Register.jsx
      │  └─ RouterLinks.jsx
      ├─ images
      │  ├─ jacket.jpg
      │  ├─ rollerblades.jpg
      │  └─ snowboots.jpg
      ├─ index.css
      ├─ index.js
      ├─ reportWebVitals.js
      └─ setupTests.js
```
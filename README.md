<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Toco Hiring Task Backend</h3>
</div>
<!-- TABLE OF CONTENTS -->
<p>
   <details>
     <summary>Table of Contents</summary>
     <ol>
       <li>
         <a href="#about-the-project">About The Project</a>
         <ul>
           <li><a href="#built-with">Built With</a></li>
           <li><a href="#application-design">Application Design</a></li>
           <li><a href="#tests">Tests</a></li>
         </ul>
       </li>
       <li>
         <a href="#getting-started">Getting Started</a>
         <ul>
           <li><a href="#prerequisites">Prerequisites</a></li>
           <li><a href="#local-setup">Local Setup</a></li>
           <li><a href="#running-tests">Running Tests</a></li>
           <li><a href="#running-dev-server">Running Development Server</a></li>
         </ul>
       </li>
     </ol>
   </details>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project

This project serves as the backend for Toco Hiring Task. <br/>
Please set up the frontend of this application by following the steps given [here](https://github.com/roninx991/tocos-test-fe/tree/master#readme).
Please set up the backend before setting up the frontend of the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With <a name="built-with"></a>

This project has been built using the following tools and libraries:
* Node
* Typescript
* Express
* Typegoose
* Docker

For testing purposes this project uses Jest.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Application Design <a name="application-design"></a>

The application follows the classic Model-View-Controller (MVC) architecture to provide an understandable and clean structure of code. <br/>
This further helps in making the application more maintainable and extensible for future work. The source code of the application is inside the `./src` folder. </br>
It has been further divided into the below-listed modules:-
* configurations - This folder contains configurations for 3rd party dependencies and database connection. Due to the simplicity of this project, we only need a few configurations namely:<br/>
  1. Logger Configuration - We are using bunyan for our logging purposes.
  2. MongoDB Configuration - We are using mongodb as our database, hence we need to configure the connection string and other options as required.
* controllers - This folder contains files that come under the controller part of the MVC architecture. <br/>
These files contain code to process requests coming from the frontend application and prepare appropriate responses for them.
* models - This folder contains the model part of the MVC architecture. They describe how the data would be stored inside the database.
* repositories - This folder will contain CRUD operations and data transformation logic which will be used to interact with the database. <br/>
Due to the simplicity of this project, the code inside the files contains very less logic.
* routes - This folder contains the view part of the MVC architecture. It describes the various routes and endpoints that the application supports.
* services - This folder contains the business logic of the application.
* utils - This folder will contain helper functions utilized by the `services` code. In this project, this only contains the environment variables used by the project.
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Tests <a name="tests"></a>

The application tests have been written inside the `./tests` folder. You can run these tests by following the steps mentioned [here](#running-tests).
We are using Jest Testing Framework, Supertest and Mongodb Memory Server for writing the unit and integration tests required by the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started <a name="getting-started"></a>

Below you will find steps on how to set up this project locally:

### Prerequisites <a name="prerequisites"></a>

You will need to make sure to have these installed on your system.
* Node - Please use node version 16.x or above. See [installation](https://nodejs.org/en/download)
* Docker - Please install docker on your system. See [installation](https://www.docker.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Local Setup <a name="local-setup"></a>

Below are the steps to set up the project locally:

1. Clone this repository.
    ```
    git clone git@github.com:roninx991/tocos-test-be.git
    ```
2. Navigate to the project folder. Run the below command to create docker containers for the application
   ```
   docker-compose up -d
   ```
   Please note that docker needs to be running in the background before running this command or else it will fail.
3. The above command will build the project and spin up mongodb and tocos-backend containers. You can view these by running:
   ```
   docker ps -a
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running Tests <a name="running-tests"></a>

1. To run tests, you need to first install all dependencies. Navigate to the project folder and run the below command for installing the dependencies
   ```
   npm install
   ```
2. Above will install all dependencies for the project including libraries required for testing. To run tests, execute the below command
   ```
   npm run test
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running Development Server <a name="running-dev-server"></a>

1. To run in development mode, you need to first install all dependencies. Navigate to the project folder and run the below command for installing the dependencies
   ```
   npm install
   ```
2. Above will install all dependencies for the project including libraries required for testing. To run the development server, execute the below command
   ```
   npm run dev
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

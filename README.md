# Fitpage Real-time Weather Forecast API Documentation

The Real-time Weather Forecast API is a RESTful service built with Node.js, Express, TypeScript, MongoDB, and Mongoose. It allows users to manage geographical locations and fetch real-time weather forecasts for those locations using an external weather service API. The API provides endpoints to add, retrieve, update, and delete locations, as well as retrieve current and historical weather data.

## API Endpoints

### Location Endpoints

- **POST /api/locations**: Create a new location item.
- **GET /api/locations/:locationId**: Retrieve a specific location item by ID.
- **GET /api/locations**: Retrieve all locations items.
- **PUT /api/locations/:locationId**: Update an existing location item by ID.
- **DELETE /api/locations/:locationId**: Delete a location item by ID.

### Weather Endpoints

- **GET /api/weathers/:locationId**: Retrieve a weather forecast by location ID.
- **GET /api/weathers/history**: Retrieve a weather forecast history.

## Schema

### Location Schema

- **name**: String (required)
- **latitude**: Number (required)
- **longitude**: Number (required)


## Caching

- The API uses node-cache to store weather data responses temporarily.
- This reduces the number of external API calls and improves response times.
- Cached data is stored for 30 minutes.

## Rate Limiting

- To prevent abuse, the API uses express-rate-limit to limit the number of requests.
- Each IP can make to 100 requests per 15 minutes.

## Logging

- Logging is implemented using winston to log API requests and errors.
- Especially those interacting with the external weather service.
- Logs are written to both the console and a file (logs/app_error.log).

## Error Handling

- The API implements proper error handling for common scenarios such as invalid input and unauthorized access.
- Meaningful error messages are returned in the API responses to aid developers in debugging.

## Database Integration

- MongoDB is used for storing location item data, integrated using Mongoose ORM.

## Technologies Used

- **Node.js**: A JavaScript runtime environment for building server-side applications.
- **Express.js**: A web application framework for Node.js used to build RESTful APIs.
- **TypeScript**: A superset of JavaScript that adds static typing to the language.
- **bcryptjs**: A library for securely hashing passwords before storing them in the database.
- **Docker**: Used for containerizing the application for ease of deployment and scaling.
- **MongoDB**: A NoSQL database for storing location data.
- **Mongoose**: An ODM for MongoDB and Node.js.

## Repository

The codebase for this API is available on GitHub.

**Repository URL**: [GitHub Repository](https://github.com/shivam-singh-au17/fitpage-weather-forecast-app)

You can clone the repository to your local machine to explore the codebase.

## Additional Features
1. ### CI/CD Pipeline

    The project includes a CI/CD pipeline configured with GitHub Actions for automated testing and deployment. Whenever code is pushed to the main branch or a pull request is created, the pipeline triggers automated testing and deployment. It is important for a user to review the changes before merging a pull request.

2. ### Testing

    All APIs of the project are thoroughly tested using Jest and Supertest. Test cases cover all scenarios and are run through the CI/CD pipeline to ensure reliability and correctness of the codebase.


3. ### Swagger Documentation

    Swagger documentation provides detailed information about the API endpoints and their usage. You can find both local and hosted URLs below:

    **Local URL**: [Swagger Documentation Link](http://localhost:3030/docs/#/)

    **Hosted URL**: [Swagger Documentation Link](http://fitpage-weather-forecast-app.us-east-1.elasticbeanstalk.com/docs/)


4. ### Docker Deployment

    1. **Prerequisites**: Ensure you have Docker installed on your system. If not, you can download and install it from the [official Docker website](https://docs.docker.com/get-docker/).

    2. **Build the Docker Image**:
        - Open a terminal/command prompt.
        - Navigate to the root directory of your project.
        - Run the following command to build the Docker image:
            ```bash
            docker build -t weather_app .
            ```
        - This command builds the Docker image named `weather_app` using the Dockerfile in the current directory.

    3. **Run the Docker Container**:
        - After the image is successfully built, you can run the Docker container using the following command:
            ```bash
            docker run -p 3030:3030 weather_app
            ```
        - This command starts the container and runs your API inside it. It also maps port 3030 of the container to port 3030 of your host machine.

    4. **Access the API**:
        - Once the container is running, you can access your API at:
            ```
            http://localhost:3030
            ```

    5. **Stop the Docker Container**:
        - To stop the Docker container and shut down the API, you can use the following command:
            ```bash
            docker rm <container_id_or_name>
            ```
        - Replace `<container_id_or_name>` with the ID or name of the container you want to remove. You can find the container ID or name by running `docker ps -a`.

    By following these steps, you can deploy your API locally using Docker and manage its lifecycle directly with Docker commands.

## How to Run the Project Locally

1. Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. Clone or download the repository to your local machine.
    ```bash
    git clone https://github.com/shivam-singh-au17/fitpage-weather-forecast-app
    ```

3. Open your terminal or command prompt and navigate to the directory where you have downloaded the files.

4. Run the following command to install dependencies:
    ```bash
    npm install
    ```

5. Once the dependencies are installed, run the following command to start the development server:
    ```bash
    npm run dev
    ```

5. Run the following command to start the production server:
    ```bash
    npm run build && npm start
    ```
    
6. Access the API at `http://localhost:3030`.

## Click [here](http://fitpage-weather-forecast-app.us-east-1.elasticbeanstalk.com/docs/) to access the hosted project.

Feel free to explore the API and provide feedback or suggestions for improvement. Thank you for your attention!
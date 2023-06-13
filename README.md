# react-around-api-full
The API of "Around North America" with authorization and registration handled by the back-end server.

This repository contains the full API of "Around North America" project that features user authorization and user registration and handles cards and users.

## API Hosting
The API is hosted on the following website: [api.jvaldiviezo.desarrollointerno.com](https://api.jvaldiviezo.desarrollointerno.com)

## Installation
Clone the repository and run `npm install` to install the dependencies in both, the `backend` and `frontend` directories.
To work locally change on the `frontend` the API endpoints on the files `api.js` and `auth.js` inside `/frontend/src/utils` folder.
Make it to point port 4000 which is the one used in the backend. 

Also, make sure to have MongoDB version 6 installed and running on your local machine.

## API Summary
The "Around North America" API provides the following functionality:

- Fetching cards: Retrieve a list of cards from the server.
- User information: Retrieve information about the currently logged-in user.
- Liking a card: Like a specific card by sending a PUT request to the API.
- Removing a like: Remove a like from a specific card by sending a DELETE request to the API.
- Updating user information: Update the name and about information of the current user.
- Creating a new card: Create a new card with a name and a link.
- Deleting a card: Delete a specific card from the server.
- Updating user avatar: Update the avatar image of the current user.

Please note that this API requires authentication with a JWT token, which can be obtained from the server.

Feel free to explore the React application repository and visit the hosted API for more details.

## API Endpoints Summary [Users]

This API provides functionality for user authentication, user management, and user profile manipulation. It interacts with a MongoDB database using the `UserModelMongo` model.
This is just a small overview, the Cards model follows the same idea.
Please review the code for more details in the backend folder. You can check the details on the `routes` folder and the `controllers` folder.

### User Authentication

- **Login**
  - `POST /login`: Authenticates a user with email and password.

### User Management

- **Get Users**
  - `GET /users`: Retrieves all users.

- **Get User by ID**
  - `GET /users/:id`: Retrieves a user by ID.

- **Create User**
  - `POST /signup`: Creates a new user.


## Error Handling

In case of an error, the API returns a JSON response with the following structure:

```json
{
  "statusCode": "<status_code>",
  "message": "<error_message>",
  "error": "<optional_error_details>"
}
```

## License
This project is licensed under the terms of the MIT license.

## Contributing
This project is not open for contribution at the moment. It's just to showcase a complete project.
However, it's open for comments and suggestions. And feel free to clone the repository and edit as needed.
Just follow the MIT license terms.

## Contact
If you want to contact me you can reach me through GitHub

## Front End Link
The Front End can be accessed by going to this link:
[https://jvaldiviezo.desarrollointerno.com](https://jvaldiviezo.desarrollointerno.com)
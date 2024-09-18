# Family 100 API

Family 100 API is a simple Express.js-based API for managing questions and answers for a Family Feud-style game. This API allows you to retrieve, add, and delete questions, as well as fetch random questions for gameplay.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Data Structure](#data-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Retrieve all questions
- Get a random question
- Add new questions
- Delete questions
- CORS enabled for cross-origin requests
- JSON data persistence

## Getting Started

### Prerequisites

- Node.js (v12 or higher recommended)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/family-100-api.git
   ```

2. Navigate to the project directory:
   ```
   cd family-100-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `data.json` file in the root directory to store the questions and answers.

## Usage

### Running the Server

To start the server, run:

```
node server.js
```

The server will start running on `http://localhost:3001`.

### API Endpoints

1. **Get API Information**
   - URL: `/`
   - Method: `GET`
   - Description: Returns basic information about the API and available endpoints.

2. **Get All Questions**
   - URL: `/api/questions`
   - Method: `GET`
   - Description: Retrieves all questions stored in the database.

3. **Get Random Question**
   - URL: `/api/questions/random`
   - Method: `GET`
   - Description: Fetches a random question from the database.

4. **Add New Question**
   - URL: `/api/questions`
   - Method: `POST`
   - Body:
     ```json
     {
       "pertanyaan": "Your question here",
       "jawaban": "Correct answer",
       "opsi": ["Option 1", "Option 2", "Option 3", "Option 4"]
     }
     ```
   - Description: Adds a new question to the database.

5. **Delete Question**
   - URL: `/api/questions`
   - Method: `DELETE`
   - Body:
     ```json
     {
       "pertanyaan": "Question to delete"
     }
     ```
   - Description: Deletes a question from the database based on the question text.

6. **Debug Endpoint**
   - URL: `/api/debug`
   - Method: `GET`
   - Description: A simple endpoint to check if the API is working.

## Data Structure

The questions are stored in the following format:

```json
{
  "pertanyaan": "Question text",
  "jawaban": "Correct answer",
  "opsi": ["Option 1", "Option 2", "Option 3", "Option 4"]
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- This API was created by Wandaem.
- Built with Express.js and Node.js.

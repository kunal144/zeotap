# Zeotap

A web application structured with separate `frontend` and `backend` directories.

## Table of Contents

- [About the Project](#about-the-project)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Zeotap is a full-stack web application designed for big data manupulation in Clickhouse and local CSV. It leverages modern web technologies to deliver a seamless user experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kunal144/zeotap.git
cd zeotap
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

### 3. Set Up the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
```

## Usage

### 1. Start the Backend Server

In the `backend` directory:

```bash
npm start
```

### 2. Start the Frontend Development Server

In the `frontend` directory:

```bash
npm start
```

The frontend will typically run on [http://localhost:3000](http://localhost:3000), and the backend on [http://localhost:5000](http://localhost:5000), unless configured otherwise.

## Project Structure

```
zeotap/
├── backend/   # Backend server code
└── frontend/  # Frontend application code
```



## License

This project is licensed under the MIT License.

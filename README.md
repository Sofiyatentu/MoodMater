# MoodMater

A modern mood tracking and journaling application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to log their daily moods, write journal entries, and visualize their mood patterns over time.

## Features

* **User Authentication:** Secure signup and login for personalized journaling.
* **Create Entries:** Easily add new journal entries with a title, a short note, and a selected mood (Happy, Sad, Angry, Meh).
* **Mood Visualization:** View a pie chart and a bar chart showing your mood distribution and frequency.
* **Edit and Delete:** Update or remove your past journal entries as needed.
* **Filter Entries:** Filter saved moods by mood type, keyword in the note, and date range (start date and end date).
* **Responsive Design:** A clean, attractive, and responsive user interface that works seamlessly on different screen sizes.

## Technologies Used

### Backend
* **Node.js & Express:** The runtime environment and web framework for the server.
* **MongoDB & Mongoose:** The database and ODM (Object Data Modeling) for data storage.
* **bcryptjs:** Used for hashing and salting passwords to ensure user security.
* **jsonwebtoken (JWT):** For creating and verifying user tokens to handle authentication.
* **cors:** Middleware to enable Cross-Origin Resource Sharing.

### Frontend
* **React:** A powerful JavaScript library for building the user interface.
* **React Router:** For handling client-side routing between pages (login, signup, and the main app).
* **recharts:** A charting library for React to display the mood data visualizations.
* **react-toastify:** A library for simple, attractive toast notifications.
* **Axios / Fetch API:** For making HTTP requests to the backend API.

## Installation and Setup

### Prerequisites
* Node.js and npm installed on your machine.
* A MongoDB Atlas account for a free cloud database, or a local MongoDB instance.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/MoodMater.git](https://github.com/your-username/MoodMater.git)
    cd MoodMater
    ```
2.  **Backend Setup:**
    * Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    * Install backend dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file and add your configuration (replace placeholders):
        ```
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=a_very_secure_secret_key
        PORT=5000
        ```
    * Start the backend server:
        ```bash
        node server.js
        ```
3.  **Frontend Setup:**
    * Open a **new terminal** and navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    * Install frontend dependencies:
        ```bash
        npm install
        ```
    * Start the React development server:
        ```bash
        npm start
        ```

The application will now be running on `http://localhost:3000`. You can register a new account and begin tracking your moods!

## Deployment

To deploy this application, you will need to host the backend and frontend separately.

* **Backend:** Can be deployed to a service like Render, Heroku, or Vercel. Remember to configure your environment variables on the hosting platform.
* **Frontend:** The static build files (generated with `npm run build`) can be hosted on services like Vercel, Netlify, or Render. Configure the frontend to point to your live backend API URL.

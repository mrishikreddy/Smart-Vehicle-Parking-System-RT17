# Smart Vehicle Parking System

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Database Structure](#firebase-database-structure)
- [Styling](#styling)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)

## Project Overview
The **Smart Vehicle Parking System** is a web application built with Next.js and Firebase to monitor and manage vehicle parking. It provides real-time updates on parking slot availability, environmental sensor data (temperature, humidity, concentration, day/night status), and vehicle entry/exit history. The system visualizes parking slot occupancy and displays live sensor and vehicle data in an intuitive dashboard.

[Visit Live Project](https://smart-vehicle-parking-system.vercel.app/)

## Features
- **Real-Time Parking Monitoring**: Displays the status of six parking slots, updated in real-time using Firebase Realtime Database.
- **Environmental Sensors**: Tracks temperature, humidity, concentration, and day/night status with color-coded thresholds for safety levels.
- **Vehicle History**: Logs vehicle entry and exit details, including vehicle number, type, status, and timestamp.
- **Live Sensor Data**: Records and displays historical sensor data with timestamps.
- **Responsive UI**: Styled with CSS modules for a clean and user-friendly interface.

## Tech Stack
- **Frontend**: Next.js (React framework), CSS Modules
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication (configured in `firebaseConfig.js`)
- **Other Dependencies**: React, Firebase SDK

## Project Structure
```
├── /src
│   ├── /app
│   │   ├── /slots
│   │   │   └── page.js           # Page displaying raw vehicle data from Firebase
│   │   ├── firebaseConfig.js     # Firebase configuration and initialization
│   │   ├── globals.css           # Global CSS styles
│   │   ├── layout.js            # Root layout for the Next.js app
│   │   ├── page.module.css       # CSS module for the home page
│   │   ├── page.js              # Main dashboard with parking map, sensors, and live data
│   ├── /public                  # Static assets (if any)
├── package.json                 # Project dependencies and scripts
├── README.md                    # This file
```

## Prerequisites
To run this project locally, ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn
- A Firebase project with Realtime Database and Authentication enabled

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smart-vehicle-parking-system.git
   cd smart-vehicle-parking-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Realtime Database and Authentication.
   - Copy your Firebase configuration (API key, database URL, etc.) into `/src/app/firebaseConfig.js`.
   - Example `firebaseConfig.js`:
     ```javascript
     import { initializeApp } from "firebase/app";
     import { getDatabase } from "firebase/database";
     import { getAuth } from "firebase/auth";

     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       databaseURL: "your-database-url",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id",
     };

     const app = initializeApp(firebaseConfig);
     export const database = getDatabase(app);
     export const auth = getAuth(app);
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage
- **Home Page (`/`)**: Displays the parking map, environmental sensor data, and live vehicle/sensor data tables.
  - **Parking Map**: Visualizes six parking slots, with occupied slots highlighted.
  - **Environmental Data**: Shows real-time sensor readings (temperature, humidity, concentration, day/night) with color-coded safety indicators.
  - **Live Data Tables**: Lists vehicle entry/exit history and sensor data history with timestamps.
- **Slots Page (`/slots`)**: Displays raw vehicle data from the Firebase `vehicle` node in JSON format.

## Firebase Database Structure
The app relies on the following Firebase Realtime Database structure:
```
{
  "admin": {
    "dayornight": "Day" | "Night",
    "temp": number,           // e.g., 25
    "humidity": number,       // e.g., 60
    "concentration": number,  // e.g., 4000
    "slot1": boolean,        // true if occupied
    "slot2": boolean,
    "slot3": boolean,
    "slot4": boolean,
    "slot5": boolean,
    "slot6": boolean
  },
  "vehicle": {
    "<vehicleNo>": {
      "vehicle_type": string, // e.g., "Car", "Truck"
      "status": "IN" | "OUT",
      "in_time": string,     // e.g., "2023-10-01 10:00:00"
      "out_time": string     // e.g., "2023-10-01 12:00:00"
    }
  }
}
```

## Styling
- **CSS Modules**: Used in `page.module.css` for scoped styling of the home page.
- **Global Styles**: Defined in `globals.css` for app-wide styling.
- **Color Coding**: 
  - **Temperature**: Blue (≤20°C), Green (≤25°C), Orange (≤30°C), Red (>30°C)
  - **Humidity**: Blue (<30%), Green (≤50%), Yellow (≤70%), Red (>70%)
  - **Concentration**: Blue (<3000), Green (≤5000), Yellow (≤7000), Orange (≤9000), Red (>9000)
  - **Day/Night**: Distinct styles for day and night modes.

## Deployment
To deploy the app:
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy to a hosting platform like Vercel, Netlify, or Firebase Hosting:
   - For Vercel:
     ```bash
     vercel
     ```
   - Ensure Firebase configuration is set in environment variables for production.

## Acknowledgements
- [Next.js](https://nextjs.org/) for the React framework.
- [Firebase](https://firebase.google.com/) for real-time database and authentication.
- [React](https://reactjs.org/) for building the UI.

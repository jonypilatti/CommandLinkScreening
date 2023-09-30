# CommandLinkScreening - Project Overview

Welcome to my Command Link Screening, a dynamic form project meticulously crafted to streamline data collection processes.

Node version: Node.js v18.17.1 Last working dependencies:

"dependencies": { "@reduxjs/toolkit": "^1.9.6", "@testing-library/jest-dom": "^6.1.3", "axios": "^1.5.1", "jest-environment-jsdom": "^29.7.0", "localforage": "^1.10.0", "match-sorter": "^6.3.1", "react": "^18.2.0", "react-dom": "^18.2.0", "react-redux": "^8.1.2", "react-router-dom": "^6.16.0", "redux": "^4.2.1", "redux-thunk": "^2.4.2", "sort-by": "^1.2.0", "styled-components": "^6.0.8", "sweetalert2": "^11.7.31" },

## Project Highlights

**Dynamic Form Generation:** CommandLinkScreening leverages the power of ReactJS with Vite to dynamically generate user-friendly forms. This project is designed to simplify data collection and presentation.

**Seamless Backend Integration:** The backend, situated in the `api` folder, is built with NodeJS and ExpressJS. It seamlessly interacts with the frontend, allowing for efficient data retrieval from a JSON file.

**Robust State Management:** To ensure a smooth user experience, I've implemented Redux for effective state management. This helps in handling complex data flows within the application.

**Rigorous Testing:** Quality assurance is a priority. I've utilized Jest with React/testing and Jest/testing to rigorously test the application, ensuring it meets the highest standards of reliability.

**Full Responsiveness:** CommandLinkScreening is designed to be fully responsive on all devices, providing an optimal experience regardless of the platform used.

**Accessibility First:** Accessibility is a core focus, with the inclusion of `aria-label` and `aria-labelledby` attributes to ensure the application is usable by individuals with disabilities.

**Efficient Navigation:** I've integrated `react-router-dom` and created essential components, such as `Form.jsx` and `ThankYou.jsx`, each with dedicated routes ("/" and "/thankyou," respectively) for smooth and intuitive navigation.

## Getting Started

Getting started is a breeze:

### 1. Clone the Repository

Begin by cloning this repository to your local machine.

### 2. Backend Setup

For the backend configuration, open two separate terminals: one for the frontend and the other for the backend. In the backend terminal, navigate to the `api` folder using the `cd api` command from the project's main folder. Install the necessary backend modules:

```shell
npm install --save-dev
```

Once the installation is complete, initiate the backend server:

shell Copy code npm start This will start the backend server on port 3001, ensuring smooth communication between the frontend and the backend.

### 3. Frontend Setup

In the terminal located in the main project folder, install the frontend modules:

```shell
npm install
```

If you wish to host for testing in mobile, you need to go to the formReducer.js file and switch the constant from APIURLLOCALHOST to APIURL. If you want to test it on localhost you can do it by using APIURL instead. Obviously, you need to start the backend server for this to work.

Once the installation is finished, launch the development server:

```shell
npm run dev
```

The development server defaults to port 5173, allowing you to access the application via http://localhost:5173.

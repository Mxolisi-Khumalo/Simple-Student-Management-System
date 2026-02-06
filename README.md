STUDENT MANAGEMENT SYSTEM

A full-stack MERN (MongoDB, Express, React, Node) application designed for managing student records. This project features a modern, industrial "dark mode" UI, a robust REST API, and a separation of concerns architecture.

TECH STACK

Backend:
- Node.js & Express: REST API architecture.
- MongoDB & Mongoose: NoSQL database with strict schema validation.
- Dotenv: Environment variable management for security.

Frontend:
- React.js (Vite): Fast, modern frontend tooling.
- Tailwind CSS (v3): Utility-first styling for the custom "Off-Brand" industrial design.
- Axios: Promise-based HTTP client for API integration.

SETUP & INSTALLATION

Prerequisites:
- Node.js (v18+ recommended)
- MongoDB (Local Community Edition or Atlas Cloud)

1. Clone the Repository
Command: git clone git@github.com:Mxolisi-Khumalo/Simple-Student-Management-System.git
Command: cd student-management-system

2. Backend Setup
Navigate to the server folder and install dependencies:
Command: cd server
Command: npm install

Configuration:
Create a file named ".env" in the server directory with the following content:
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/studentDB

Start Server:
Command: npm run dev
(Console should output: Server running on port 5001)

3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
Command: cd ../client
Command: npm install

Start Client:
Command: npm run dev
(Access the app at http://localhost:5173)

CHALLENGES & ENGINEERING SOLUTIONS

During the development lifecycle, several specific infrastructure and tooling challenges were encountered. Below is a log of how they were resolved.

1. Port Conflicts (macOS AirPlay)
Issue: The default Express port 5000 was occupied by the macOS "AirPlay Receiver" service, preventing the server from starting.
Resolution: Configured the backend to listen on port 5001 via environment variables and updated the frontend API_URL constant to match.

2. MongoDB DNS Resolution (ENOTFOUND)
Issue: Using "localhost" in the connection string caused timeouts on Node v17+, as it favored IPv6 resolution while MongoDB was listening on IPv4. Additionally, initial Cloud connection strings lacked specific database targeting.
Resolution: Switched local connection string to explicit IPv4 (127.0.0.1:27017), appended "/studentDB" to the URI to ensure data isolation, and added write retry settings.

3. Tailwind CSS Versioning Conflict
Issue: The latest release of Tailwind CSS (v4) introduced a breaking change to the initialization process, causing "npx" execution errors.
Resolution: Downgraded to the industry-standard Tailwind v3.4, cleaned the node_modules cache, and re-initialized the configuration to ensure compatibility with the standard postcss workflow.

4. Security & Environment Variables
Issue: Potential exposure of database credentials within the codebase.
Resolution: Implemented strict usage of .env files. Rotated database passwords immediately upon detection of potential exposure and ensured .gitignore properly excludes environment files.

UI/UX DESIGN

The interface was pivoted from a standard light-mode table to a Full-Screen Industrial Dashboard:
- Aesthetic: Dark mode , Monospace typography for data density.
- Responsiveness: CSS Grid layout that shifts from a sidebar form (Desktop) to a stacked layout (Mobile).
- UX: Sticky form positioning for better accessibility during data entry on long lists.

API ENDPOINTS

Method: POST
Endpoint: /students
Description: Create a new student

Method: GET
Endpoint: /students
Description: Retrieve all students

Method: PUT
Endpoint: /students/:id
Description: Update a student's details

Method: DELETE
Endpoint: /students/:id
Description: Remove a student
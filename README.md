

# SkillBridge: Collaborative Learning Platform

## Table of Contents

- [👥 Team Members](#-team-members)
- [📄 Project Overview](#-project-overview)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [🚧 Installation](#-installation)
- [🎨 UI Design](#-ui-design)
- [🚀 Project Features](#-project-features)
- [🔗 API Endpoints](#-api-endpoints)
- [📅 Milestones](#-milestones)

---
## 👷 Team Members 

| **ID**       | **Name**                       | **Email**                          | **Github**                          | **Role**             |
|--------------|--------------------------------|------------------------------------|-------------------------------------|----------------------|
| 20220104032  | **Eusha Ahmed Mahi**             | eushaahmed08@gmail.com             | [eushaahmed08](https://github.com/eushaahmed08) |  Backend + Frontend |
| 20220104033  | **Tanvir Arif**       | tanvirarif0802@gmail.com    | [tanvirarif033](https://github.com/tanvirarif033) | Frontend + Backend |
| 20220104042  | **Amirul Momin Utshaw**  | mominamirul96@gmail.com               | [Amirul026](https://github.com/Amirul026) | Lead 

---

## 📄 Project Overview

### Project Title:
SkillBridge: Collaborative Skill Learning Platform

### Objective:
SkillBridge is designed to connect university alumni and students to facilitate skill-learning , mentorship, and collaboration. It bridges the gap between theoretical knowledge and practical skills through a gamified and community-driven platform.

### Target Audience:
- University students seeking mentorship or skill improvement.
- Alumni looking to share expertise and connect with their alma mater.

###  🛠️ Tech Stack:
#### Backend:
- Laravel (PHP Framework)  
#### Frontend:
- React.js (JavaScript Library)  
#### Rendering Method:
- Client-Side Rendering (CSR)
#### Database:
- Microsoft SQL Server
#### Environment:
- Docker for containerized deployment

---

## 🚧 Installation 

### Prerequisites

- PHP >= 8.0.30
- Composer
- Node.js
- Microsoft SQL Server

<details>
<summary>Backend (Laravel)</summary>

1. Clone the repository:
    ```bash
    git clone https://github.com/srijon57/CareCritique.git
    ```

2. Install dependencies:
    ```bash
    composer install
    ```

3. Start the Laravel development server:
    ```bash
    php artisan serve
    ```

</details>

<details>
<summary>Frontend (React)</summary>

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm run dev
    ```

</details>

## 🎨 UI Design

A mock user interface has been designed using Figma. The design includes:
- Home page
- User dashboard
- Trending courses
- Chat interface
- Learners leaderboard

### Figma Design Link:
[SkillBridge UI Design](https://www.figma.com/design/S9pVLiHuuedG3V6v6oClbG/E-Learning-Website-Design-(Community)?node-id=70-79&m=dev&t=glmNFA9HhCicwuuu-1)

---


## 🚀 Project Features

### Core Features:

1.  **User Authentication**
    
    -   Secure registration and login for mentors and learners.
    -   Role-based access (Admin, Mentor, Learner).
2.  **Course and Video Management**
    
    -   Mentors can upload and manage courses and videos.
    -   Some videos can be placed behind a paywall.
3.  **Live Classes and Broadcasting**
    
    -   Mentors can host live classes and broadcast sessions.
    -   Learners can join live classes and interact.
4.  **Class Purchase System**
    
    -   Learners can purchase access to courses and classes.
    -   Track user purchases and access to premium content.
5.  **Interactive Calendar**
    
    -   Learners and mentors can schedule classes, events, and live sessions.
    -   Google Calendar integration for syncing schedules.
6.  **Video Call Sessions**
    
    -   Schedule one-on-one or group video call sessions for direct learning.
    -   Integration of video conferencing tools for seamless interaction.
7.  **Real-Time Chat**
    
    -   In-platform chat for mentors and learners to communicate.
    -   File-sharing capabilities for sharing resources.
8.  **Learner Points System**
    
    -   Learners earn points based on courses completed and site activity.
    -   Redeem points for prizes or learning opportunities.
9.  **Admin Dashboard**
    
    -   Manage users, courses, payments, and content.
    -   Review user feedback, ratings, and course performance.
### 🔗 API Endpoints:
| Method | Endpoint                  | Description                               |
|--------|---------------------------|-------------------------------------                            |
| GET    | /courses                  | Fetch all courses.                        |
| GET    | /courses/{id}             | Fetch a specific course's details.        |
| POST   | /courses                  | Create a new course (Mentor only).        |
| PUT    | /courses/{id}             | Update a course (Mentor only).            |
| DELETE | /courses/{id}             | Delete a course (Mentor only).            |
| GET    | /videos                   | Fetch all videos.                         |
| GET    | /videos/{id}              | Fetch a specific video’s details.         |
| POST   | /videos                   | Upload a new video (Mentor only).         |
| PUT    | /videos/{id}              | Update a video (Mentor only).             |
| DELETE | /videos/{id}              | Delete a video (Mentor only).             |
| GET    | /videos/paywall/{id}      | Fetch paywalled video content.            |
| POST   | /purchase                 | Purchase a class/course.                  |
| GET    | /purchases/{userId}       | Fetch all purchases for a user.           |
| POST   | /live                     | Create a new live class (Mentor only).    |
| GET    | /live/{id}                | Fetch details of a live class.            |
| POST   | /live/join/{id}           | Join a live class.                        |
| GET    | /calendar                 | Fetch user’s calendar and schedule.       |
| POST   | /calendar                 | Add a new event to the user's calendar.   |
| PUT    | /calendar/{id}            | Update an event in the user’s calendar.   |
| DELETE | /calendar/{id}            | Delete an event from the user’s calendar. |
| POST   | /video-call               | Schedule a video call session.            |
| GET    | /video-call/{id}          | Fetch details of a video call session.    |
| PUT    | /video-call/{id}          | Update a video call session.              |
| DELETE | /video-call/{id}          | Cancel a video call session.              |
| GET    | /points/{userId}          | Fetch user’s points.                      |
| POST   | /redeem                   | Redeem points for prizes.                 |
| GET    | /prizes                   | Fetch available prizes.                   |
| POST   | /chat                     | Send a message in the chat.               |
| GET    | /chat/{roomId}            | Fetch messages in a chat room.            |
| DELETE | /chat/{messageId}         | Delete a chat message.                    |
| POST   | /report                   | Report an abusive comment.                |
| GET    | /profile                  | Fetch user profile details.               |
| GET    | /search                   | Search and filter courses and mentors.    |
| GET    | /top                      | Fetch top-rated courses and mentors.      |
| GET    | /feedback                 | Submit platform feedback.                 |

---

## 📅 Milestones

### Milestone 1: Basic Infrastructure and Some Core Functionality

- Set up the development environment with Docker.
- Create the Laravel backend with user authentication.
- Design the database schema in Microsoft SQL Server.
- Build the React frontend structure.
- Start implementing course and video management (upload, update, and paywall functionality).


### Milestone 2: Core Functionality

-   Complete implementing course and video management (upload, update, and paywall functionality).
-   Develop the live class and broadcasting system.
-   Add real-time chat functionality with file sharing.
-   Build the video call session functionality for mentor-learner interaction.
-   Implement the session scheduler with Google Calendar integration.


### Milestone 3: Final Touches and Deployment

-   Implement the learner points system and prize redemption.
-   Develop the admin dashboard for user, course, and content management.
-   Perform UI/UX refinements based on user testing and feedback.
-   Deploy the project using Docker to a cloud platform (e.g., AWS, Vercel).

---



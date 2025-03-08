

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
- Vite (Build Tool)
#### Rendering Method:
- Client-Side Rendering (CSR)
#### Database:
- MySQL
- phpMyAdmin (Database Management Tool)


---

## 🚧 Installation 

### Prerequisites

- PHP >= 8.0.30
- Composer
- Node.js
- MySQL

<details>
<summary>Backend (Laravel)</summary>

1. Clone the repository:
    ```bash
    git clone https://github.com/Amirul026/SkillBridge.git
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
    -   Role-based access (Mentor, Learner).
2.  **Course and Video Management**
    
    -   Mentors can upload and manage courses and videos.
      
3.  **Live Classes and Broadcasting**
    
    -   Mentors can host live classes.
    -   Learners can join live classes and interact.

4.  **Video Call Sessions**
    
    -   Schedule one-on-one or group video call sessions for direct learning.
    -   Integration of video conferencing tools for seamless interaction.

5.  **Mentor Dashboard**
    
    -   Manage courses, lessons and content.
    
### 🔗 API Endpoints:  

| Method  | Endpoint                                       | Description                                      |
|---------|-----------------------------------------------|--------------------------------------------------|
| GET     | /users                                        | Fetch all users.                                |
| POST    | /register                                    | Register a new user.                           |
| POST    | /login                                       | User login.                                    |
| POST    | /refresh-token                               | Refresh JWT token.                             |
| GET     | /profile                                     | Fetch authenticated user's profile. (Protected) |
| PUT     | /profile/update                              | Update user profile. (Protected)               |
| POST    | /logout                                      | Logout user. (Protected)                       |
| POST    | /courses/create                              | Create a new course. (Mentor only)             |
| PUT     | /courses/{courseId}                          | Update a course. (Mentor only)                 |
| DELETE  | /courses/{courseId}                          | Delete a course. (Mentor only)                 |
| GET     | /courses                                     | Fetch all courses.                             |
| GET     | /mentor/courses                              | Fetch courses by mentor. (Mentor only)         |
| POST    | /lessons/create                              | Create a new lesson. (Mentor only)             |
| PUT     | /lessons/{lessonId}                          | Update a lesson. (Mentor only)                 |
| DELETE  | /lessons/{lessonId}                          | Delete a lesson. (Mentor only)                 |
| GET     | /lessons/course/{courseId}                   | Fetch lessons for a course.                    |
| GET     | /lessons/{lessonId}                          | Fetch a specific lesson.                       |
| POST    | /courses/{courseId}/lessons/{lessonId}/complete  | Mark a lesson as complete. (Protected)         |
| POST    | /courses/{courseId}/lessons/{lessonId}/incomplete | Mark a lesson as incomplete. (Protected)       |
| GET     | /courses/{courseId}/progress                 | Get user progress for a course. (Protected)    |
| POST    | /upload                                      | Upload a file. (Protected)                     |


---

## 📅 Milestones

### Milestone 1: Basic Infrastructure and Some Core Functionality

- Create the Laravel backend with user authentication.
- Design the database schema in MySQL.
- Build the React frontend structure.
- Start implementing profile management


### Milestone 2: Core Functionality

-   Complete implementing profile management (upload, update)
-   Complete implementing course management (upload, update, and paywall functionality).
-   Start implementing mentor dashboard.
-   Start implementing live streaming.
-   Start implementing lesson management (upload, update, delete).


### Milestone 3: Final Touches and Deployment

-   Complete Implementing live streaming via Jitsi.
-   Complete Implementing lesson management (upload, update, delete).
-   Complete implementing mentor dashboard (create course , create lesson , mentor specific courses)
-   Perform UI/UX refinements based on user testing and feedback.

---



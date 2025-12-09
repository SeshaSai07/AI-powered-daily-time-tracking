🌟 AI-Powered Daily Time Tracking & Analytics Dashboard

A modern, responsive time-tracking web application that lets users log daily activities (in minutes), visualize how they spend their 24 hours, and generate a per-day analytics dashboard using charts.
Built using HTML, CSS, JavaScript, Firebase Authentication, Firestore, TailwindCSS, and Chart.js, with AI-assisted UI/UX enhancements.

🚀 Live Demo

🔗 Deployed Link
 (Add your GitHub Pages link here)
https://seshasai07.github.io/AI-powered-daily-time-tracking/

📌 Project Overview

This web application helps users track how they use their day by logging activities in minutes. Once they complete logging up to 1440 minutes (24 hours), the system enables an Analyse button that opens a dashboard showing:

Pie chart of category-wise time distribution

Bar chart of activities

Summary of total hours, categories used, and activity count

A beautiful “No data available” screen if the selected date has no records

Users must sign in using Firebase Authentication to access activity logging and analysis features.

🎯 Features
🔐 User Authentication

Firebase Authentication (Email/Password + Google Sign-in)

Protected routes:

activities.html and dashboard.html accessible only if logged in

Auto-redirect for unauthorized access

User profile stored in Firestore (users/{uid})

📝 Activity Logging

Add activities with:

Activity Name

Category

Duration (minutes)

Total minutes are validated (must not exceed 1440 minutes per day)

Shows remaining minutes for each day

Users can delete activities

Real-time stats:

Total minutes

Number of activities

📊 Analytics Dashboard

Date-based dashboard

If data exists:

Pie chart (category-wise usage)

Horizontal bar chart (activity durations)

Summary card with:

Total hours spent

Category breakdown

Number of activities

If no data exists:

Beautiful illustration + message

“Start logging your day now” button

💎 UI/UX

Fully responsive layout (mobile, tablet, desktop)

TailwindCSS-based styling

Smooth gradients, clean cards, modern typography

Neat, organized layout with consistent design

Optimized for clarity and user experience

🤖 AI Usage in Development

AI tools were used to:

Generate UI component ideas

Suggest clean layout structures

Assist in writing modular JavaScript code

Generate README, documentation, and polish UI/UX content

Debug authentication issues

Structure Firebase rules and project workflow

🧩 Tech Stack
Frontend

HTML5

CSS3 / TailwindCSS

JavaScript (ES6 Modules)

Chart.js (Pie + Bar graphs)

Backend & Services

Firebase Authentication

Firebase Firestore

Hosting

GitHub Pages

🗂 Project Structure
ai-time-tracker/
│
├── index.html             # Login / Signup page
├── activities.html        # Activity logging page
├── dashboard.html         # Analytics dashboard
│
├── css/
│   └── styles.css         # Additional styles (helpers)
│
├── js/
│   ├── firebase-config.js # Firebase project config
│   ├── auth.js            # Login, signup, auth guards
│   ├── db.js              # Firestore CRUD operations
│   └── ui.js              # UI rendering and chart creation
│
├── assets/
│   └── no-data.svg        # Illustration for empty dashboard
│
└── README.md

🔧 How to Run Locally
1️⃣ Clone the repository

git clone https://github.com/SeshaSai07/AI-powered-daily-time-tracking.git
cd AI-powered-daily-time-tracking

2️⃣ Start a local server

Use Live Server or run:

npx serve

3️⃣ Setup Firebase

Go to Firebase Console

Create a Web App

Enable Authentication → Email/Password + Google

Add Authorized domains:

localhost

127.0.0.1

Enable Firestore

Copy the Firebase config into:

js/firebase-config.js

4️⃣ Open the app
http://localhost:3000
http://127.0.0.1:5500


(or whichever Live Server port)

🔐 Firestore Structure
users/
  └── {uid}/
        └── days/
              └── YYYY-MM-DD/
                    └── activities/
                          └── {activityId}

🔒 Firebase Security Rules (Recommended)

Add this under Cloud Firestore → Rules:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == uid;
    }
  }
}

🚀 Deployment (GitHub Pages)

Push your project to GitHub

Go to Settings → Pages

Select:

Branch: main

Folder: /root

Save

GitHub will generate a public URL for your website

📌 Future Enhancements

Edit activity feature

Weekly/monthly analytics

Export reports (PDF/CSV)

Add dark mode

Add user profile page

Add animations for charts and UI transitions

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to modify.

📜 License

Maddineni Lakshmi Sesha Sai

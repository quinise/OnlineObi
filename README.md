# Online Obi

## 🛠️ Built With  

<p align="center">
  <img src="https://img.shields.io/badge/react-18-61dafb?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/tailwindcss-3.3-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/firebase-10-ffca28?logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/framer--motion-10.16-0055ff?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/vite-4.4-646cff?logo=vite&logoColor=yellow" alt="Vite" />
  <img src="https://img.shields.io/badge/typescript-5.0-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

A modern React application that simulates a casting experience directly in the browser. Each randomized cast produces:

- A symbolic identifier and interpretation
- A yes/no/maybe outcome
- A set of four virtual tokens with smooth animations

Users can log in, save their casts, edit details, and revisit past results. Originally prototyped in Swift with Core Data, the project was reimagined in React, TailwindCSS, and Firebase to demonstrate responsive design, real-time data handling, and full-stack deployment.

🔗 **Live Demo**: [obi-project-397801.web.app](https://obi-project-397801.web.app)

## 🎯 Project Goals

I set out on this coding endeavor to learn how to use **ReactJS, Vite, Figma, OAuth, and TailwindCSS**.
   
---
## ✨ Features  

<p align="center">
  <img src="https://img.shields.io/badge/Authentication-Firebase-orange?style=flat-square&logo=firebase&logoColor=white" alt="Authentication" />
  <img src="https://img.shields.io/badge/Animations-FramerMotion-purple?style=flat-square&logo=framer&logoColor=white" alt="Animations" />
  <img src="https://img.shields.io/badge/Responsive-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Responsive Design" />
  <img src="https://img.shields.io/badge/History-Save%2C%20Edit%2C%20Delete-blue?style=flat-square&logo=react&logoColor=white" alt="History Management" />
  <img src="https://img.shields.io/badge/Deployment-FirebaseHosting-yellow?style=flat-square&logo=firebase&logoColor=black" alt="Deployment" />
</p>

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)  
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)  
- A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)

## 📦 Dependencies

```json
"firebase": "^10.4.0",         
"framer-motion": "^10.16.4",     
"react": "^18.2.0",              
"tailwindcss": "^3.3.3",         
"typescript": "^5.0.2",         
"vite": "^4.4.5"             
```

## 🚀 Getting Started
### 1. Clone the repo
```bash
git clone https://github.com/quinise/OnlineObi.git
cd OnlineObi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase configuration

Create a `firebase.config.tsx` file in the root of your project and add your Firebase project keys from the Firebase Console.

Example:
```ts
// firebase.config.tsx
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
### 4. Run locally
```bash
npm run dev
```

### 5. Navigate to http://localhost:5173

### 6. Build and deploy
```bash
npm run build
firebase deploy
```

---

## 🖼️ Screenshots & Demo

<p align="center">
  <img src="src/assets/homepage.png" alt="Homepage with Generate Result button" width="700"/><br/>
  <em>Homepage – Generate Result button with animations</em>
</p>

<p align="center">
  <img src="src/assets/history.png" alt="History page with saved casts" width="700"/><br/>
  <em>History – Saved casts with edit & delete options</em>
</p>

<p align="center">
  <img src="src/assets/details.png" alt="Details view of a saved cast" width="700"/><br/>
  <em>Details – Expanded view of a single cast</em>
</p>

<p align="center">
  <img src="src/assets/cast.gif" alt="Animation of generating a cast" width="700"/><br/>
  <em>Demo – Short animation of generating a cast</em>
</p>

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  

---
## 📄 License

This project is licensed under the MIT License.

# Online Obi

## Built With

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/react-18-61dafb?logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/tailwindcss-3.3-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/firebase-10-ffca28?logo=firebase&logoColor=black" alt="Firebase" />
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/framer--motion-10.16-0055ff?logo=framer&logoColor=white" alt="Framer Motion" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/vite-4.4-646cff?logo=vite&logoColor=yellow" alt="Vite" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.0-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>
</p>

A modern React application that simulates a casting experience directly in the browser. Each randomized cast produces:

- A symbolic identifier and interpretation
- A yes/no/maybe outcome
- A set of four virtual tokens with smooth animations

Users can log in, save their casts, edit details, and revisit past results. Originally prototyped in Swift with Core Data, the project was reimagined in React, TailwindCSS, and Firebase to demonstrate responsive design, real-time data handling, and full-stack deployment.

🔗 **Live Demo**: [obi-project-397801.web.app](https://obi-project-397801.web.app)

## Project Goals

I set out on this coding endeavor to learn how to use **ReactJS, Vite, Figma, OAuth, and TailwindCSS**.

---

## Features

<p align="center">
  <a href="https://firebase.google.com/docs/auth">
    <img src="https://img.shields.io/badge/Authentication-Firebase-orange?style=flat-square&logo=firebase&logoColor=white" alt="Authentication" />
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/Animations-FramerMotion-purple?style=flat-square&logo=framer&logoColor=white" alt="Animations" />
  </a>
  <a href="https://tailwindcss.com/docs/responsive-design">
    <img src="https://img.shields.io/badge/Responsive-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Responsive Design" />
  </a>
  <a href="https://react.dev/learn/state-a-components-memory#preserving-and-resetting-state">
    <img src="https://img.shields.io/badge/History-Save%2C%20Edit%2C%20Delete-blue?style=flat-square&logo=react&logoColor=white" alt="History Management" />
  </a>
  <a href="https://firebase.google.com/docs/hosting">
    <img src="https://img.shields.io/badge/Deployment-FirebaseHosting-yellow?style=flat-square&logo=firebase&logoColor=black" alt="Deployment" />
  </a>
</p>

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)

## Dependencies

```json
"firebase": "^12.6.0",
"framer-motion": "^10.16.4",
"react": "^19.2.1",
"react-dom": "^18.2.0",
"react-firebase-hooks": "^5.1.1",
"react-icons": "^4.11.0",
"uid": "^2.0.2",
"tailwindcss": "^3.3.3",
"typescript": "^5.0.2",
"vite": "^7.2.4"
```

## Dev & Tooling

- Node.js: `20.19.5`
- npm: `11.6.2`

- Firebase CLI: `firebase-tools` (used for deployment) — install with `npm i -g firebase-tools`
- Linting: ESLint with the provided workspace config (`npm run lint`)

### Useful scripts

```bash
npm run dev      # start Vite dev server
npm run build    # build for production
npm run preview  # preview production build
npm run lint     # run ESLint checks
```

## Getting Started

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
  appId: "YOUR_APP_ID",
};
```

### 4. Run locally

```bash
npm run dev
```

3. Navigate to http://localhost:5173

## Recommended VS Code extensions

- `Tailwind CSS IntelliSense` (`bradlc.vscode-tailwindcss`) — provides autocomplete, linting, and class inspections for Tailwind projects. The workspace recommends this extension in `.vscode/extensions.json`.
- Workspace CSS setting: this project adds a workspace setting to suppress "Unknown at rule" diagnostics for PostCSS/Tailwind directives (`.vscode/settings.json`). Install the Tailwind extension for full IntelliSense and then you can remove or keep the setting as desired.

### 5. Navigate to http://localhost:5173

### 6. Build and deploy

```bash
npm run build
firebase deploy
```

---

## Screenshots & Demo

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

## Contributing

Issues, and feature requests are welcome!

---

## License

This project is licensed under the MIT License.

# 🚀 FormLyne – Forms for Linear Issues

**FormLyne** is a powerful form-builder web application integrated with the [Linear](https://linear.app) issue tracking system. It enables users to seamlessly create and submit form responses that generate issues directly in Linear.

Users can log in with **Google authentication** and securely connect to their Linear workspace using **OAuth 2.0**, enabling real-time form handling, static or dynamic (custom) form creation, and effortless issue submission — all wrapped in a polished, responsive UI with dark/light theming support.

## 🧩 Tech Stack

| **Layer**        | **Technology**                                      |
|------------------|------------------------------------------------------|
| **Frontend**     | React.js (TypeScript), Tailwind CSS                  |
| **Backend**      | Firebase Firestore                                   |
| **Authentication** | Google (Firebase Auth), Linear OAuth 2.0         |
| **Dev Tools**    | Storybook, Cypress                                   |
| **Integration**  | Linear API, BlockNote Text Editor                    |
| **Hosting**      | Firebase Hosting                                     |

## ✨ Features

✅ **Google & Linear Authentication** – Seamlessly log in with Firebase & connect to your Linear workspace  
✅ **Static & Dynamic Forms** – Pick from pre-built templates or build your own custom forms  
✅ **Rich Text Editing** – Integrated [BlockNote](https://blocknotejs.org/) WYSIWYG editor for form descriptions  
✅ **Media File Support** – Upload images, PDFs, and other media (max size: 10MB per file)  
✅ **Dynamic Form Builder** – Drag-and-drop fields from categories like text, number, dropdown, etc.  
✅ **Sharable Form URLs** – Generate and share links for form access with or without login  
✅ **Responsive Design** – Optimized for both web and mobile platforms  
✅ **Dark/Light Theme Toggle** – Accessible theme switching across the app  
✅ **Reusable UI Components** – Modular design system with custom hooks and atomic structure  
✅ **Robust Error Handling** – Comprehensive error messaging and event tracking  
✅ **Storybook Integration** – Live preview of components for isolated UI development  
✅ **E2E Testing with Cypress** – Ensure reliability through automated integration tests  

## 📦 Installation & Setup
> ```bash
> git clone https://github.com/your-org/formlyne.git
> cd formlyne
> npm install
> npm run dev
> ```

## 🔗 Integrations

- 🔗 [Linear API](https://developers.linear.app/docs/graphql/get-started)
- ✍️ [BlockNote Editor](https://blocknotejs.org/)
- ☁️ Firebase Firestore + Firebase Hosting

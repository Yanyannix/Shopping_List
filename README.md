## MyCart – React Native Shopping List App (with Firebase Authentication + Firestore)

MyCart is a minimalist shopping list mobile application built using React Native (Expo) and Firebase.
It includes user authentication, per-account item storage, dark mode, edit/delete features, and a clean UI.

---

## ✨ Features
## 🔐 Firebase Authentication

Login & Signup with email + password

Auto-detect logged-in user

Secure logout

---

## 🗂 Firestore Database

Each user has their own unique shopping list

Add items with quantity

Toggle items as checked/unchecked

Edit items

Delete individual items with confirmation

Delete all items with confirmation

---

## 🎨 UI & Functionality

Modern minimalist design

Smooth animations and modals

Dark Mode toggle

Real-time updates

Item counter

Responsive layout

---

## 📸 App Overview

Login / Signup screens with custom logo

Home screen showing the user’s personal shopping list

Input bar for adding items

Edit modal to update items

Header with:

Logout button

Dark mode toggle

Item count

Delete All button

---

## 🛠 Technologies Used
| Tech                        | Purpose                            |
| --------------------------- | ---------------------------------- |
| **React Native (Expo)**     | Frontend mobile UI                 |
| **Firebase Authentication** | User login/signup                  |
| **Firestore Database**      | Store user-specific shopping items |
| **Vector Icons (Expo)**     | Icons                              |
| **React Hooks**             | State management                   |

---

## 📂 Project Structure
MyCart/
│── App.js
│── firebase/
│   └── index.js
│── components/
│   ├── Login.js
│   ├── Signup.js
│   └── ShoppingItems.js
│── assets/
│   └── MyCart.png
└── README.md

---

## 🔥 How Firestore Stores User Data
Data is stored separately per user using this structure:
shopping/
   └── USER_UID/
        └── items/
             ├── item1
             ├── item2
             └── item3
This ensures each account sees only their own items.

---

## 🚀 Key Files

App.js

Handles login state
Loads user-specific Firestore items
Add / Edit / Delete logic
Dark mode UI
Delete All confirmation dialog


ShoppingItems.js

Item rendering
Toggle check
Edit button
Delete button

Login.js & Signup.js

Authentication UI
Uses Firebase Auth to create/login users

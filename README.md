ShoppingList

# 🛒 Shopping List App (React Native + Firebase)

A simple yet polished **shopping list mobile app** built with **React Native (Expo)** and **Firebase Firestore**.  
It lets you quickly add items with quantities, mark them as done, edit or delete them, and even toggle between **Light** and **Dark Mode** — all synced in real time via Firestore.

---

## 📌 Project Description

The **Shopping List App** helps users organize and track items they need to buy.  
Each item includes:

- A **title** (item name)
- A **quantity**
- A **check status** (done/not done)

All data is stored in **Cloud Firestore**, so items persist even when the app is closed.  
The layout is clean and minimal, with a floating input bar and a modal for editing items.  

Key UI highlights:

- **Dark Mode toggle** (sun/moon icon)
- **Item counter** in the header
- **Delete All** button to clear the list
- Smooth item cards with icons for **check**, **edit**, and **delete**

---

## ✨ Features

- ✅ **Add items** with title and quantity  
- ✏️ **Edit items** using a modal popup  
- ✔️ **Mark items as completed** (check/uncheck)  
- 🗑️ **Delete individual items**  
- 💣 **Delete all items at once**  
- 🌙 **Dark Mode / Light Mode** toggle  
- 🔢 **Real-time item count** displayed on the header  
- ☁️ **Cloud Firestore integration** for persistent storage  
- 📱 Responsive layout compatible with Android and iOS (Expo)

---


 ##  📱 How It Works (Usage Flow)

Add an item

Type an item name in the Item... field.

Optionally set the Qty (defaults to 1 if empty).

Press the + button or submit via keyboard.

Mark as done

Tap the check icon on the left of an item.

Checked items show with a line-through style.

Edit an item

Press the edit (pencil) icon.

A modal appears where you can update the title and quantity.

Press Save to confirm.

Delete an item

Tap the trash icon on the right of an item.

Delete all items

Tap the trash icon in the header to clear the entire list.

Toggle Dark Mode

Tap the sun/moon icon in the header.

The whole app switches between light and dark themes.


---


## 🧠 Main Logic Overview

App.js

Manages global state:

shoppingList, title, quantity

darkMode, editModal, editTitle, editQuantity, editId

Fetches items from Firestore with getShoppingList()

Adds, updates, deletes, and toggles items using Firestore SDK (addDoc, updateDoc, deleteDoc, getDocs)

ShoppingItems.js

Displays each item card

Renders icons for:

Check/Uncheck

Edit

Delete

Applies styles based on darkMode and isChecked

firebase/index.js

Initializes Firebase using initializeApp

Exports db and Firestore helper functions

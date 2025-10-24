# Part A: Calculator Web Application with User Login

## 1. Description

This is a two-page web application featuring a user login screen (`login.html`) and a basic arithmetic calculator (`calculator.html`). The application demonstrates strong **jQuery form validation**, session management, and the use of modern JavaScript **arrow functions** for core logic.

---

## 2. Implemented Features

- **User Authentication**: Validates credentials against a set of hardcoded users.
- **Real-time Validation (jQuery)**: Validation runs on `keyup` and `blur` events, displaying specific errors below fields.
  - Email must be valid and end with `@northeastern.edu`.
  - Password must be a minimum of 8 characters.
- **Login Control**: The Login button remains disabled until both fields pass validation.
- **Session Management**: Stores session data in `sessionStorage` (or `localStorage` if "Remember Me" is checked).
- **Calculator Auth Check**: Automatically redirects to `login.html` if no active session is found.
- **Single Arrow Function**: A single arrow function named `calculate` handles all four arithmetic operations (+, -, ×, ÷), including division by zero edge case handling.
- **Logout**: Clears the session from storage and uses a jQuery `fadeOut` animation before redirecting.
- **Professional Styling**: Implements a clean, responsive layout using Flexbox and CSS Grid.

---

## 3. Technologies Used

- **HTML5**
- **CSS3** (Responsive design, Flexbox, CSS Grid)
- **JavaScript ES6+** (Arrow Functions)
- **jQuery** (Form validation, DOM manipulation, Animations)

---

## 4. How to Run

1.  Navigate to the `PartA_Calculator/` directory.
2.  Open the `login.html` file in your web browser.
3.  Use the hardcoded credentials (`student1@northeastern.edu` / `password123`) to log in and access the calculator.

# Part B: Event Stopwatch with Session Logging

## 1. Description

This is a single-page stopwatch application designed to time events, associate them with a specific date, and maintain a persistent history of sessions. The core logic utilizes **Modern JavaScript** asynchronous features and browser storage.

---

## 2. Implemented Features

- **Stopwatch Controls**: Includes Start, Pause/Resume, Stop & Save, and Reset functionality.
- **Modern JS Logic**: Stopwatch timing is managed using **`setInterval`** and **`clearInterval`**, with the start sequence wrapped in an **`async/await`** function demonstrating **Promises**.
- **Required Fields**: Timer only starts if both **Date** and **Event Name** fields are valid and non-empty.
- **Event Name Validation (jQuery)**: Enforces required length (min 3, max 100 characters) and only allows specific characters (letters, numbers, spaces, hyphens, apostrophes).
- **Persistence**: Sessions are saved to **`localStorage`** upon "Stop & Save".
- **Session History**: Displays all saved sessions in **most-recent-first** order.
- **Statistics**: Shows the total count of sessions and the total accumulated time.
- **Filtering**: Includes a date input to filter the session history.
- **Professional Styling**: Features a large, prominent timer display, color-coded buttons, and a responsive layout.

---

## 3. Technologies Used

- **HTML5** (Date input)
- **CSS3** (Responsive design, Color-coded buttons)
- **JavaScript ES6+** (Async, Await, Promises, setInterval/clearInterval)
- **jQuery** (All form validation and UI updates)

---

## 4. How to Run

1.  Navigate to the `PartB_Stopwatch/` directory.
2.  Open the `index.html` file in your web browser.
3.  Enter a Date and Event Name, then click "Start" to begin timing.

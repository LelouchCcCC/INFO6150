# 📝 Feedback Form with AI Assistant

This is my **INFO6150 Assignment 4** project.  
It implements an interactive feedback form with **real-time validation** and a built-in **AI Assistant** chat window.

---

## ✅ Required Elements Implemented

- **Form Validation**:
  - Real-time validation for all required fields
  - Error messages are **pre-written in HTML** and toggled via JavaScript
  - Disabled “Submit” button until all validations pass
- **Title (Radio buttons)**: Miss / Mr. / Mrs. — required
- **First & Last Name**: min 2, max 30 chars, no special characters
- **Email**: must be a valid `@northeastern.edu` email
- **Phone Number**: masked input `(XXX) XXX-XXXX`
- **Zip Code**: exactly 5 digits
- **“How did you hear”**: checkbox group — at least one required
- **Drinks Dropdown**: required, dynamically displays an extra checkbox when a drink is selected
- **Comments Textarea**: required
- **Street Address 2**: optional, includes a live character counter

- **Results Table**:
  - Submitting the form appends the data as a new row in a results table displayed below the form.

---

## 🤖 AI Assistant Feature

- **AI Assistant Button**

  - Located at the **top-right corner** of the page
  - Clicking it opens a **fixed chat window** in the bottom-right

- **Chat Window**

  - Displays conversation history
  - Includes:
    - Message display area
    - Text input box
    - Send button (or press Enter)

- **Predefined FAQs**

  - Email format requirement
  - Phone number format
  - Zip code requirement
  - Required fields explanation
  - Optional address info

- If the question doesn’t match FAQs, the bot responds with a fallback message.

---

## 🎨 Styling

- All styling is in **`style.css`** (external CSS only)
- Clean and modern light theme
- `.error-msg` spans are **hidden by default** and toggled by JS validation
- AI Assistant uses simple box shadow, rounded corners, and fixed positioning

# 📦 Assignment 7: GlobalLogistics Website (CSS Grid, Flexbox, and SASS/SCSS)

This project is a two-page website designed for a logistics company, demonstrating the mastery of modern web layout techniques and advanced SASS/SCSS features as required by Assignment 7.

## 1. Project Requirements Fulfilled

The website successfully implements all required layout and SASS/SCSS features across `index.html` (Home) and `page2.html` (Services).

### A. Layout Implementation

| Requirement | Implementation Details |
| :--- | :--- |
| **CSS Grid** | **Four distinct Grid layouts** are used: a 2-column main section, a 3-column card section, a 3fr/1fr main-sidebar layout, and a 4-column feature row. |
| **Flexbox** | **Three Flexbox layouts** are used: the navigation bar (`#main-nav`), the header/footer block alignment (`.flex-group`), and internal component centering (via the `flex-center` mixin). |

### B. SASS/SCSS Features Explanation

The project uses a modular SASS structure (partials in the `scss/` folder) to ensure maintainability and scalability.

| SASS/SCSS Feature | Usage in Code | Purpose |
| :--- | :--- | :--- |
| **Variables** | Defined in `_config.scss` (`$primary-color`, `$spacer`, etc.). | Centralized control over colors, fonts, and spacing. |
| **Custom Properties** | Defined in `_config.scss`'s `:root` selector (`--border-color`). | Integrates CSS variables using SASS variables as values, allowing for runtime styling changes. |
| **Mixins** | Defined `flex-center` and `mobile` in `_config.scss`. | Reusable code blocks for aligning content and handling media queries (`@include mobile`). |
| **Functions** | Defined `calculate-padding($multiplier)` in `_config.scss`. | Dynamic calculation of spacing values based on the base `$spacer`. |
| **Interpolation** | Used in `_buttons.scss` with an `@each` loop (`.btn-#{$key}`). | Dynamically generates button classes (`.btn-primary`, `.btn-secondary`) from a color map. |
| **Placeholder Selectors**| Defined `%message-box` in `_utilities.scss`. | Defines reusable, uncompiled styles which are then extended by utility classes (`.alert-success`, `.alert-error`) using **`@extend`**. |
| **Nesting** | Used extensively in `style.scss` and `_buttons.scss`. | Organizes CSS rules hierarchically (e.g., `#main-nav ul li a:hover`). |
| **Additional Features**| `@each`, `@extend`, `@import`. | Enhances code generation, inheritance, and modular file organization. |

---

## 2. Setup and Running Instructions

To set up and run this project locally, you will need a SASS compiler to generate the necessary CSS file.

### Prerequisites

* A code editor (like VS Code).
* A SASS compiler/extension (e.g., Live Sass Compiler for VS Code).

### Steps


1.  **Ensure File Structure:**
    Verify the folder structure is correct:
    ```
    Project-Folder/
    ├── css/
    │   └── style.css (Generated)
    ├── scss/
    │   ├── _config.scss
    │   ├── _utilities.scss
    │   ├── ... (other partials)
    │   └── style.scss (Main file)
    ├── images/
    │   └── ...
    ├── index.html
    └── page2.html
    ```

2.  **Compile SASS:**
    * Open the project in your code editor.
    * Start your SASS compiler, ensuring it is watching the main file `scss/style.scss`.
    * The compiler should output the final stylesheet to `css/style.css`.

3.  **View the Website:**
    * Open `index.html` or `page2.html` in your web browser.
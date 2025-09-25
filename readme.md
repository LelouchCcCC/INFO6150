# Dynamic Data Management Web Application

This is my INFO6150 **Assignment 3** submission.

---
## 🔹 Features & Requirements Implemented

1. **Table Structure**  
   - Implemented using `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.  
   - Includes columns for:
     - Select/Expand  
     - Student  
     - Advisor  
     - Award Status  
     - Semester  
     - Type  
     - Budget #  
     - Percentage  
     - Delete  
     - Edit  

2. **Add New Student**  
   - A button dynamically adds new student records with dummy values.  
   - Student numbering is always sequential (e.g., if Student 3 is deleted, the next added student will be Student 3 again).  
   - On successful addition, a pop-up confirms:  
     *“Student X Record added successfully”*.  

3. **Checkbox Behavior**  
   - Selecting a row highlights it in yellow.  
   - Submit button becomes orange and enabled.  
   - Dynamically adds **Delete** and **Edit** buttons for that row.  
   - Deselecting removes highlight, hides buttons, and disables submit if no rows are selected.

4. **Delete Functionality**  
   - Clicking Delete removes the row (and its detail row if expanded).  
   - Confirmation message shows:  
     *“Student X Record deleted successfully”*.  

5. **Edit Functionality**  
   - Clicking Edit opens a modal pop-up with:  
     - Title (e.g., *“Edit details of Student 2”*)  
     - Textarea input for user input  
     - OK / Cancel buttons  
   - On OK with input, confirmation message shows:  
     *“Student X data updated successfully”*.  
   - **Note:** As per assignment instructions, the row data itself is not updated.  

6. **Expand/Collapse Rows**  
   - Each row has a green arrow icon.  
   - Clicking expands/collapses a detail row with dummy information.  
   - Default detail includes Award Details, Semester, Comments, and Award Status.  

7. **Initial State Requirements**  
   - On page load:
     - Submit button is **disabled and grayed out**.  
     - Table rows are collapsed (no details expanded).  

8. **Styling & Responsiveness**  
   - Used external `style.css` file.  
   - Highlight colors, disabled/enabled button states, and detail row styling are implemented.  

9.  **Incremental Commits**  
   - Assignment code was built and committed in small, incremental steps:
     - Table skeleton  
     - Add student function  
     - Checkbox + Submit button logic  
     - Delete button  
     - Edit modal pop-up  
     - Expand/collapse rows  
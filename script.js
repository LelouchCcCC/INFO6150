let studentCount = 0;
const tableBody = document.querySelector("#studentTable tbody");
const addBtn = document.getElementById("addStudentBtn");
const submitBtn = document.getElementById("submitBtn");

// Add New Student
addBtn.addEventListener("click", () => {
  studentCount++;
  const row = document.createElement("tr");

  // Expand Arrow
  const expandCell = document.createElement("td");
  expandCell.innerHTML = "&#9654;"; // ▶
  expandCell.classList.add("arrow");
  expandCell.addEventListener("click", () => {
    row.classList.toggle("expanded");
    expandCell.innerHTML = row.classList.contains("expanded") ? "&#9660;" : "&#9654;"; // ▼ / ▶
  });

  // Student / Teacher
  const studentCell = document.createElement("td");
  studentCell.textContent = `Student ${studentCount}`;

  const teacherCell = document.createElement("td");
  teacherCell.textContent = `Teacher ${studentCount}`;

  // Checkbox
  const selectCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  selectCell.appendChild(checkbox);

  // Delete / Edit
  const deleteCell = document.createElement("td");
  const editCell = document.createElement("td");

  // Checkbox Behavior
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      row.classList.add("highlight");
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
      submitBtn.classList.add("enabled");

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        alert(`${studentCell.textContent} Record deleted successfully`);
        row.remove();
        checkSubmitStatus();
        reorderStudents();
      });
      deleteCell.innerHTML = "";
      deleteCell.appendChild(delBtn);

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        const newVal = prompt(`Edit details of ${studentCell.textContent}`, "");
        if (newVal && newVal.trim() !== "") {
          alert(`${studentCell.textContent} data updated successfully`);
        }
      });
      editCell.innerHTML = "";
      editCell.appendChild(editBtn);

    } else {
      row.classList.remove("highlight");
      deleteCell.innerHTML = "";
      editCell.innerHTML = "";
      checkSubmitStatus();
    }
  });

  row.appendChild(expandCell);
  row.appendChild(studentCell);
  row.appendChild(teacherCell);
  row.appendChild(selectCell);
  row.appendChild(deleteCell);
  row.appendChild(editCell);

  tableBody.appendChild(row);

  alert(`${studentCell.textContent} Record added successfully`);
});

// Helper: check submit button status
function checkSubmitStatus() {
  const anyChecked = tableBody.querySelector("input[type=checkbox]:checked");
  if (!anyChecked) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("enabled");
    submitBtn.classList.add("disabled");
  }
}

// Helper: reorder student numbers after delete
function reorderStudents() {
  studentCount = 0;
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    studentCount = index + 1;
    row.cells[1].textContent = `Student ${studentCount}`;
    row.cells[2].textContent = `Teacher ${studentCount}`;
  });
}

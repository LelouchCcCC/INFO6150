let studentCount = 0;
const tableBody = document.querySelector("#studentTable tbody");
const addBtn = document.getElementById("addStudentBtn");
const submitBtn = document.getElementById("submitBtn");

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const editText = document.getElementById("editText");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");

let currentEditingStudent = null;

// Add New Student
addBtn.addEventListener("click", () => {
  studentCount++;
  const row = document.createElement("tr");

  // ✅ Select + Expand cell
  const controlCell = document.createElement("td");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  controlCell.appendChild(checkbox);

  // Expand arrow
  const arrowImg = document.createElement("img");
  arrowImg.src = "down-arrow.svg"; // 绿色箭头图标
  arrowImg.classList.add("arrow");
  arrowImg.style.marginLeft = "8px";
  controlCell.appendChild(arrowImg);

  // Student / Advisor / Award / Semester / Type / Budget / %
  const studentCell = document.createElement("td");
  studentCell.textContent = `Student ${studentCount}`;

  const advisorCell = document.createElement("td");
  advisorCell.textContent = `Teacher ${studentCount}`;

  const awardCell = document.createElement("td");
  awardCell.textContent = "Approved";

  const semesterCell = document.createElement("td");
  semesterCell.textContent = "Fall";

  const typeCell = document.createElement("td");
  typeCell.textContent = "TA";

  const budgetCell = document.createElement("td");
  budgetCell.textContent = `${10000 + studentCount * 1111}`;

  const percentCell = document.createElement("td");
  percentCell.textContent = "100%";

  // Delete / Edit
  const deleteCell = document.createElement("td");
  const editCell = document.createElement("td");

  // ✅ detailRow (默认写死一些占位信息)
  const detailRow = document.createElement("tr");
  const detailCell = document.createElement("td");
  detailCell.colSpan = 10; // 表头有 10 列
  detailCell.innerHTML = `
    <strong>${studentCell.textContent} Details:</strong><br>
    Award Details: Honors Student<br>
    Semester: Fall 1-2024<br>
    Type: TA<br>
    Comments: Outstanding<br>
    Award Status: A
  `;
  detailRow.appendChild(detailCell);
  detailRow.classList.add("details"); // 初始隐藏

  // Expand toggle
  arrowImg.addEventListener("click", () => {
    detailRow.style.display =
      detailRow.style.display === "table-row" ? "none" : "table-row";
  });

  // Checkbox behavior
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

        // 删除 detailRow
        detailRow.remove();
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
        currentEditingStudent = studentCell;
        modalTitle.textContent = `Edit details of ${studentCell.textContent}`;
        editText.value = "";
        modal.style.display = "flex";
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

  // Append to row
  row.appendChild(controlCell);
  row.appendChild(studentCell);
  row.appendChild(advisorCell);
  row.appendChild(awardCell);
  row.appendChild(semesterCell);
  row.appendChild(typeCell);
  row.appendChild(budgetCell);
  row.appendChild(percentCell);
  row.appendChild(deleteCell);
  row.appendChild(editCell);

  tableBody.appendChild(row);
  tableBody.appendChild(detailRow);

  alert(`${studentCell.textContent} Record added successfully`);
});

// Modal buttons
okBtn.addEventListener("click", () => {
  if (editText.value.trim() !== "") {
    alert(
      `${currentEditingStudent.textContent} data updated successfully`
    );
  }
  modal.style.display = "none";
});
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
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
  const rows = tableBody.querySelectorAll("tr:not(.details)");
  rows.forEach((row, index) => {
    studentCount = index + 1;
    row.cells[1].textContent = `Student ${studentCount}`;
    row.cells[2].textContent = `Teacher ${studentCount}`;
  });
}

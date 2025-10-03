document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  const submitBtn = form.querySelector('input[type="submit"]');

  const inputs = {
    title: document.querySelectorAll('input[name="title"]'),
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("emailId"),
    phone: document.getElementById("phoneNumber"),
    zip: document.getElementById("zipcode"),
    addr2: document.getElementById("address2"),
    drink: document.getElementById("drink"),
    comments: document.getElementById("comments"),
  };

  function showError(inputElement, message) {
    let error = inputElement.nextElementSibling;
    if (!error || !error.classList.contains("error-msg")) {
      error = document.createElement("span");
      error.classList.add("error-msg");
      inputElement.insertAdjacentElement("afterend", error);
    }
    error.textContent = message;
  }

  function clearError(inputElement) {
    const error = inputElement.nextElementSibling;
    if (error && error.classList.contains("error-msg")) {
      error.textContent = "";
    }
  }

  function validateTitle() {
    const checked = Array.from(inputs.title).some((radio) => radio.checked);
    const firstRadio = inputs.title[0];
    if (!checked) {
      showError(firstRadio, "Please select a title");
      return false;
    }
    clearError(firstRadio);
    return true;
  }

  function validateName(input) {
    const val = input.value.trim();
    if (!val) {
      showError(input, "Required");
      return false;
    }
    if (val.length < 2) {
      showError(input, "Min length 2");
      return false;
    }
    if (val.length > 30) {
      showError(input, "Max length 30");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(val)) {
      showError(input, "No special chars");
      return false;
    }
    clearError(input);
    return true;
  }

  function validateEmail() {
    const val = inputs.email.value.trim();
    if (!val) {
      showError(inputs.email, "Required");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(val)) {
      showError(inputs.email, "Must be @northeastern.edu");
      return false;
    }
    clearError(inputs.email);
    return true;
  }

  function validatePhone() {
    const val = inputs.phone.value.trim();
    if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(val)) {
      showError(inputs.phone, "Format: (XXX) XXX-XXXX");
      return false;
    }
    clearError(inputs.phone);
    return true;
  }

  function validateZip() {
    const val = inputs.zip.value.trim();
    if (!/^\d{5}$/.test(val)) {
      showError(inputs.zip, "5 digits");
      return false;
    }
    clearError(inputs.zip);
    return true;
  }

  function validateComments() {
    const val = inputs.comments.value.trim();
    if (!val) {
      showError(inputs.comments, "Required");
      return false;
    }
    clearError(inputs.comments);
    return true;
  }

  function validateSource() {
    const sources = document.querySelectorAll('input[name="source"]');
    const checked = Array.from(sources).some((s) => s.checked);
    const container = document.getElementById("source-group");
    let error = container.querySelector(".error-msg-source");
    if (!checked) {
      if (!error) {
        error = document.createElement("span");
        error.classList.add("error-msg-source");
        error.style.color = "red";
        error.style.fontSize = "0.9em";
        container.appendChild(error);
      }
      error.textContent = "Please select at least one option";
      return false;
    } else if (error) {
      error.textContent = "";
    }
    return true;
  }

  function validateDrink() {
    const val = inputs.drink.value;
    if (!val) {
      showError(inputs.drink, "Please select a drink");
      return false;
    }
    clearError(inputs.drink);
    return true;
  }

  function toggleSubmit() {
    const allValid =
      validateTitle() &&
      validateName(inputs.firstName) &&
      validateName(inputs.lastName) &&
      validateEmail() &&
      validatePhone() &&
      validateZip() &&
      validateSource() &&
      validateDrink() &&
      validateComments();
    submitBtn.disabled = !allValid;
  }

  // Attach events
  Object.values(inputs).forEach((el) => {
    if (NodeList.prototype.isPrototypeOf(el)) {
      el.forEach((radio) => radio.addEventListener("change", toggleSubmit));
    } else {
      el.addEventListener("input", toggleSubmit);
    }
  });
  document
    .querySelectorAll('input[name="source"]')
    .forEach((cb) => cb.addEventListener("change", toggleSubmit));
  inputs.drink.addEventListener("change", toggleSubmit);
  toggleSubmit();

  // Phone mask
  inputs.phone.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    let formatted = val;
    if (val.length > 6)
      formatted = `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(6)}`;
    else if (val.length > 3) formatted = `(${val.slice(0, 3)}) ${val.slice(3)}`;
    else if (val.length > 0) formatted = `(${val}`;
    e.target.value = formatted;
  });

  // Address2 counter
  const addr2Count = document.getElementById("address2-count");
  inputs.addr2.addEventListener("input", () => {
    addr2Count.textContent = `${inputs.addr2.value.length}/20 characters used`;
  });

  // Drinks dynamic checkbox
  const drinkOptions = document.getElementById("drink-options");
  inputs.drink.addEventListener("change", () => {
    drinkOptions.innerHTML = "";
    if (inputs.drink.value) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "large-drink";
      const label = document.createElement("label");
      label.textContent = "Large drink (75¢ extra)";
      label.htmlFor = "large-drink";
      drinkOptions.appendChild(checkbox);
      drinkOptions.appendChild(label);
    }
  });

  // Submit -> table
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let container = document.getElementById("result-table");
    if (!container) {
      container = document.createElement("div");
      container.id = "result-table";
      document.body.appendChild(container);
    }
    let table = container.querySelector("table");
    if (!table) {
      table = document.createElement("table");
      table.border = "1";
      const header = table.insertRow();
      [
        "Title",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Zip",
        "Source",
        "Drink",
        "Addr2",
        "Comments",
      ].forEach((h) => {
        const th = document.createElement("th");
        th.textContent = h;
        header.appendChild(th);
      });
      container.appendChild(table);
    }

    const row = table.insertRow();
    const selectedTitle =
      Array.from(inputs.title).find((r) => r.checked)?.value || "";
    row.insertCell().innerText = selectedTitle;
    row.insertCell().innerText = inputs.firstName.value;
    row.insertCell().innerText = inputs.lastName.value;
    row.insertCell().innerText = inputs.email.value;
    row.insertCell().innerText = inputs.phone.value;
    row.insertCell().innerText = inputs.zip.value;
    row.insertCell().innerText = Array.from(
      document.querySelectorAll('input[name="source"]:checked')
    )
      .map((s) => s.value)
      .join(", ");
    row.insertCell().innerText = inputs.drink.value;
    row.insertCell().innerText = inputs.addr2.value || "";
    row.insertCell().innerText = inputs.comments.value;

    form.reset();
    addr2Count.textContent = "0/20 characters used";
    toggleSubmit();
  });

  // ================= Chatbot ==================
  const aiBtn = document.getElementById("ai-btn");
  const chatWin = document.getElementById("chat-window");
  const chatMsg = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatClose = document.getElementById("chat-close");

  aiBtn.addEventListener("click", () => {
    chatWin.style.display = "flex";
  });

  chatClose.addEventListener("click", () => {
    chatWin.style.display = "none";
  });

  const faqs = [
    {
      q: ["email"],
      a: "You must use your Northeastern email (example: student@northeastern.edu).",
    },
    { q: ["phone"], a: "Phone must be in the format (XXX) XXX-XXXX." },
    { q: ["zip"], a: "Zip code must be exactly 5 digits." },
    { q: ["required"], a: "All fields are required except Street Address 2." },
    {
      q: ["address"],
      a: "Street Address 2 is optional. If blank, it remains empty in the table.",
    },
  ];

  function addMessage(sender, text) {
    const p = document.createElement("p");
    p.textContent = `${sender}: ${text}`;
    chatMsg.appendChild(p);
    chatMsg.scrollTop = chatMsg.scrollHeight;
  }

  chatSend.addEventListener("click", sendChat);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChat();
  });

  function sendChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage("You", text);
    chatInput.value = "";
    let answered = false;
    for (const faq of faqs) {
      if (faq.q.some((k) => text.toLowerCase().includes(k))) {
        addMessage("Bot", faq.a);
        answered = true;
        break;
      }
    }
    if (!answered) {
      addMessage(
        "Bot",
        "Sorry, I don’t know that yet. Please check the instructions."
      );
    }
  }
});

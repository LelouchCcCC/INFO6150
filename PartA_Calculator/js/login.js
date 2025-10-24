$(document).ready(() => {
  const HARDCODED_USERS = [
    { email: "student1@northeastern.edu", password: "password123" },
    { email: "user2@northeastern.edu", password: "securepass" },
  ];

  const $email = $("#email");
  const $password = $("#password");
  const $loginBtn = $("#login-btn");
  const $rememberMe = $("#remember-me");
  const $loginErrorMsg = $("#login-error-msg");
  const $loginSuccessMsg = $("#login-success-msg");

  // --- Validation Functions (JQuery) ---

  const displayError = (fieldId, message) => {
    $(`#${fieldId}`).addClass("is-invalid");
    $(`#${fieldId}-error`).text(message).show();
    $loginBtn.prop("disabled", true);
  };

  const clearError = (fieldId) => {
    $(`#${fieldId}`).removeClass("is-invalid");
    $(`#${fieldId}-error`).empty().hide();
    $loginErrorMsg.empty().hide(); // Clear general login error
  };

  const validateEmail = () => {
    const email = $email.val().trim();
    clearError("email");

    if (!email) {
      displayError("email", "Please enter a valid Northeastern email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith("@northeastern.edu")) {
      displayError("email", "Please enter a valid Northeastern email");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const password = $password.val();
    clearError("password");

    if (!password) {
      displayError("password", "Password is required");
      return false;
    }
    if (password.length < 8) {
      displayError("password", "Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const checkFormValidity = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    const canEnableButton = validateEmail(true) && validatePassword(true);
    $loginBtn.prop("disabled", !(isEmailValid && isPasswordValid));
  };

  $email
    .on("keyup blur", checkFormValidity)
    .on("focus", () => clearError("email"));

  $password
    .on("keyup blur", checkFormValidity)
    .on("focus", () => clearError("password"));

  // Initial check for button state
  checkFormValidity();

  // --- Login Process ---
  $("#login-form").on("submit", (e) => {
    e.preventDefault();

    if (!validateEmail() || !validatePassword()) {
      return;
    }

    const email = $email.val().trim();
    const password = $password.val();

    const user = HARDCODED_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const username = email.split("@")[0];

      const storage = $rememberMe.is(":checked")
        ? localStorage
        : sessionStorage;

      const sessionData = {
        username: username,
        email: email,
        timestamp: new Date().toISOString(),
        isLoggedIn: true,
      };

      storage.setItem("userSession", JSON.stringify(sessionData));

      $loginSuccessMsg.slideDown(300);

      setTimeout(() => {
        window.location.href = "calculator.html";
      }, 2000);
    } else {
      $loginErrorMsg.text("Invalid email or password").show();
      // Clear fields for security
      $password.val("");
      checkFormValidity(); // Re-disable button until re-validated
    }
  });

  // Check if user is already logged in (optional: for better UX)
  if (
    sessionStorage.getItem("userSession") ||
    localStorage.getItem("userSession")
  ) {
    // Optionally, show a message or redirect immediately
    // window.location.href = 'calculator.html';
  }
});

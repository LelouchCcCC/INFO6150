$(document).ready(() => {
  // --- Global State Variables ---
  let timerInterval = null;
  let totalSeconds = 0;
  let isRunning = false;
  let isPaused = false;
  const HISTORY_KEY = "eventStopwatchSessions";

  const $timerDisplay = $("#timer-display");
  const $eventDate = $("#event-date");
  const $eventName = $("#event-name");
  const $startBtn = $("#start-btn");
  const $pauseResumeBtn = $("#pause-resume-btn");
  const $stopSaveBtn = $("#stop-save-btn");
  const $resetBtn = $("#reset-btn");
  const $historyList = $("#session-history-list");
  const $filterDate = $("#filter-date");
  const $noSessionsMsg = $("#no-sessions-msg");
  const $totalSessions = $("#total-sessions");
  const $totalTime = $("#total-time");

  $eventDate.val(new Date().toISOString().split("T")[0]);

  // --- Utility Functions ---

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const displayError = (fieldId, message) => {
    $(`#${fieldId}`).addClass("is-invalid");
    $(`#${fieldId}-error`).text(message).show();
  };

  const clearError = (fieldId) => {
    $(`#${fieldId}`).removeClass("is-invalid");
    $(`#${fieldId}-error`).empty().hide();
  };

  const validateFields = () => {
    let isValid = true;
    const date = $eventDate.val();
    const name = $eventName.val().trim();

    clearError("event-date");
    if (!date) {
      displayError("event-date", "Please select a date");
      isValid = false;
    }

    clearError("event-name");
    if (!name) {
      displayError("event-name", "Event name is required");
      isValid = false;
    } else if (name.length < 3) {
      displayError("event-name", "Event name must be at least 3 characters");
      isValid = false;
    } else if (name.length > 100) {
      displayError("event-name", "Event name too long (max 100 characters)");
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s-']+$/.test(name)) {
      displayError("event-name", "Event name contains invalid characters");
      isValid = false;
    }

    return isValid;
  };

  $eventDate.on("focus", () => clearError("event-date"));
  $eventName.on("focus", () => clearError("event-name"));

  // --- UI/Control State Management ---

  const updateControls = () => {
    if (isRunning && !isPaused) {
      $startBtn.prop("disabled", true).hide();
      $pauseResumeBtn.prop("disabled", false).text("Pause");
      $stopSaveBtn.prop("disabled", false);
      $eventDate.prop("disabled", true);
      $eventName.prop("disabled", true);
    } else if (isPaused) {
      $startBtn.prop("disabled", true).hide();
      $pauseResumeBtn.prop("disabled", false).text("Resume");
      $stopSaveBtn.prop("disabled", false);
      // Fields remain disabled
    } else {
      // Stopped or Initial
      $startBtn.prop("disabled", false).show();
      $pauseResumeBtn.prop("disabled", true).text("Pause");
      $stopSaveBtn.prop("disabled", true);
      $eventDate.prop("disabled", false);
      $eventName.prop("disabled", false);
    }
  };

  // The core function to update the timer display
  const updateTimerDisplay = () => {
    $timerDisplay.text(formatTime(totalSeconds));
  };

  // Function using a Promise for delayed start (optional: to show Promise/Async usage)
  const startTimerPromise = (delay = 0) => {
    return new Promise((resolve) => {
      if (delay > 0) {
        console.log(`Starting in ${delay} seconds...`);
        setTimeout(resolve, delay * 1000);
      } else {
        resolve();
      }
    });
  };

  // Main Async function to handle the start sequence
  const startTimerAsync = async () => {
    if (isRunning && !isPaused) return;

    if (!validateFields()) {
      console.error("Validation failed, timer not started.");
      return;
    }

    if (isPaused) {
      isPaused = false;
      updateControls();
      resumeInterval();
      return;
    }

    isRunning = true;
    isPaused = false;
    totalSeconds = 0;
    updateControls();

    try {
      await startTimerPromise(0); // Start immediately
      startInterval();
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };

  const startInterval = () => {
    timerInterval = setInterval(() => {
      totalSeconds++;
      updateTimerDisplay();
    }, 1000);
  };

  const resumeInterval = () => {
    startInterval();
  };

  const pauseTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    isPaused = true;
    updateControls();
  };

  const stopAndSaveTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    if (totalSeconds > 0) {
      const sessions = getSessions();
      const newSession = {
        id: Date.now(),
        date: $eventDate.val(),
        eventName: $eventName.val().trim(),
        durationSeconds: totalSeconds,
        durationFormatted: formatTime(totalSeconds),
      };
      sessions.unshift(newSession); // Most recent sessions displayed first
      localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions));
    }

    resetTimerState();
    renderHistory();
    console.log("Session saved!");
  };

  const resetTimerState = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    totalSeconds = 0;
    isRunning = false;
    isPaused = false;
    updateTimerDisplay();
    updateControls();
  };

  // --- History Management ---

  const getSessions = () => {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  };

  const calculateStats = (sessions) => {
    const totalSessionsCount = sessions.length;
    const totalTimeSeconds = sessions.reduce(
      (sum, session) => sum + session.durationSeconds,
      0
    );
    $totalSessions.text(totalSessionsCount);
    $totalTime.text(formatTime(totalTimeSeconds));
  };

  const renderHistory = (filterDate = null) => {
    let sessions = getSessions();

    // Filter by date functionality
    if (filterDate) {
      sessions = sessions.filter((s) => s.date === filterDate);
    }

    $historyList.empty();

    if (sessions.length === 0) {
      $historyList.append(
        $(
          '<p id="no-sessions-msg" class="text-center">No sessions recorded yet</p>'
        )
      );
    } else {
      sessions.forEach((session) => {
        const item = `
                    <div class="history-item">
                        <p><strong>${session.eventName}</strong> (${session.date})</p>
                        <p>Duration: <strong>${session.durationFormatted}</strong></p>
                    </div>
                `;
        $historyList.append(item);
      });
    }

    calculateStats(getSessions()); // Always calculate stats on ALL sessions
  };

  // --- Event Listeners ---

  $startBtn.on("click", startTimerAsync); // Use Async function

  $pauseResumeBtn.on("click", () => {
    if (isPaused) {
      startTimerAsync(); // Resume
    } else {
      pauseTimer(); // Pause
    }
  });

  $stopSaveBtn.on("click", stopAndSaveTimer);

  $resetBtn.on("click", resetTimerState);

  $filterDate.on("change", () => {
    const date = $filterDate.val();
    renderHistory(date || null);
  });

  // Initial load
  updateControls();
  renderHistory();
});

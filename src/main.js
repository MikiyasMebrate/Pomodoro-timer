const readline = require("readline");
// Create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const countDown = async (minutes, secondCounter = 1000) => {
  let timeLeft = minutes * 60; // Convert minutes to seconds
  let isPaused = false; // Track pause state
  let remainingTime = timeLeft; // Store remaining time when paused
  let timer; // Store the timer reference

  return new Promise((resolve) => {
    const startTimer = () => {
      timer = setInterval(() => {
        if (!isPaused) {
          const mins = Math.floor(remainingTime / 60); // Remaining minutes
          const secs = remainingTime % 60; // Remaining seconds
          const formattedTime = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

          // Clear the line and print the timer
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`Timer: ${formattedTime}`);
          remainingTime--;

          if (remainingTime < 0) {
            clearInterval(timer);
            console.log("\nTime's up!"); // Move to a new line after countdown ends
            resolve();
          }
        }
      }, secondCounter);
    };

    startTimer(); // Start the countdown timer

    // Listen for user input for pause/resume
    const handleInput = () => {
      // Make the readline interface input into raw mode to detect key presses
      rl.input.setRawMode(true);
      rl.input.resume();
      rl.input.on("data", (chunk) => {
        const command = chunk.toString().trim();

        if (command === "") {
          isPaused = !isPaused; // Toggle pause state
          console.log(
            isPaused
              ? "\nTimer paused. Press Space to resume.\n"
              : "\nTimer resumed.\n"
          );
        } else if (command === "e") {
          clearInterval(timer); // Clear the timer
          rl.close();
          process.exit(); // Exit the application
        }
      });
    };

    handleInput(); // Start listening for commands
  });
};

// Display the menu
const displayMenu = () => {
  console.log("\n\n\n======= Interactive Menu =======");
  console.log("\n1. Start Pomodoro");
  console.log("2. History");
  console.log("3. Exit\n");
  console.log("================================\n");

  // Ask the user to select an option
  rl.question("Select an option (1-3): ", handleMenuSelection);
};

// Handle user input
const handleMenuSelection = (option) => {
  switch (option) {
    case "1":
      console.log("\nStarting Pomodoro...\n");
      startPomodoro(); // Call function to start the Pomodoro
      break;
    case "2":
      console.log("\nDisplaying History...\n");
      // Code to display history can go here
      displayHistory();
      break;
    case "3":
      console.log("\nExiting...");
      rl.close(); // Close the readline interface
      break;
    default:
      console.log("\nInvalid option. Please try again.");
      displayMenu(); // Redisplay the menu for valid input
  }
};

// Function to simulate starting Pomodoro
const startPomodoro = () => {
  console.log("Pomodoro started! (Press Ctrl + C to stop)\n");
  // Start by asking the Pomodoro settings
  askPomodoroSettings();
};

// Function to display history
const displayHistory = () => {
  console.log("Here is your history:");
};

// Function to ask user for Pomodoro settings
const askPomodoroSettings = () => {
  let settings = {};
  // Ask for work time
  rl.question("How long is the work time (in minutes)? ", (workTime) => {
    settings.workTime = parseInt(workTime.trim(), 10);

    // Ask for break time
    rl.question(
      "How long is the short break time (in minutes)? ",
      (breakTime) => {
        settings.breakTime = parseInt(breakTime.trim(), 10);

        // Ask for long break time
        rl.question(
          "How long is the long break time (in minutes)? ",
          (longBreakTime) => {
            settings.longBreakTime = parseInt(longBreakTime.trim(), 10);

            // Ask for the number of intervals before long break
            rl.question(
              "How many intervals before a long break? ",
              (intervals) => {
                settings.intervalsBeforeLongBreak = parseInt(
                  intervals.trim(),
                  10
                );

                // Now all settings have been collected
                console.log("\nYour Pomodoro settings:");
                console.log(`Work Time: ${settings.workTime} minutes`);
                console.log(`Short Break: ${settings.breakTime} minutes`);
                console.log(`Long Break: ${settings.longBreakTime} minutes`);
                console.log(
                  `Intervals before Long Break: ${settings.intervalsBeforeLongBreak}`
                );

                startPomodoroCycle(settings);
              }
            );
          }
        );
      }
    );
  });
};

// Function to simulate starting the Pomodoro with the collected settings
const startPomodoroCycle = async (settings) => {
  console.clear();
  console.log("\n\n--------------------------------------");
  console.log(
    "Starting your Pomodoro sessions based on the following settings..."
  );
  console.log("Work Time:", settings.workTime, "minutes");
  console.log("Short Break Time:", settings.breakTime, "minutes");
  console.log("Long Break Time:", settings.longBreakTime, "minutes");
  console.log(
    "Intervals Before Long Break:",
    settings.intervalsBeforeLongBreak
  );
  console.log("--------------------------------------\n\n");

  console.log("Press Enter Start the Pomodoro");

  startWorkTime(settings);
};

// Function to ask for user confirmation to start
const waitForUser = () => {
  return new Promise((resolve) => {
    rl.question("Press Enter to start the session...\n", () => {
      resolve();
    });
  });
};

// Async function to start the work time
const startWorkTime = async (settings) => {
  console.clear();
  console.log("Starting your work sessions...\n");

  for (
    let interval = 0;
    interval < settings.intervalsBeforeLongBreak;
    interval++
  ) {
    console.log(`Press Space to pause and resume the timer.`);
    await waitForUser(); // Wait for the user to press Enter
    console.log(
      `\nWork session ${interval + 1} of ${
        settings.intervalsBeforeLongBreak
      } starting...`
    );
    await countDown(settings.workTime); // Wait for the countdown to finish

    console.log(`Work session ${interval + 1} completed. Time for a break!\n`);

    if (interval < settings.intervalsBeforeLongBreak - 1) {
      await waitForUser(); // Wait for the user to press Enter before the break
      console.log(`Starting short break for ${settings.breakTime} minutes...`);
      await countDown(settings.breakTime); // Countdown for break time
      console.log(`Break time is over. Starting next work session...\n`);
    }
  }

  // After completing all intervals, take a long break
  console.log(
    `All ${settings.intervalsBeforeLongBreak} work sessions completed! Time for a long break of ${settings.longBreakTime} minutes.`
  );
  await waitForUser(); // Wait for the user to press Enter before the long break
  await countDown(settings.longBreakTime, 1); // Countdown for long break
  console.log("Long break is over. Great job!");
  displayMenu();
};

// Start the interactive menu
displayMenu();

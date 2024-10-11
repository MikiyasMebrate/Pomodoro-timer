# Pomodoro Timer CLI

This is a **Pomodoro Timer** command-line interface (CLI) tool built with Node.js. It allows users to manage work and break sessions, log history, and save it as a JSON file. The Pomodoro technique improves productivity by working in focused intervals with regular short breaks.

## Features

- Set custom work, short break, and long break durations.
- Automatically logs work and break sessions.
- Pauses and resumes the timer by pressing the spacebar.
- Save session history to a JSON file.
- Display history as a table.
- Desktop notifications when each session completes.

## Getting Started

### Prerequisites

To run this application, you need to have **Node.js** installed. You can download it from [nodejs.org](https://nodejs.org).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/pomodoro-cli.git
    cd pomodoro-cli
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Usage

1. Start the Pomodoro timer:

    ```bash
    node pomodoro.js
    ```

2. Follow the interactive menu to:
    - Start a Pomodoro session.
    - View session history.
    - Exit the application.

### Commands

- **Start Pomodoro**: Begins a new Pomodoro session.
- **View History**: Displays all previous work/break sessions in a table format.
- **Exit**: Closes the application.

### Pause and Resume

You can pause or resume the timer at any point during the session by pressing the **Spacebar**.

### JSON History

The application automatically logs each session into a JSON file (`pomodoro_history.json`) after each interval is completed. The log includes the type of session (work/break), interval, duration, and timestamp.

### Notifications

Desktop notifications alert you when a session (work/break) ends or resumes.

### Example Output

When you start the Pomodoro, the output looks like this:

```bash
How long is the work time (in minutes)? 25
How long is the short break time (in minutes)? 5
How long is the long break time (in minutes)? 15
How many intervals before a long break? 4

Your Pomodoro settings:
Work Time: 25 minutes
Short Break: 5 minutes
Long Break: 15 minutes
Intervals before Long Break: 4

Press Enter to start the session...

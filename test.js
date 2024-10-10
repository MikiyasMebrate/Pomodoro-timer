function countdownTimer(seconds) {
    let timeLeft = seconds;
  
    const intervalId = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
  
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
      console.clear(); // Clear the console for a cleaner display
      console.log(formattedTime);
  
      timeLeft--;
  
      if (timeLeft < 0) {
        clearInterval(intervalId);
        console.log("Time's up!");
      }
    }, 100); // Update every second
  }
  
  // Example usage:
  countdownTimer(60); // Start a 60-second countdown
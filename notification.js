const notifier = require('node-notifier');
const fs = require('fs');
const { resolve } = require('path');
//save history in document 



const readline = require('readline');
const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


const addHistory = (data) =>{
    fs.appendFile('history.txt', data, function (err) {
      if (err) throw err;
    });
}

const showHistory = () =>{
  fs.readFile('history.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    displayMenu()
  });
}

const displayQuestion = (query) => {
    return new Promise((resolve, reject) => {
      readInput.question(query, (answer) => {
        resolve(answer);
      })
    })
}
  
const askQuestion = async (question) =>{
    let input = await displayQuestion(question)
  
    if(input < 1 || isNaN(input)) {
      console.log("Please enter valid !")
      return askQuestion(question)
    }else{
      return input
    }
  
}

const displayMenu = async() =>{
  console.log("1. Start Pomodoro")
  console.log("2. History")
  console.log("3. Exit")
  const input = await askQuestion('Enter Options: ')

  if(input == 1){
    pomodoroMenu()
  }else if(input == 2){
    showHistory()
  }
  else if(input == 3){
    process.exit()
  }else{
    console.clear()
    console.log("Please Enter valid input!")
    displayMenu()
  }
}


const pomodoroMenu = async () =>{
  const breakLength = await askQuestion('Enter break length: ')
  const breakInterval = await askQuestion('Enter break sec: ')
  const sessionLength = await askQuestion('Enter session length: ')
  
  readInput.close();


  for(let interval  = 0; interval < breakLength; interval++){
    let time = await workTimer(sessionLength, interval+1) // call the work timer function
    console.log(time)

    if(interval+1 != breakLength){
      let breakTime = await breakTimer(breakInterval, interval+1) // call the break timer function
      console.log(breakTime)
    }

  }


  showNotification('Congratulations','Session Completed', 'Hero')  //final notification
}



const preTimer = async(message) =>{
  return new Promise((resolve, reject) => {
    let sec = 5
    const timer = setInterval(()=>{
      console.clear()
      console.log(`${message} ${sec}`)
      sec--;
      if(sec == 0){
        clearInterval(timer)
        resolve(true)
      }
    },1000)
  })
}


const  workTimer = async (sessionLength, interval) =>{
  showNotification('Work Time', `Session ${interval} start soon`, 'Funk') 

  addHistory(`Work Time Session ${interval} for ${sessionLength} sec at : ${new Date()}\n` ) // add history for working time
  let preTime = await preTimer('Working time stating in ....')

  if(preTime){
    return new Promise((resolve, reject) => {
      
      let startTime = new Date();
      let countDown = setInterval(() => {
        let current = new Date();
        const diff = current - startTime;
    
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
        const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Seconds
    
        const timer = `Work Timer = ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    
        console.clear()
        console.log(timer)
    
    
        if(seconds == sessionLength){
          clearInterval(countDown)
          resolve(`Session ${interval} Over`)
          return true
        }
      }, 1000);
    })
    
  }

}


const breakTimer = async (breakInterval, interval) => {
  showNotification('Break Time', `Break ${interval} start soon`, 'Basso') 
  addHistory(`Break Time Session ${interval} for ${breakInterval} sec at : ${new Date()}\n` ) // add history for break time
  let preTime = await preTimer('Break time stating in ....')

  return new Promise((resolve, reject) => {
    
    let startTime = new Date();
  let countDown = setInterval(() => {
    let current = new Date();
    const diff = current - startTime;

    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
    const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Seconds

    const timer = `Break Timer = ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`

    console.clear()
    console.log(timer)


    if(seconds == breakInterval){
      clearInterval(countDown)
      resolve(`Break Time Over!`)
      return true
    }
  }, 1000);
})


}

const showNotification = (title, message, sound) =>{
     // Create a notification
     notifier.notify({
       title: title,
       message: message,
       // Optional: Customize appearance
       sound: sound,
       wait: true // Wait for user to close the notification
     });
}

const main = async () => {
  displayMenu()

  


}


main()
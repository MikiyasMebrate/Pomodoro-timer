const notifier = require('node-notifier');
//save history in document 



const readline = require('readline');
const readInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


const displayQuestion = (query) => {
  return new Promise((resolve, reject) => {
    readInput.question(query, (answer) => {
      resolve(answer);
    })
  })
}

const askQuestion = async (question) =>{
  let breakLength = await displayQuestion(question)

  if(breakLength < 1 || isNaN(breakLength)) {
    console.log("Please enter valid !")
    return askQuestion(question)
  }else{
    return breakLength
  }

}

const  workTimer = async (sessionLength, target, interval) =>{

  return new Promise((resolve, reject) => {
    let countDown = setInterval(() => {
      let current = new Date();
      const diff = current - target;
  
      
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


const breakTimer = async (breakInterval, target, interval) => {
  return new Promise((resolve, reject) => {
  let countDown = setInterval(() => {
    let current = new Date();
    const diff = current - target;

    
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
  const breakLength = await askQuestion('Enter break length: ')
  const breakInterval = await askQuestion('Enter break sec: ')
  const sessionLength = await askQuestion('Enter session length: ')
  
  readInput.close();

  //02:00:00
  let target = new Date()

  for(let interval  = 0; interval < breakLength; interval++){
    showNotification('Work Time', `Session ${interval+1} Started`, 'Funk') 
    let time = await workTimer(sessionLength, target, interval+1) // call the work timer function
    console.log(time)


    target = new Date() // update target by current time


    if(interval+1 != breakLength){
      
      showNotification('Break Time', `Break ${interval+1} Started`, 'Basso') 
      let breakTime = await breakTimer(breakInterval, target, interval+1) // call the break timer function
      console.log(breakTime)
    }

    target = new Date() // update target by current time
  }


  showNotification('Congratulations','Session Completed', 'Hero')  //final notification

  
  



}


main()
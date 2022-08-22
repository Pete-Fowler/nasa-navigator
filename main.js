const main = document.querySelector('#main');
const mainBar = document.querySelector('div#main-bar');
const homeButton = document.querySelector("#home");

const expand = document.querySelector('#expand');
expand.addEventListener('mouseover', displayDetailsIOD);
expand.addEventListener('mouseout', hideDetailsIOD);

currentView = document.querySelector("#currentViewBox p");

let localData;
let localMarsData;


homeButton.addEventListener ("click",() => displayIOD(localData));

// Gets image of the day
function getIOD () {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=k7cUJwa1gGIvD71WgzJVCjVdErEJWvQQX7aL9htz`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayIOD(data);
    localData = {...data};
  });
}

// Displays image of the day in main section
function displayIOD(data) {
  main.textContent = ""
  if(data.media_type === 'image') {
    main.setAttribute('style', `background: url(${data.url}`);
  }
  else if(data.media_type === 'video') {
    const video = document.createElement('iframe');
    video.src = data.url;
    main.append(video);
  }
}

// Adds data to populate main-bar at the bottom of the image and fades it in
function displayDetailsIOD() {
  mainBar.style.opacity = 0;
  mainBar.textContent = '';

  const title = document.createElement('span');
  title.id = 'title';
  title.textContent = `Title: ${localData.title} | `;
  
  const date = document.createElement('span');
  date.id = 'date';
  date.textContent = `Image Date: ${localData.date}`;
  
  const description = document.createElement('p');
  description.id = 'description';
  description.textContent = localData.explanation;

  // Append new elements to DOM and fades in the main bar by removing the 
  // CSS class .faded-out (which has set the element's opacity to 0)
  mainBar.append(title, date, description);
  mainBar.classList.remove('faded-out');
  mainBar.style.opacity = .6;
}

function hideDetailsIOD() {
  mainBar.style.opacity = 0;
  mainBar.classList.add('faded-out');
}

getIOD();

//new additions to randomize elements

const randomArray = [];
for (let i=0, j=1; i<j; i++) {
    randomArray.push(Math.round(Math.random() * 838))
}
console.log(randomArray)

function getMars() {
  return fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=mast&api_key=DEMO_KEY")
  .then(res => res.json())
  .then(data => {
    localMarsData = {...data};
    console.log(data);
    displayMars(data);
  })
}

function displayMars(data) {
  main.textContent = ""
  for (const element of randomArray) {
    // const marsImage = document.createElement("img")
    const card = document.createElement('div')
    // const marsRover = document.createElement("h2")
    card.className = "mars-card"
    // marsImage.src = data.photos[element].img_src
    card.setAttribute("style", `background: url(${data.photos[element].img_src}`)
    // marsRover.textContent = data.photos[element].earth_date
    roverName = data.photos[element].rover.name
    currentView.textContent = `Mars images captured by the rover ${roverName}`
    // card.append(marsImage)
    // card.append(marsRover)
    main.append(card)
   }
}


marsButton = document.querySelector("#mars");

marsButton.addEventListener("click", getMars)
//displayMars
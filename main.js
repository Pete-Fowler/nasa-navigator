const main = document.querySelector('#main');
const mainBar = document.querySelector('div#main-bar');
const searchInput = document.querySelector('#searchInput');
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => search(searchInput.value));
const homeButton = document.querySelector("#home");
homeButton.addEventListener ("click",() => displayIOD(localData));

const expand = document.querySelector('#expand');
expand.addEventListener('mouseover', displayDetailsIOD);
expand.addEventListener('mouseout', hideDetailsIOD);

currentView = document.querySelector("#currentViewBox p");

let localData;
let localMarsData;

// Search images API
function search(string) {
  return fetch(`https://images-api.nasa.gov/search?q=${string}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displaySearchResults(data);
  })
  .catch(err => alert(err.message));
}

function displaySearchResults(data) {
  main.textContent = '';
  if(data.collection.items[0].data[0].media_type === 'video') {
    fetch(`https://images-api.nasa.gov/asset/${data.collection.items[0].data[0].nasa_id}`)
    .then(res => res.json())
    .then(details => console.log(details));    
    // const video = document.createElement('iframe');
    // video.src = data.url;
    // main.append(video);
  }
}

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

function getMars() {
  return fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=mast&page=29&api_key=DEMO_KEY")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayMars(data);
    localMarsData = {...data};

  })
}

function displayMars(data) {
  main.textContent = ""
  for (let i=0; i<6; i++) {
    const card = document.createElement('div')
    // const marsImage = document.createElement("img")
    const marsRover = document.createElement("h3")
    card.className = "mars-card"
    card.setAttribute("style", `background: url(${data.photos[i].img_src})`)
    roverName = data.photos[i].rover.name
    currentView.textContent = `Mars images captured by the rover ${roverName}`
    main.append(marsRover)
    main.append(card)
   }
}

marsButton = document.querySelector("#mars");

marsButton.addEventListener("click", getMars)
//displayMars
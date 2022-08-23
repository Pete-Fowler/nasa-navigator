const main = document.querySelector('#main');
const searchInput = document.querySelector('#searchInput');

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => search(searchInput.value));

const homeButton = document.querySelector("#home");
homeButton.addEventListener ("click",() => displayIOD(localData));

const marsButton = document.querySelector("#mars");
marsButton.addEventListener("click", getMars);

const currentView = document.querySelector("#currentViewBox p");
const mainBar = document.querySelector('div#main-bar');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

const expand = document.querySelector('#expand');

let localMarsData;
let localData;

getIOD();

// Image of the day functions
function getIOD () {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=k7cUJwa1gGIvD71WgzJVCjVdErEJWvQQX7aL9htz`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localData = data;
    displayIOD(data);
  });
}

function displayIOD(data) {
  main.textContent = '';
  expand.setAttribute('style', 'opacity: .4');
  expand.addEventListener('mouseover', displayDetails);
  expand.addEventListener('mouseout', hideDetails);
  if(data.media_type === 'image') {
    main.setAttribute('style', `background-image: url(${data.url}`);
  }
  else if(data.media_type === 'video') {
    const video = document.createElement('iframe');
    video.src = data.url;
    main.append(video);
  }
  console.log(title);
  title.textContent = `Title: ${data.title} | Image Date: ${data.date}`;
  description.textContent = data.explanation;
}

// Mars button functions
function getMars() {
  return fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=navcam&api_key=DEMO_KEY")
  .then(res => res.json())
  .then(data => {
    localMarsData = {...data};
    console.log(data);
    displayMars(data);
  })
}

function displayMars(data) {
  main.textContent = "";
  expand.setAttribute('style', 'opacity: 0');
  expand.removeEventListener('mouseover', displayDetails);
  expand.removeEventListener('mouseout', hideDetails);
  element = Math.round(Math.random() * 9)
  main.setAttribute("style", `background-image: url(${data.photos[element].img_src}`)
  
  roverName = data.photos[element].rover.name;
  currentView.textContent = `Mars images captured by the rover ${roverName}`;
  }

// Search images API functions
function search(string) {
  return fetch(`https://images-api.nasa.gov/search?q=${string}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displaySearchResults(data);
    currentView.textContent = string;
    searchInput.value = '';
  });
}

function displaySearchResults(data) {
  main.textContent = '';
  let i = 0;
  while (data.collection.items[i].data[0].media_type !== 'image') {
    i++;
  }
    const object = data.collection.items[i].data[0];
    fetch(`https://images-api.nasa.gov/asset/${data.collection.items[i].data[0].nasa_id}`)
    .then(res => res.json())
    .then(details => {
      console.log(details);
      main.setAttribute('style', `background-image: url(${details.collection.items[0].href}`);
      displaySearchDetail(object);
    });    
  }

function displaySearchDetail(object) {
  expand.setAttribute('style', 'opacity: .4')
  expand.addEventListener('mouseover', displayDetails);
  expand.addEventListener('mouseout', hideDetails);
  title.textContent = object.title;
  description.textContent = object.description;
}

// Show / hide modal window
function displayDetails() {
  mainBar.style.opacity = 0;

  mainBar.classList.remove('faded-out');
  mainBar.style.opacity = .6;
}

function hideDetails() {
  mainBar.style.opacity = 0;
  mainBar.classList.add('faded-out');
}
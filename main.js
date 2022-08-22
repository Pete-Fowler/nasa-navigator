const main = document.querySelector('#main');
const mainBar = document.querySelector('div#main-bar');

const expand = document.querySelector('#expand');
expand.addEventListener('mouseover', displayDetails);
expand.addEventListener('mouseout', hideDetails);

let localData;

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
function displayDetails() {
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

function hideDetails() {
  mainBar.style.opacity = 0;
  mainBar.classList.add('faded-out');
}

getIOD();

//getMars

//displayMars




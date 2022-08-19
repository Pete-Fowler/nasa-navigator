const main = document.querySelector('#main');
const mainBar = document.querySelector('div#main-bar');

// Gets image of the day
function getIOD () {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayIOD(data);
    displayBarIOD(data)
  });
}

// Displays image of the day in main section
function displayIOD(data) {
  main.setAttribute('style', `background: url(${data.url}`);
}

// Adds data to populate main-bar at the bottom of the image and fades it in
function displayBarIOD(data) {
  const title = document.createElement('span');
  title.id = 'title';
  title.textContent = `Title: ${data.title} | `;
  
  const date = document.createElement('span');
  date.id = 'date';
  date.textContent = `Image Date: ${data.date}`;
  
  const description = document.createElement('p');
  description.id = 'description';
  description.textContent = data.explanation;

  // Append new elements to DOM and fades in the main bar by removing the 
  // CSS class .faded-out (which has set the element's opacity to 0)
  mainBar.append(title, date, description);
  mainBar.classList.remove('faded-out');
}

getIOD();
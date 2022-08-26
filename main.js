const main = document.querySelector('#main');
const searchInput = document.querySelector('#searchInput');

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => search(searchInput.value));

const homeButton = document.querySelector("#home");
homeButton.addEventListener ("click",() => displayIOD(localIodData));

const marsButton = document.querySelector("#mars");
marsButton.addEventListener("click", getMars);

const currentView = document.querySelector("#currentViewBox p");
const mainBar = document.querySelector('div#main-bar');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

const expand = document.querySelector('#expand');
expand.addEventListener('mouseover', displayDetails);
expand.addEventListener('mouseout', hideDetails);

let last = NaN;     // Used in displayMars
let localMarsData;  // Used in displayMars for forward / back arrows
let localIodData;   // Used in IOD event listener
let localData       // Used with forward / back arrows in search
let k = 0;          // Used with forward / back arrows in search
let l = 0;          // Used with forward / back arrows in displayMars

getIOD();

// Image of the day functions
function getIOD () {
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=k7cUJwa1gGIvD71WgzJVCjVdErEJWvQQX7aL9htz`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localIodData = data;
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
  currentView.textContent = 'Astronomy image of the day';
  title.textContent = `Title: ${data.title} | Image Date: ${data.date}`;
  description.textContent = data.explanation;
}

// Mars button functions
function getMars() {
  return fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=mast&api_key=k7cUJwa1gGIvD71WgzJVCjVdErEJWvQQX7aL9htz")
  .then(res => res.json())
  .then(data => {
    localMarsData = {...data};
    console.log(data);
    displayMars(data);
  })
}

function displayMars(data) {
  do {
    l = Math.round(Math.random() * 99);
  } while(l === last || l === NaN);
  last = l;
  main.textContent = "";
  main.setAttribute("style", `background-image: url(${data.photos[l].img_src}`);
  roverName = data.photos[l].rover.name;
  currentView.textContent = `Mars images captured by the rover ${roverName}`;
  title.textContent = "NASA Mars Curiosity Rover";
  description.textContent = "Part of NASA's Mars Science Laboratory mission, Curiosity is the largest and most capable rover ever sent to Mars. It launched November 26, 2011 and landed on Mars at 10:32 p.m. PDT on Aug. 5, 2012 (1:32 a.m. EDT on Aug. 6, 2012).Curiosity set out to answer the question: Did Mars ever have the right environmental conditions to support small life forms called microbes? Early in its mission, Curiosity's scientific tools found chemical and mineral evidence of past habitable environments on Mars. It continues to explore the rock record from a time when Mars could have been home to microbial life. Curiosity's large size allows it to carry an advanced kit of 10 science instruments. It has tools including 17 cameras, a laser to vaporize and study small pinpoint spots of rocks at a distance, and a drill to collect powdered rock samples. It hunts for special rocks that formed in water and/or have signs of organics.";
  displayArrows();
  marsArrowsListeners();
}

function marsArrowsListeners() {
  document.querySelector('#forward').addEventListener('click', () => {
    if(l === 99) {
      l = 0;
    } else {
    l += 1;
    }
    main.setAttribute("style", `background-image: url(${localMarsData.photos[l].img_src}`);
  });

  document.querySelector('#back').addEventListener('click', () => {
    if(l === 0) {
      l = 99;
    } else {
      l -= 1;
    }
    main.setAttribute("style", `background-image: url(${localMarsData.photos[l].img_src}`);
  });
}

// Search images API functions
function search(string) {
  return fetch(`https://images-api.nasa.gov/search?q=${string}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    localData = data;
    displaySearchResults(localData);
    searchInput.value = '';
  });
}

function displaySearchResults(data) {
  const array = data.collection.items;
  const newArr = array.filter(object => {
    return object.data[0].media_type === 'image';
  });
  const object = newArr[k].data[0];
  fetch(`https://images-api.nasa.gov/asset/${newArr[k].data[0].nasa_id}`)
    .then(res => res.json())
    .then(details => {
      console.log(details);
      main.textContent = '';
      main.setAttribute('style', `background-image: url(${details.collection.items[k].href}`);
      displaySearchDetail(object);
      displayArrows();
      searchArrowsListeners();
    });  
  }

function displaySearchDetail(object) {
  currentView.textContent = object.title;
  title.textContent = object.title;
  description.textContent = object.description;
}

// Adds event listeners and callbacks for arrows in search
function searchArrowsListeners() {
  const forward = document.querySelector('#forward');
  forward.addEventListener('click', () => {
    k += 1;
    displaySearchResults(localData);
  });
  const back = document.querySelector('#back');
  back.addEventListener('click', () => {
    if(k >= 1) {
      k -= 1;
      displaySearchResults(localData);
    }
  });
}

// Show / hide modal window
function displayDetails() {
  mainBar.style.opacity = 0;

  mainBar.classList.remove('faded-out');
  mainBar.style.opacity = .8;
}

function hideDetails() {
  mainBar.style.opacity = 0;
  mainBar.classList.add('faded-out');
}

// Show forward / back arrows
function displayArrows() {
  const forward = document.createElement('div');
  forward.id = 'forward';
  forward.className = 'arrow';
  forward.textContent = '>';
  
  const back = document.createElement('div');
  back.id = 'back';
  back.className = 'arrow';
  back.textContent = '<';

  main.append(back, forward);
}
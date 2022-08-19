const main = document.querySelector('#main');

// Gets image of the day
function getIOD () {
  return fetch(`https://api.nasa.gov/planet***ary/apod?api_key=DEMO_KEY`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayIOD(data);
  });
}

function displayIOD(data) {
  main.setAttribute('style', `background: url(${data.url}`);
}
getIOD();
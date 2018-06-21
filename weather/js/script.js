window.onload = () => {
  const API_BASE = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/5aee267cbef6f58dda604d779448ad90/';
  const locations = [
    {
      "title": "Lviv",
      "img": "lviv.jpg",
      "nav": "49.842303,24.008319"
    }, {
      "title": "Dubrivka Apartments Deluxe",
      "img": "dubrivka.jpg",
      "nav": "49.512126,23.112500"
    }, {
      "title": "Rybnyk Grand Resort",
      "img": "rybnyk.jpg",
      "nav": "49.175151,23.280234"
    }, {
      "title": "Gdańsk",
      "img": "gdansk.jpg",
      "nav": "54.359363,18.651894"
    }, {
      "title": "Rīga",
      "img": "riga.jpg",
      "nav": "56.975640,24.136295"
    }, {
      "title": "Sharm El Sheikh",
      "img": "sharm.jpg",
      "nav": "27.965620,34.400219"
    }
  ];

  /**
   * @param {String} HTML representing a single element
   * @return {Element}
   */

  function htmlToElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  const skycons = new Skycons({color: 'white'});

  const generateItem = (title, img, info, temp, icon) => {
    const itemLayout = `  <div class="weather-item">
        <div class="bg-image">
          <img src="img/${img}">
        </div>
        <div class="weather-item__info">
          <h2>${title}</h2>
          <p>${info}</p>
        </div>
        <div class="weather-item__status">
          <h3>${temp}°C</h3>
          <canvas width="128" height="128"></canvas>
        </div>
      </div>`;
    const item = htmlToElement(itemLayout);
    skycons.set(item.getElementsByTagName('canvas')[0], icon);
    document.getElementById('app').appendChild(item);
  };

  const requestApi = (title, img, nav) => {
    const weatherReq = new XMLHttpRequest();
    weatherReq.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        const response = JSON.parse(this.responseText);
        console.log(response);
        const info = response.daily.summary;
        const temp = response.currently.apparentTemperature.toFixed(0);
        const icon = response.currently.icon;
        generateItem(title, img, info, temp, icon);
      }
    };
    weatherReq.open('GET', `${API_BASE}${nav}?lang=uk&units=auto`, true);
    weatherReq.send(null);
  };

  for (let location of locations) {
    requestApi(location.title, location.img, location.nav);
  }

  skycons.play();
}

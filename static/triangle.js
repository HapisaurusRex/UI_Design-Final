(function () {
    const data = window.triangleData || {
      layer: false,
      material: false,
      weather: false,
    };
  
    // const getColor = (key) => (data[key] ? "rgb(83, 122, 16)" : "#FFF");
    // const getText = (key) => (data[key] ? "#FFF" : "#000");
    const getColor = (key) => (data[key] ? "rgb(83, 122, 16)" : "#FFF");
    const getText = (key) => (data[key] ? "#FFF" : "rgb(218, 165, 32)");

    const triangle = `
      <svg viewBox="0 0 300 265" width="300" height="260" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink class="progress-svg">
  
        <polygon points="150,0 0,260 300,260" fill="none" stroke="#a9a9a9" stroke-width="5"/>
  
        <!-- Layering -->
        <a xlink:href="/layer">
          <polygon
            points="150,0 0,260 150,173.2"
            fill="${getColor('layer')}"
            stroke=" #a9a9a9"
            stroke-width="2"
            class="progress-btn"
          />
          <text x="100" y="150" text-anchor="middle" font-size="12" fill="${getText('layer')}">Layering</text>
        </a>
  
        <!-- Material -->
        <a xlink:href="/material">
          <polygon
            points="0,260 300,260 150,173.2"
            fill="${getColor('material')}"
            stroke=" #a9a9a9"
            stroke-width="2"
            class="progress-btn"
          />
          <text x="150" y="230" text-anchor="middle" font-size="12" fill="${getText('material')}">Material</text>
        </a>
  
        <!-- Clothing -->
        <a xlink:href="/weather">
          <polygon
            points="300,260 150,0 150,173.2"
            fill="${getColor('weather')}"
            stroke=" #a9a9a9"
            stroke-width="2"
            class="progress-btn"
          />
          <text x="200" y="150" text-anchor="middle" font-size="12" fill="${getText('weather')}">
            <tspan x="200">Weather</tspan>
            <tspan x="200" dy="14">Type</tspan>
          </text>
        </a>
  
      </svg>
    `;
  
    const container = document.getElementById("progress");
    if (container) container.innerHTML = triangle;
  })();
  
(function () {
    const data = window.triangleData || {
      layer: false,
      material: false,
      weather: false,
    };
  
    const getColor = (key) => (data[key] ? "rgb(83, 122, 16)" : "#FFF");
    const getText = (key) => (data[key] ? "#FFF" : "rgb(218, 165, 32)");
    const showQuiz = data.layer && data.material && data.weather;
  
    const triangle = `
            <div class="container-container">
            <div class="triangle-container">
                <svg class="triangle-svg" viewBox="0 0 300 260">
                <polygon 
                    points="150,0 0,260 300,260" 
                    class="triangle-bg" 
                    stroke-width="2"
                />
                
                <g transform="translate(-1.0,-1.0)">
                    <line x1="150" y1="0"    x2="150" y2="173.2" stroke="black" stroke-width="2"/>
                    <line x1="0"   y1="260"  x2="150" y2="173.2" stroke="black" stroke-width="2"/>
                    <line x1="300" y1="260"  x2="150" y2="173.2" stroke="black" stroke-width="2"/>
            
                    <a xlink:href="/layer">
                    <polygon 
                        points="150,0 0,260 150,173.2" 
                        class="triangle-btn"
                        fill="${getColor('layer')}"
                    />
                    <text x="100" y="150" text-anchor="middle" font-size="12" fill="${getText('layer')}">Layering</text>
                    </a>
            
                    <a xlink:href="/material">
                    <polygon 
                        points="0,260 300,260 150,173.2" 
                        class="triangle-btn"
                        fill="${getColor('material')}"
                    />
                    <text x="150" y="230" text-anchor="middle" font-size="12" fill="${getText('material')}">Material</text>
                    </a>
            
                    <a xlink:href="/weather">
                    <polygon 
                        points="300,260 150,0 150,173.2" 
                        class="triangle-btn"
                        fill="${getColor('weather')}"
                    />
                    <text x="200" y="150" text-anchor="middle" font-size="12" fill="${getText('weather')}">
                        <tspan x="200">Clothing</tspan>
                        <tspan x="200" dy="14">Type</tspan>
                    </text>
                    </a>
                </g>
                </svg>
            </div>
            </div>  
    `;
  
    const container = document.getElementById("home-progress");
    if (container) container.innerHTML = triangle;
  })();
  
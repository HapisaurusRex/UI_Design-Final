// feedback and final score
const expectedAll = {
    '1': { base: 'Wool',      mid: 'Fleece',   outer: 'GoreTex'    },
    '2': { base: 'Synthetic', mid: 'None',     outer: 'Ventilated' }
  };
  const feedbackAll = {
    '1': {
      base:  "Merino wool wicks moisture and regulates temperature.",
      mid:   "Fleece is warm, breathable, and lightweight.",
      outer: "Gore-Tex blocks wind and snow while breathing."
    },
    '2': {
      base:  "Dense synthetics pull sweat off your skin, keeping you cool.",
      mid:   "No mid-layer needed in hot, humid weather!",
      outer: "Ventilated windbreakers keep rain out but let heat escape."
    }
  };
  
  function handleQuiz(containerId, selectorList, expected, feedback, prefix, results) {
    const layers = ['base','mid','outer'];
    let current = 0;
    // Track used answers per layer instead of globally
    const usedAnswers = {
      base: new Set(),
      mid: new Set(),
      outer: new Set()
    };
  
    // dragstart → set data
    document.querySelectorAll(selectorList).forEach(el => {
      el.addEventListener('dragstart', e => {
        if (el.getAttribute('draggable') === 'true') {
          e.dataTransfer.setData('text/plain', el.dataset.name);
        }
      });
    });
  
    function updateDraggables() {
      document.querySelectorAll(selectorList).forEach(el => {
        const name = el.dataset.name;
        const currentLayer = layers[current];
        const layerId = `layer${prefix}-${currentLayer}`;
        const inCurrent = el.closest('.layer-section')?.id === layerId;
        
        // Only check usedAnswers for the current layer
        if (!inCurrent || usedAnswers[currentLayer].has(name)) {
          el.setAttribute('draggable', false);
          el.style.opacity = '0.4'; el.style.cursor = 'not-allowed';
        } else {
          el.setAttribute('draggable', true);
          el.style.opacity = '1'; el.style.cursor = 'grab';
        }
      });
    }
  
    updateDraggables();
  
    const container = document.getElementById(containerId);
    container.addEventListener('dragover', e => e.preventDefault());
    container.addEventListener('drop', e => {
      e.preventDefault();
      const chosen = e.dataTransfer.getData('text/plain');
      const layer = layers[current];
      const fb = document.getElementById(`feedback-box-${prefix}`);
      fb.style.display = 'block';
      
      if (!results[prefix]) results[prefix] = {};
      if (results[prefix][layer] !== undefined) return;
      
      const isCorrect = chosen === expected[layer];
      results[prefix][layer] = isCorrect;
      
      // Add to used answers for this layer only
      usedAnswers[layer].add(chosen);
      
      fb.innerHTML = isCorrect
        ? `<span class="text-success">✓</span> ${feedback[layer] || ''}`
        : `<span class="text-danger">✗</span> Incorrect`;
      
      // mark ✓/✗ icon
      const optContainer = document.getElementById(`layer${prefix}-${layer}`);
      optContainer.querySelectorAll('.option').forEach(opt => {
        const img = opt.querySelector('[data-name]');
        if (img?.dataset.name === chosen) {
          const icon = opt.querySelector('.result-icon');
          icon.innerText = isCorrect ? '✓' : '✗';
          icon.classList.add(isCorrect ? 'text-success' : 'text-danger');
          
          // Move the image to the scooter container
          const scooterContainer = document.getElementById(`scooter-container-${prefix}`);
          const newImage = img.cloneNode(true); 
          newImage.classList.add('dropped-item');

          newImage.style.location = 'absolute';

          newImage.style.width = '160px';  // Bigger size
          newImage.style.height = '160px';
          
          // Position in the center of the scooter body with z-index for layering
          newImage.style.top = '25%';  // Center on scooter body vertically
          newImage.style.left = '10%'; // Center on scooter body horizontally
          
          // Set z-index based on layer, so outer layers appear on top
          if (layer === 'base') {
            newImage.style.zIndex = '1';
          } else if (layer === 'mid') {
            newImage.style.zIndex = '2';
          } else if (layer === 'outer') {
            newImage.style.zIndex = '3';
          }

          newImage.style.opacity = '1';
          
          // Add a data attribute for layer identification
          newImage.setAttribute('data-layer', layer);
          
          scooterContainer.appendChild(newImage);
          
          // Disable further dragging for the image
          newImage.setAttribute('draggable', false);
        }
      });
      
      // next
      current++;
      if (current < layers.length) {
        document.getElementById(`layer${prefix}-${layers[current]}`).style.display = 'block';
      }
      updateDraggables();
      
      // final?
      const done1 = Object.keys(results['1']||{}).length === 3;
      const done2 = Object.keys(results['2']||{}).length === 3;
      if (done1 && done2) showScore(results);
    });
  }
  
  function showScore(results) {
    const scoreSection = document.getElementById('score-section');
    const scoreCount   = document.getElementById('score-count');
    const answerList   = document.getElementById('correct-answers');
    let score = 0;
    const details = [];
    answerList.innerHTML = ' ';
  
    for (const q of ['1','2']) {
      for (const layer of ['base','mid','outer']) {
        if (results[q][layer]) {
          score++;
        } else {
          const feedback = `
            Scenario ${q} – ${layer}: Correct answer was ${expectedAll[q][layer]}.
            ${feedbackAll[q][layer]}
          `;
          details.push(feedback);
          const li = document.createElement('li');
          li.innerHTML = `<strong>${feedback}</strong>`;
          answerList.appendChild(li);
        }
      }
    }
  
    scoreCount.textContent = score;
    scoreSection.style.display = 'block';
    localStorage.setItem('lastScore', score);
  
    // Send to backend
    fetch('/submit_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score, details })
    })
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error('Error submitting score:', err));
  }
  
  
  const results = {};
  const savedScore = localStorage.getItem('lastScore');
  if (savedScore !== null) {
    document.getElementById('score-count').textContent = savedScore;
    document.getElementById('score-section').style.display = 'block';
  }
  
  handleQuiz(
    'scooter-container-1',
    '.material1',
    { base: 'Wool', mid: 'Fleece', outer: 'GoreTex' },
    feedbackAll['1'],
    '1',
    results
  );
  handleQuiz(
    'scooter-container-2',
    '.material2, .no-need-box, .windbreaker-box',
    { base: 'Synthetic', mid: 'None', outer: 'Ventilated' },
    feedbackAll['2'],
    '2',
    results
  );
  document.getElementById('resetBtnGlobal').onclick = () => location.reload();

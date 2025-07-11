// ── expected answers ──
const expectedAll = {
  '1': { base: 'Wool',      mid: 'Fleece',   outer: 'Windbreaking Synthetics'    },
  '2': { base: 'Cotton',    mid: 'None',     outer: 'Ventilated' }
};

// ── feedback messages ──
const feedbackAll = {
  '1': {
    base:  "Merino wool wicks moisture and regulates temperature.",
    mid:   "Fleece is warm, breathable, and lightweight.",
    outer: "Windbreaking synthetics like Gore-Tex blocks wind and snow while breathing."
  },
  '2': {
    base:  "Pulls sweat off your skin and helps it evaporate, keeping you cool and dry.",
    mid:   "No mid-layer needed in hot, humid weather!",
    outer: "Ventilated windbreakers keep rain out but let heat escape."
  }
};

// ── drag/drop and per-scenario logic ──
function handleQuiz(containerId, selectorList, expected, feedback, prefix, results) {
  const layers = ['base','mid','outer'];
  let current = 0;
  const usedAnswers = { base: new Set(), mid: new Set(), outer: new Set() };

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
      const layer = layers[current];
      const sectionId = `layer${prefix}-${layer}`;
      const inThisSection = el.closest('.layer-section')?.id === sectionId;
      if (!inThisSection || usedAnswers[layer].has(name)) {
        el.setAttribute('draggable', false);
        el.style.opacity = '0.4';
        el.style.cursor = 'not-allowed';
      } else {
        el.setAttribute('draggable', true);
        el.style.opacity = '1';
        el.style.cursor = 'grab';
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
    const fbBox = document.getElementById(`feedback-box-${prefix}`);
    fbBox.style.display = 'block';

    if (!results[prefix]) results[prefix] = {};
    if (results[prefix][layer] !== undefined) return;

    const isCorrect = chosen === expected[layer];
    results[prefix][layer] = isCorrect;
    usedAnswers[layer].add(chosen);

    fbBox.innerHTML = isCorrect
      ? `<span class="text-success">✓</span> ${feedback[layer] || ''}`
      : `<span class="text-danger">✗</span> Incorrect`;

    // mark icon and clone image onto scooter
    const section = document.getElementById(`layer${prefix}-${layer}`);
    section.querySelectorAll('.option').forEach(opt => {
      const img = opt.querySelector('[data-name]');
      if (img?.dataset.name === chosen) {
        const icon = opt.querySelector('.result-icon');
        icon.innerText = isCorrect ? '✓' : '✗';
        icon.classList.add(isCorrect ? 'text-success' : 'text-danger');

        let originalScooterWidth = null;
        let originalScooterHeight = null;
        const scooterImg = document.getElementById(`scooter-${prefix}`);
        scooterImg.onload = function() {
          originalScooterWidth = this.offsetWidth;
          originalScooterHeight = this.offsetHeight;
        };
        
        // If the image is already loaded, get dimensions now
        if (scooterImg.complete) {
          originalScooterWidth = scooterImg.offsetWidth;
          originalScooterHeight = scooterImg.offsetHeight;
        }

        // Now modify the code that adds clothing to the scooter:
        const scooterContainer = document.getElementById(`scooter-container-${prefix}`);
  // Create a wrapper specifically for positioning items if it doesn't exist
        let scooterWrapper = document.querySelector(`#scooter-container-${prefix} .scooter-wrapper`);
        if (!scooterWrapper) {
          scooterWrapper = document.createElement('div');
          scooterWrapper.classList.add('scooter-wrapper');
          scooterWrapper.style.position = 'relative';
          scooterWrapper.style.display = 'inline-block';
          
          // Insert wrapper at the same position as the scooter image
          scooterImg.parentNode.insertBefore(scooterWrapper, scooterImg);
          scooterWrapper.appendChild(scooterImg);
        }
        const newImg = img.cloneNode(true);
        newImg.classList.add('dropped-item');
        newImg.setAttribute('data-layer', layer);
        newImg.setAttribute('draggable', false);
        newImg.style.position = 'absolute';
        // Calculate current scale ratio
        const currentScooterWidth = scooterImg.offsetWidth;
        const scaleRatio = currentScooterWidth / originalScooterWidth || 1;

        // Set fixed clothing size proportional to original scooter size
        const CLOTHING_BASE_WIDTH = 170; // Original intended width in pixels
        newImg.style.width = (CLOTHING_BASE_WIDTH * scaleRatio) + 'px';
        newImg.style.height = 'auto';

        // Position clothing
        newImg.style.top = '25%';
        newImg.style.left = '5%';
        newImg.style.zIndex = layer === 'base' ? 1 : layer === 'mid' ? 2 : 3;
        scooterWrapper.appendChild(newImg);

        // Add a resize handler to maintain correct scaling
        if (!window.clothingResizeHandlerAdded) {
          window.clothingResizeHandlerAdded = true;
          
          window.addEventListener('resize', function() {
            document.querySelectorAll('.dropped-item').forEach(function(item) {
              const scooterImg = item.parentElement.querySelector('img[id^="scooter-"]');
              if (scooterImg && originalScooterWidth) {
                const currentScooterWidth = scooterImg.offsetWidth;
                const scaleRatio = currentScooterWidth / originalScooterWidth;
                item.style.width = (CLOTHING_BASE_WIDTH * scaleRatio) + 'px';
              }
            });
          });
        }

        // Add CSS to make sure everything works correctly
        const styleEl = document.createElement('style');
        styleEl.textContent = `
          .scooter-wrapper {
            position: relative;
            display: inline-block;
          }
          .dropped-item {
            pointer-events: none;
            transition: width 0.1s ease-out;
          }
        `;
        if (!document.head.querySelector('style[data-for="scooter-game"]')) {
          styleEl.setAttribute('data-for', 'scooter-game');
          document.head.appendChild(styleEl);
        }
      }
    });

    // advance to next layer
    current++;
    if (current < layers.length) {
      document.getElementById(`layer${prefix}-${layers[current]}`).style.display = 'block';
    }
    updateDraggables();

    // only show score & summary once all are answered
    const done1 = Object.keys(results['1']||{}).length === 3;
    const done2 = Object.keys(results['2']||{}).length === 3;
    if (done1 && done2) showScore(results);
  });
}

// ── refactored score display ──
function showScore(results) {
  const sec        = document.getElementById('score-section');
  const cnt        = document.getElementById('score-count');
  const errSection = document.getElementById('error-section');
  const errDiv     = document.getElementById('error-list');

  let total = 0;
  const errorsByScenario = {};

  for (const q of ['1','2']) {
    for (const layer of ['base','mid','outer']) {
      const correct = results[q]?.[layer];
      if (correct) {
        total++;
      } else {
        if (!errorsByScenario[q]) errorsByScenario[q] = [];
        errorsByScenario[q].push({
          layer,
          expected: expectedAll[q][layer],
          feedback: feedbackAll[q][layer]
        });
      }
    }
  }

  // update score and clear old errors
  cnt.textContent = total;
  errDiv.innerHTML = '';

  // populate & show errors if any
  if (Object.keys(errorsByScenario).length) {
    Object.keys(errorsByScenario).forEach(q => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('mb-3');
      const hdr = document.createElement('h6');
      hdr.textContent = `Scenario ${q}`;
      wrapper.appendChild(hdr);

      const ul = document.createElement('ul');
      errorsByScenario[q].forEach(err => {
        const layerName = err.layer.charAt(0).toUpperCase() + err.layer.slice(1);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${layerName}:</strong> Correct answer was ${err.expected}. ${err.feedback}`;
        ul.appendChild(li);
      });
      wrapper.appendChild(ul);
      errDiv.appendChild(wrapper);
    });
    errSection.style.display = 'block';
  } else {
    errSection.style.display = 'none';
  }

  sec.style.display = 'block';

  // ── Persist the new score for next load ──
  fetch('/submit_score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: total })
  })
  .then(r => r.json())
  .then(data => console.log('Score saved:', data.message))
  .catch(err => console.error('Save failed:', err));
}

// ── initialization ──
document.addEventListener('DOMContentLoaded', () => {
  const results = {};

  // restore only the total score
  fetch('/get_score')
    .then(response => response.json())
    .then(data => {
      if (data.score !== null) {
        document.getElementById('score-count').textContent = data.score;
        document.getElementById('score-section').style.display = 'block';
        document.getElementById('error-section').style.display = 'none';
        document.getElementById('error-list').innerHTML = '';
      }
    });

  handleQuiz(
    'scooter-container-1',
    '.material1',
    expectedAll['1'],
    feedbackAll['1'],
    '1',
    results
  );
  handleQuiz(
    'scooter-container-2',
    '.material2, .no-need-box',
    expectedAll['2'],
    feedbackAll['2'],
    '2',
    results
  );

  // ── Reset Quiz button ──
  document
    .getElementById('resetBtnGlobal')
    .addEventListener('click', () => window.location.reload());
});

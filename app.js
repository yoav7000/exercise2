const DEFAULT_FLEX = {
  direction: 'row',
  justify: 'flex-start',
  align: 'flex-start',
  wrap: 'nowrap'
};

const dom = {
  levelIndicator: document.getElementById('level-indicator'),
  attemptIndicator: document.getElementById('attempt-indicator'),
  levelSelector: document.getElementById('level-selector'),
  stageTitle: document.getElementById('stage-title'),
  stageInstruction: document.getElementById('stage-instruction'),
  propDirection: document.getElementById('prop-direction'),
  propJustify: document.getElementById('prop-justify'),
  propAlign: document.getElementById('prop-align'),
  propWrap: document.getElementById('prop-wrap'),
  btnCheck: document.getElementById('btn-check'),
  btnReset: document.getElementById('btn-reset'),
  btnNext: document.getElementById('btn-next'),
  feedbackAlert: document.getElementById('feedback-alert'),
  gameBoard: document.getElementById('game-board'),
  targetsLayer: document.getElementById('targets-layer'),
  shipsLayer: document.getElementById('ships-layer'),
  completionModal: document.getElementById('completion-modal'),
  modalSummary: document.getElementById('modal-summary'),
  btnRestartGame: document.getElementById('btn-restart-game')
};

let currentLevelIndex = 0;
let attemptsCount = 0;

function applyPlayerStyles() {
  dom.shipsLayer.style.flexDirection = dom.propDirection.value;
  dom.shipsLayer.style.justifyContent = dom.propJustify.value;
  dom.shipsLayer.style.alignItems = dom.propAlign.value;
  dom.shipsLayer.style.flexWrap = dom.propWrap.value;
}

function initPropertyListeners() {
  const selects = [dom.propDirection, dom.propJustify, dom.propAlign, dom.propWrap];
  selects.forEach(select => {
    select.addEventListener('change', () => {
      applyPlayerStyles();
      clearFeedback();
    });
  });
}

function clearFeedback() {
  dom.feedbackAlert.className = 'feedback-alert';
  dom.feedbackAlert.textContent = '';
}

function renderBoardItems(count, isWrapMode = false) {
  dom.gameBoard.classList.toggle('wrap-mode', isWrapMode);
  dom.targetsLayer.innerHTML = '';
  dom.shipsLayer.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const target = document.createElement('div');
    target.className = `target-pad color-${i}`;
    target.dataset.id = i;
    target.innerHTML = `<span class="target-icon">🪐</span><span class="target-tag">PAD ${i}</span>`;
    dom.targetsLayer.appendChild(target);

    const ship = document.createElement('div');
    ship.className = `ship-item color-${i}`;
    ship.dataset.id = i;
    ship.innerHTML = `<span class="ship-symbol">🚀</span><span class="ship-tag">SHIP ${i}</span>`;
    dom.shipsLayer.appendChild(ship);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPropertyListeners();
  renderBoardItems(3);
  applyPlayerStyles();
});

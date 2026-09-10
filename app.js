const LEVELS = [
  {
    id: 1,
    title: 'שלב 1: עגינה באגף ימין',
    instruction: 'סדרו את החלליות בצד ימין (סוף השורה) של מסלול התחנה.',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'flex-end', align: 'flex-start', wrap: 'nowrap' },
    activeProps: ['justify']
  },
  {
    id: 2,
    title: 'שלב 2: מירכוז אופקי',
    instruction: 'מרכזו את שתי החלליות באמצע מסלול השיגור.',
    itemsCount: 2,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'center', align: 'flex-start', wrap: 'nowrap' },
    activeProps: ['justify']
  },
  {
    id: 3,
    title: 'שלב 3: חלוקת מרווחים שווה',
    instruction: 'פזרו את שלוש החלליות במרווח מקסימלי ביניהן, כאשר החלליות הקיצוניות מוצמדות לדפנות.',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'space-between', align: 'flex-start', wrap: 'nowrap' },
    activeProps: ['justify']
  },
  {
    id: 4,
    title: 'שלב 4: יישור אנכי למרכז',
    instruction: 'יישרו את החלליות למרכז הגובה של לוח העגינה (בציר האנכי).',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'flex-start', align: 'center', wrap: 'nowrap' },
    activeProps: ['align']
  },
  {
    id: 5,
    title: 'שלב 5: יישור כפול - תחתית וריווח היקפי',
    instruction: 'מקמו את החלליות בתחתית הלוח ופזרו אותן עם מרווח שווה סביבן.',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'space-around', align: 'flex-end', wrap: 'nowrap' },
    activeProps: ['justify', 'align']
  },
  {
    id: 6,
    title: 'שלב 6: טור אנכי וממורכז',
    instruction: 'סדרו את הפריטים מלמעלה למטה ומרכזו אותם לרוחב הלוח.',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'column', justify: 'flex-start', align: 'center', wrap: 'nowrap' },
    activeProps: ['direction', 'align']
  },
  {
    id: 7,
    title: 'שלב 7: טור אנכי הפוך ומרווח',
    instruction: 'הפכו את כיוון הטור (מלמטה למעלה) ופזרו את החלליות במרווח שווה מקצה לקצה לאורך הטור.',
    itemsCount: 3,
    isWrap: false,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'column-reverse', justify: 'space-between', align: 'flex-start', wrap: 'nowrap' },
    activeProps: ['direction', 'justify']
  },
  {
    id: 8,
    title: 'שלב 8: גלישת שורות למטען',
    instruction: 'הפעילו גלישת שורות עבור ששת חלליות המטען כך שיתפרסו על פני מספר שורות, ופזרו אותן במרווח שווה בכל שורה.',
    itemsCount: 6,
    isWrap: true,
    defaults: { direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'nowrap' },
    target: { direction: 'row', justify: 'space-between', align: 'center', wrap: 'wrap' },
    activeProps: ['wrap', 'justify', 'align']
  }
];

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
let attemptsPerLevel = {};
let completedLevels = [];

function getPlayerValues() {
  return {
    direction: dom.propDirection.value,
    justify: dom.propJustify.value,
    align: dom.propAlign.value,
    wrap: dom.propWrap.value
  };
}

function applyPlayerStyles() {
  const vals = getPlayerValues();
  dom.shipsLayer.style.flexDirection = vals.direction;
  dom.shipsLayer.style.justifyContent = vals.justify;
  dom.shipsLayer.style.alignItems = vals.align;
  dom.shipsLayer.style.flexWrap = vals.wrap;
}

function applyTargetStyles(target) {
  dom.targetsLayer.style.flexDirection = target.direction;
  dom.targetsLayer.style.justifyContent = target.justify;
  dom.targetsLayer.style.alignItems = target.align;
  dom.targetsLayer.style.flexWrap = target.wrap;
}

function setControls(values, activeProps) {
  dom.propDirection.value = values.direction;
  dom.propJustify.value = values.justify;
  dom.propAlign.value = values.align;
  dom.propWrap.value = values.wrap;

  dom.propDirection.disabled = !activeProps.includes('direction');
  dom.propJustify.disabled = !activeProps.includes('justify');
  dom.propAlign.disabled = !activeProps.includes('align');
  dom.propWrap.disabled = !activeProps.includes('wrap');
}

function renderBoardItems(count, isWrapMode) {
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

function clearFeedback() {
  dom.feedbackAlert.className = 'feedback-alert';
  dom.feedbackAlert.textContent = '';
  const pads = dom.targetsLayer.querySelectorAll('.target-pad');
  pads.forEach(pad => pad.classList.remove('match'));
}

function showFeedback(type, text) {
  dom.feedbackAlert.className = `feedback-alert visible ${type}`;
  dom.feedbackAlert.textContent = text;
}

function checkPositionsMatch() {
  const ships = Array.from(dom.shipsLayer.children);
  const targets = Array.from(dom.targetsLayer.children);

  if (ships.length !== targets.length) return false;

  for (let i = 0; i < ships.length; i++) {
    const sRect = ships[i].getBoundingClientRect();
    const tRect = targets[i].getBoundingClientRect();

    const sCenterX = sRect.left + sRect.width / 2;
    const sCenterY = sRect.top + sRect.height / 2;
    const tCenterX = tRect.left + tRect.width / 2;
    const tCenterY = tRect.top + tRect.height / 2;

    const distX = Math.abs(sCenterX - tCenterX);
    const distY = Math.abs(sCenterY - tCenterY);

    if (distX > 10 || distY > 10) {
      return false;
    }
  }

  return true;
}

function checkSolution() {
  const lvl = LEVELS[currentLevelIndex];
  attemptsPerLevel[lvl.id] = (attemptsPerLevel[lvl.id] || 0) + 1;

  const playerVals = getPlayerValues();
  let propsMatch = true;

  for (const prop of lvl.activeProps) {
    if (playerVals[prop] !== lvl.target[prop]) {
      propsMatch = false;
      break;
    }
  }

  const positionsMatch = checkPositionsMatch();

  if (propsMatch || positionsMatch) {
    const pads = dom.targetsLayer.querySelectorAll('.target-pad');
    pads.forEach(pad => pad.classList.add('match'));

    showFeedback('success', 'מעולה! כל החלליות עגנו בהצלחה בתחנת החלל.');
    dom.btnNext.disabled = false;

    if (!completedLevels.includes(lvl.id)) {
      completedLevels.push(lvl.id);
    }

    if (completedLevels.length === LEVELS.length) {
      showCompletionModal();
    }
  } else {
    dom.gameBoard.classList.remove('shake');
    void dom.gameBoard.offsetWidth;
    dom.gameBoard.classList.add('shake');
    showFeedback('error', 'המיקום עדיין אינו מדויק. בדקו שוב את הוראות השלב.');
  }
}

function resetCurrentLevel() {
  const lvl = LEVELS[currentLevelIndex];
  setControls(lvl.defaults, lvl.activeProps);
  applyPlayerStyles();
  clearFeedback();
  if (!completedLevels.includes(lvl.id)) {
    dom.btnNext.disabled = true;
  }
}

function nextLevel() {
  if (currentLevelIndex < LEVELS.length - 1) {
    currentLevelIndex++;
    loadLevel(currentLevelIndex);
  }
}

function showCompletionModal() {
  let totalAttempts = 0;
  for (const id in attemptsPerLevel) {
    totalAttempts += attemptsPerLevel[id];
  }
  dom.modalSummary.textContent = `סה"כ ניסיונות בכל השלבים: ${totalAttempts}`;
  dom.completionModal.classList.remove('hidden');
}

function restartGame() {
  dom.completionModal.classList.add('hidden');
  completedLevels = [];
  attemptsPerLevel = {};
  currentLevelIndex = 0;
  loadLevel(0);
}

function loadLevel(index) {
  const lvl = LEVELS[index];
  dom.stageTitle.textContent = lvl.title;
  dom.stageInstruction.textContent = lvl.instruction;

  renderBoardItems(lvl.itemsCount, lvl.isWrap);
  applyTargetStyles(lvl.target);
  setControls(lvl.defaults, lvl.activeProps);
  applyPlayerStyles();
  clearFeedback();

  dom.btnNext.disabled = !completedLevels.includes(lvl.id);
}

function initEvents() {
  const selects = [dom.propDirection, dom.propJustify, dom.propAlign, dom.propWrap];
  selects.forEach(select => {
    select.addEventListener('change', () => {
      applyPlayerStyles();
      clearFeedback();
    });
  });

  dom.btnCheck.addEventListener('click', checkSolution);
  dom.btnReset.addEventListener('click', resetCurrentLevel);
  dom.btnNext.addEventListener('click', nextLevel);
  dom.btnRestartGame.addEventListener('click', restartGame);
}

document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  loadLevel(0);
});

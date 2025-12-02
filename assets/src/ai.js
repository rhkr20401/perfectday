const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const submitButton = document.querySelector('#submit');
const tabTargets = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tabpanel');
let currentStep = 0;

function initStep0(panel){
  const regionButtons = panel.querySelectorAll(".ai-region-btn");
  const addressInput = panel.querySelector("#addressInput");
  const addressBtn = panel.querySelector("#btnAddressSearch");
  const MAX_SELECT = 3;
  function updateState() {
    const selectedCount = panel.querySelectorAll(".ai-region-btn.active").length;

    if (selectedCount >= MAX_SELECT) {
      regionButtons.forEach(btn => {
        if (!btn.classList.contains("active")) {
          btn.classList.add("disabled");
        }
      });
    } else {
      regionButtons.forEach(btn => btn.classList.remove("disabled"));
    }
    updateNextButtonEnabled();
  }

  regionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled") && !btn.classList.contains("active")) {
        return;
      }
      const selectedCount = panel.querySelectorAll(".ai-region-btn.active").length;
      const isActive = btn.classList.contains("active");
      if (isActive) {
        btn.classList.remove("active");
      } else {
        if (selectedCount < MAX_SELECT) {
          btn.classList.add("active");
        }
      }
      updateState();
    });
  });

  if (addressBtn) {
    addressBtn.addEventListener("click", () => {
      new daum.Postcode({
        oncomplete: function(data) {
          const rough = `${data.sido || ""} ${data.sigungu || ""}`.trim();
          if (addressInput) {
            addressInput.value = rough;
          }
          updateNextButtonEnabled();
        }
      }).open();
    });
  }

  updateNextButtonEnabled();
}

function canGoNext0(panel){
  const selectedCount = panel.querySelectorAll(".ai-region-btn.active").length;
  const addrInput = panel.querySelector("#addressInput");
  const addr = addrInput ? addrInput.value.trim() : "";
  return selectedCount > 0 || addr !== "";
}

function initStep1(panel){
  const courseList = panel.querySelector(".course-list");
  const addCourseBtn = panel.querySelector(".btn-add");
  let courseCount = panel.querySelectorAll(".course-item").length;
  const MIN_COURSE = 2;
  const MAX_COURSE = 5;

  function setupTypeButtons(courseItem) {
    const buttons = courseItem.querySelectorAll(".type-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const isActive = btn.classList.contains("active");
        if (isActive) {
          btn.classList.remove("active");
        } else {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        }
        updateNextButtonEnabled();
      });
    });
  }

  function setupRemoveButton(courseItem) {
    const removeBtn = courseItem.querySelector(".course-remove");
    removeBtn.addEventListener("click", () => {
      if (courseCount > MIN_COURSE) {
        courseItem.remove();
        courseCount--;
        renumberCourses();
        updateRemoveButtonsState();
        updateAddButtonState();
        updateNextButtonEnabled();
      }
    });
  }

  function renumberCourses() {
    panel.querySelectorAll(".course-item").forEach((item, i) => {
      const badge = item.querySelector(".badge");
      if (badge) badge.textContent = i + 1;
    });
  }

  function updateRemoveButtonsState() {
    panel.querySelectorAll(".course-remove").forEach(btn => {
      btn.disabled = courseCount <= MIN_COURSE;
    });
  }

  function updateAddButtonState() {
    if (addCourseBtn) {
      addCourseBtn.disabled = courseCount >= MAX_COURSE;
    }
  }

  function createCourseItem(index) {
    const item = document.createElement("div");
    item.classList.add("course-item");
    item.innerHTML = `
      <span class="badge">${index}</span>
      <div class="type-buttons">
        <button class="type-btn" type="button">맛집</button>
        <button class="type-btn" type="button">카페</button>
        <button class="type-btn" type="button">놀거리+</button>
      </div>
      <button class="course-remove" type="button">×</button>
    `;
    setupTypeButtons(item);
    setupRemoveButton(item);
    return item;
  }

  panel.querySelectorAll(".course-item").forEach(item => {
    setupTypeButtons(item);
    setupRemoveButton(item);
  });
  updateRemoveButtonsState();
  updateAddButtonState();

  if (addCourseBtn) {
    addCourseBtn.addEventListener("click", () => {
      if (courseCount >= MAX_COURSE) return;
      courseCount++;
      const newCourse = createCourseItem(courseCount);
      if (courseList) {
        courseList.appendChild(newCourse);
      }
      updateRemoveButtonsState();
      updateAddButtonState();
      updateNextButtonEnabled();
    });
  }
  updateNextButtonEnabled();
}

function canGoNext1(panel){
  const items = panel.querySelectorAll(".course-item");
  if (!items.length) return false;
  for (const item of items) {
    const activeBtn = item.querySelector(".type-btn.active");
    if (!activeBtn) return false;
  }
  return true;
}

function setupRangeSlider({
  trackId,
  rangeId,
  thumbMinId,
  thumbMaxId,
  inputMinId,
  inputMaxId,
  minValue,
  maxValue,
  step,
  format
}) {
  const track = document.getElementById(trackId);
  const rangeBar = document.getElementById(rangeId);
  const thumbMin = document.getElementById(thumbMinId);
  const thumbMax = document.getElementById(thumbMaxId);
  const inputMin = document.getElementById(inputMinId);
  const inputMax = document.getElementById(inputMaxId);
  let currentMin = minValue;
  let currentMax = maxValue;
  let activeThumb = null;
  inputMin.value = currentMin;
  inputMax.value = currentMax;

  function valueToRatio(v) {
    return (v - minValue) / (maxValue - minValue);
  }
  function ratioToValue(r) {
    const raw = minValue + r * (maxValue - minValue);
    return Math.round(raw / step) * step;
  }
  function clamp() {
    currentMin = Math.max(minValue, Math.min(maxValue, currentMin));
    currentMax = Math.max(minValue, Math.min(maxValue, currentMax));
    if (currentMin > currentMax) {
      if (activeThumb === "min") currentMax = currentMin;
      else currentMin = currentMax;
    }
  }

  function updateUI() {
    const rect = track.getBoundingClientRect();
    const width = rect.width;
    const minX = width * valueToRatio(currentMin);
    const maxX = width * valueToRatio(currentMax);
    thumbMin.style.left = `${minX}px`;
    thumbMax.style.left = `${maxX}px`;
    rangeBar.style.left = `${minX}px`;
    rangeBar.style.width = `${maxX - minX}px`;
    inputMin.value = currentMin;
    inputMax.value = currentMax;
  }

  inputMin.addEventListener("input", () => {
    activeThumb = "min";
    currentMin = Number(inputMin.value);
    clamp();
    updateUI();
    activeThumb = null;
  });
  inputMax.addEventListener("input", () => {
    activeThumb = "max";
    currentMax = Number(inputMax.value);
    clamp();
    updateUI();
    activeThumb = null;
  });

  thumbMin.addEventListener("mousedown", () => (activeThumb = "min"));
  thumbMax.addEventListener("mousedown", () => (activeThumb = "max"));
  track.addEventListener("mousedown", (e) => {
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const val = ratioToValue(Math.max(0, Math.min(1, ratio)));
    const distMin = Math.abs(val - currentMin);
    const distMax = Math.abs(val - currentMax);
    activeThumb = distMin <= distMax ? "min" : "max";
    if (activeThumb === "min") currentMin = val;
    else currentMax = val;
    clamp();
    updateUI();
  });

  window.addEventListener("mousemove", (e) => {
    if (!activeThumb) return;
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const val = ratioToValue(Math.max(0, Math.min(1, ratio)));
    if (activeThumb === "min") currentMin = val;
    else currentMax = val;
    clamp();
    updateUI();
  });
  window.addEventListener("mouseup", () => (activeThumb = null));
  window.addEventListener("resize", updateUI);
  window.addEventListener("load", updateUI);
}

setupRangeSlider({
  trackId: "track-time",
  rangeId: "range-time",
  thumbMinId: "thumb-time-min",
  thumbMaxId: "thumb-time-max",
  inputMinId: "input-time-min",
  inputMaxId: "input-time-max",
  minValue: 0,
  maxValue: 60,
  step: 5,
  format: (v) => (v >= 60 ? "1시간 이상" : v + "분")
});
setupRangeSlider({
  trackId: "track-price",
  rangeId: "range-price",
  thumbMinId: "thumb-price-min",
  thumbMaxId: "thumb-price-max",
  inputMinId: "input-price-min",
  inputMaxId: "input-price-max",
  minValue: 0,
  maxValue: 100000,
  step: 5000,
  format: (v) => (v >= 100000 ? "10만원 이상" : v.toLocaleString() + "원")
});

function initStep2(panel){
  window.dispatchEvent(new Event('resize'));
}
function canGoNext2(panel){
  return true;
}

const stepDefs = [
  { init: initStep0, canGoNext: canGoNext0 },
  { init: initStep1, canGoNext: canGoNext1 },
  { init: initStep2, canGoNext: canGoNext2 }
];
const stepInited = [false, false, false];

function goToStep(index){
  if (index < 0 || index >= tabPanels.length) return;
  tabTargets[currentStep].classList.remove('active');
  tabPanels[currentStep].classList.add('hidden');
  currentStep = index;
  tabTargets[currentStep].classList.add('active');
  tabPanels[currentStep].classList.remove('hidden');
  updateStatusDisplay();
  updateNextButtonEnabled();
  const def = stepDefs[currentStep];
  const panel = tabPanels[currentStep];
  if (def && typeof def.init === 'function' && !stepInited[currentStep]) {
    def.init(panel);
    stepInited[currentStep] = true;
  }
}

function updateStatusDisplay(){
  if(currentStep === tabPanels.length - 1){
    nextButton.classList.add('hidden');
    prevButton.classList.remove('hidden');
    submitButton.classList.remove('hidden');
  }else if(currentStep === 0){
    nextButton.classList.remove('hidden');
    prevButton.classList.add('hidden');
    submitButton.classList.add('hidden');
  }else{
    nextButton.classList.remove('hidden');
    prevButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
  }
}

function updateNextButtonEnabled() {
  const def = stepDefs[currentStep];
  const panel = tabPanels[currentStep];
  if (!def || typeof def.canGoNext !== 'function') {
    nextButton.classList.remove('is-disabled');
    return;
  }
  const ok = def.canGoNext(panel);
  nextButton.classList.toggle('is-disabled', !ok);
}

nextButton.addEventListener('click', () => {
  const def = stepDefs[currentStep];
  const panel = tabPanels[currentStep];

  if (def && typeof def.canGoNext === 'function') {
    const ok = def.canGoNext(panel);

    if (!ok) {
      let message = '';
      if (currentStep === 0) {
        message = '지역을 선택해주세요';
      } else if (currentStep === 1) {
        message = '코스의 장소와 종류를 선택해주세요';
      } else {
        message = '입력값을 확인해주세요';
      }
      alert(message);
      return;
    }
  }
  goToStep(currentStep + 1);
});

prevButton.addEventListener('click', () => {
  if (currentStep > 0) {
    goToStep(currentStep - 1);
  }
});

submitButton.addEventListener('click', (e) => {
  const def = stepDefs[currentStep];
  const panel = tabPanels[currentStep];

  if (def && typeof def.canGoNext === 'function') {
    const ok = def.canGoNext(panel);
    if (!ok) {
      e.preventDefault();
      alert('코스의 장소와 종류를 선택해주세요');
    }
  }
});

goToStep(0);
updateNextButtonEnabled();
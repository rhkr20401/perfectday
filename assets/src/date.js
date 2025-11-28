let currentYear = 2025;
let currentMonth = 10;

const monthLabel = document.getElementById("monthLabel");
const calendarBody = document.getElementById("calendarBody");

const selectedDateText = document.getElementById("selectedDateText");
const eventList = document.getElementById("eventList");
const addEventBtn = document.getElementById("addEventBtn");

const monthPicker   = document.getElementById("monthPicker");
const monthToggle   = document.getElementById("monthSelectorToggle");
const mpYearLabel   = document.getElementById("mpYearLabel");
const mpCancelBtn   = document.getElementById("mpCancelBtn");
const mpConfirmBtn  = document.getElementById("mpConfirmBtn");
const mpYearPrev    = document.getElementById("mpYearPrev");
const mpYearNext    = document.getElementById("mpYearNext");
const mpMonthButtons = document.querySelectorAll(".mp-month-grid button");
let tempYear = currentYear;
let tempMonth = currentMonth;
const today = new Date();
const todayY = today.getFullYear();
const todayM = today.getMonth();
const todayD = today.getDate();

const events = [
  {
    type: "single",
    date: "2025-11-18",
    title: "1일짜리 예시 일정",
    courses: [
      {
        step: 1,
        time: "12:00",
        place: "궤도에 오르다",
        address: "서울 광진구 광나루로 416 건회빌딩 1층 102호"
      },
      {
        step: 2,
        time: "15:00",
        place: "브렛서울",
        address: "서울 광진구 광나루로 410 1층 101호"
      },
      {
        step: 3,
        time: "18:30",
        place: "반지만들기카페 건대점",
        address: "서울 광진구 동일로20길 89 성신빌딩 2층"
      }
    ]
  },
  {
    type: "single",
    date: "2025-11-28",
    title: "1일짜리 예시 일정",
    color: "#A2FFA2",
    courses: [
      {
        step: 1,
        time: "12:00",
        place: "스카이가든",
        address: "서울특별시 송파구 석촌동 158"
      },
      {
        step: 2,
        time: "14:00",
        place: "송리단길",
        address: "서울 송파구 송파동 36-8"
      },
      {
        step: 3,
        time: "16:00",
        place: "빌라드도이",
        address: "서울 송파구 송파동 19-4"
      }
    ]
  },
  {
    type: "range",
    start: "2025-11-08",
    end: "2025-11-09",
    title: "코스 예시 일정",
    courses: [
      {
        step: 1,
        time: "12:00",
        place: "궤도에 오르다",
        address: "서울 광진구 광나루로 416 건회빌딩 1층 102호"
      },
      {
        step: 2,
        time: "15:00",
        place: "브렛서울",
        address: "서울 광진구 광나루로 410 1층 101호"
      },
      {
        step: 3,
        time: "18:30",
        place: "반지만들기카페 건대점",
        address: "서울 광진구 동일로20길 89 성신빌딩 2층"
      }
    ]
  }
];

function toISO(y, m, d) {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function getEventsForDate(iso) {
  return events.filter(ev => {
    if (ev.type === "single") return ev.date === iso;
    if (ev.type === "range") return ev.start <= iso && iso <= ev.end;
    return false;
  });
}

function updateMonthLabel() {
  monthLabel.textContent = `${currentYear}년 ${currentMonth + 1}월`;
}

function renderCalendar(year, month) {
  updateMonthLabel();
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prev = new Date(year, month, 0);
  const prevYear = prev.getFullYear();
  const prevMonth = prev.getMonth();
  const prevLastDate = prev.getDate();
  const next = new Date(year, month + 1, 1);
  const nextYear = next.getFullYear();
  const nextMonth = next.getMonth();

  for (let i = firstDay - 1; i >= 0; i--) {
    createCell(prevYear, prevMonth, prevLastDate - i, true);
  }

  for (let d = 1; d <= lastDate; d++) {
    createCell(year, month, d, false);
  }

  const cellsSoFar = firstDay + lastDate;
  const rest = cellsSoFar % 7 === 0 ? 0 : 7 - (cellsSoFar % 7);
  for (let d = 1; d <= rest; d++) {
    createCell(nextYear, nextMonth, d, true);
  }

  selectedDateText.textContent = "날짜를 선택해주세요.";
  eventList.innerHTML = "";
  addEventBtn.style.display = "none";
}

function createCell(y, m, d, isOtherMonth) {
  const cell = document.createElement("div");
  cell.className = "date-cell";
  if (isOtherMonth) cell.classList.add("other-month");

  const span = document.createElement("span");
  span.className = "date-num";
  span.textContent = d;

  const iso = toISO(y, m, d);
  const dayEvents = getEventsForDate(iso);

  const singleEv = dayEvents.find(ev => ev.type === "single");
  if (singleEv) {
    cell.classList.add("event-single");
    if (singleEv.color) {
      span.style.backgroundColor = singleEv.color;
    }
  }

  const rangeEv = dayEvents.find(ev => ev.type === "range");
  if (rangeEv) {
    cell.classList.add("event-range");

    if (iso === rangeEv.start && iso === rangeEv.end) {
      cell.classList.add("range-start", "range-end");
    } else if (iso === rangeEv.start) {
      cell.classList.add("range-start");
    } else if (iso === rangeEv.end) {
      cell.classList.add("range-end");
    } else {
      cell.classList.add("range-middle");
    }
  }

  if (y === todayY && m === todayM && d === todayD) {
    cell.classList.add("today");
  }

  cell.addEventListener("click", () => onClickDate(cell, iso));

  cell.appendChild(span);
  calendarBody.appendChild(cell);
}

function renderCourses(eventObj) {
  eventList.innerHTML = "";

  const list = document.createElement("div");
  list.className = "course-list";

  eventObj.courses.forEach(course => {
    const item = document.createElement("div");
    item.className = "course-item";

    const left = document.createElement("div");
    left.className = "course-left";

    const step = document.createElement("div");
    step.className = "course-step";
    step.classList.add(`step-${course.step}`);
    step.textContent = course.step;

    const time = document.createElement("div");
    time.className = "course-time";
    time.textContent = course.time;

    left.appendChild(step);
    left.appendChild(time);

    const right = document.createElement("div");
    right.className = "course-right";

    const place = document.createElement("div");
    place.className = "course-place";
    place.textContent = course.place;

    const loc = document.createElement("div");
    loc.className = "course-location";
    loc.textContent = course.address;

    right.appendChild(place);
    right.appendChild(loc);

    item.appendChild(left);
    item.appendChild(right);

    list.appendChild(item);
  });

  eventList.appendChild(list);

  addEventBtn.style.display = "block";
  addEventBtn.textContent = "코스 변경하기";
  addEventBtn.onclick = () => {
    history.pushState({}, "", "/mycourse");
    render(); // 필요하면 링크 수정==============================================================================================================================================
  };
}

function onClickDate(cell, iso) {
  document
    .querySelectorAll(".date-cell.selected")
    .forEach(el => el.classList.remove("selected"));
  cell.classList.add("selected");

  const [yy, mm, dd] = iso.split("-");
  const yearNum = Number(yy);
  const monthNum = Number(mm);
  const dayNum = Number(dd);

  const dateObj = new Date(yearNum, monthNum - 1, dayNum);
  const weekdays = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
  const weekdayLabel = weekdays[dateObj.getDay()];

  selectedDateText.innerHTML = `
    ${yearNum}년 ${monthNum}월 ${dayNum}일
    <span class="selected-weekday">${weekdayLabel}</span>
  `;

  const dayEvents = getEventsForDate(iso);
  eventList.innerHTML = "";

  if (dayEvents.length) {
    const courseEvent = dayEvents.find(ev => ev.courses);

    if (courseEvent) {
      renderCourses(courseEvent);
    } else {
      dayEvents.forEach(ev => {
        const div = document.createElement("div");
        div.className = "event-text";
        div.textContent = ev.title || "일정";
        eventList.appendChild(div);
      });

      addEventBtn.style.display = "block";
      addEventBtn.textContent = "코스 추가하기";
      addEventBtn.onclick = () => {
        history.pushState({}, "", "/list-course");
        render(); /* =================================================================================================================================================== */
      };
    }
  } else {
    const div = document.createElement("div");
    div.className = "event-text empty-text";
    div.textContent = "등록된 일정이 없습니다.";
    eventList.appendChild(div);

    addEventBtn.style.display = "block";
    addEventBtn.textContent = "코스 추가하기";
    addEventBtn.onclick = () => {
      history.pushState({}, "", "/list-course");
      render();
    };
  }
}

function updatePopupUI() {
  mpYearLabel.textContent = `${tempYear}년`;
  mpMonthButtons.forEach(btn => {
    const m = Number(btn.dataset.month);
    btn.classList.toggle("active", m === tempMonth);
  });
}

monthPicker.addEventListener("click", (e) => {
  if (e.target === monthPicker) {
    monthPicker.classList.remove("open");
  }
});

monthToggle.addEventListener("click", () => {
  tempYear = currentYear;
  tempMonth = currentMonth;
  monthPicker.classList.add("open");
  updatePopupUI();
});

mpCancelBtn.addEventListener("click", () => {
  monthPicker.classList.remove("open");
});

mpYearPrev.addEventListener("click", () => {
  tempYear--;
  updatePopupUI();
});
mpYearNext.addEventListener("click", () => {
  tempYear++;
  updatePopupUI();
});

mpMonthButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tempMonth = Number(btn.dataset.month);
    updatePopupUI();
  });
});
mpConfirmBtn.addEventListener("click", () => {
  currentYear = tempYear;
  currentMonth = tempMonth;
  renderCalendar(currentYear, currentMonth);
  monthPicker.classList.remove("open");
});

renderCalendar(currentYear, currentMonth);
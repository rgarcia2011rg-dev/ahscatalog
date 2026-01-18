        class Grades {
  constructor(ninth, tenth, eleventh, twelfth) {
    this.ninth = ninth;
    this.tenth = tenth;
    this.eleventh = eleventh;
    this.twelfth = twelfth;
  }
}

class Departments {
  constructor(cte, ela, fa, gen, jrotc, math, mcnl, pe, sci, sped, ss) {
    this.cte = cte;
    this.ela = ela;
    this.fa = fa;
    this.gen = gen;
    this.jrotc = jrotc;
    this.math = math;
    this.mcnl = mcnl;
    this.pe = pe;
    this.sci = sci;
    this.sped = sped;
    this.ss = ss;
  }
}

// ---------- STATE ----------
let state = {
  departments: new Departments(true, true, true, true, true, true, true, true, true, true, true),
  grades: new Grades(true, true, true, true),

  coreReplacement: { yes: true, no: true },
  hours: { zero: true, eighth: true, regular: true },

  courseDetails: false,
};

// ---------- CHECKBOXES ----------
const checkboxes = {
  // Departments
  deptCTE: document.querySelector("#Dept-CTE"),
  deptELA: document.querySelector("#Dept-ELA"),
  deptFA: document.querySelector("#Dept-FA"),
  deptGEN: document.querySelector("#Dept-GEN"),
  deptJROTC: document.querySelector("#Dept-JROTC"),
  deptMATH: document.querySelector("#Dept-MATH"),
  deptMCNL: document.querySelector("#Dept-MCNL"),
  deptPE: document.querySelector("#Dept-PE"),
  deptSCI: document.querySelector("#Dept-SCI"),
  deptSPED: document.querySelector("#Dept-SPED"),
  deptSS: document.querySelector("#Dept-SS"),

  // Grades
  gradeNinth: document.querySelector("#ninthCheck"),
  gradeTenth: document.querySelector("#tenthCheck"),
  gradeEleventh: document.querySelector("#eleventhCheck"),
  gradeTwelfth: document.querySelector("#twelfthCheck"),

  // Core Replacement
  coreYes: document.querySelector("#coreReplacement"),
  coreNo: document.querySelector("#notCoreReplacement"),

  // Hours
  hourZero: document.querySelector("#zeroHour"),
  hourEight: document.querySelector("#eighthHour"),
  hourRegular: document.querySelector("#regularHour"),

  // Details
  courseDetails: document.querySelector("#detailsCheck"),
};

init();

// ---------- STORAGE ----------
function readState() {
  try {
    return JSON.parse(sessionStorage.state);
  } catch {
    return null;
  }
}

function writeState(obj) {
  sessionStorage.setItem("state", JSON.stringify(obj));
}

// ---------- INIT ----------
function init() {
  const saved = readState();
  if (saved) state = saved;
  else writeState(state);

  attachEventListeners();
  updatePage();
}

// ---------- EVENT HELPERS ----------
function toggleState(mutator) {
  const s = readState();
  if (s) state = s;

  mutator();
  writeState(state);
  updatePage();
}

function safeOnChange(el, fn) {
  if (!el) return; // prevents runtime crash if HTML checkbox is missing
  el.addEventListener("change", fn);
}

// ---------- ATTACH LISTENERS (runs once) ----------
function attachEventListeners() {
  // Grades
  safeOnChange(checkboxes.gradeNinth, () => toggleState(() => (state.grades.ninth = !state.grades.ninth)));
  safeOnChange(checkboxes.gradeTenth, () => toggleState(() => (state.grades.tenth = !state.grades.tenth)));
  safeOnChange(checkboxes.gradeEleventh, () => toggleState(() => (state.grades.eleventh = !state.grades.eleventh)));
  safeOnChange(checkboxes.gradeTwelfth, () => toggleState(() => (state.grades.twelfth = !state.grades.twelfth)));

  // Core Replacement
  safeOnChange(checkboxes.coreYes, () => toggleState(() => (state.coreReplacement.yes = !state.coreReplacement.yes)));
  safeOnChange(checkboxes.coreNo, () => toggleState(() => (state.coreReplacement.no = !state.coreReplacement.no)));

  // Hours
  safeOnChange(checkboxes.hourZero, () => toggleState(() => (state.hours.zero = !state.hours.zero)));
  safeOnChange(checkboxes.hourEight, () => toggleState(() => (state.hours.eighth = !state.hours.eighth)));
  safeOnChange(checkboxes.hourRegular, () => toggleState(() => (state.hours.regular = !state.hours.regular)));

  // Details
  safeOnChange(checkboxes.courseDetails, () => toggleState(() => (state.courseDetails = !state.courseDetails)));

  // Departments (THIS IS WHAT YOU WERE MISSING)
  const deptMap = {
    deptCTE: "cte",
    deptELA: "ela",
    deptFA: "fa",
    deptGEN: "gen",
    deptJROTC: "jrotc",
    deptMATH: "math",
    deptMCNL: "mcnl",
    deptPE: "pe",
    deptSCI: "sci",
    deptSPED: "sped",
    deptSS: "ss",
  };

  Object.entries(deptMap).forEach(([checkboxKey, stateKey]) => {
    const el = checkboxes[checkboxKey];
    safeOnChange(el, () => toggleState(() => (state.departments[stateKey] = !state.departments[stateKey])));
  });
}

// ---------- UPDATE ----------
function updatePage() {
  // Sync checkbox UI from state (if checkbox exists)
  // Departments
  Object.keys(state.departments).forEach((key) => {
    const el = document.querySelector(`#Dept-${key.toUpperCase()}`);
    if (el) el.checked = state.departments[key];
  });

  // Grades
  if (checkboxes.gradeNinth) checkboxes.gradeNinth.checked = state.grades.ninth;
  if (checkboxes.gradeTenth) checkboxes.gradeTenth.checked = state.grades.tenth;
  if (checkboxes.gradeEleventh) checkboxes.gradeEleventh.checked = state.grades.eleventh;
  if (checkboxes.gradeTwelfth) checkboxes.gradeTwelfth.checked = state.grades.twelfth;

  // Core Replacement
  if (checkboxes.coreYes) checkboxes.coreYes.checked = state.coreReplacement.yes;
  if (checkboxes.coreNo) checkboxes.coreNo.checked = state.coreReplacement.no;

  // Hours
  if (checkboxes.hourZero) checkboxes.hourZero.checked = state.hours.zero;
  if (checkboxes.hourEight) checkboxes.hourEight.checked = state.hours.eighth;
  if (checkboxes.hourRegular) checkboxes.hourRegular.checked = state.hours.regular;

  // Details
  if (checkboxes.courseDetails) checkboxes.courseDetails.checked = state.courseDetails;

  // Apply filters
  showHideDepartments();
  showHideGrades();
  showHideCore();
  showHideHours();
  showHideClass("course-details", state.courseDetails);
}

// ---------- FILTERING ----------
function showHideClass(className, show) {
  document.querySelectorAll(`.${className}`).forEach((el) => {
    el.style.display = show ? "block" : "none";
  });
}

function showHide(showSelector, hideSelector) {
  document.querySelectorAll(hideSelector).forEach((el) => {
    el.style.display = "none";
  });

  if (!showSelector) return;

  document.querySelectorAll(showSelector).forEach((el) => {
    el.style.display = "block";
  });
}

// Grades
function getGradesSelector(g) {
  return [
    g.ninth && ".ninth-grade",
    g.tenth && ".tenth-grade",
    g.eleventh && ".eleventh-grade",
    g.twelfth && ".twelfth-grade",
  ]
    .filter(Boolean)
    .join(",");
}

function showHideGrades() {
  // Requires every course element to have class "grade-level"
  showHide(getGradesSelector(state.grades), ".grade-level");
}

// Departments
function getDepartmentsSelector(d) {
  return Object.entries(d)
    .filter(([_, v]) => v)
    .map(([k]) => `.Dept-${k.toUpperCase()}`)
    .join(",");
}

function showHideDepartments() {
  // Hides all courses then shows allowed departments
  showHide(getDepartmentsSelector(state.departments), ".department-div");
}

// Core Replacement
function showHideCore() {
  const show = [
    state.coreReplacement.yes && ".core-replacement",
    state.coreReplacement.no && ".not-core-replacement",
  ]
    .filter(Boolean)
    .join(",");

  showHide(show, ".core-replacement, .not-core-replacement");
}

// Hours
function showHideHours() {
  const show = [
    state.hours.zero && ".zero-hour",
    state.hours.eighth && ".eighth-hour",
    state.hours.regular && ".regular-hour",
  ]
    .filter(Boolean)
    .join(",");

  showHide(show, ".zero-hour, .eighth-hour, .regular-hour");
}





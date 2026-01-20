       class Grades {
  constructor(ninth, tenth, eleventh, twelfth) {
    this.ninth = ninth;
    this.tenth = tenth;
    this.eleventh = eleventh;
    this.twelfth = twelfth;
  }
}

class Departments {
  constructor(cte, ela, fa, gen, jrotc, math, mcnl, pe, sci, sped, ss, health,) {
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
    this.health = health;
  }
}

// ---------- STATE ----------
let state = {
  departments: new Departments(true, true, true, true, true, true, true, true, true, true, true, true,),
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
  deptHEALTH: document.querySelector("#Dept-HEALTH"),
       
  // Grades
  gradeNinth: document.querySelector("#ninthCheck"),
  gradeTenth: document.querySelector("#tenthCheck"),
  gradeEleventh: document.querySelector("#eleventhCheck"),
  gradeTwelfth: document.querySelector("#twelfthCheck"),

  // Core Replacement (NEW)
  coreYes: document.querySelector("#coreReplacement"),
  coreNo: document.querySelector("#notCoreReplacement"),

       
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

  attachListeners();
  updatePage();
}

function attachListeners() {
  // Safe add listener (prevents crashing if an element is missing)
  function on(el, fn) {
    if (!el) return;
    el.addEventListener("change", fn);
  }

  // Departments
  on(checkboxes.deptCTE, () => toggle(() => (state.departments.cte = !state.departments.cte)));
  on(checkboxes.deptELA, () => toggle(() => (state.departments.ela = !state.departments.ela)));
  on(checkboxes.deptFA, () => toggle(() => (state.departments.fa = !state.departments.fa)));
  on(checkboxes.deptGEN, () => toggle(() => (state.departments.gen = !state.departments.gen)));
  on(checkboxes.deptJROTC, () => toggle(() => (state.departments.jrotc = !state.departments.jrotc)));
  on(checkboxes.deptMATH, () => toggle(() => (state.departments.math = !state.departments.math)));
  on(checkboxes.deptMCNL, () => toggle(() => (state.departments.mcnl = !state.departments.mcnl)));
  on(checkboxes.deptPE, () => toggle(() => (state.departments.pe = !state.departments.pe)));
  on(checkboxes.deptSCI, () => toggle(() => (state.departments.sci = !state.departments.sci)));
  on(checkboxes.deptSPED, () => toggle(() => (state.departments.sped = !state.departments.sped)));
  on(checkboxes.deptSS, () => toggle(() => (state.departments.ss = !state.departments.ss)));
  on(checkboxes.deptHEALTH, () => toggle(() => (state.departments.health = !state.departments.health)))

  // Grades
  on(checkboxes.gradeNinth, () => toggle(() => (state.grades.ninth = !state.grades.ninth)));
  on(checkboxes.gradeTenth, () => toggle(() => (state.grades.tenth = !state.grades.tenth)));
  on(checkboxes.gradeEleventh, () => toggle(() => (state.grades.eleventh = !state.grades.eleventh)));
  on(checkboxes.gradeTwelfth, () => toggle(() => (state.grades.twelfth = !state.grades.twelfth)));

  // Core replacement
  on(checkboxes.coreYes, () => toggle(() => (state.coreReplacement.yes = !state.coreReplacement.yes)));
  on(checkboxes.coreNo, () => toggle(() => (state.coreReplacement.no = !state.coreReplacement.no)));

  // Hours
  on(checkboxes.hourZero, () => toggle(() => (state.hours.zero = !state.hours.zero)));
  on(checkboxes.hourEight, () => toggle(() => (state.hours.eighth = !state.hours.eighth)));
  on(checkboxes.hourRegular, () => toggle(() => (state.hours.regular = !state.hours.regular)));

  // Details
  on(checkboxes.courseDetails, () => toggle(() => (state.courseDetails = !state.courseDetails)));
}

function toggle(mutator) {
  const saved = readState();
  if (saved) state = saved;
  mutator();
  writeState(state);
  updatePage();
}

// ---------- UPDATE ----------
function updatePage() {
  // sync checkbox UI
  if (checkboxes.deptCTE) checkboxes.deptCTE.checked = state.departments.cte;
  if (checkboxes.deptELA) checkboxes.deptELA.checked = state.departments.ela;
  if (checkboxes.deptFA) checkboxes.deptFA.checked = state.departments.fa;
  if (checkboxes.deptGEN) checkboxes.deptGEN.checked = state.departments.gen;
  if (checkboxes.deptJROTC) checkboxes.deptJROTC.checked = state.departments.jrotc;
  if (checkboxes.deptMATH) checkboxes.deptMATH.checked = state.departments.math;
  if (checkboxes.deptMCNL) checkboxes.deptMCNL.checked = state.departments.mcnl;
  if (checkboxes.deptPE) checkboxes.deptPE.checked = state.departments.pe;
  if (checkboxes.deptSCI) checkboxes.deptSCI.checked = state.departments.sci;
  if (checkboxes.deptSPED) checkboxes.deptSPED.checked = state.departments.sped;
  if (checkboxes.deptSS) checkboxes.deptSS.checked = state.departments.ss;
  if (checkboxes.deptHEALTH) checkboxes.depthealth.checked = state.departments.health;

  if (checkboxes.gradeNinth) checkboxes.gradeNinth.checked = state.grades.ninth;
  if (checkboxes.gradeTenth) checkboxes.gradeTenth.checked = state.grades.tenth;
  if (checkboxes.gradeEleventh) checkboxes.gradeEleventh.checked = state.grades.eleventh;
  if (checkboxes.gradeTwelfth) checkboxes.gradeTwelfth.checked = state.grades.twelfth;

  if (checkboxes.coreYes) checkboxes.coreYes.checked = state.coreReplacement.yes;
  if (checkboxes.coreNo) checkboxes.coreNo.checked = state.coreReplacement.no;

  if (checkboxes.hourZero) checkboxes.hourZero.checked = state.hours.zero;
  if (checkboxes.hourEight) checkboxes.hourEight.checked = state.hours.eighth;
  if (checkboxes.hourRegular) checkboxes.hourRegular.checked = state.hours.regular;

  if (checkboxes.courseDetails) checkboxes.courseDetails.checked = state.courseDetails;

  // APPLY ALL FILTERS TOGETHER (THIS FIXES THE “NOT WORKING” FEELING)
  applyAllFilters();

  // details toggle
  showHideClass("course-details", state.courseDetails);
}

function showHideClass(className, show) {
  const list = document.getElementsByClassName(className);
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = show ? "block" : "none";
  }
}

// ---------- COMBINED FILTER (intersection) ----------
function applyAllFilters() {
  const courses = document.querySelectorAll(".department-div");

  courses.forEach((course) => {
    const deptOk =
      (state.departments.cte && course.classList.contains("Dept-CTE")) ||
      (state.departments.ela && course.classList.contains("Dept-ELA")) ||
      (state.departments.fa && course.classList.contains("Dept-FA")) ||
      (state.departments.gen && course.classList.contains("Dept-GEN")) ||
      (state.departments.jrotc && course.classList.contains("Dept-JROTC")) ||
      (state.departments.math && course.classList.contains("Dept-MATH")) ||
      (state.departments.mcnl && course.classList.contains("Dept-MCNL")) ||
      (state.departments.pe && course.classList.contains("Dept-PE")) ||
      (state.departments.sci && course.classList.contains("Dept-SCI")) ||
      (state.departments.sped && course.classList.contains("Dept-SPED")) ||
      (state.departments.ss && course.classList.contains("Dept-SS")) ||
      (state.departments.health && course.classList.contains("Dept-HEALTH"));
    const gradeOk =
      (state.grades.ninth && course.classList.contains("ninth-grade")) ||
      (state.grades.tenth && course.classList.contains("tenth-grade")) ||
      (state.grades.eleventh && course.classList.contains("eleventh-grade")) ||
      (state.grades.twelfth && course.classList.contains("twelfth-grade"));

    const coreOk =
      (state.coreReplacement.yes && course.classList.contains("core-replacement")) ||
      (state.coreReplacement.no && course.classList.contains("not-core-replacement"));

    const hourOk =
      (state.hours.zero && course.classList.contains("zero-hour")) ||
      (state.hours.eighth && course.classList.contains("eighth-hour")) ||
      (state.hours.regular && course.classList.contains("regular-hour"));

    course.style.display = deptOk && gradeOk && coreOk && hourOk ? "block" : "none";
  });
}
function updateDepartmentHeadings() {
  document.querySelectorAll(".dept-block").forEach(block => {
    const hasVisibleCourse = Array.from(
      block.querySelectorAll(".department-div")
    ).some(course => course.style.display !== "none");

    block.style.display = hasVisibleCourse ? "block" : "none";
  });
}

  autoHideEmptyDepartments(); // 
}

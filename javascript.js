
document.addEventListener("DOMContentLoaded", () => {
  // ---------- DEFAULT STATE ----------
  const defaultState = {
    departments: {
      cte: true,
      ela: true,
      fa: true,
      gen: true,
      health: true, // keep health
      jrotc: true,
      math: true,
      mcnl: true,
      pe: true,
      sci: true,
      sped: true,
      ss: true,
    },
    grades: {
      ninth: true,
      tenth: true,
      eleventh: true,
      twelfth: true,
    },
    coreReplacement: {
      yes: true,
      no: true,
    },
    courseDetails: false,
  };

  // ---------- DOM HOOKS ----------
  const checkboxes = {
    // Departments (HTML ids must match)
    deptCTE: document.querySelector("#Dept-CTE"),
    deptELA: document.querySelector("#Dept-ELA"),
    deptFA: document.querySelector("#Dept-FA"),
    deptGEN: document.querySelector("#Dept-GEN"),
    deptHEALTH: document.querySelector("#Dept-HEALTH"),
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

    // Details
    courseDetails: document.querySelector("#detailsCheck"),
  };

  // ---------- STORAGE ----------
  function readState() {
    try {
      return JSON.parse(sessionStorage.getItem("state"));
    } catch {
      return null;
    }
  }

  function writeState(s) {
    sessionStorage.setItem("state", JSON.stringify(s));
  }

  // Merge saved state with defaults so new keys (like HEALTH) don’t break things
  function normalizeState(saved) {
    const s = saved && typeof saved === "object" ? saved : {};
    s.departments = { ...defaultState.departments, ...(s.departments || {}) };
    s.grades = { ...defaultState.grades, ...(s.grades || {}) };
    s.coreReplacement = { ...defaultState.coreReplacement, ...(s.coreReplacement || {}) };
    s.courseDetails = typeof s.courseDetails === "boolean" ? s.courseDetails : defaultState.courseDetails;
    return s;
  }

  let state = normalizeState(readState());
  writeState(state);

  // ---------- HELPERS ----------
  function on(el, handler) {
    if (!el) return;
    el.addEventListener("change", handler);
  }

  function toggle(mutator) {
    state = normalizeState(readState());
    mutator(state);
    writeState(state);
    updatePage();
  }

  // ---------- LISTENERS ----------
  // Departments mapping: checkbox -> state key -> CSS class
  const deptDefs = [
    { el: checkboxes.deptCTE, key: "cte", cls: "Dept-CTE" },
    { el: checkboxes.deptELA, key: "ela", cls: "Dept-ELA" },
    { el: checkboxes.deptFA, key: "fa", cls: "Dept-FA" },
    { el: checkboxes.deptGEN, key: "gen", cls: "Dept-GEN" },
    { el: checkboxes.deptHEALTH, key: "health", cls: "Dept-HEALTH" },
    { el: checkboxes.deptJROTC, key: "jrotc", cls: "Dept-JROTC" },
    { el: checkboxes.deptMATH, key: "math", cls: "Dept-MATH" },
    { el: checkboxes.deptMCNL, key: "mcnl", cls: "Dept-MCNL" },
    { el: checkboxes.deptPE, key: "pe", cls: "Dept-PE" },
    { el: checkboxes.deptSCI, key: "sci", cls: "Dept-SCI" },
    { el: checkboxes.deptSPED, key: "sped", cls: "Dept-SPED" },
    { el: checkboxes.deptSS, key: "ss", cls: "Dept-SS" },
  ];

  deptDefs.forEach(({ el, key }) => {
    on(el, () => toggle(s => (s.departments[key] = !s.departments[key])));
  });

  // Grades
  on(checkboxes.gradeNinth, () => toggle(s => (s.grades.ninth = !s.grades.ninth)));
  on(checkboxes.gradeTenth, () => toggle(s => (s.grades.tenth = !s.grades.tenth)));
  on(checkboxes.gradeEleventh, () => toggle(s => (s.grades.eleventh = !s.grades.eleventh)));
  on(checkboxes.gradeTwelfth, () => toggle(s => (s.grades.twelfth = !s.grades.twelfth)));

  // Core Replacement
  on(checkboxes.coreYes, () => toggle(s => (s.coreReplacement.yes = !s.coreReplacement.yes)));
  on(checkboxes.coreNo, () => toggle(s => (s.coreReplacement.no = !s.coreReplacement.no)));

  // Details
  on(checkboxes.courseDetails, () => toggle(s => (s.courseDetails = !s.courseDetails)));


  function updatePage() {
    state = normalizeState(readState());

    // Sync UI checkboxes from state
    deptDefs.forEach(({ el, key }) => {
      if (el) el.checked = !!state.departments[key];
    });

    if (checkboxes.gradeNinth) checkboxes.gradeNinth.checked = !!state.grades.ninth;
    if (checkboxes.gradeTenth) checkboxes.gradeTenth.checked = !!state.grades.tenth;
    if (checkboxes.gradeEleventh) checkboxes.gradeEleventh.checked = !!state.grades.eleventh;
    if (checkboxes.gradeTwelfth) checkboxes.gradeTwelfth.checked = !!state.grades.twelfth;

    if (checkboxes.coreYes) checkboxes.coreYes.checked = !!state.coreReplacement.yes;
    if (checkboxes.coreNo) checkboxes.coreNo.checked = !!state.coreReplacement.no;

    if (checkboxes.courseDetails) checkboxes.courseDetails.checked = !!state.courseDetails;

    document.querySelectorAll(".course-details").forEach(el => {
      el.style.display = state.courseDetails ? "block" : "none";
    });

    document.querySelectorAll(".department-div").forEach(course => {
      
      const deptOk = deptDefs.some(d => state.departments[d.key] && course.classList.contains(d.cls));


      const gradeOk =
        (state.grades.ninth && course.classList.contains("ninth-grade")) ||
        (state.grades.tenth && course.classList.contains("tenth-grade")) ||
        (state.grades.eleventh && course.classList.contains("eleventh-grade")) ||
        (state.grades.twelfth && course.classList.contains("twelfth-grade"));

      const coreOk =
        (state.coreReplacement.yes && course.classList.contains("core-replacement")) ||
        (state.coreReplacement.no && course.classList.contains("not-core-replacement"));

      course.style.display = deptOk && gradeOk && coreOk ? "block" : "none";
    });

    updateDepartmentHeadings();
  }

  // Department “block” wrapper must be .dept-block and contain .department-div children
  function updateDepartmentHeadings() {
    document.querySelectorAll(".dept-block").forEach(block => {
      const hasVisibleCourse = Array.from(block.querySelectorAll(".department-div"))
        .some(course => course.style.display !== "none");

      block.style.display = hasVisibleCourse ? "block" : "none";
    });
  }
 
  updatePage();
});

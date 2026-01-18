class Grades {
    constructor(ninth, tenth, eleventh, twelfth)  {
        this.ninth = ninth;
        this.tenth = tenth;
        this.eleventh = eleventh;
        this.twelfth = twelfth;
    }
}

class Departments {
    constructor(cte, ela, fa, gen,
                jrotc, math, mcnl, pe,
                sci, sped, ss) {
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
    departments: new Departments(true, true, true, true,
                                 true, true, true, true,
                                 true, true, true),

    grades: new Grades(true, true, true, true),

    coreReplacement: {
        yes: true,
        no: true
    },

    hours: {
        zero: true,
        eighth: true,
        regular: true
    },

    courseDetails: false
};

// ---------- CHECKBOXES ----------
const checkboxes = {
    // Departments
    deptCTE: document.querySelector('#Dept-CTE'),
    deptELA: document.querySelector('#Dept-ELA'),
    deptFA: document.querySelector('#Dept-FA'),
    deptGEN: document.querySelector('#Dept-GEN'),
    deptJROTC: document.querySelector('#Dept-JROTC'),
    deptMATH: document.querySelector('#Dept-MATH'),
    deptMCNL: document.querySelector('#Dept-MCNL'),
    deptPE: document.querySelector('#Dept-PE'),
    deptSCI: document.querySelector('#Dept-SCI'),
    deptSPED: document.querySelector('#Dept-SPED'),
    deptSS: document.querySelector('#Dept-SS'),

    // Grades
    gradeNinth: document.querySelector('#ninthCheck'),
    gradeTenth: document.querySelector('#tenthCheck'),
    gradeEleventh: document.querySelector('#eleventhCheck'),
    gradeTwelfth: document.querySelector('#twelfthCheck'),

    // New filters
    coreYes: document.querySelector('#coreReplacement'),
    coreNo: document.querySelector('#notCoreReplacement'),

    hourZero: document.querySelector('#zeroHour'),
    hourEight: document.querySelector('#eighthHour'),
    hourRegular: document.querySelector('#regularHour'),

    // Details
    courseDetails: document.querySelector('#detailsCheck')
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
    sessionStorage.setItem('state', JSON.stringify(obj));
}

// ---------- INIT ----------
function init() {
    const saved = readState();
    if (saved) state = saved;
    else writeState(state);

    updatePage();
}

// ---------- UPDATE ----------
function updatePage() {
    if (!checkboxes) return;

    // Departments
    for (const key in state.departments) {
        const box = document.querySelector(`#Dept-${key.toUpperCase()}`);
        if (box) box.checked = state.departments[key];
    }

    // Grades
    checkboxes.gradeNinth.checked = state.grades.ninth;
    checkboxes.gradeTenth.checked = state.grades.tenth;
    checkboxes.gradeEleventh.checked = state.grades.eleventh;
    checkboxes.gradeTwelfth.checked = state.grades.twelfth;

    // Core replacement
    checkboxes.coreYes.checked = state.coreReplacement.yes;
    checkboxes.coreNo.checked = state.coreReplacement.no;

    // Hours
    checkboxes.hourZero.checked = state.hours.zero;
    checkboxes.hourEight.checked = state.hours.eighth;
    checkboxes.hourRegular.checked = state.hours.regular;

    // Details
    checkboxes.courseDetails.checked = state.courseDetails;

    showHideDepartments();
    showHideGrades();
    showHideCore();
    showHideHours();
    showHideClass('course-details', state.courseDetails);
}

// ---------- EVENT HELPERS ----------
function toggleState(path) {
    state = readState();
    path();
    writeState(state);
    updatePage();
}

// ---------- EVENT LISTENERS ----------

// Grades
checkboxes.gradeNinth.addEventListener('change', () =>
    toggleState(() => state.grades.ninth = !state.grades.ninth)
);
checkboxes.gradeTenth.addEventListener('change', () =>
    toggleState(() => state.grades.tenth = !state.grades.tenth)
);
checkboxes.gradeEleventh.addEventListener('change', () =>
    toggleState(() => state.grades.eleventh = !state.grades.eleventh)
);
checkboxes.gradeTwelfth.addEventListener('change', () =>
    toggleState(() => state.grades.twelfth = !state.grades.twelfth)
);

// Core replacement
checkboxes.coreYes.addEventListener('change', () =>
    toggleState(() => state.coreReplacement.yes = !state.coreReplacement.yes)
);
checkboxes.coreNo.addEventListener('change', () =>
    toggleState(() => state.coreReplacement.no = !state.coreReplacement.no)
);

// Hours
checkboxes.hourZero.addEventListener('change', () =>
    toggleState(() => state.hours.zero = !state.hours.zero)
);
checkboxes.hourEight.addEventListener('change', () =>
    toggleState(() => state.hours.eighth = !state.hours.eighth)
);
checkboxes.hourRegular.addEventListener('change', () =>
    toggleState(() => state.hours.regular = !state.hours.regular)
);

// Details
checkboxes.courseDetails.addEventListener('change', () =>
    toggleState(() => state.courseDetails = !state.courseDetails)
);

// ---------- FILTERING ----------
function showHideClass(className, show) {
    document.querySelectorAll(`.${className}`)
        .forEach(el => el.style.display = show ? 'block' : 'none');
}

function showHide(selector, hideSelector) {
    document.querySelectorAll(hideSelector)
        .forEach(el => el.style.display = 'none');

    if (!selector) return;

    document.querySelectorAll(selector)
        .forEach(el => el.style.display = 'block');
}

// Grades
function getGradesSelector(g) {
    return [
        g.ninth && '.ninth-grade',
        g.tenth && '.tenth-grade',
        g.eleventh && '.eleventh-grade',
        g.twelfth && '.twelfth-grade'
    ].filter(Boolean).join(',');
}

function showHideGrades() {
    showHide(getGradesSelector(state.grades), '.grade-level');
}

// Departments
function getDepartmentsSelector(d) {
    return [
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
  if (!el) return;

  el.addEventListener("change", () =>
    toggleState(() => state.departments[stateKey] = !state.departments[stateKey])
  );
});

        Object.entries(d)
        .filter(([_, v]) => v)
        .map(([k]) => `.Dept-${k.toUpperCase()}`)
        .join(',');
}

function showHideDepartments() {
    showHide(getDepartmentsSelector(state.departments), '.department-div');
}

// Core Replacement
function showHideCore() {
    const show = [
        state.coreReplacement.yes && '.core-replacement',
        state.coreReplacement.no && '.not-core-replacement'
    ].filter(Boolean).join(',');

    showHide(show, '.core-replacement, .not-core-replacement');
}

// Hours
function showHideHours() {
    const show = [
        state.hours.zero && '.zero-hour',
        state.hours.eighth && '.eighth-hour',
        state.hours.regular && '.regular-hour'
    ].filter(Boolean).join(',');

    showHide(show, '.zero-hour, .eighth-hour, .regular-hour');
}




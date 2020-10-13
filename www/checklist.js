const checklistDataIDs = [
  "checkRules",
  "checkPlanning",
  "checkApplyForPermit",
  "checkSafety",
  "checkPacking",
  "checkGNPUpdates",
  "checkMap",
  "checkMapOpened",
  "checkAddTrip",
  "checkStatistics",
  "checkGNPUpdates",
  "checkHikeSafe",
  "checkMultiplePlans",
  "checkSteps"
];

function updateChecklist() {
  if (localStorage.getItem(checklistDataIDs[checklistDataIDs.length - 1]) == null) {
    initData();
  }
  checklistDataIDs.forEach((id) => {
    document.getElementById(id).checked = localStorage.getItem(id) === "true";
  });
}

function updateChecklistDatabase() {
  checklistDataIDs.forEach((id) => {
    localStorage.setItem(id, document.getElementById(id).checked.toString());
  });
}

function initData() {
  checklistDataIDs.forEach((id) => {
    localStorage.setItem(id, "false");
  });
}

function setTrue(name) {
  localStorage.setItem(name, "true");
}

function setFalse(name) {
  localStorage.setItem(name, "false");
}

const steps = [1, 2, 3, 4, 5, 6, 7]

function setupStepToggles (){
  steps.forEach( (stepNum) => {
    let toggle = document.getElementById("step"+stepNum+"-header");
    toggle.addEventListener('click', function () {toggleDiv(stepNum);}, false);
    let div = document.getElementById("step"+stepNum);
    div.style.display = "none";
  });
}

function toggleDiv(stepNum){
  let div = document.getElementById("step"+stepNum);
  if (div.style.display === "none") {
    div.style.display = "block";
    document.getElementById("step"+stepNum+"-arrow").classList.remove("arrow_right");
    document.getElementById("step"+stepNum+"-arrow").classList.add("arrow_bottom");
  } else {
    div.style.display = "none";
    document.getElementById("step"+stepNum+"-arrow").classList.remove("arrow_bottom");
    document.getElementById("step"+stepNum+"-arrow").classList.add("arrow_right");
  }
}


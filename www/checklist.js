const checklistDataIDs = [
  "checkPlanning",
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
  "checkMultiplePlans"
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

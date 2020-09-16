const checklistDataIDs = [
  "checkPlanning",
  "checkRules",
  "checkPermitting",
  "checkSafety",
  "checkPreparation",
  "checkPacking",
  "CHECK_TEST_PLEASE_UPDATE",
  "checkMap",
  "checkMapOpened",
  "checkAddTrip",
  "checkStatistics",
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

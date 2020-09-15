
function updateChecklist(){
    if(localStorage.getItem("mapOpened") == null) {
        initData();
    }
    var mapOpened = localStorage.getItem("mapOpened");
    console.log(mapOpened);
    document.getElementById("mapOpened").checked  = (mapOpened === "true");
    console.log(document.getElementById("mapOpened").checked);
}

function initData(){
    localStorage.setItem("mapOpened", "false");
}

function setTrue(name){
    localStorage.setItem(name, "true");
}

function setFalse(name){
    localStorage.setItem(name, "false");
}
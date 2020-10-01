// Adapted from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function minimizeHeader() {
    var min_header = document.getElementById("map_header");
    var small_header = document.getElementById("temp_header");
    var expand_map = document.getElementById("viewDiv");
    if (min_header.style.display === "none" && small_header.style.display === "block") {
        min_header.style.display = "block";
        small_header.style.display = "none";
    } else {
        min_header.style.display = "none";
        small_header.style.display = "block";
        expand_map.style.height = "100%";
    }
}
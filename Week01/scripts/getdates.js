/* eslint-env browser */

// Dynamically set the current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Dynamically set the last modified date
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
console.log("Theme switch");

const themeSwitcher = document.getElementById("theme-switch");

themeSwitcher.checked = false;
function clickHandler() {
    if (this.checked) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
    }
}
themeSwitcher.addEventListener("click", clickHandler);

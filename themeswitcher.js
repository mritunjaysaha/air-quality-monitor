const themeSwitcher = document.getElementById("theme-switch");

themeSwitcher.checked = false;
function clickHandler() {
    const themeSwitchRound = document.getElementById("theme-switch-round");
    if (this.checked) {
        localStorage.setItem("theme", "dark");
        document.body.className = "dark";

        themeSwitchRound.classList.add("local-dark");
        themeSwitchRound.classList.remove("local-light");
    } else {
        localStorage.setItem("theme", "light");
        document.body.className = "light";
        themeSwitchRound.classList.add("local-light");
        themeSwitchRound.classList.remove("local-dark");
    }
}
themeSwitcher.addEventListener("click", clickHandler);

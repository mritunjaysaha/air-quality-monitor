// store the class name in local storage

// let theme = "light";
// localStorage.setItem("theme", "light");

const themeSwitcher = document.getElementById("theme-switch");

themeSwitcher.checked = false;
function clickHandler() {
    // if (this.checked) {
    //     const localStorageTheme = localStorage.getItem("theme");
    //     if (localStorageTheme != null) {
    //         console.log("localStorageTheme: ", localStorageTheme);
    //         document.body.className = "";
    //         document.body.className = localStorageTheme;
    //     } else {
    //         setTheme();
    //     }
    // }
    if (this.checked) {
        localStorage.setItem("theme", "dark");
        document.body.className = "dark";
        console.log("dark");
    } else {
        localStorage.setItem("theme", "light");
        document.body.className = "light";
        console.log("light");
    }
}
themeSwitcher.addEventListener("click", clickHandler);

function checkLocalTheme() {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme != null) {
        console.log("theme: ", localStorageTheme);
        document.body.classList.add(localStorageTheme);
        return;
    } else {
        console.log("theme null");
    }
}

function setTheme() {
    if (this.checked) {
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
        document.body.classList.add("dark");
        console.log("dark");
    } else {
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
        console.log("light");
    }
}

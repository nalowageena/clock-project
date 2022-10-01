const closeSideBtn = document.querySelector(".fa-x-mark");
const sideBar = document.querySelector("aside");

closeSideBtn.addEventListener('click', closeSideBar)

function closeSideBar() {
  sideBar.classList.toggle('close')
}

const openSidebar = document.querySelector('i.fa-bars');
const sidebar = document.querySelector('aside');

openSidebar.addEventListener('click', showSidebar);

function showSidebar() {
    sidebar.style.display = 'flex';
}

const closeSidebarbtn = document.querySelector('aside li:has(i.fa-close)');

closeSidebarbtn.addEventListener('click', closeSidebar);

function closeSidebar() {
    sidebar.style.display = 'none';
}
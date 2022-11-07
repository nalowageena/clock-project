const toggleSidebarBtn = document.querySelector('i.fa-bars');
const sidebar = document.querySelector('aside');

toggleSidebarBtn.addEventListener('click', showSidebar);

function showSidebar() {
    sidebar.style.display = 'flex';
}
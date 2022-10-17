const modal = document.querySelector('.modal-container');

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
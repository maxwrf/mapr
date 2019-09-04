function toggleButtonCategories() {
  const buttons = document.querySelectorAll('.btn-act')
  buttons.forEach((button) => {
    button.addEventListener("click", function() {
      buttons.forEach((btn) => {
        btn.classList.remove('active')
      })
      button.classList.toggle('active')
    });
  });
}

export { toggleButtonCategories }

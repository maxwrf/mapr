function topFunction() {
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
};

const initTopFunction = () => {
  const scrollToButton = document.getElementById('scroll-top-btn')
  if (scrollToButton) {
    scrollToButton.addEventListener("click", (event) => {
      topFunction()
    });
  }
};

export { initTopFunction };

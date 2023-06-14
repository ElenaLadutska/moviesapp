function ScrollButton() {
  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <button 
      className="scroll"
      onClick={goToTop}>
      ↑
    </button>
  )
}

export default ScrollButton;

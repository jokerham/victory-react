function toggleClass(el, className) {
  if (el) {
    if (el.classList!=null && el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }
}

export { toggleClass }
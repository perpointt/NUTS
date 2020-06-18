class Slider {
  constructor(options) {
    this.carousel = document.querySelector(`${options.el}`)
    this.width = options.width
    this.count = options.count

    this.cords = null
    this.grab = false

    this.init(options)
  }
  init(options) {
    this.currentSlide = 0
    this.currentPosition = 0
    this.list = this.carousel.querySelector("ul")
    this.listElems = this.carousel.querySelectorAll("li")
    this.listElems.forEach((li) => {
      this.width = li.offsetWidth
    })
    this.grabEvent(this.list)
    if (options.autoplay) this.autoSlide()
  }
  grabEvent(list) {
    list.style.cursor = "grab"
    list.addEventListener("mousedown", () => {
      this.start(event, list)
    })
    list.addEventListener("mouseup", () => {
      this.start(event, list)
    })
  }
  start(event, list) {
    if (event.type.search("mousedown") === 0) {
      list.style.cursor = "grabbing"
      this.grab = true
      this.cords = event.clientX
      list.addEventListener("mousemove", (event) => {
        this.move(event, list)
      })
    } else if (event.type.search("mouseup") === 0) {
      this.grab = false
      list.style.cursor = "grab"
      this.move(event, list)
    }
  }
  move(event, list) {
    let newCords = null
    let cords = null

    if (this.grab) {
      newCords = event.clientX
      switch (this.cords >= newCords) {
        case true:
          cords = this.cords - newCords

          this.currentPosition -= (cords / this.width) * this.count
          this.list.style.marginLeft = `${this.currentPosition}px`
        case false:
          cords = this.cords - newCords

          this.currentPosition -= (cords / this.width) * this.count
          this.list.style.marginLeft = `${this.currentPosition}px`
      }
    }
  }
  autoSlide() {
    const recursion = () => {
      if (this.currentSlide < this.listElems.length - 4) {
        this.currentPosition -= this.width * this.count
        this.list.style.marginLeft = `${this.currentPosition}px`
        this.currentSlide++
      } else {
        this.currentSlide = 0
        this.list.style.marginLeft = `0px`
        this.currentPosition = 0
      }
      setTimeout(() => {
        recursion()
      }, 4000)
    }
    setTimeout(() => {
      recursion()
    }, 4000)
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider({
    el: "#carousel",
    width: 297,
    count: 1,
    autoplay: false,
  })
})

class Slider {
  constructor(options) {
    this.carousel = document.querySelector(`${options.el}`)
    this.count = options.count
    this.autoplay = options.autoplay
    this.delay = options.delay * 1000

    this.init(options)
  }
  init() {
    this.currentSlide = 0
    this.currentPosition = 0

    this.render()
    this.grabEvent()
    this.autoPlay()
  }
  render() {
    this.list = this.carousel.querySelector("ul")
    this.slides = this.carousel.querySelectorAll("li")
    let listWidth = 0
    this.slides.forEach((slide) => {
      this.width = slide.offsetWidth
      listWidth += this.width
    })

    this.list.style.width = `${listWidth}px`
  }

  grabEvent() {
    this.list.addEventListener("mousedown", () => {
      this.list.style.cursor = "grabbing"
      this.grab = true
      this.cords = event.clientX
    })
    this.list.addEventListener("mouseup", () => {
      this.grab = false
      this.list.style.cursor = "grab"
    })
    this.list.addEventListener("mousemove", (move) => {
      this.move(move)
    })
  }
  move(move) {
    if (this.grab) {
      if (this.cords > move.clientX) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }
  }
  autoPlay() {
    if (this.autoplay) {
      const autoToggleSlide = () => {
        setTimeout(() => {
          if (!this.toFirstSlide) {
            this.prevSlide()
          } else {
            this.nextSlide()
          }
          autoToggleSlide()
        }, this.delay)
      }
      autoToggleSlide()
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 4) {
      this.currentPosition -= this.width * this.count
      this.list.style.marginLeft = `${this.currentPosition}px`

      this.currentSlide++
      this.grab = false
    }
    if (this.currentSlide === this.slides.length - 4) this.toFirstSlide = false
  }
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentPosition += this.width * this.count
      this.list.style.marginLeft = `${this.currentPosition}px`

      this.currentSlide--
      this.grab = false
    }
    if (this.currentSlide === 0) this.toFirstSlide = true
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider({
    el: "#carousel",
    count: 1,
    autoplay: false,
    delay: 4,
  })
})

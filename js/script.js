class Slider {
  constructor(options) {
    this.carousel = document.querySelector(`${options.el}`)
    this.count = options.count
    this.range = options.range
    this.autoplay = options.autoplay
    this.delay = options.delay * 1000

    this.init(options)
  }
  init() {
    this.currentSlide = 0
    this.currentPosition = 0

    this.render()
    this.setEventListeners()
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

  setEventListeners() {
    this.list.addEventListener("mousedown", (click) => {
      this.grabCords(click)
    })
    this.list.addEventListener("touchstart", (click) => {
      this.grabCords(click)
    })

    this.list.addEventListener("mouseup", (click) => {
      this.grabCords(click)
    })
    this.list.addEventListener("touchend", (click) => {
      this.grabCords(click)
    })

    this.list.addEventListener("mousemove", (move) => {
      this.move(move)
    })
    this.list.addEventListener("touchmove", (move) => {
      this.move(move)
    })
  }
  grabCords(click) {
    if (!click.type.search("mousedown") || !click.type.search("touchstart")) {
      this.list.style.cursor = "grabbing"
      this.grab = true

      this.cords = click.clientX || click.touches[0].screenX
    } else {
      this.grab = false
      this.list.style.cursor = "grab"
    }
  }
  move(move) {
    if (this.grab) {
      if (this.cords > (move.clientX || move.touches[0].screenX)) {
        if (this.cords - (move.clientX || move.touches[0].screenX) > this.range)
          this.nextSlide()
      } else {
        if (
          this.cords - (move.clientX || move.touches[0].screenX) <
          -this.range
        )
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
    range: 100,
    autoplay: true,
    delay: 4,
  })
})

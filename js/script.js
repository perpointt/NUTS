class Slider {
  constructor(options) {
    this.carousel = document.querySelector(`${options.el}`)
    this.width = options.width
    this.count = options.count

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

    // this.fixUserTouch()
    this.slideNext()
    this.slidePrev()
    if (options.autoplay) this.autoSlide()
  }
  //   fixUserTouch() {
  //     this.list.addEventListener("mouseup", this.touchMove)
  //     this.list.addEventListener("mouseover", this.touchMove)
  //   }
  //   touchMove(e) {
  //     console.log(e.type)
  //   }
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
  slidePrev() {
    const prevButton = this.carousel.querySelector(".carousel__button_prev")

    prevButton.addEventListener("click", () => {
      if (this.currentSlide !== 0) {
        this.currentPosition += this.width * this.count
        this.list.style.marginLeft = `${this.currentPosition}px`

        this.currentSlide--
      }
    })
  }
  slideNext() {
    const nextButton = carousel.querySelector(".carousel__button_next")
    nextButton.addEventListener("click", () => {
      if (this.currentSlide < this.listElems.length - 4) {
        this.currentPosition -= this.width * this.count
        this.list.style.marginLeft = `${this.currentPosition}px`

        this.currentSlide++
      }
    })
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider({
    el: "#carousel",
    width: 297,
    count: 1,
    autoplay: true,
  })
})

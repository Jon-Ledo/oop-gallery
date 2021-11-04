function Gallery (element) {
  this.container = element
  this.list = [...element.querySelectorAll('.img')] // use spread to make array

  // selectors
  this.modal = getElement('.modal')
  this.modalImg = getElement('.main-img')
  this.imageName = getElement('.image-name')
  this.modalImages = getElement('.modal-images')
  this.closeBtn = getElement('.close-btn')
  this.nextBtn = getElement('.next-btn')
  this.prevBtn = getElement('.prev-btn')

  // self reference
  // let self = this // points back to Gallery

  // bind functions
  this.closeModal = this.closeModal.bind(this)
  this.nextImage = this.nextImage.bind(this)
  this.prevImage = this.prevImage.bind(this)
  this.setImage = this.setImage.bind(this)

  // container event
  this.container.addEventListener('click', function (e) {
    // self.openModal()
    if(e.target.classList.contains('img')) {
      this.openModal(e.target, this.list)
    }
  }.bind(this)) // same as this.openModal = this.openModal.bind(this)
}

// FUNCTIONS
Gallery.prototype.setMainImage = function(selectedImage) {
  this.modalImg.src = selectedImage.src
  this.imageName.textContent = selectedImage.title
}

Gallery.prototype.openModal = function(selectedImage, list) {
  this.setMainImage(selectedImage)
  this.modalImages.innerHTML = list.map(image => {
    return `<img 
      src="${image.src}" 
      title="${image.title}" 
      data-id="${image.dataset.id}" 
      class="${selectedImage.dataset.id === image.dataset.id 
        ? "modal-img selected" 
        : "modal-img"}" 
      />`
  }).join('')
  this.modal.classList.add('open')
  this.closeBtn.addEventListener('click', this.closeModal)
  this.nextBtn.addEventListener('click', this.nextImage)
  this.prevBtn.addEventListener('click', this.prevImage)
  this.modalImages.addEventListener('click', this.setImage)
}

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open')
  // remove event listeners
  this.closeBtn.removeEventListener('click', this.closeModal)
  this.nextBtn.removeEventListener('click', this.nextImage)
  this.prevBtn.removeEventListener('click', this.prevImage)
  this.modalImages.removeEventListener('click', this.setImage)
}

Gallery.prototype.nextImage = function () {
  // get the image with class of selected
  const selectedImage = this.modalImages.querySelector('.selected')
  const next = selectedImage.nextElementSibling || this.modalImages.firstElementChild
  selectedImage.classList.remove('selected')
  next.classList.add('selected')
  this.setMainImage(next)
}

Gallery.prototype.prevImage = function () {
  // get the image with class of selected
  const selectedImage = this.modalImages.querySelector('.selected')
  const prev = selectedImage.previousElementSibling || this.modalImages.lastElementChild
  selectedImage.classList.remove('selected')
  prev.classList.add('selected')
  this.setMainImage(prev)
}

Gallery.prototype.setImage = function(e) {
  this.setMainImage(e.target)

  const selectedImage = this.modalImages.querySelector('.selected')
  selectedImage.classList.remove('selected')
  e.target.classList.add('selected')
}

// query Selector function
function getElement (selection) {
  const element = document.querySelector(selection)
  if (element) {
    return element
  }
  throw new Error (`Please check "selection" selector, no such element exists`)
}


const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))
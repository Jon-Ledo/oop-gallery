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
  let self = this // points back to Gallery

  // bind functions
  // this.openModal = this.openModal.bind(this) // points back to the Gallery

  // container event
  this.container.addEventListener('click', function (e) {
    // self.openModal()
    if(e.target.classList.contains('img')) {
      this.openModal(e.target, this.list)
    }
    
  }.bind(this))
}

// FUNCTIONS
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
}

Gallery.prototype.setMainImage = function(selectedImage) {
  this.modalImg.src = selectedImage.src
  this.imageName.textContent = selectedImage.title
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
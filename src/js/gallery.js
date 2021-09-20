import galleryItems from "./app"
import refs from "./refs"


  const { galleryOfImages, modal, closeButton, modalImage, overlay } = refs;
  const imagesMarkup = createGalleryItems(galleryItems)
  
  galleryOfImages.insertAdjacentHTML('afterbegin', imagesMarkup)
  galleryOfImages.addEventListener('click', onGalleryOfImagesClick)
  closeButton.addEventListener('click', closeModalByButton)
  overlay.addEventListener('click', closeModalByClick )
  
  function createGalleryItems(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
      `
    }).join('') 
  }
  
  
  function onGalleryOfImagesClick(evt) {
    evt.preventDefault();
    
    if (evt.target.nodeName !== "IMG") {
      return;
    }
  
    showElement(modal)
    setImageAttr(evt.target.dataset.source, evt.target.alt)
    window.addEventListener('keydown', closeModalByKey)
    window.addEventListener('keydown', scrollingPictures)
  }
  
  function showElement(element) {
    element.classList.add('is-open')
  }
  
  function hideElement(element) {
    element.classList.remove('is-open');
    setImageAttr(" ", "");
    window.removeEventListener('keydown', closeModalByKey);
    window.removeEventListener('keydown', scrollingPictures)
  }
  
  function closeModalByButton() {
    hideElement(modal)
     
  }
  
  function setImageAttr(src, alt) {
    modalImage.setAttribute('src', src);
    modalImage.setAttribute('alt', alt)
    
  }
  
  function closeModalByClick(evt){
    if(evt.target.classList.contains('lightbox__overlay')){
      hideElement(modal)
    }
  }
  
  
  function closeModalByKey(evt) {
  if(evt.code === 'Escape'){
      hideElement(modal)
    }
  }
  
  function scrollingPictures(evt){
  
  let currentIndex = galleryItems.findIndex((image) => image.original === modalImage.src)
  // console.log(currentIndex);
  let nextIndex = currentIndex + 1;
  let previousIndex = currentIndex - 1;
  
  if(evt.code === "ArrowRight"){
    if(nextIndex >= galleryItems.length){
      nextIndex = 0;
    }
  modalImage.src = galleryItems[nextIndex].original;
  }
  
  if(evt.code === "ArrowLeft"){
    if(previousIndex < 0){
      previousIndex = galleryItems.length - 1;
    }
    modalImage.src = galleryItems[previousIndex].original;
   }
  }
  
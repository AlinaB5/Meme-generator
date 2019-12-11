'use strict'

function renderGallery() {
    let imgs = getImgs();
    let elGalleryContainer = document.querySelector('.gallery-container')
    let htmls = imgs.map(function (img) {
        return `<img  data-id = "${img.id}" src="img/${img.id}.jpg" alt="" width= "100px" onclick=setImg(${img.id})>`
    })
    elGalleryContainer.innerHTML = htmls.join('')
}


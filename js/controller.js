'use strict'

let gCanvas, gCtx;

function init() {
    createImages();
    gCanvas = document.querySelector("#my-canvas");
    gCtx = gCanvas.getContext("2d");
    drawImg(1);
}

function setShapeAndColors() {
    gCurrShape = document.querySelector(".shape-option").value
    gCtx.fillStyle = document.querySelector('#fill-color').value
    gCtx.strokeStyle = document.querySelector('#strike-color').value
}

function getImage(imgId) {
    return findImgById(imgId)
}

function drawImg(imgId) {
    let img = getImage(imgId)
    gCtx.drawImage(img.url, 0, 0, gCanvas.width, gCanvas.height)

    // NOTE: the proportion of the image - should be as the canvas, otherwise the image gets distorted
}


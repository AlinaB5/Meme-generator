'use strict'

let gCanvas, gCtx;


function init() {
    createImages();
    gCanvas = document.querySelector("#my-canvas");
    gCtx = gCanvas.getContext("2d");
    gCtx.font = "30px Impact";

    drawMeme()

    // resizeCanvas()
    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - 50
    //         gCanvas.height = window.innerHeight - 100;
    //         drawImg()
    //     })
}

function setShapeAndColors() {
    gCurrShape = document.querySelector(".shape-option").value
    gCtx.fillStyle = document.querySelector('#fill-color').value
    gCtx.strokeStyle = document.querySelector('#strike-color').value
}

function getImage(imgId) {
    return findImgById(imgId)
}

function getMeme() {
    let txts=[]
    txts.push(setTxtAndStyle())
    return createMeme(4, 0, txts)
}

function setTxtAndStyle() {
    let txt = document.querySelector('.txt-input').value
    console.log(txt)
    return {
        line: txt,
        size: 20,
        align: 'left',
        color: 'red'
    }
}

function drawMeme() {
    let meme = getMeme();
    let gImg = new Image()
    let img = findImgById(meme.selectedImgId)
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        drawText(meme.txts[meme.selectedTxtIdx].line, 100, 100);
    };
    gImg.src = img.url
    // NOTE: the proportion of the image - should be as the canvas, otherwise the image gets distorted
}

// function setMemeImg(){

// }

// function renderCanvas(meme) {
// gCanvas.width = img.width;
//     gCanvas.height = img.height;
//     gCtx.drawImage(img, 0, 0);
//     gCtx.drawText(txt,x,y)
// }


function drawText(txt, x, y) {
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

function resizeCanvas() {
    var elContainer =
        document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}

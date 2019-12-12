'use strict'

let gCanvas, gCtx, gCurrImg, gLocationX = 100, gLocationY = 100;


function init() {
    createImages();
    gCanvas = document.querySelector("#my-canvas");
    // gCanvas.addEventListener('click', (ev) => { onSetLocation(ev)})
    gCtx = gCanvas.getContext("2d");
    gCtx.font = "30px Impact";
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = "white";
    // resizeCanvas()
    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - 50
    //         gCanvas.height = window.innerHeight - 100;
    //         drawImg()
    //     })
}

function setImg(imgId) {
    gCurrImg = findImgById(imgId);
    createMeme(imgId)
    openEditor()
}

function openEditor() {
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.canvas-container').classList.remove('hidden')
    drawMeme();
}

function setTxtsAndStyle() {
    let meme = getCurrMeme();
    let txt = document.querySelector('.txt-input').value
    meme.txts[meme.selectedTxtIdx].line = txt;
    updateCurrMeme(meme)
    drawMeme();
}

function onSetTxtInputIdx() {
    let meme = getCurrMeme()
    if (!meme.selectedTxtIdx) meme.selectedTxtIdx = 1;
    else meme.selectedTxtIdx = 0
}

function drawMeme() {
    let gImg = new Image()
    let img = gCurrImg;
    gImg.onload = () => {
        let meme = getCurrMeme();
        console.log(meme)
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
            drawText(meme.txts[0].line, gLocationX, gLocationY)
            drawText(meme.txts[1].line, gLocationX, gLocationY+200)
    };
    gImg.src = img.url
    // NOTE: the proportion of the image - should be as the canvas, otherwise the image gets distorted
}

function drawText(txt, x, y) {
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onUpdateFontSize(diff) {
    let currFontSize = parseInt(gCtx.font.split(' ')[0])
    let newFontSize = currFontSize + diff;
    gCtx.font = `${newFontSize}px Impact`
}

function onSetLocation(ev) {
    gLocationX = ev.offsetX
    gLocationY = ev.offsetY
}












function setShapeAndColors() {
    gCurrShape = document.querySelector(".shape-option").value
    gCtx.fillStyle = document.querySelector('#fill-color').value
    gCtx.strokeStyle = document.querySelector('#strike-color').value
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

function resizeCanvas() {
    let elContainer =
        document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}
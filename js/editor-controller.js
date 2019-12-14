'use strict'

let gCanvas, gCtx, gCurrImg, gLocationX = 100, gLocationY = 100;


function init() {
    createImages();
    renderGallery();
    gCanvas = document.querySelector("#my-canvas");
    gCanvas.addEventListener('click', (ev) => { onSetLocation(ev) })
    gCtx = gCanvas.getContext("2d");
}

function setImg(imgId) {
    gCurrImg = findImgById(imgId);
    createMeme(imgId)
    onOpenEditor()
}

function onOpenEditor() {
    document.querySelector('.menu-item.gallery-tab').classList.remove('active')
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.main-content').classList.add('hidden')
    drawMeme();
}

function onCloseEditor() {
    document.querySelector('.menu-item.gallery-tab').classList.add('active')
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.main-content').classList.remove('hidden')
}

function onUpdateSize(diff) {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    let currSize = meme.txts[txtIdx].size
    let newSize = currSize + diff;
    meme.txts[txtIdx].size = newSize;
    updateCurrMeme(meme)
    drawMeme();
}

function onSetTxts() {
    let meme = getCurrMeme();
    let txt = document.querySelector('.txt-input').value
    let txtIdx = meme.selectedTxtIdx
    if (meme.txts.length) {
        meme.txts[txtIdx].line = txt
    }else{
        onAddLine()
    }
    updateCurrMeme(meme)
    drawMeme();
}

function onSetTxtIdx() {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    if (txtIdx < meme.txts.length - 1) {
        meme.selectedTxtIdx++;
        updateCurrMeme(meme);
    } else {
        meme.selectedTxtIdx = 0
    }
    document.querySelector('.txt-input').value = meme.txts[meme.selectedTxtIdx].line;
}

function onAddLine() {
    let meme = getCurrMeme();
    meme.txts.push({ line: '', size: 40, x: 80, y: (gCanvas.height / 2) })
    meme.selectedTxtIdx = meme.txts.length - 1;
    document.querySelector('.txt-input').value = '';
    updateCurrMeme(meme);
    if (meme.txts.length > 0) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.remove("disabled")
    }
}

function onDeleteLine() {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    meme.txts.splice(txtIdx, 1);
    document.querySelector('.txt-input').value = '';
    updateCurrMeme(meme);
    if (meme.txts.length < 1) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.add("disabled")
    }
    drawMeme()
}

function onUpdateHeight(diff) {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    let currHeight = meme.txts[txtIdx].y
    meme.txts[txtIdx].y = currHeight + diff
    updateCurrMeme(meme);
    drawMeme()
}

function drawMeme() {
    let elImg = new Image()
    let img = gCurrImg;
    elImg.onload = () => {
        gCanvas.width = elImg.width;
        gCanvas.height = elImg.height;
        let meme = getCurrMeme();
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        for (let i = 0; i < meme.txts.length; i++) {
            drawText(meme.txts[i].line, meme.txts[i].size, meme.txts[i].x, meme.txts[i].y)
        }
    };
    elImg.src = img.url
}

function drawText(txt, size, x, y) {
    gCtx.font = `${size}px Impact`
    gCtx.fillStyle = "white";
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onSetLocation(ev) {
    gLocationX = ev.offsetX
    gLocationY = ev.offsetY
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}










// function setShapeAndColors() {
//     gCurrShape = document.querySelector(".shape-option").value
//     gCtx.fillStyle = document.querySelector('#fill-color').value
//     gCtx.strokeStyle = document.querySelector('#strike-color').value
// }



function resizeCanvas() {
    let elContainer =
        document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}
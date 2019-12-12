'use strict'

let gCanvas, gCtx, gCurrImg;


function init() {
    createImages();
    renderGallery();
    gCanvas = document.querySelector("#my-canvas");
    gCtx = gCanvas.getContext("2d");
    gCtx.font = "30px Impact";
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = "white";
}

function setImg(imgId) {
    gCurrImg = findImgById(imgId);
    createMeme(imgId)
    onOpenEditor()
}

function onOpenEditor() {
    document.querySelector('.menu-item.gallery').classList.remove('active')
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.main-content').classList.add('hidden')
    drawMeme();
}

function onCloseEditor() {
    document.querySelector('.menu-item.gallery').classList.add('active')
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
    meme.txts[txtIdx].line = txt;
    updateCurrMeme(meme)
    drawMeme();
}

function onSetTxtInputIdx() {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    if (txtIdx < meme.txts.length - 1) {
        meme.selectedTxtIdx++;
        updateCurrMeme(meme);
        document.querySelector('.txt-input').value = '';
    } else {
        meme.selectedTxtIdx = 0
    }
}

function onAddLine() {
    let meme = getCurrMeme();
    meme.txts.push({ line: '', size: 20, x: 80, y: (gCanvas.height / 2) })
    updateCurrMeme(meme);
}

function onDeleteLine() {
    let meme = getCurrMeme();
    let txtIdx = meme.selectedTxtIdx
    meme.txts.splice(txtIdx, 1);
    updateCurrMeme(meme);
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
    let gImg = new Image()
    let img = gCurrImg;
    gImg.onload = () => {
        let meme = getCurrMeme();
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        for (let i = 0; i < meme.txts.length; i++) {
            drawText(meme.txts[i].line, meme.txts[i].size, meme.txts[i].x, meme.txts[i].y)
        }
    };
    gImg.src = img.url
}

function drawText(txt, size, x, y) {
    gCtx.font = `${size}px Impact`
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

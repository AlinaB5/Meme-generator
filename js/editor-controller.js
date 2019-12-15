'use strict'
let gCanvas, gCtx, gCurrImg, gDownloadMode = false;

function init() {
    createImages();
    renderGallery();
    gCanvas = document.querySelector("#my-canvas");
    gCtx = gCanvas.getContext("2d");
}

function setImg(imgId) {
    createMeme(imgId)
    gCurrImg = findImgById(imgId);
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
    updateSize(diff)
    drawMeme();
}

function onUpdateTxts() {
    let meme = getCurrMeme();
    let txt = document.querySelector('.txt-input').value
    if (meme.txts.length) {
        updateTxts(txt);
    } else {
        onAddLine()
    }
    setTextWidth(meme.txts[meme.selectedTxtIdx].line)
    drawMeme();
}

function onSetTxtIdx() {
    setTxtIdx()
    let meme = getCurrMeme();
    if (meme.txts.length) {
        document.querySelector('.txt-input').value = meme.txts[meme.selectedTxtIdx].line;
    } else {
        document.querySelector('.txt-input').value = '';
    }
    drawRect(meme.txts[meme.selectedTxtIdx])
    drawMeme();
}

function onAddLine() {
    addLine()
    let meme = getCurrMeme();
    document.querySelector('.txt-input').value = '';

    if (meme.txts.length > 0) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.remove("disabled")
    }
}

function onDeleteLine() {
    deleteLine();
    let meme = getCurrMeme();
    document.querySelector('.txt-input').value = '';

    if (meme.txts.length < 1) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.add("disabled")
    }

    onSetTxtIdx()
    drawMeme()
}

function onUpdateHeight(diff) {
    updateHeight(diff)
    drawMeme()
}

function onUpdateAlign(txtAlign) {
    updateAlign(txtAlign)
    drawMeme()
}

function onUpdateFontFamily(fontFamily) {
    updateFontFamily(fontFamily)
    drawMeme()
}

function onUpdateFontColor() {
    let fontColor = document.querySelector('.font-color').value
    updateFontColor(fontColor)
    drawMeme();
}

function onUpdateStrokeColor() {
    let strokeColor = document.querySelector('.stroke-color').value
    updateStrokeColor(strokeColor)
    drawMeme()
}

function drawMeme() {
    let elImg = new Image()
    let img = gCurrImg;
    // get meme
    // get img by id

    elImg.onload = () => {
        gCanvas.width = elImg.width;
        gCanvas.height = elImg.height;
        let meme = getCurrMeme();
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        // instead of for - foreach
        if (gDownloadMode) {
            for (let i = 0; i < meme.txts.length; i++) {
                let text = meme.txts[i]
                drawText(text)
                // gDownloadMode = false;
            }
        } else {
            drawRect(meme.txts[meme.selectedTxtIdx])
            console.log("draw-this", "download mode ",gDownloadMode)
            for (let i = 0; i < meme.txts.length; i++) {
                let text = meme.txts[i]
                drawText(text)
            } 
        }
    };
    elImg.src = img.url
}

function drawRect(text) {
    gCtx.beginPath();
    gCtx.rect(text.x, text.y - text.size, text.width + 20, text.size * 1.5)
    gCtx.fillStyle = "rgba(250,250,250,0.2)"
    gCtx.strokeStyle = 'white';
    gCtx.fillRect(text.x, text.y - text.size, text.width + 20, text.size * 1.5)
    gCtx.stroke();
    gCtx.closePath();
}

function drawText(text) {
    gCtx.font = `${text.size}px ${text.fontFam}`
    gCtx.textAlign = text.txtAlign;
    gCtx.lineWidth = 2;
    gCtx.fillStyle = text.fontColor;
    gCtx.strokeStyle = text.strokeColor;
    gCtx.fillText(text.line, text.x, text.y);
    gCtx.strokeText(text.line, text.x, text.y);
}

function onDownloadCanvas(elLink) {
    gDownloadMode = true
    drawMeme();
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

function setTextWidth(textLine) {
    let textWidth = gCtx.measureText(textLine).width;
    updateTxtWidth(textWidth);
}

function handleMouseDown(ev) {
    ev.preventDefault();
    let meme = getCurrMeme();
    let clickedX = ev.offsetX;
    let clickedY = ev.offsetY;
    for (let i = 0; i < meme.txts.length; i++) {
        console.log("outside of hit test", clickedX, clickedY)
        if (textHitTest(clickedX, clickedY, i)) {

            meme.selectedTxtIdx = i;
            console.log(clickedX, clickedY)
            console.log("texthit")
        }
    }
}

function textHitTest(x, y, txtIdx) {
    let meme = getCurrMeme();
    let text = meme.txts[txtIdx];
    return (x >= text.x - 30 &&
        x <= text.x + text.width &&
        y >= text.y - text.size &&
        y <= text.y);
}
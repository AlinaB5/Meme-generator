'use strict'

let gCanvas, gCtx, gCurrImg;
//gLocationX = 100, gLocationY = 100

function init() {
    createImages();
    renderGallery();
    gCanvas = document.querySelector("#my-canvas");
    // gCanvas.addEventListener('click', (ev) => { onSetLocation(ev) })
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

function onUpdateTxts() {
    let meme = getCurrMeme();
    let txt = document.querySelector('.txt-input').value
    let txtIdx = meme.selectedTxtIdx

    if (meme.txts.length) {
        meme.txts[txtIdx].line = txt
    } else {
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

    if (meme.txts.length) {
        document.querySelector('.txt-input').value = meme.txts[meme.selectedTxtIdx].line;
    } else {
        document.querySelector('.txt-input').value = '';
    }
}

function onAddLine() {
    let meme = getCurrMeme();
    meme.txts.push({
        line: '', size: 40, fontFam: 'Impact', txtAlign: "start", fontColor: "black",
        strokeColor: "white", x: 80, y: (gCanvas.height / 2)
    })
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

    onSetTxtIdx()
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

function onUpdateAlign(txtAlign) {
    let meme = (getCurrMeme())
    let text = meme.txts[meme.selectedTxtIdx]
    switch (txtAlign) {
        case "start":
            text.txtAlign = "start"
            text.x = 80;
            updateCurrMeme(meme)
            drawMeme()
            break;
        case "center":
            text.txtAlign = "center"
            text.x = gCanvas.width / 2;
            updateCurrMeme(meme)
            drawMeme()
            break;

        case "end":
            text.txtAlign = "end"
            text.x = gCanvas.width - 80;
            updateCurrMeme(meme)
            drawMeme()
            break;
    }
}

function onUpdateFontFamily(fontFamily) {
    let meme = getCurrMeme()
    let text = meme.txts[meme.selectedTxtIdx]

    switch (fontFamily) {
        case "impact":
            text.fontFam = 'Impact'
            updateCurrMeme(meme)
            drawMeme()
            break;
        case "ariel":
            text.fontFam = 'Ariel'
            updateCurrMeme(meme)
            drawMeme()
            break;
        case "helvetica":
            text.fontFam = 'Helvetica'
            updateCurrMeme(meme)
            drawMeme()
            break;
        case "roboto":
            text.fontFam = 'Roboto'
            updateCurrMeme(meme)
            drawMeme()
            break;
        case "calibri":
            text.fontFam = 'Calibri'
            updateCurrMeme(meme)
            drawMeme()
            break;
    }
}


function onUpdateFontColor() {
    let meme = getCurrMeme()
    let fontColor = document.querySelector('.font-color').value
    meme.txts[meme.selectedTxtIdx].fontColor = fontColor
    updateCurrMeme(meme)
    drawMeme()
}


function onUpdateStrokeColor() {
    let meme = getCurrMeme()
    let strokeColor = document.querySelector('.stroke-color').value
    meme.txts[meme.selectedTxtIdx].strokeColor = strokeColor
    updateCurrMeme(meme)
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
            let text = meme.txts[i]
            drawText(text.line, text.fontFam, text.size, text.txtAlign, text.fontColor, text.strokeColor, text.x, text.y)
        }
    };
    elImg.src = img.url
}

function drawText(txt, fontFam, size, txtAlign, fontColor, strokeColor, x, y) {
    gCtx.font = `${size}px ${fontFam}`
    gCtx.textAlign = txtAlign;
    gCtx.lineWidth = 2;
    gCtx.fillStyle = fontColor;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}

// function onSetLocation(ev) {
//     gLocationX = ev.offsetX
//     gLocationY = ev.offsetY
// }

// function handleMouseDown(ev) {
//     let meme = getCurrMeme();
//     let clickedX = ev.offsetX;
//     let clickedY = ev.offsetY;
//     for (let i = 0; i < meme.txts.length; i++) {
//         console.log(meme)
//         if (textHitTest(clickedX, clickedY, i)) {
//             meme.selectedTxtIdx = i;
//             updateCurrMeme(meme)
//             console.log(meme)
//         }
//     }
// }

// function textHitTest(x, y, txtIdx) {
//     let meme = getCurrMeme();
//     let text = meme.txts[txtIdx];
//     return (x >= text.x &&
//         x <= text.line.length * text.size &&
//         y >= text.y - text.size / 2 &&
//         y <= text.y + text.size / 2);
// }
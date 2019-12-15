'use strict'

let gImgs = [], gNextId = 1, gCurrMeme;


function createImage(url, keywords) {
    return {
        id: gNextId++,
        url,
        keywords
    }
}

function createImages() {
    for (let i = 1; i < 10; i++) {
        gImgs.push(createImage(`img/${i}.jpg`, ['funny']))
    }
}

function getImgs() {
    return gImgs
}

function findImgById(imgId) {
    return gImgs.find(function (img) {
        return img.id === imgId
    });
}

function createMeme(selectedImgId) {
    const meme = {
        selectedImg: findImgById(selectedImgId),
        selectedTxtIdx: 0,
        // createTxt() with defaults
        txts: [{
            line: '',
            fontFam: 'Impact',
            txtAlign: "start",
            fontColor: "white",
            strokeColor: "black",
            size: 60,
            width: 0,
            x: 80,
            y: 80
        }, {
            line: '',
            fontFam: 'Impact',
            txtAlign: "start",
            fontColor: "white",
            strokeColor: "black",
            size: 60,
            width: 0,
            x: 80,
            y: 420
        }]
    }
    gCurrMeme = meme
}

function getCurrMeme() {
    return gCurrMeme
}


function updateSize(diff) {
    let meme = gCurrMeme
    meme.txts[meme.selectedTxtIdx].size += diff;
}

function updateTxts(txt) {
    let meme = gCurrMeme
    let txtIdx = meme.selectedTxtIdx
    meme.txts[txtIdx].line = txt
}

function setTxtIdx() {
    let meme = gCurrMeme
    let txtIdx = meme.selectedTxtIdx
    if (txtIdx < meme.txts.length - 1) {
        meme.selectedTxtIdx++;
    } else {
        meme.selectedTxtIdx = 0
    }
}

function addLine() {
    let meme = gCurrMeme
    meme.txts.push({
        line: '',
        fontFam: 'Impact',
        txtAlign: "start",
        fontColor: "white",
        strokeColor: "black",
        size: 60,
        width: 0,
        x: 80,
        y: (gCanvas.height / 2)
    })
    meme.selectedTxtIdx = meme.txts.length - 1;
}

function deleteLine() {
    let meme = gCurrMeme
    let txtIdx = meme.selectedTxtIdx
    meme.txts.splice(txtIdx, 1);
}

function updateHeight(diff) {
    let meme = gCurrMeme;
    let txtIdx = meme.selectedTxtIdx
    let currHeight = meme.txts[txtIdx].y
    meme.txts[txtIdx].y = currHeight + diff
    // try less code
}

function updateAlign(txtAlign) {
    let meme = gCurrMeme;
    let text = meme.txts[meme.selectedTxtIdx]
    // try less code
    text.txtAlign = txtAlign;
    switch (text.txtAlign) {
        case "start":
            // text.txtAlign = "start"
            text.x = 80;
            break;
        case "center":
            // text.txtAlign = "center"
            text.x = gCanvas.width / 2;
            break;

        case "end":
            // text.txtAlign = "end"
            text.x = gCanvas.width - 80;
            break;
    }

}

function updateFontFamily(fontFamily) {
    let meme = gCurrMeme;
    let text = meme.txts[meme.selectedTxtIdx]

    // try less code!
    switch (fontFamily) {
        case "impact":
            text.fontFam = 'Impact'
            break;
        case "ariel":
            text.fontFam = 'Ariel'
            break;
        case "helvetica":
            text.fontFam = 'Helvetica'
            break;
        case "roboto":
            text.fontFam = 'Roboto'
            break;
        case "calibri":
            text.fontFam = 'Calibri'
            break;
    }
}

function updateFontColor(fontColor) {
    let meme = gCurrMeme;
    let textIdx = meme.selectedTxtIdx
    meme.txts[textIdx].fontColor = fontColor
}

function updateStrokeColor(strokeColor) {
    let meme = gCurrMeme;
    let textIdx = meme.selectedTxtIdx
    meme.txts[textIdx].strokeColor = strokeColor
}

function updateTxtWidth(textWidth) {
    let meme = gCurrMeme;
    meme.txts[meme.selectedTxtIdx].width = textWidth;
}
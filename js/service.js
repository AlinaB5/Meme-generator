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
    for (let i = 1; i < 18; i++) {
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
    let meme = {
        selectedImgId: findImgById(selectedImgId),
        selectedTxtIdx:0,
        txts:[]
    }
    gCurrMeme = meme
}

function updateCurrMeme(meme) {
    gCurrMeme = meme
}

function getCurrMeme() {
    return gCurrMeme
}

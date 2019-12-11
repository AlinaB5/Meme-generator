'use strict'

let gImgs = [], gNextId = 1, gMeme;

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

function findImgById(imgId) {
    return gImgs.find(function (img) {
        return img.id === imgId
    });
}

function createMeme(ImgId, TxtIdx, txts) {
    let gMeme = {
        selectedImgId: findImgById(ImgId),
        selectedTxtIdx,
        txts: [
            {
                line: 'I never eat Falafel',
                size: 20,
                align: 'left',
                color: 'red'
            }
        ]
    }
}




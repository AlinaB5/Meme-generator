'use strict'
function saveToStorage(key, value) {
    let str = JSON.stringify(value);
    localStorage.setItem(key, str);
}

function loadFromStorage(key, defaultValue) {
    let str = localStorage.getItem(key);
    if (str === 'undefined') return defaultValue;
    return str ? JSON.parse(str) : defaultValue;
}
const wsUri = 'wss://echo-ws-service.herokuapp.com/';

const output = document.querySelector('.output');
const mesSend = document.querySelector('.message-send-button');
const geoSend = document.querySelector('.geo-send-button');
const inputNode = document.querySelector('.input');

let flag = true;
let websocket = new WebSocket(wsUri);

websocket.onmessage = (message) => {
    if (flag) {
        writeServerResponse(message.data)
    }
}

websocket.onerror = () => {
    alert('Проблемы с Websocket')
}

document.body.addEventListener('beforeunload', () => {
    websocket.close();
    websocket = null;
})

function createServerResponse(message) {

    const userMessageLeft = document.createElement('div');
    userMessageLeft.className = 'user-message-left';
    userMessageLeft.style.display = 'flex';
    userMessageLeft.style.justifyContent = 'left';

    const leftMessage = document.createElement('p');
    leftMessage.style.width = '200px';
    leftMessage.style.height = '50px';
    leftMessage.style.border = 'rebeccapurple solid 5px';
    leftMessage.style.borderRadius = '10px';
    leftMessage.style.display = 'flex';
    leftMessage.style.justifyContent = 'center';
    leftMessage.style.alignItems = 'center';
    leftMessage.textContent = message;

    let mes = output.appendChild(userMessageLeft);
    mes.append(leftMessage);
}

function createUserMessage(message) {
    const userMessageRight = document.createElement('div');
    userMessageRight.className = 'user-message-right';
    userMessageRight.style.display = 'flex';
    userMessageRight.style.justifyContent = 'right';

    const rightMessage = document.createElement('p');
    rightMessage.style.width = '200px';
    rightMessage.style.height = '50px';
    rightMessage.style.border = 'rebeccapurple solid 5px';
    rightMessage.style.borderRadius = '10px';
    rightMessage.style.display = 'flex';
    rightMessage.style.justifyContent = 'center';
    rightMessage.style.alignItems = 'center';
    rightMessage.textContent = message;

    let mes = output.appendChild(userMessageRight);
    mes.append(rightMessage);

}

function createGeoMessage(latitude, longitude) {

    const userMessageRight = document.createElement('div');
    userMessageRight.className = 'user-message-right';
    userMessageRight.style.display = 'flex';
    userMessageRight.style.justifyContent = 'right';

    const rightMessage = document.createElement('p');
    rightMessage.style.width = '200px';
    rightMessage.style.height = '50px';
    rightMessage.style.border = 'rebeccapurple solid 5px';
    rightMessage.style.display = '10px';
    rightMessage.style.display = 'flex';
    rightMessage.style.justifyContent = 'center';
    rightMessage.style.alignItems = 'center';

    const a = document.createElement('a');
    a.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    a.textContent = 'Геолокация';
    a.style.textDecoration = 'none';
    rightMessage.append(a);

    let mes = output.appendChild(userMessageRight);
    mes.append(rightMessage);
}


function writeUserMessage(message) {
    if (message.trim()) {
        createUserMessage(message)
    } else {
        alert('Напечатайте что-нибудь')
    }
}

function writeServerResponse(message) {
    if (message.trim()) {
        createServerResponse(message)
    }
}

mesSend.addEventListener('click',() => {
    writeUserMessage(inputNode.value);
    flag = true;
    websocket.send(inputNode.value);
})

geoSend.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const {coords} = position;
        createGeoMessage(coords.latitude , coords.longitude);
        flag = false;
        websocket.send(`${coords}`)
    })
})

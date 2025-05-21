const {ipcRenderer} = require('electron')

function closeApp(){
    ipcRenderer.send("close-app",{
        message:"close-app"
    });
}

function minimzeApp(){
    ipcRenderer.send('minimize-app',{
        message:"minimize"
    })
}
const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs')
const path = require("path");

//  - - - -- - - - - - - - - - - - - - - - - - - - - - - - 

let win;

// browser window specifications
function createMainWindow(){
    win = new BrowserWindow({
        width: 1100,
        height: 750,
        frame: false,
        minHeight: 750,
        maxHeight: 750,
        minWidth: 1100,
        maxWidth: 1100,
        movable:false,
        webPreferences: {
            nodeIntegration: true, // Needed for ipcRenderer in preload or directly in renderer
            contextIsolation: false, // Disable if you need direct access
        },
    })

    // theme choose before opening
    // read the data or current theme of user and open accordingly
    let data = readDataAndReturnJSON("./App-Data/","theme.json");

    // check theme is dark or not if yes open dark theme splash screen
    if(data["theme"]=="dark"){
        win.loadFile('./App/Dark/Splash/index.html')
    }else if(data["theme"]=="light"){
        // if not theme is dark then open light theme's splash screen
        win.loadFile('./App/Light/Splash/index.html')
    }

    // print which theme has choosed in background
    console.log("System Theme Choosed: " + data["theme"])

}

//  - - - - - - - - - - - - - - -- - - - - - -- - - - - -- - 

// open app when ready and initialize browser window
app.whenReady().then(()=>{
    createMainWindow();
})

//  - - - - - - - - - - - - - - - - - - --- - - - - - - - - - -

// functions

// for reading data from JSON file and giving back as an object
function readDataAndReturnJSON(directoryPath, fileNameWithExtention){
    try{
        const filePath = path.join(directoryPath, fileNameWithExtention);
        let jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return jsonData;
    }catch(err){
        return "Error: " + err;
    }
}

ipcMain.on('close-app',(event, data) => {
    console.log("App closed");
    app.quit();
})

ipcMain.on('minimize-app',(event,data) => {
    if(win){
        win.minimize();
    }
})
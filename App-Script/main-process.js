

export function readDataAndReturnJSON(directoryPath, fileNameWithExtention){
    try {
        const filePath = path.join(__dirname, directoryPath, fileNameWithExtention);
        
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        let jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return jsonData;
    } catch (err) {
        console.error("Error reading JSON:", err);
        return null; // Return null instead of a string to properly handle errors
    }
}

export function converDataInJSON(data){
    return JSON.parse(data);
}
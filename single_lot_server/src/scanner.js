const config = require('./config')

const NodeWebcam = require('node-webcam');
const jsQR = require('jsqr');
const fs = require('fs');
const png = require("upng-js");
const axios = require('axios');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const { promisify } = require('util');

const webcamOptions = {
    width: 1920,
    height: 1080,
    delay: 0,
    output: 'png',
    quality: 100,
    verbose: true,
};

const imageFolder = "../images";
const pictureName = 'frame';

const Webcam = NodeWebcam.create(webcamOptions);

const captureImage = () => {
    return new Promise((resolve,reject) => {
        Webcam.capture(pictureName, async (error, imagePath) => {
            if (error) {
                reject(error);
            } 
            const files = await imagemin([imagePath], {
                destination: imageFolder,
                plugins: [
                    imageminPngquant()
                ]
            })
            console.log(files);
            resolve(imageFolder+"/"+imagePath);
            
        })
    })
}
const readFilePromise = promisify(fs.readFile);
const decodeImage = async filename => {
    try {
        console.log("reading file: ", filename)
        const filedata = await readFilePromise(filename);

        const uintar = new Uint8Array(filedata);
        console.log(uintar);

        const decodedPng = png.decode(filedata);
        const data = {
            data: png.toRGBA8(decodedPng),
            width: decodedPng.width,
            height: decodedPng.height,
        }
        console.log("data: ", data);
        const qrCodeData = jsQR(data.data, data.width, data.height);
        console.log("QRCODE DATA: ", qrCodeData);
        if (qrCodeData) {
            return qrCodeData
        } else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const mainFunction = async () => {
    const imagePath = await captureImage();
    const data = await decodeImage(imagePath);
    if (data) {
        axios.post(config.backendURI + "/ticket/create",
            {
                singleLot: config.singleLotId,
                qrData: content,
            },
            {
                Authorization: `Bearer: ${config.lotAccessToken}`,
                'Content-Type': 'application/json; charset=utf-8',
            }
        )
    }
}
mainFunction();
//setInterval(mainFunction, 1000);
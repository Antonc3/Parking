const QRCode = require('qrcode');


async function generateQRCode(text) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

module.exports = {
    generateQRCode
}

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';

const QRGenerator = ({ text, qrColor, bgColor }) => {
  const qrRef = useRef();

  const downloadQR = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'qr-code.png';
          link.click();
        })
        .catch((err) => {
          console.error('Error downloading QR code', err);
        });
    }
  };

  return (
    <div className="qr-container">
      <div className="qr-code-box" ref={qrRef}>
        {text && (
          <QRCodeCanvas
            value={text}
            size={256}
            bgColor={bgColor}
            fgColor={qrColor}
          />
        )}
      </div>
      {text && (
        <div style={{ marginTop: '20px' }}>
          <button className="download-btn" onClick={downloadQR}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;

import React from 'react'

import { QRCodeSVG } from "qrcode.react";

function QrCode(props) {
  return <QRCodeSVG value={props.url} size={props.size}/>;
}
export default QrCode;
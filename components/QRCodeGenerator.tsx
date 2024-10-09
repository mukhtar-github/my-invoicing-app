import QRCode from 'qrcode.react';

export default function QRCodeGenerator({ value }: { value: string }) {
  return <QRCode value={value} size={256} />;
}
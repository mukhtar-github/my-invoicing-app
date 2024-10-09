import QRCode from 'qrcode.react';

interface NQRData {
  merchantId: string;
  accountNumber: string;
  bankCode: string;
  amount: number;
  currency: string;
  // Other necessary fields as per NQR standard
}

function generateNQRString(data: NQRData): string {
  // Construct the NQR payload string according to the specification
  // This may involve concatenating fields with specific formatting
  // For demonstration purposes:
  const payload = `MID:${data.merchantId};ACC:${data.accountNumber};BC:${data.bankCode};AMT:${data.amount};CUR:${data.currency};`;
  return payload;
}

export default function InvoiceQRCode({ data }: { data: NQRData }) {
  const qrValue = generateNQRString(data);

  return <QRCode value={qrValue} size={256} />;
}
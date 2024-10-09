import { PaystackButton } from 'react-paystack';

export default function PaystackPaymentButton({
  amount,
  email,
}: {
  amount: number;
  email: string;
}) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
  const amountInKobo = amount * 100;

  const componentProps = {
    email,
    amount: amountInKobo,
    publicKey,
    text: 'Pay Now',
    onSuccess: (reference: any) => {
      // Handle successful payment
    },
    onClose: () => {
      // Handle payment modal closed
    },
  };

  return <PaystackButton {...componentProps} />;
}
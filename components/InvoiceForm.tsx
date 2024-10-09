import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { PaystackButton } from 'react-paystack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InvoiceQRCode from './InvoiceQRCode';

interface InvoiceFormData {
  clientName: string;
  amount: number;
  email: string;
  // Add other fields as needed
}

const InvoiceSchema = yup.object().shape({
  clientName: yup.string().required('Client name is required'),
  amount: yup.number().required('Amount is required').positive(),
  email: yup.string().email('Invalid email').required('Email is required'),
  // Add other validations
});

const calculateTax = (amount: number) => {
  const taxRate = 0.075; // 7.5% VAT
  return amount * taxRate;
};

export default function InvoiceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: yupResolver(InvoiceSchema),
  });

  const [invoiceData, setInvoiceData] = useState<InvoiceFormData & { tax: number; totalAmount: number } | null>(null);

  const onSubmit = async (data: InvoiceFormData) => {
    const tax = calculateTax(data.amount);
    const totalAmount = data.amount + tax;

    const invoice = {
      ...data,
      tax,
      totalAmount,
    };

    // Save invoice to Supabase
    const { error } = await supabase.from('invoices').insert([invoice]);

    if (error) {
      // Handle error
    } else {
      // Set the invoice data to display QR code
      setInvoiceData(invoice);
    }
  };

  return (
    <Box>
      {!invoiceData ? (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.clientName}>
            <FormLabel>Client Name</FormLabel>
            <Input {...register('clientName')} />
            <FormErrorMessage>{errors.clientName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" {...register('amount')} />
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Client Email</FormLabel>
            <Input type="email" {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          {/* Other form fields */}

          <Button type="submit" colorScheme="teal" mt={4}>
            Generate Invoice
          </Button>
        </Box>
      ) : (
        <Box>
          <Heading size="md" mb={4}>Scan to Pay</Heading>
          <InvoiceQRCode
            data={{
              merchantId: 'YourMerchantID',
              accountNumber: '1234567890',
              bankCode: '044',
              amount: invoiceData.totalAmount,
              currency: 'NGN',
            }}
          />
          <Text mt={4}>Please scan this QR code with your banking app to complete the payment.</Text>
        </Box>
      )}
    </Box>
  );
}
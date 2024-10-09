import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify the request signature if required

  // Extract payment details from request body
  const paymentInfo = req.body;

  // Update the invoice status in Supabase
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'Paid' })
    .eq('invoiceId', paymentInfo.invoiceId);

  if (error) {
    res.status(500).json({ error: 'Failed to update invoice status' });
  } else {
    res.status(200).json({ message: 'Payment confirmed' });
  }
}
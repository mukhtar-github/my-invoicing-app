import { render, screen } from '@testing-library/react';
import InvoiceForm from '../InvoiceForm';

test('renders InvoiceForm correctly', () => {
  render(<InvoiceForm />);
  expect(screen.getByText('Client Name')).toBeInTheDocument();
});
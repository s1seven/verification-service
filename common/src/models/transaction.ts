export interface Transaction {
  transactionId: string;
  transactionType: 'incoming' | 'outgoing';
  dateTime: string;
  product: string;
  quantity: number;
  orderNumber: string;
  counterparty: string;
  transactionLink: string;
}

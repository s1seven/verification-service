import {ConsignmentBill, ConsignmentBillUpload} from 'verification-service-common/models';
import exampleConsignmentBillData from 'verification-service-common/fixtures/consignmentBill.json';

const consignmentBillWithLinks = (consignmentBillData: ConsignmentBill['ConsignmentBill'], txLinks: (string | null)[]) => {
  const consignmentBill = new ConsignmentBill(consignmentBillData);
  txLinks.forEach((link, ind) => consignmentBill.noteSuccessfulUpload(ind, link || ''));
  return consignmentBill;
};

export const mockConsignmentBillUpload = ({
  data = exampleConsignmentBillData.ConsignmentBill,
  creator = 'Jon Doe',
  status = 'success',
  transactionLink = '',
  transferLinks = ['link-to-tx', null]
}: {
  data?: ConsignmentBill['ConsignmentBill'];
  creator?: string;
  status?: 'success';
  transactionLink?: string;
  transferLinks?: (string | null)[];
} = {}): ConsignmentBillUpload => ({
  data: consignmentBillWithLinks(data, transferLinks),
  creator,
  status,
  transactionLink
});

import {ChargeCertificate, CustomField} from './charge';
import {ConsignmentBillPosition} from './consignmentBill';
import {Inspection} from './inspection';

export type BuyerCertificate = ChargeCertificate & Inspection & {
  A06: ChargeCertificate['A01'];
} & {
  Order: ConsignmentBillPosition;
} & {
  B13: number;
};

export interface BuyerCertificateWithTime {
  buyerCertificate: BuyerCertificate;
  inspection?: Inspection;
  timestamp: string;
}

export declare type BuyerCertificateWithDescription = BuyerCertificateWithTime & {
  descriptions: Record<string, string>;
  units: Record<string, string>;
};

const isCustomField = (value: any): value is CustomField => value.key && value.value;

export const buyerCertificateRenderingData = (keyCode: string, value: unknown, description: string, unit: string) => {
  if (typeof value === 'string') {
    return {keyCode, value, description, unit};
  } else if (isCustomField(value)) {
    return {
      keyCode,
      value: value.value,
      description: value.key,
      unit: value.unit
    };
  }
  return {
    keyCode,
    value: JSON.stringify(value),
    description,
    unit
  };
};

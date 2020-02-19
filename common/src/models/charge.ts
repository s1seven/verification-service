import {FailedUpload, SuccessfulUpload, InvalidDataUpload, Upload} from './upload';

export interface ChargeData {
  Certificate: {
    A01: Company;
    A02?: string;
    'A03-1'?: string;
    'A03-2'?: string;
    A04?: string;
    A05?: string;
    A06?: Company;
    'A07-1'?: string;
    'A07-2'?: string;
    A08?: string;
    A09?: string;
    'A10-1'?: string;
    'A10-2'?: string;
    B01?: string;
    'B01-2'?: string;
    B02?: string;
    B03?: string;
    'B04-1'?: 'U' | 'N' | 'TM' | 'Q' | 'AC' | 'A' | 'S' | 'C' | 'LT.SPEC' | 'G';
    'B04-2'?: 'AH-T' | 'AH-V' | 'HT' | 'HD' | 'AK-T' | 'AK-V';
    'B04-3'?: 'L' | 'W' | 'O';
    'B05-1'?: 'U' | 'N' | 'TM' | 'Q' | 'AC' | 'A' | 'S' | 'C' | 'LT.SPEC' | 'G';
    'B05-2'?: 'AH-T' | 'AH-V' | 'HT' | 'HD' | 'AK-T' | 'AK-V';
    'B05-3'?: 'L' | 'W' | 'O';
    B06?: string;
    'B07-1': string;
    'B07-2'?: string;
    B08?: number;
    B09?: number;
    'B10-1'?: number;
    'B10-2'?: number;
    'B10-3'?: number;
    B11?: number;
    B12?: number;
    B13?: number;
    B14?: number;
    B15?: number;
    C00?: string;
    'C01-1'?: 'K' | 'M' | 'F';
    'C01-2'?: '1' | '2' | '4' | '7' | '9';
    'C01-3'?: 'O' | 'U' | 'M' | 'D';
    C02?: 'L' | 'Q' | 'S';
    C03?: 'Temp.' | 'C' | 'K' | 'F' | 'RT';
    'C03-1'?: number;
    'C03-2'?: string;
    C10?: 'C' | 'P';
    C11?: 'REH' | 'REL' | 'RP02' | 'RT05';
    C12?: string;
    C13?: string;
    C30?: string;
    C31?: string;
    C32?: string;
    C40?: 'C40' | 'C' | 'P';
    C41?: string;
    C42?: string;
    C43?: string;
    C70?: 'Y' | 'E';
    C71?: number;
    C72?: number;
    C73?: number;
    C74?: number;
    C75?: number;
    C76?: number;
    C77?: number;
    C78?: number;
    C79?: number;
    C80?: number;
    C81?: number;
    C82?: number;
    C83?: number;
    C84?: number;
    C85?: number;
    C86?: number;
    C87?: number;
    C88?: string;
    C89?: string;
    C90?: string;
    C91?: string;
    C92?: string;
    D01?: string;
    Z01?: string;
    Z02?: string;
    Z03?: string;
    Z04?: string;
    CO2?: number;
    [k: string]: any;
  };
  [k: string]: any;
}

interface Company {
  CompanyName: string;
  Street: string;
  ZipCode: string;
  City: string;
  Country: string;
  // eslint-disable-next-line camelcase
  VAT_Id: string;
}

export interface CustomField {
  key: string;
  value: string;
  unit?: string;
}

export declare type ChargeCertificate = ChargeData['Certificate'];

export declare type SuccessfulChargeUpload = SuccessfulUpload<ChargeData>;
export declare type FailedChargeUpload = FailedUpload<ChargeData>;
export declare type InvalidDataChargeUpload = InvalidDataUpload;
export declare type ChargeUpload = Upload<ChargeData>;

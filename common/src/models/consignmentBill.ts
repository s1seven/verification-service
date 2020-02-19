/* eslint-disable camelcase */
import {FailedUpload, InvalidDataUpload, SuccessfulUpload, Upload} from './upload';
import {groupBy, toGram} from '../utils';

export declare type TransferLink = string | null;

interface ConsignmentBillData {
  ConsignmentBillId: string;
  CreationDateTime: string;
  Sender: {
    CompanyName: string;
    Street: string;
    ZipCode: string;
    City: string;
    Country: string;
    VAT_Id: string;
  };
  Receiver: {
    CompanyName: string;
    Street: string;
    ZipCode: string;
    City: string;
    Country: string;
    VAT_Id: string;
    Email: string;
  };
  Positions: {
    Number: string;
    Product: string;
    Quantity: string;
    QuantityUnit: string;
    OrderNumber: string;
    ChargeId: string;
    Weight: string;
    WeightUnit: string;
    transferLink?: TransferLink;
  }[];
}

export class ConsignmentBill {
  public ConsignmentBill: ConsignmentBillData;

  public constructor(consignmentBill: ConsignmentBillData) {
    this.ConsignmentBill = {...consignmentBill};
    this.ConsignmentBill.Receiver = {...consignmentBill.Receiver};
    this.ConsignmentBill.Sender = {...consignmentBill.Sender};
    this.ConsignmentBill.Positions = [...consignmentBill.Positions];
  }

  public get positions() {
    return this.ConsignmentBill.Positions;
  }

  public totalWeight() {
    return this.totalWeightOfPositions(this.positions);
  }

  public positionsGroupsSummary() {
    return groupBy(this.positions, ({OrderNumber}) => OrderNumber)
      .map(({key, value}) => ({orderNumber: key, positions: value}))
      .map((group) => ({...group, weight: this.totalWeightOfPositions(group.positions)}));
  };

  public noteSuccessfulUpload(positionIndex: number, transferLink: string) {
    this.positions[positionIndex] = {...this.positions[positionIndex], transferLink};
  }

  private totalWeightOfPositions(positions: ConsignmentBillPosition[]) {
    return positions
      .map(({Weight, WeightUnit}) => toGram(Weight, WeightUnit) / 1000)
      .reduce((weight, sum) => weight + sum, 0);
  }
}

export declare type OrderGroup = ReturnType<ConsignmentBill['positionsGroupsSummary']>[0];

export type ConsignmentBillPosition = ConsignmentBillData['Positions'][0];

export declare type SuccessfulConsignmentBillUpload = SuccessfulUpload<ConsignmentBill>;
export declare type FailedConsignmentBillUpload = FailedUpload<ConsignmentBill>;
export declare type InvalidDataConsignmentBillUpload = InvalidDataUpload;
export declare type ConsignmentBillUpload = Upload<ConsignmentBill>;

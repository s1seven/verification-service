import {ChargeData} from './charge';

export interface Inspection {
  CO2?: number;
  'CO2-Total'?: number;
}

export interface ChargeInspection {
  charge: ChargeData;
  inspection?: Inspection;
}

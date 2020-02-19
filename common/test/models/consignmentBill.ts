import {expect} from 'chai';
import {ConsignmentBill} from '../../src/models';

describe('ConsignmentBillModel', () => {
  describe('total weight', () => {
    const consignmentBill = new ConsignmentBill({
      Positions: [
        {Weight: '3.5', WeightUnit: 't'},
        {Weight: '1234,6', WeightUnit: 'kg'},
        {Weight: '265400', WeightUnit: 'g'}
      ]
    } as any);

    it(`sums consignment bill positions' weight and returns in in kilograms`, async () => {
      expect(consignmentBill.totalWeight()).to.equal(5000);
    });
  });

  describe('positions', () => {
    const consignmentBillData = {
      Positions: [
        {Weight: '3.5', WeightUnit: 't'},
        {Weight: '1234,6', WeightUnit: 'kg'},
        {Weight: '265400', WeightUnit: 'g'}
      ]
    } as any;

    it('sets transfer link after noting transfer as successful', async () => {
      const consignmentBill = new ConsignmentBill(consignmentBillData);
      consignmentBill.noteSuccessfulUpload(2, '2');
      expect(consignmentBill.positions).to.deep.equal([
        {Weight: '3.5', WeightUnit: 't'},
        {Weight: '1234,6', WeightUnit: 'kg'},
        {Weight: '265400', WeightUnit: 'g', transferLink: '2'}
      ]);
    });

    it('does not modify original consignment bill', async () => {
      const consignmentBill = new ConsignmentBill(consignmentBillData);
      consignmentBill.noteSuccessfulUpload(0, '5');
      expect(consignmentBillData.Positions).to.deep.equal([
        {Weight: '3.5', WeightUnit: 't'},
        {Weight: '1234,6', WeightUnit: 'kg'},
        {Weight: '265400', WeightUnit: 'g'}
      ]);
    });
  });

  describe('grouped positions', () => {
    const consignmentBill = new ConsignmentBill({
      Positions: [
        {Weight: '10', WeightUnit: 't', OrderNumber: '1'},
        {Weight: '200', WeightUnit: 'kg', OrderNumber: '2'},
        {Weight: '1000', WeightUnit: 'g', OrderNumber: '1'},
        {Weight: '125', WeightUnit: 'kg', OrderNumber: '3'},
        {Weight: '3', WeightUnit: 't', OrderNumber: '2'},
        {Weight: '12000', WeightUnit: 'g', OrderNumber: '1'}
      ]
    } as any);

    it('groups positions by order number and computes total group weights', async () => {
      expect(consignmentBill.positionsGroupsSummary())
        .to.deep.equal([{
          orderNumber: '1',
          positions: [
            {Weight: '10', WeightUnit: 't', OrderNumber: '1'},
            {Weight: '1000', WeightUnit: 'g', OrderNumber: '1'},
            {Weight: '12000', WeightUnit: 'g', OrderNumber: '1'}
          ],
          weight: 10013
        }, {
          orderNumber: '2',
          positions: [
            {Weight: '200', WeightUnit: 'kg', OrderNumber: '2'},
            {Weight: '3', WeightUnit: 't', OrderNumber: '2'}
          ],
          weight: 3200
        }, {
          orderNumber: '3',
          positions: [
            {Weight: '125', WeightUnit: 'kg', OrderNumber: '3'}
          ],
          weight: 125
        }]);
    });
  });
});

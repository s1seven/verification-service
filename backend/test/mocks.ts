export const makeExampleTransaction = (transactionId, inputKey, outputs: string[], timestamp: string) => ({
  id: transactionId,
  // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
  inputs: [{owners_before: [inputKey]}],
  // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
  outputs: outputs.map((publicKey) => ({public_keys: [publicKey]})),
  metadata: {timestamp},
  operation: 'TRANSFER'
});

export const toGram = (weightAsStringOrNumber: string | number, unit: string) => {
  const weight = typeof weightAsStringOrNumber === 'number' ? weightAsStringOrNumber : toNumber(weightAsStringOrNumber);
  switch (unit) {
    case 'g': return weight;
    case 'kg': return weight * 1000;
    case 't': return weight * 1000000;
    default: throw new Error(`Unknown weight unit: ${unit}`);
  }
};

export const toNumber = (numberAsString: string) => Number(numberAsString.replace(',', '.'));

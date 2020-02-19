export const groupBy = <T, U extends string | number | symbol>(collection: T[], grouper: (x: T) => U) => Object.entries<T[]>(
  collection
    .reduce((groups: Record<U, T[]>, value) => {
      if (groups[grouper(value)]) {
        groups[grouper(value)].push(value);
      } else {
        groups[grouper(value)] = [value];
      }
      return groups;
    }, {} as unknown as Record<U, T[]>))
  .map(([key, value]) => ({key, value}));

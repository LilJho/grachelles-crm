export const searchFilter = <T>(
  rows: T[] = [],
  debValue: string = ""
) => {
  const columns = Object.keys(rows[0] || []);
  return rows?.filter((row: any) =>
    columns.some(
      (column) =>
        row[column]
          ?.toString()
          .toLowerCase()
          .indexOf(debValue.toString().toLowerCase()) > -1
    )
  );
};

export const handleSelectData = (data = [], setSelectedRows: any) => {
  setSelectedRows((prevSelectedRows: any) => {
    if (prevSelectedRows.includes(data)) {
      return prevSelectedRows.filter((r: any) => r !== data);
    } else {
      return [...prevSelectedRows, data];
    }
  });
};

export const handleSelectAll = (data = [], setSelectedRows: any) => {
  setSelectedRows((prevSelectedRows: any) => {
    if (prevSelectedRows.length === data.length) {
      return [];
    } else {
      return data;
    }
  });
};

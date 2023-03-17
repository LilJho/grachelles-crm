import Table, {
  TableColumn,
  TableHead,
  TableRow,
} from "@/components/UI/Table/Table";

const DataTable = ({ data }) => {
  return (
    <Table
      data={data}
      header={
        <>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Product Type</TableHead>
          <TableHead>Branch</TableHead>
        </>
      }
    >
      {data?.map((product) => (
        <TableRow key={product.id}>
          <TableColumn>{product.parent_name}</TableColumn>
          <TableColumn>{product.expand.category.name}</TableColumn>
          <TableColumn>{product.product_type}</TableColumn>
          <TableColumn>{product.expand.branch.name}</TableColumn>
        </TableRow>
      ))}
    </Table>
  );
};

export default DataTable;

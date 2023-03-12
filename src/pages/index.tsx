import useToggle from "hooks/useToggle";
import Modal from "@/components/UI/Modal/Modal";
import AddProductCard from "@/components/screens/product/AddProductCard";
import MainLayout from "@/components/layout/MainLayout";
import Table, { TableHead } from "@/components/UI/Table/Table";
import CategoryData from "data/Category.json";
import { TableColumn, TableRow } from "@/components/UI/Table/InteractiveTable";

export default function Home() {
  const header = ["ID", "Name"];

  return (
    <MainLayout>
      <Table
        header={
          <>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </>
        }
        data={CategoryData}
      >
        {CategoryData?.map((val: any) => {
          console.log({ val });
          return (
            <TableRow key={val.id}>
              <TableColumn>{val.category}</TableColumn>
            </TableRow>
          );
        })}
      </Table>
      <Table data={CategoryData} header={header} />
    </MainLayout>
  );
}

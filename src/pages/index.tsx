import useToggle from "hooks/useToggle";
import Modal from "@/components/UI/Modal/Modal";
import AddProductCard from "@/components/screens/product/AddProductCard";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  const [show, toggle] = useToggle();

  return <MainLayout>Index</MainLayout>;
}

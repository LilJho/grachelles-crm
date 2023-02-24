import useToggle from "hooks/useToggle";
import Modal from "@/components/UI/Modal/Modal";
import AddProductCard from "@/components/screens/product/AddProductCard";

export default function Home() {
  const [show, toggle] = useToggle();

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <button onClick={toggle} className="p-4 border bg-sky-200">
          Add Product
        </button>
        {show && (
          <Modal
            isOpen={show}
            toggle={toggle}
            title={<span>Add product</span>}
            closeButton={true}
          >
            <AddProductCard />
          </Modal>
        )}
      </div>
    </>
  );
}

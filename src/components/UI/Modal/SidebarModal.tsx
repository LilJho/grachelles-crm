import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import UnstyledButton from "@/components/UI/Buttons/UnstyledButton";

interface ISidebarProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
}

const SidebarModal = ({
  isOpen,
  toggle,
  children,
  position = "left",
  width = "w-[280px]",
}: ISidebarProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`relative ${
              isOpen
                ? `${position === "left" ? "left-0" : "right-0"}`
                : `${position === "left" ? "-left-[600px]" : "-right-[600px]"}`
            } transition-all flex min-h-full text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-90"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-90"
            >
              <Dialog.Panel
                className={`relative  ${
                  position === "left" ? "ml-0" : "ml-auto"
                } flex md:hidden flex-col ${width} max-w-[90%] transform bg-white px-4 py-6 text-left align-middle shadow-xl transition-all`}
              >
                <UnstyledButton
                  className={`absolute z-10 top-1 ${
                    position === "left" ? "left-2" : "right-2"
                  }`}
                  onClick={toggle}
                >
                  <HiX className="w-5 h-5 text-gray-800" />
                </UnstyledButton>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SidebarModal;

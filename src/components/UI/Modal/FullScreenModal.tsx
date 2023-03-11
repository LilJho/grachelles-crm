import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { HiX } from "react-icons/hi";
import UnstyledButton from "../Buttons/UnstyledButton";

interface IModalProps {
  isOpen: boolean;
  toggle: () => void;
  children?: React.ReactNode;
  title?: any;
  className?: string;
  closeButton?: boolean;
  maxWidth?: string;
}

const FullScreenModal: FC<IModalProps> = ({
  isOpen,
  toggle,
  children,
  className = "",
  maxWidth = "max-w-2xl",
}) => {
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
          <div className="fixed inset-0 bg-white" />
        </Transition.Child>

        <div className="fixed inset-0 bg-white overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${className} ${maxWidth} w-full flex flex-col transform rounded-lg bg-white p-6 text-left align-middle transition-all`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FullScreenModal;

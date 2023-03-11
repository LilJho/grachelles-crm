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

const Modal: FC<IModalProps> = ({
  isOpen,
  toggle,
  children,
  title,
  className = "",
  closeButton = false,
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 md:px-9 md:py-8 text-center">
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
                className={`${className} ${maxWidth} font-quicksand w-full flex flex-col transform  rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between pb-4">
                  {title !== "" && (
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {closeButton && (
                    <UnstyledButton onClick={toggle}>
                      <HiX className="w-6 h-6 text-gray-800" />
                    </UnstyledButton>
                  )}
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

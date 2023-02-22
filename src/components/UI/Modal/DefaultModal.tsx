import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiX } from "react-icons/hi";
import UnstyledButton from "@/components/UI/Button/UnstyledButton";

interface IModalProps {
  isOpen: boolean;
  toggle: () => void;
  children?: React.ReactNode;
  className?: string;
  closeButton?: boolean;
}

const DefaultModal = ({
  isOpen,
  toggle,
  className = "",
  children,
}: IModalProps) => {
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

        <div className="fixed inset-0 overflow-y-auto will-change-transform">
          <div className="flex min-h-full text-center p-2.5">
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
                className={`${className} w-full mx-auto max-w-xl flex flex-col transform rounded-lg bg-white p-6 text-left align-middle  transition-all`}
              >
                <UnstyledButton
                  className={`absolute top-1 right-2`}
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

export default DefaultModal;

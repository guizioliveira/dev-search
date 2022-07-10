import { Fragment, useEffect } from "react";
import { InfoCommit } from "./Commit";
import { Dialog, Transition } from "@headlessui/react";
import { XCircle } from "phosphor-react";
import { BranchSelector } from "./BranchSelector";
import { Repository } from "../types";
import { useGithub } from "../hooks/useGithub";
import { Loading } from "./Loading";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<boolean>;
  repositorySelected: Repository;
}

export function Modal({
  isModalOpen,
  setIsModalOpen,
  repositorySelected,
}: ModalProps) {
  const { commits, loadingCommit } = useGithub();

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[975px] transform rounded-xl bg-lighter text-left align-middle shadow-xl transition-all">
                  <div className="relative -mt-1 w-full rounded-t-xl bg-outer-space py-8 px-3 md:py-14 md:px-10">
                    <Dialog.Title
                      as="h3"
                      className="w-[90%] text-base font-extrabold text-white md:text-2xl"
                    >
                      {repositorySelected?.name}
                    </Dialog.Title>
                    <Dialog.Description
                      as="span"
                      className="max-w-md text-xs text-white md:text-base"
                    >
                      {repositorySelected?.description}
                    </Dialog.Description>
                    <button
                      className="group absolute top-4 right-4 rounded-full focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-outer-space focus:outline-none md:top-6 md:right-6"
                      onClick={closeModal}
                    >
                      <XCircle
                        weight="fill"
                        className="h-7 w-7 text-white transition-colors group-hover:text-apricot-peach md:h-10 md:w-10"
                      />
                    </button>
                  </div>
                  <div className="w-full bg-iron py-5 px-3 md:px-10">
                    <BranchSelector repositoryName={repositorySelected.name} />
                  </div>
                  <div className="mb-10 max-h-[500px] w-full overflow-y-auto py-5 px-3 md:p-10">
                    {loadingCommit ? (
                      <Loading />
                    ) : (
                      commits.map((commit, index) => (
                        <InfoCommit commit={commit} key={index} />
                      ))
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

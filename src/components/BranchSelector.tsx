import { Fragment, useEffect, Dispatch } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { CaretCircleDown, Check } from "phosphor-react";
import { useGithub } from "../hooks/useGithub";

interface BranchSelectorProps {
  repositoryName: string;
  setSelectedBranch: Dispatch<{ name: string }>;
  selectedBranch: { name: string };
}

export function BranchSelector({
  repositoryName,
  selectedBranch,
  setSelectedBranch,
}: BranchSelectorProps) {
  const { branches, getBranchesByRepo } = useGithub();

  useEffect(() => {
    async function getBranches() {
      await getBranchesByRepo(repositoryName);
    }
    getBranches();
  }, []);

  useEffect(() => {
    if (branches !== undefined) {
      setSelectedBranch(branches[0]);
    }
  }, [branches]);

  return (
    <>
      <span className="text-sm font-bold text-outer-space md:text-lg">
        Select the branch
      </span>
      <div className="ml-3 inline-block w-32 md:w-48">
        <Listbox value={selectedBranch} onChange={setSelectedBranch}>
          <Listbox.Button className="relative w-full rounded-md bg-gallery py-2 px-3 text-left focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-iron">
            <span className="block max-w-[80%] truncate text-sm font-bold text-apricot md:text-base">
              {selectedBranch?.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretCircleDown
                weight="bold"
                className="h-5 w-5 text-oslo-gray md:h-7 md:w-7"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-32 overflow-auto rounded-md bg-iron py-1 text-base shadow-lg focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-iron md:w-48">
              {branches.map((branch, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative select-none py-2 pl-7 pr-4 text-sm md:pl-10 md:text-base ${
                      active ? "bg-oslo-gray text-white" : "text-outer-space"
                    }`
                  }
                  value={branch}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block cursor-pointer truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {branch.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-apricot md:pl-3">
                          <Check
                            weight="bold"
                            className="h-4 w-4 md:h-6 md:w-6"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </>
  );
}

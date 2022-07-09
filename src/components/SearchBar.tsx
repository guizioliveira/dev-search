import { useState, FormEvent } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useGithub } from "../hooks/useGithub";

export const SearchBar = () => {
  const [userSearch, setUserSearch] = useState<string>("");
  const { getUser } = useGithub();

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    const filteredUser = userSearch.trim();
    if (filteredUser) {
      await getUser(filteredUser);
    }
  }

  return (
    <div className="container mx-auto -mt-[30px] h-[60px] px-3 md:-mt-[35px] md:h-[70px] md:px-0">
      <div>
        <form>
          <label
            htmlFor="search"
            className="sr-only mb-2 text-sm font-medium text-outer-space"
          >
            Search
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 md:pl-8">
              <MagnifyingGlass
                className="h-6 w-6 text-oslo-gray transition-colors group-focus-within:text-apricot md:h-[35px] md:w-[35px]"
                weight="bold"
              />
            </div>
            <input
              type="text"
              id="search"
              onChange={(event) => setUserSearch(event.target.value)}
              className="block h-[60px] w-full rounded-2xl bg-gallery p-4 pl-14 pr-24 text-xs font-bold text-outer-space shadow-[0_0_10px_6px_rgba(0,0,0,0.24)] transition-colors focus-within:outline-none focus-within:placeholder:text-apricot md:h-[70px] md:pr-36 md:pl-24 md:text-lg"
              placeholder="Search github username..."
            />
            <button
              type="submit"
              className="absolute right-1 bottom-1.5 h-12 w-20 rounded-xl bg-apricot px-2 py-2 text-xs font-bold text-white transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-iron hover:bg-apricot-peach focus:outline-none md:right-2.5 md:bottom-2 md:h-14 md:w-32 md:px-4 md:text-xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

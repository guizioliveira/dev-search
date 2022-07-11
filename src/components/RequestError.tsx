import { useGithub } from "../hooks/useGithub";

export const RequestError = () => {
  const { userError } = useGithub();
  return (
    <div className="container mx-auto mt-10 w-full px-4 md:px-0">
      <div className="flex flex-col items-center gap-5">
        <img
          className="md:w-2/5"
          src={`/src/assets/${userError?.status}.svg`}
          alt="User not found image"
        />
        <p className="text-center text-sm text-outer-space md:text-base">
          {userError?.message}
        </p>
      </div>
    </div>
  );
};

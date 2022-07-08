import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="flex w-full items-center justify-center gap-2 pt-10 text-center font-bold text-apricot">
      <CircleNotch size={30} weight="bold" className="animate-spin" />
      Processing...
    </div>
  );
}

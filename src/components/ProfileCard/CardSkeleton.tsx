export const CardSkeleton = () => {
  return (
    <>
      <div className="container mx-auto mt-8 px-3 md:mt-14 md:px-0">
        <div className="w-full animate-pulse rounded-t-2xl bg-iron px-4 pt-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8">
            <div className="flex flex-row gap-3 md:items-center md:gap-8">
              <div className="h-20 w-28 rounded-full bg-oslo-gray md:h-40 md:w-56" />

              <div className="flex w-full flex-col">
                <div className="mb-1 h-6 w-full rounded-lg bg-oslo-gray md:w-96" />
                <div className="h-4 w-1/2 rounded-md bg-oslo-gray md:w-48" />
                <div className="mt-2 h-16 w-full rounded-lg bg-oslo-gray md:mt-3 md:min-w-[400px]" />
              </div>
            </div>
            <div className="mt-3 ml-20 flex items-center justify-center md:m-0 md:w-1/3 md:justify-end">
              <div className="h-8 w-24 rounded-lg bg-oslo-gray px-4 py-2 md:h-12 md:w-28 md:py-3" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 md:ml-48 md:gap-6">
            <div className="h-6 w-16 rounded-md bg-oslo-gray md:h-7 md:w-24" />
            <div className="h-6 w-16 rounded-md bg-oslo-gray md:h-7 md:w-24" />
          </div>
        </div>
        <div className="h-36 w-full rounded-b-2xl bg-gallery px-4 py-7 md:px-8" />
      </div>
    </>
  )
}

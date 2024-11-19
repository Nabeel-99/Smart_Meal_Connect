import React from "react";

const MealSkeletonLoader = ({
  count,
  className = "",
  isGridView,
  isListView,
}) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-4 gap-10">
          {Array.from({ length: count }).map(
            (_, index) =>
              isGridView && (
                <div
                  key={index}
                  className="flex flex-col  animate-pulse  gap-1 cursor-pointer "
                >
                  <div
                    className={` bg-[#595959] w-full  xl:h-[200px] h-[250px] lg:h-[200px] 2xl:w-[550px] 2xl:h-[300px] border border-[#7d7d7d]  duration-1000 ease-in-out rounded-2xl ${className}`}
                  />
                  <div className="bg-[#595959] mt-2 w-3/4 border border-[#7d7d7d] h-4 rounded  " />
                </div>
              )
          )}
        </div>
        <div className="flex flex-col gap-10">
          {Array.from({ length: count }).map(
            (_, index) =>
              isListView && (
                <div className="flex flex-col gap-6 w-full">
                  <div key={index} className="flex gap-10 items-center w-full">
                    <div className="flex w-full gap-4 animate-pulse">
                      <div
                        className={`h-44  w-full md:w-96  lg:w-72 rounded-md bg-[#595959] border border-[#7d7d7d]`}
                      />
                      <div className="flex flex-col gap-2 w-full">
                        <div className="h-4 md:w-44 lg:w-32 rounded-md bg-[#595959] border border-[#7d7d7d]" />
                        <div className="h-4 w-24 rounded-md bg-[#595959] border border-[#7d7d7d]" />
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default MealSkeletonLoader;

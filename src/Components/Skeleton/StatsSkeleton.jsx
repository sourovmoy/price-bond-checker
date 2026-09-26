const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-green-100 py-4 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="p-5 flex justify-center items-center text-center"
        >
          <div className="flex flex-col items-center">
            {/* Icon Skeleton */}
            <div className="w-12 h-12 bg-gray-300/70 rounded-xl mb-4"></div>

            {/* Label Skeleton */}
            <div className="h-4 w-28 bg-gray-300/70 rounded mt-1 mb-2"></div>

            {/* Value / Number Skeleton */}
            <div className="h-8 w-20 bg-gray-300/70 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;

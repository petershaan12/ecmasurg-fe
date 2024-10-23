const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-64">
      <div className="flex space-x-2">
        <div className="h-4 w-4 rounded-full bg-primary animate-bounce"></div>
        <div className="h-4 w-4 rounded-full bg-primary animate-bounce2"></div>
        <div className="h-4 w-4 rounded-full bg-primary animate-bounce"></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

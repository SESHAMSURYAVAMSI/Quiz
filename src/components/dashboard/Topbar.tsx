const Topbar = () => {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      
      <div>
        <h2 className="text-3xl font-black text-white">
          Welcome Back 👋
        </h2>

        <p className="mt-1 text-gray-400">
          Ready to challenge your brain today?
        </p>
      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 text-xl font-bold text-white">
        S
      </div>
    </div>
  );
};

export default Topbar;
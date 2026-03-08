export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-full max-w-md mx-4 border border-zinc-800 p-6">
        <div className="flex mb-4 gap-2 items-center">
          <span className="text-red-400 text-2xl">✕</span>
          <h1 className="text-xl font-mono font-bold text-white">404 — NOT FOUND</h1>
        </div>
        <p className="mt-4 text-sm text-zinc-500 font-mono">
          The requested route does not exist.
        </p>
      </div>
    </div>
  );
}

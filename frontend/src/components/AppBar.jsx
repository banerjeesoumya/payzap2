import { useSearchParams } from "react-router-dom";

export function AppBar() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name")
    return (
      <div className="shadow h-14 flex justify-between items-center bg-white px-4">
        <div className="font-bold text-xl">
          PayZap
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-700">
            Hello, {name}
          </div>
          <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

          </div>
        </div>
      </div>
    );
  }
  
import { LuPenLine } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { LuLockKeyhole } from "react-icons/lu";
import Link from "next/link";

function About() {
  return (
    <div className="bg-gray-50  text-black min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-around p-4 bg-white">
        <h2 className="text-xl font-medium text-gray-800">Personal Journal</h2> 
        <Link
        href="/login"
        className="px-4 py-2 bg-gray-800 text-white rounded-sm border-none hover:bg-gray-700"
        >
        Sign In
       </Link>
        
      </div>

      {/* Main content */}
      <div className="flex-grow">
        <div className="text-center mt-12">
          <h1 className="text-3xl font-medium text-gray-800 mb-4">
            About Personal Journal
          </h1>
          <p className="text-lg text-gray-500 mx-auto">
            A private space for your thoughts, memories, and reflections.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <div className="bg-white rounded p-4 text-center flex flex-col items-center justify-center space-y-3 max-w-xs shadow-sm">
            <LuPenLine size={28} className="text-gray-700" />
            <h1 className="text-2xl text-gray-800 font-medium leading-none tracking-tight">
              Write
            </h1>
            <p className="text-sm text-gray-500">
              Capture your thoughts, ideas, and memories in a clean interface
            </p>
          </div>

          <div className="bg-white rounded p-4 text-center flex flex-col items-center justify-center space-y-3 max-w-xs shadow-sm">
            <FiBookOpen size={28} className="text-gray-700" />
            <h1 className="text-2xl text-gray-800 font-medium leading-none tracking-tight">
              Reflect
            </h1>
            <p className="text-sm text-gray-500">
              Review past entries to see how you’ve grown and changed over time
            </p>
          </div>

          <div className="bg-white rounded p-4 text-center flex flex-col items-center justify-center space-y-3 max-w-xs shadow-sm">
            <LuLockKeyhole size={28} className="text-gray-700" />
            <h1 className="text-2xl text-gray-800 font-medium leading-none tracking-tight">
              Private
            </h1>
            <p className="text-sm text-gray-500">
              Your entries are private and secure, accessible only to you
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
        <Link
        href="/login"
        className="px-5 py-3 bg-gray-800 text-white rounded-sm border-none hover:bg-gray-700"
        >
       Start Journaling
       </Link>
        </div>
      </div>

      
      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm bg-gray-50 flex-shrink-0">
        <p>&copy; {new Date().getFullYear()} Personal Journal App</p>
      </footer>
    </div>
  );
}

export default About;

import { UserContext } from "@/context/UserContext";
import { ChevronLast, ChevronFirst, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, createContext } from "react";

// Sidebar Context
export const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const { expanded, setExpanded } = useContext(SidebarContext); // Sidebar expand/collapse context
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="h-screen fixed z-10">
      <nav className="h-full flex flex-col bg-[#1F1E30] shadow-lg">
        {/* Sidebar Header */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="Laboratory.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            alt="Laboratory logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)} // Toggle sidebar
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <ul className="flex-1 px-3">{children}</ul>

        {/* Logout Button */}
        <div
          className="flex items-center gap-2 px-4 py-3 mt-auto text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer transition-all"
          onClick={handleLogout}
        >
          <LogOut size={24} />
          {expanded && <span className="text-sm font-medium">Logout</span>}
        </div>
      </nav>
    </aside>
  );
}

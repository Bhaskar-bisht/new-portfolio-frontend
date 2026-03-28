/** @format */

import { PanelLeft, PanelRight } from "lucide-react";
import { useEffect, useState } from "react";
import { RiBriefcaseLine, RiCodeSSlashLine, RiHome4Line, RiMailLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", icon: RiHome4Line, label: "Home" },
    { to: "/about", icon: RiUser3Line, label: "About" },
    { to: "/skills", icon: RiCodeSSlashLine, label: "Skills" },
    { to: "/projects", icon: RiBriefcaseLine, label: "Projects" },
    // { to: "/blog", icon: RiArticleLine, label: "Blog" },
    { to: "/contact", icon: RiMailLine, label: "Contact" },
];

export default function Sidebar({ expanded, setExpanded }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [window.location.pathname]);

    return (
        <>
            {/* Mobile Toggle Button — only hamburger, no close icon here */}
            {!mobileOpen && (
                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl border border-gray-200"
                    aria-label="Open menu"
                >
                    <PanelRight size={20} className="text-gray-700" />
                </button>
            )}

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`md:hidden fixed left-0 top-0 h-[100dvh] z-40 w-64 flex flex-col bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header with PanelLeft to close */}
                <div className="flex items-center h-16 px-4 justify-between border-b border-gray-200 flex-shrink-0">
                    <NavLink to="/" className="flex items-center gap-1" onClick={() => setMobileOpen(false)}>
                        <span className="text-indigo-500 font-bold text-lg">&lt;</span>
                        {/* <span className="font-bold text-lg text-gray-900">bhaskar</span> */}
                        <span className="text-indigo-500 font-bold text-lg">/&gt;</span>
                    </NavLink>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        aria-label="Close sidebar"
                    >
                        <PanelLeft size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={20} className="flex-shrink-0" />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Badge */}
                <div className="p-3 border-t border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white bg-indigo-500">
                            B
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-800">Bhaskar</p>
                            <p className="text-xs text-gray-500">Developer</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex fixed left-0 top-0 h-[100dvh] z-40 flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
                    expanded ? "w-64" : "w-20"
                }`}
            >
                {/* Header */}
                <div
                    className={`flex items-center h-16 border-b border-gray-200 flex-shrink-0 ${
                        expanded ? "px-4 justify-between" : "px-0 justify-center"
                    }`}
                >
                    {!expanded && (
                        <div className="relative group">
                            <button
                                onClick={() => setExpanded(true)}
                                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
                            >
                                <PanelRight size={20} className="text-gray-600" />
                            </button>
                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 -translate-y-1/2">
                                Expand Sidebar
                                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900" />
                            </div>
                        </div>
                    )}
                    {expanded && (
                        <>
                            <NavLink to="/" className="flex items-center gap-1">
                                <span className="text-indigo-500 font-bold text-lg">&lt;</span>
                                {/* <span className="font-bold text-lg text-gray-900 whitespace-nowrap">bhaskar</span> */}
                                <span className="text-indigo-500 font-bold text-lg">/&gt;</span>
                            </NavLink>
                            <div className="relative group">
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-all duration-200 flex-shrink-0"
                                >
                                    <PanelLeft size={20} className="text-gray-600" />
                                </button>
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none top-1/2 -translate-y-1/2">
                                    Collapse Sidebar
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `group relative flex items-center rounded-xl transition-all duration-200 text-sm font-medium ${
                                    expanded ? "gap-3 p-3" : "justify-center p-3"
                                } ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={20} className={`flex-shrink-0 ${!expanded && "mx-auto"}`} />
                                    {expanded && <span className="whitespace-nowrap">{label}</span>}
                                    {!expanded && (
                                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                                            {label}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-4px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-900" />
                                        </div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Badge */}
                <div className="p-3 border-t border-gray-200 flex-shrink-0">
                    <div
                        className={`flex items-center rounded-xl bg-indigo-50 ${
                            expanded ? "gap-3 px-3 py-2.5" : "justify-center p-3"
                        }`}
                    >
                        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white bg-indigo-500">
                            B
                        </div>
                        {expanded && (
                            <div>
                                <p className="text-xs font-semibold text-gray-800 whitespace-nowrap">Bhaskar</p>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Developer</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

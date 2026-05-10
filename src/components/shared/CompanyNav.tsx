"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, LayoutDashboard, Users, PlusCircle, LogOut, Bell, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function CompanyNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user || user.type !== "company") return null;

  const { data: company } = user;

  const NAV_LINKS = [
    { href: "/company/dashboard", label: "인재 탐색", icon: Users },
    { href: "/company/jobs", label: "공고 관리", icon: FileText },
    { href: "/company/post-job", label: "공고 등록", icon: PlusCircle },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 w-full" />
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/company/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg hidden sm:block">딸깍</span>
            <span className="text-xs text-gray-400 hidden sm:block font-medium">기업</span>
          </Link>
          <div className="h-5 w-px bg-gray-700 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-lg">{company.logo}</span>
            <span className="text-sm font-bold text-gray-100">{company.name}</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-orange-500/20 text-orange-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="hidden md:block">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full" />
          </button>

          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
            <span className="text-base">{company.logo}</span>
            <span className="text-sm font-medium hidden sm:block text-gray-100">{company.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"
            title="로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

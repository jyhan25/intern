"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Zap, LayoutDashboard, User, Bookmark, LogOut, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function StudentNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user || user.type !== "student") return null;

  const { data: student, university } = user;
  const navColor = university.primaryColor;

  const NAV_LINKS = [
    { href: "/student/dashboard", label: "인턴십 탐색", icon: LayoutDashboard },
    { href: "/student/profile", label: "내 프로필", icon: User },
    { href: "/student/saved", label: "저장한 공고", icon: Bookmark },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header
      className="sticky top-0 z-50 text-white shadow-md"
      style={{ backgroundColor: navColor }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + University */}
        <div className="flex items-center gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-yellow-300" />
            </div>
            <span className="font-black text-lg hidden sm:block">딸깍</span>
          </Link>
          <div className="h-5 w-px bg-white/30 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-bold opacity-90">{university.nameKo}</span>
            <Badge className="text-[10px] py-0 bg-white/20 text-white border-0 hover:bg-white/20">
              인증됨 ✓
            </Badge>
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
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="hidden md:block">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">
              {student.avatar}
            </div>
            <span className="text-sm font-medium hidden sm:block">{student.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

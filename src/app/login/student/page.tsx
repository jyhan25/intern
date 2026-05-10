"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Zap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getUniversityFromEmail, UNIVERSITIES } from "@/lib/universities";

const DEMO_ACCOUNTS = [
  { label: "서울대 (SNU)", email: "minjun.kim@snu.ac.kr", color: "#003478" },
  { label: "고려대 (KU)", email: "seoyeon.lee@korea.ac.kr", color: "#8B0000" },
  { label: "연세대 (YU)", email: "jihun.park@yonsei.ac.kr", color: "#003087" },
  { label: "카이스트", email: "sua.choi@kaist.ac.kr", color: "#111111" },
];

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { loginStudent } = useAuth();
  const router = useRouter();

  const university = email.includes("@") ? getUniversityFromEmail(email) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const domain = email.split("@")[1] ?? "";
    const isValidStudent =
      domain.endsWith(".ac.kr") ||
      domain.endsWith(".edu") ||
      domain === "kaist.ac.kr";

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (!isValidStudent && !Object.keys(UNIVERSITIES).includes(domain)) {
      setError("학교 이메일(@학교.ac.kr 또는 @학교.edu)만 사용 가능합니다.");
      return;
    }

    loginStudent(email);
    router.push("/student/dashboard");
  };

  const navColor = university?.primaryColor ?? "#1a1a2e";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Colored top bar based on university */}
      <div
        className="h-1.5 w-full transition-colors duration-500"
        style={{ backgroundColor: navColor }}
      />

      {/* Header */}
      <header
        className="py-4 px-6 flex items-center justify-between transition-colors duration-500"
        style={{ backgroundColor: navColor }}
      >
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">홈으로</span>
        </Link>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-black text-lg">딸깍</span>
        </div>
        <Link href="/login/company">
          <span className="text-sm text-white/70 hover:text-white transition-colors">기업 로그인 →</span>
        </Link>
      </header>

      {/* University banner */}
      {university && university.domain && (
        <div
          className="py-3 px-6 flex items-center justify-center gap-2 transition-all duration-500"
          style={{ backgroundColor: university.primaryColor + "18" }}
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white"
            style={{ backgroundColor: university.primaryColor }}
          >
            {university.logo}
          </div>
          <span className="text-sm font-semibold" style={{ color: university.primaryColor }}>
            {university.nameKo} 학생으로 로그인합니다
          </span>
          <Badge
            className="text-xs text-white border-0"
            style={{ backgroundColor: university.primaryColor }}
          >
            인증됨
          </Badge>
        </div>
      )}

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500"
                style={{ backgroundColor: navColor }}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">학생 로그인</h1>
              <p className="text-gray-500 text-sm mt-2">학교 이메일로 로그인하세요</p>
            </div>

            {/* Demo accounts */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 text-center font-medium">데모 계정으로 빠르게 체험</p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      setEmail(acc.email);
                      setPassword("demo1234");
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all text-left"
                    style={{ borderColor: email === acc.email ? acc.color : undefined }}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-black shrink-0"
                      style={{ backgroundColor: acc.color }}
                    >
                      {acc.label.slice(0, 2)}
                    </div>
                    <span className="text-xs text-gray-600 truncate">{acc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-gray-400">또는 직접 입력</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">학교 이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일@snu.ac.kr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:ring-2 transition-all"
                  style={{
                    outline: "none",
                    boxShadow: university?.primaryColor && university.domain
                      ? `0 0 0 2px ${university.primaryColor}40`
                      : undefined,
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-white transition-colors duration-500"
                style={{ backgroundColor: navColor }}
              >
                로그인
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              계정이 없으신가요?{" "}
              <button
                type="button"
                onClick={() => {
                  if (email && password) handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="font-semibold hover:underline"
                style={{ color: navColor }}
              >
                바로 가입하기
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            학교 이메일(.ac.kr, .edu)만 가입 가능합니다
          </p>
        </div>
      </div>
    </div>
  );
}

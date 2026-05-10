"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Zap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const DEMO_COMPANIES = [
  { label: "토스", email: "recruit@toss.im", logo: "💳" },
  { label: "당근마켓", email: "recruit@daangn.com", logo: "🥕" },
  { label: "뤼이드", email: "jobs@riiid.com", logo: "🎓" },
  { label: "오늘의집", email: "recruit@bucketplace.com", logo: "🏠" },
];

export default function CompanyLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { loginCompany } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    loginCompany(email);
    router.push("/company/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Orange top bar for companies */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-orange-600" />

      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between bg-gray-900">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">홈으로</span>
        </Link>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-black text-lg">딸깍</span>
        </div>
        <Link href="/login/student">
          <span className="text-sm text-white/60 hover:text-white transition-colors">학생 로그인 →</span>
        </Link>
      </header>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-black text-gray-900">기업 로그인</h1>
              <p className="text-gray-500 text-sm mt-2">기업 담당자 계정으로 로그인하세요</p>
            </div>

            {/* Demo company accounts */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 text-center font-medium">데모 기업 계정</p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_COMPANIES.map((c) => (
                  <button
                    key={c.email}
                    type="button"
                    onClick={() => {
                      setEmail(c.email);
                      setPassword("demo1234");
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-all text-left"
                    style={{ borderColor: email === c.email ? "#f97316" : undefined }}
                  >
                    <span className="text-lg">{c.logo}</span>
                    <span className="text-xs text-gray-600 truncate font-medium">{c.label}</span>
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
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">기업 이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="recruit@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
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
                className="w-full h-12 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white"
              >
                기업 로그인
              </Button>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs text-orange-700 font-semibold mb-1">💼 기업 혜택</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• 학교, 전공, GPA 기반 인재 필터링</li>
                <li>• 마음에 드는 인재에게 직접 러브콜</li>
                <li>• 첫 3개월 채용공고 무료 등록</li>
              </ul>
            </div>

            <p className="text-center text-sm text-gray-400 mt-6">
              계정이 없으신가요?{" "}
              <span className="font-semibold text-orange-500 cursor-pointer hover:underline">기업 등록하기</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

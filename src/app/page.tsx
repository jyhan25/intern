"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, Zap, Search, Users, CheckCircle, ArrowRight } from "lucide-react";

const STATS = [
  { label: "등록된 학생", value: "12,400+" },
  { label: "파트너 기업", value: "340+" },
  { label: "매칭 성공", value: "3,200+" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "딸깍 원클릭 지원",
    description: "복잡한 지원서 없이 버튼 하나로 관심 기업에 바로 지원하세요.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Search,
    title: "스마트 필터 검색",
    description: "직무, 업종, 위치, 지원금 등 다양한 조건으로 딱 맞는 인턴십을 찾으세요.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: GraduationCap,
    title: "학교 인증 시스템",
    description: "학교 이메일로 인증하면 대학별 맞춤 UI와 신뢰도 있는 프로필이 완성됩니다.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "기업 러브콜",
    description: "기업이 마음에 드는 인재에게 먼저 러브콜을 보낼 수 있습니다.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

const UNIVERSITIES = [
  { name: "서울대학교", color: "#003478", abbr: "SNU" },
  { name: "고려대학교", color: "#8B0000", abbr: "KU" },
  { name: "연세대학교", color: "#003087", abbr: "YU" },
  { name: "카이스트", color: "#111111", abbr: "KAIST" },
  { name: "성균관대학교", color: "#0033A0", abbr: "SKKU" },
  { name: "한양대학교", color: "#003DA5", abbr: "HYU" },
  { name: "이화여대", color: "#2E5E4E", abbr: "EWH" },
  { name: "서강대학교", color: "#9B1B30", abbr: "SG" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-xl font-black tracking-tight">딸깍</span>
            <Badge variant="secondary" className="text-xs ml-1">Beta</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login/student">
              <Button variant="ghost" size="sm">학생 로그인</Button>
            </Link>
            <Link href="/login/company">
              <Button variant="ghost" size="sm">기업 로그인</Button>
            </Link>
            <Link href="/login/student">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">시작하기</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
        <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 pointer-events-none">
          🚀 대학생 × 스타트업 인턴십 매칭 플랫폼
        </Badge>
        <h1 className="text-6xl font-black tracking-tight mb-6 leading-[1.1]">
          인턴십 지원,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
            딸깍
          </span>{" "}
          한 번이면 끝
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          복잡한 이력서 이메일, 기업 리서치는 이제 그만.
          <br />
          학교 이메일 하나로 검증된 스타트업 인턴십에 바로 지원하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login/student">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 h-14 px-8 text-base font-semibold">
              <GraduationCap className="w-5 h-5 mr-2" />
              학생으로 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/login/company">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-2">
              <Building2 className="w-5 h-5 mr-2" />
              기업으로 등록하기
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* University badges */}
      <section className="bg-gray-50 py-10">
        <p className="text-center text-xs text-gray-400 mb-6 uppercase tracking-widest font-semibold">참여 대학교</p>
        <div className="flex gap-3 justify-center flex-wrap px-4">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.abbr}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow-sm"
              style={{ backgroundColor: uni.color }}
            >
              <span>{uni.abbr}</span>
              <span className="opacity-70 text-xs font-normal">{uni.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">왜 딸깍인가요?</h2>
          <p className="text-gray-500 text-lg">취업 준비의 모든 번거로움을 없앴습니다</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">어떻게 사용하나요?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black">대학생</h3>
              </div>
              {[
                "학교 이메일로 가입 & 학교 인증",
                "전공, 관심사, 이력서 프로필 작성",
                "필터로 원하는 인턴십 탐색",
                "딸깍! 원클릭으로 바로 지원",
              ].map((text, i) => (
                <div key={text} className="flex items-center gap-4 mb-5">
                  <span className="text-2xl font-black text-gray-200 w-8">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                </div>
              ))}
              <Link href="/login/student" className="block mt-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">학생으로 시작하기</Button>
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black">스타트업 / 중소기업</h3>
              </div>
              {[
                "기업 이메일로 가입 & 기업 인증",
                "인턴십 포지션 & 세부사항 등록",
                "지원자 필터링 (학교, 전공, GPA)",
                "마음에 드는 인재에게 러브콜!",
              ].map((text, i) => (
                <div key={text} className="flex items-center gap-4 mb-5">
                  <span className="text-2xl font-black text-gray-200 w-8">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                </div>
              ))}
              <Link href="/login/company" className="block mt-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">기업으로 등록하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="bg-black rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white mb-4">지금 바로 시작하세요</h2>
          <p className="text-gray-400 text-lg mb-8">
            340개 이상의 스타트업이 당신 같은 인재를 기다리고 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login/student">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300 h-12 px-8 font-bold">
                무료로 시작하기
              </Button>
            </Link>
            <Link href="/login/company">
              <Button size="lg" variant="outline" className="h-12 px-8 border-gray-600 text-white hover:bg-white/10 bg-transparent">
                기업 문의하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-yellow-400" />
            </div>
            <span className="font-bold">딸깍</span>
          </div>
          <p className="text-sm text-gray-400">© 2025 딸깍. 대학생과 스타트업을 연결합니다.</p>
        </div>
      </footer>
    </div>
  );
}

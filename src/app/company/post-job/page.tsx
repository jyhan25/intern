"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import CompanyNav from "@/components/shared/CompanyNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Plus, X, Zap } from "lucide-react";
import { INDUSTRIES, JOB_TYPES, MAJORS } from "@/lib/mock-data";

export default function PostJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    industry: "",
    location: "",
    type: "",
    duration: "",
    stipend: "",
    description: "",
    deadline: "",
    minGpa: "",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [preferredMajors, setPreferredMajors] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>(["학부 재학생"]);
  const [newReq, setNewReq] = useState("");

  if (!user || user.type !== "company") return null;

  const { data: company } = user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CompanyNav />
        <div className="flex items-center justify-center min-h-[70vh] px-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md w-full shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">공고 등록 완료!</h2>
            <p className="text-gray-500 mb-2">
              <span className="font-bold text-gray-800">{form.title || "인턴십 공고"}</span>가 성공적으로 등록되었습니다.
            </p>
            <p className="text-sm text-gray-400 mb-8">대학생들이 곧 지원하기 시작할 거예요 🎉</p>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => router.push("/company/dashboard")}
              >
                인재 탐색하기
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSubmitted(false)}
              >
                추가 등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNav />

      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-black mb-1">인턴십 공고 등록</h1>
          <p className="text-gray-400 text-sm">{company.name} · 상세한 정보일수록 더 많은 지원자가 몵집됩니다</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-orange-500">01</span> 기본 정보
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label className="text-sm font-semibold">공고 제목 *</Label>
                <Input
                  placeholder="예: 소프트웨어 엔지니어 인턴"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">업종 *</Label>
                <Select value={form.industry} onValueChange={(v) => v && setForm({ ...form, industry: v })}>
                  <SelectTrigger className="mt-1.5 h-11 rounded-xl">
                    <SelectValue placeholder="업종 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.filter((i) => i !== "전체").map((i) => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold">근무 위치 *</Label>
                <Input
                  placeholder="예: 서울 강남구"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">근무 형태</Label>
                <Select value={form.type} onValueChange={(v) => v && setForm({ ...form, type: v })}>
                  <SelectTrigger className="mt-1.5 h-11 rounded-xl">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.filter((t) => t !== "전체").map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-semibold">기간</Label>
                <Input
                  placeholder="예: 3개월"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">급여/지원금</Label>
                <Input
                  placeholder="예: 월 200만원"
                  value={form.stipend}
                  onChange={(e) => setForm({ ...form, stipend: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">마감일</Label>
                <Input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-orange-500">02</span> 상세 설명
            </h2>
            <textarea
              placeholder="인턴십에 대한 상세 설명을 작성해주세요. 어떤 업무를 하는지, 어떤 경험을 얻을 수 있는지 구체적으로 써주세요."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={6}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-orange-500">03</span> 지원 요건
            </h2>
            <div className="space-y-3 mb-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-sm text-gray-700">{req}</span>
                  <button
                    type="button"
                    onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="요건 추가 (예: Python 경험자 우대)"
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                className="h-10 rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newReq.trim()) {
                    e.preventDefault();
                    setRequirements([...requirements, newReq.trim()]);
                    setNewReq("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  if (newReq.trim()) {
                    setRequirements([...requirements, newReq.trim()]);
                    setNewReq("");
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="mt-5">
              <Label className="text-sm font-semibold mb-2 block">최소 GPA (선택)</Label>
              <Input
                type="number"
                placeholder="예: 3.0"
                min="0"
                max="4.5"
                step="0.1"
                value={form.minGpa}
                onChange={(e) => setForm({ ...form, minGpa: e.target.value })}
                className="h-10 rounded-xl w-32"
              />
            </div>
          </div>

          {/* Skills & Majors */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-orange-500">04</span> 선호 스킬 & 전공
            </h2>

            <div className="mb-5">
              <Label className="text-sm font-semibold mb-2 block">관련 스킬</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <Badge key={skill} className="bg-orange-100 text-orange-700 border-0 gap-1.5 pr-1.5">
                    {skill}
                    <button type="button" onClick={() => setSkills(skills.filter((s) => s !== skill))}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="스킬 추가 (예: React)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="h-10 rounded-xl"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newSkill.trim()) {
                      e.preventDefault();
                      setSkills([...skills, newSkill.trim()]);
                      setNewSkill("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newSkill.trim()) {
                      setSkills([...skills, newSkill.trim()]);
                      setNewSkill("");
                    }
                  }}
                  variant="outline"
                  className="rounded-xl px-4"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-2 block">선호 전공</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {MAJORS.filter((m) => m !== "전체").map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      setPreferredMajors((prev) =>
                        prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                      )
                    }
                    className={`text-xs px-3 py-2 rounded-xl border-2 font-medium transition-all ${
                      preferredMajors.includes(m)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-100 text-gray-500 hover:border-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-base">
              <Zap className="w-4 h-4 mr-2" />
              공고 등록하기
            </Button>
            <Button type="button" variant="outline" className="h-12 px-6 rounded-xl">
              임시 저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

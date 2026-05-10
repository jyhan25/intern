"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import CompanyNav from "@/components/shared/CompanyNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search, Filter, Star, GraduationCap, MapPin, Heart,
  Mail, ChevronRight, Users, TrendingUp, FileText, Sparkles
} from "lucide-react";
import { MOCK_STUDENTS, MAJORS, UNIVERSITIES_LIST, type Student } from "@/lib/mock-data";
import { UNIVERSITIES } from "@/lib/universities";

function StudentCard({
  student,
  onLoveCall,
  sentLoveCall,
}: {
  student: Student;
  onLoveCall: (id: string) => void;
  sentLoveCall: boolean;
}) {
  const uniConfig = Object.values(UNIVERSITIES).find(
    (u) => u.name === student.university
  );
  const uniColor = uniConfig?.primaryColor ?? "#333";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm"
            style={{ backgroundColor: uniColor }}
          >
            {student.avatar}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{student.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: uniColor }}
              >
                {student.universityKo}
              </div>
              <Badge variant="secondary" className="text-[10px] py-0">
                {student.major}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1.5 rounded-xl">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-sm font-black text-amber-700">{student.gpa}</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{student.bio}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {student.skills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {student.skills.length > 4 && (
          <Badge variant="secondary" className="text-xs">+{student.skills.length - 4}</Badge>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
        <div className="flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{student.year}학년</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{student.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          <span>이력서 있음</span>
        </div>
      </div>

      {/* Interests */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {student.interests.map((i) => (
          <span key={i} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            #{i}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {sentLoveCall ? (
          <div className="flex-1 flex items-center justify-center gap-1.5 text-pink-600 text-sm font-semibold bg-pink-50 rounded-xl py-2">
            <Heart className="w-4 h-4 fill-pink-500" />
            러브콜 발송됨
          </div>
        ) : (
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            size="sm"
            onClick={() => onLoveCall(student.id)}
          >
            <Heart className="w-3.5 h-3.5 mr-1.5" />
            러브콜 보내기
          </Button>
        )}
        <Button variant="outline" size="sm" className="rounded-xl px-3">
          <Mail className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl px-3">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("전체");
  const [major, setMajor] = useState("전체");
  const [minYear, setMinYear] = useState("전체");
  const [minGpa, setMinGpa] = useState([0]);
  const [loveCalls, setLoveCalls] = useState<string[]>([]);

  if (!user || user.type !== "company") return null;

  const { data: company } = user;

  const handleLoveCall = (studentId: string) => {
    setLoveCalls((prev) => (prev.includes(studentId) ? prev : [...prev, studentId]));
  };

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchSearch =
        !search ||
        s.name.includes(search) ||
        s.major.includes(search) ||
        s.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase())) ||
        s.interests.some((i) => i.includes(search));
      const matchUni = university === "전체" || s.universityKo === university;
      const matchMajor = major === "전체" || s.major === major;
      const matchYear = minYear === "전체" || s.year >= parseInt(minYear);
      const matchGpa = s.gpa >= minGpa[0];
      return matchSearch && matchUni && matchMajor && matchYear && matchGpa;
    });
  }, [search, university, major, minYear, minGpa]);

  const STATS = [
    { label: "등록된 인재", value: MOCK_STUDENTS.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "오늘 새 프로필", value: "24", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "러브콜 발송", value: loveCalls.length.toString(), icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "검색된 인재", value: filteredStudents.length.toString(), icon: Sparkles, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNav />

      {/* Header */}
      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black mb-1">
            {company.logo} {company.name} · 인재 탐색
          </h1>
          <p className="text-gray-400 text-sm">검증된 대학생 인재를 찾아보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-gray-900">인재 필터</h3>
              </div>

              <div className="space-y-5">
                {/* University filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    대학교
                  </label>
                  <Select value={university} onValueChange={(v) => v && setUniversity(v)}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNIVERSITIES_LIST.map((u) => (
                        <SelectItem key={u} value={u}>{u}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Major filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    전공
                  </label>
                  <Select value={major} onValueChange={(v) => v && setMajor(v)}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MAJORS.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year filter */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    최소 학년
                  </label>
                  <Select value={minYear} onValueChange={(v) => v && setMinYear(v)}>
                    <SelectTrigger className="h-10 rounded-xl border-gray-200 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체</SelectItem>
                      <SelectItem value="1">1학년 이상</SelectItem>
                      <SelectItem value="2">2학년 이상</SelectItem>
                      <SelectItem value="3">3학년 이상</SelectItem>
                      <SelectItem value="4">4학년</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* GPA slider */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                    최소 GPA:{" "}
                    <span className="text-orange-500 font-black">
                      {minGpa[0].toFixed(1)}
                    </span>
                  </label>
                  <Slider
                    value={minGpa}
                    onValueChange={(v) => setMinGpa(Array.isArray(v) ? v : [v as number])}
                    min={0}
                    max={4.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.0</span>
                    <span>4.5</span>
                  </div>
                </div>

                {/* Reset */}
                <Button
                  variant="outline"
                  className="w-full rounded-xl text-sm"
                  onClick={() => {
                    setUniversity("전체");
                    setMajor("전체");
                    setMinYear("전체");
                    setMinGpa([0]);
                    setSearch("");
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="이름, 전공, 스킬, 관심 분야로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-2xl border-gray-200 bg-white shadow-sm text-sm"
              />
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">{filteredStudents.length}</span>명의 인재를 찾았습니다
              </span>
              {university !== "전체" || major !== "전체" || minGpa[0] > 0 ? (
                <Badge className="bg-orange-100 text-orange-700 border-0">
                  필터 적용 중
                </Badge>
              ) : null}
            </div>

            {filteredStudents.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onLoveCall={handleLoveCall}
                    sentLoveCall={loveCalls.includes(student.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-semibold text-gray-500">조건에 맞는 인재가 없습니다</p>
                <p className="text-sm mt-1">필터를 조정해보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

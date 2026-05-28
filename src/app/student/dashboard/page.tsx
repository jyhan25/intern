"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import StudentNav from "@/components/shared/StudentNav";
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
import {
  MapPin, Clock, DollarSign, Users, Search, Filter,
  Zap, Bookmark, Star, ArrowRight, Flame, CheckCircle
} from "lucide-react";
import { MOCK_JOBS, INDUSTRIES, JOB_TYPES, DURATIONS, type Job } from "@/lib/mock-data";

function JobCard({ job, universityColor, onApply, onSave, applied, saved }: {
  job: Job;
  universityColor: string;
  onApply: (id: string) => void;
  onSave: (id: string) => void;
  applied: boolean;
  saved: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 relative">
      {job.isFeatured && (
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ backgroundColor: universityColor }}
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{job.companyLogo}</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">{job.companyName}</p>
            <h3 className="font-bold text-gray-900 leading-tight">{job.titleKo}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {job.isNew && (
            <Badge className="text-[10px] bg-green-100 text-green-700 border-0 py-0">NEW</Badge>
          )}
          <button
            onClick={() => onSave(job.id)}
            className={`p-1.5 rounded-lg transition-colors ${saved ? "text-yellow-500" : "text-gray-300 hover:text-gray-500"}`}
          >
            <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs py-0.5">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.duration} · {job.type}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <DollarSign className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-700">{job.stipend}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.applicants}명 지원</span>
        </div>
      </div>

      {/* GPA requirement */}
      {job.minGPA && (
        <div className="mb-4 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5">
          <Star className="w-3 h-3" />
          <span>최소 GPA {job.minGPA} 이상</span>
        </div>
      )}

      {/* Deadline */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">마감 {job.deadline}</span>

        {applied ? (
          <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            지원 완료
          </div>
        ) : (
          <Button
            size="sm"
            className="h-9 px-5 rounded-xl font-bold text-white"
            style={{ backgroundColor: universityColor }}
            onClick={() => onApply(job.id)}
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            딸깍!
          </Button>
        )}
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("전체");
  const [jobType, setJobType] = useState("전체");
  const [duration, setDuration] = useState("전체");
  const [appliedJobs, setAppliedJobs] = useState<string[]>(["j1", "j3"]);
  const [savedJobs, setSavedJobs] = useState<string[]>(["j2"]);
  const [activeTab, setActiveTab] = useState<"all" | "featured">("all");

  if (!user || user.type !== "student") return null;

  const { university } = user;
  const navColor = university.primaryColor;

  const handleApply = (jobId: string) => {
    setAppliedJobs((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const handleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchSearch =
        !search ||
        job.titleKo.includes(search) ||
        job.companyName.includes(search) ||
        job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchIndustry = industry === "전체" || job.industry === industry;
      const matchType = jobType === "전체" || job.type === jobType;
      const matchDuration = duration === "전체" || job.duration === duration;
      const matchTab = activeTab === "all" || (activeTab === "featured" && job.isFeatured);
      return matchSearch && matchIndustry && matchType && matchDuration && matchTab;
    });
  }, [search, industry, jobType, duration, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      {/* Welcome banner */}
      <div className="text-white py-8 px-4" style={{ backgroundColor: navColor }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black mb-1">
                안녕하세요, {user.data.name}님 👋
              </h1>
              <p className="text-white/70 text-sm">
                {university.nameKo} · {user.data.major} · {user.data.year}학년 ·
                GPA {user.data.gpa}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4 text-center">
              <div className="bg-white/15 rounded-2xl px-6 py-3">
                <div className="text-2xl font-black">{appliedJobs.length}</div>
                <div className="text-xs text-white/70">지원한 공고</div>
              </div>
              <div className="bg-white/15 rounded-2xl px-6 py-3">
                <div className="text-2xl font-black">{savedJobs.length}</div>
                <div className="text-xs text-white/70">저장한 공고</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="직무, 기업명, 스킬로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>

            <Select value={industry} onValueChange={(v) => v && setIndustry(v)}>
              <SelectTrigger className="w-full md:w-36 h-11 rounded-xl border-gray-200 bg-gray-50">
                <SelectValue placeholder="업종" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((i) => (
                  <SelectItem key={i} value={i}>{i}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={jobType} onValueChange={(v) => v && setJobType(v)}>
              <SelectTrigger className="w-full md:w-36 h-11 rounded-xl border-gray-200 bg-gray-50">
                <SelectValue placeholder="근무 형태" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={duration} onValueChange={(v) => v && setDuration(v)}>
              <SelectTrigger className="w-full md:w-36 h-11 rounded-xl border-gray-200 bg-gray-50">
                <SelectValue placeholder="기간" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="h-11 rounded-xl border-gray-200"
              onClick={() => {
                setSearch("");
                setIndustry("전체");
                setJobType("전체");
                setDuration("전체");
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              초기화
            </Button>
          </div>
        </div>

        {/* Tabs + count */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "all"
                  ? "text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              style={activeTab === "all" ? { backgroundColor: navColor } : {}}
            >
              전체 공고
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "featured"
                  ? "text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              style={activeTab === "featured" ? { backgroundColor: navColor } : {}}
            >
              <Flame className="w-3.5 h-3.5" />
              추천 공고
            </button>
          </div>
          <span className="text-sm text-gray-400">
            <span className="font-bold text-gray-700">{filteredJobs.length}</span>개의 공고
          </span>
        </div>

        {/* Job grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                universityColor={navColor}
                onApply={handleApply}
                onSave={handleSave}
                applied={appliedJobs.includes(job.id)}
                saved={savedJobs.includes(job.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold text-gray-500">검색 결과가 없습니다</p>
            <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}

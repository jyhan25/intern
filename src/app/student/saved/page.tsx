"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import StudentNav from "@/components/shared/StudentNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Clock, DollarSign, Zap, Search } from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";

export default function SavedJobsPage() {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState<string[]>(["j2", "j4"]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  if (!user || user.type !== "student") return null;

  const { university } = user;
  const navColor = university.primaryColor;

  const savedJobDetails = MOCK_JOBS.filter((j) => savedJobs.includes(j.id));

  const handleUnsave = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((id) => id !== jobId));
  };

  const handleApply = (jobId: string) => {
    setAppliedJobs((prev) => [...prev, jobId]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      <div className="text-white py-8 px-4" style={{ backgroundColor: navColor }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-black mb-1 flex items-center gap-2">
            <Bookmark className="w-6 h-6" />
            저장한 공고
          </h1>
          <p className="text-white/70 text-sm">관심 있는 공고를 저장하고 나중에 지원하세요</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {savedJobDetails.length > 0 ? (
          <div className="space-y-4">
            {savedJobDetails.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{job.companyLogo}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{job.titleKo}</h3>
                      <p className="text-sm text-gray-500">{job.companyName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnsave(job.id)}
                    className="text-yellow-500 hover:text-gray-300 transition-colors p-1"
                  >
                    <Bookmark className="w-5 h-5" fill="currentColor" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.duration} · {job.type}</span>
                  <span className="flex items-center gap-1 font-semibold text-gray-700">
                    <DollarSign className="w-3 h-3" />{job.stipend}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-gray-400">마감 {job.deadline}</span>
                  {appliedJobs.includes(job.id) ? (
                    <span className="text-green-600 text-sm font-semibold">✓ 지원 완료</span>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-xl font-bold text-white"
                      style={{ backgroundColor: navColor }}
                      onClick={() => handleApply(job.id)}
                    >
                      <Zap className="w-3.5 h-3.5 mr-1.5" />
                      딸깍!
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-200" />
            <p className="font-semibold text-gray-500">저장한 공고가 없습니다</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">관심 있는 공고를 저장해두세요</p>
            <Link href="/student/dashboard">
              <Button style={{ backgroundColor: navColor }} className="text-white">
                <Search className="w-4 h-4 mr-2" />
                공고 탐색하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

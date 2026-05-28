"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import CompanyNav from "@/components/shared/CompanyNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Clock, Users, PlusCircle, Eye, Pencil, Trash2, DollarSign
} from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";

export default function CompanyJobsPage() {
  const { user } = useAuth();

  if (!user || user.type !== "company") return null;

  const { data: company } = user;

  // For demo, show a subset of jobs as "owned" by the logged-in company
  const myJobs = MOCK_JOBS.filter((_, i) => i < 3);

  const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    j1: { label: "진행중", color: "text-green-700", bg: "bg-green-100" },
    j2: { label: "진행중", color: "text-green-700", bg: "bg-green-100" },
    j3: { label: "마감 임박", color: "text-amber-700", bg: "bg-amber-100" },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNav />

      <div className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black mb-1">공고 관리</h1>
            <p className="text-gray-400 text-sm">{company.name} · 등록된 공고 {myJobs.length}개</p>
          </div>
          <Link href="/company/post-job">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
              <PlusCircle className="w-4 h-4 mr-2" />
              새 공고 등록
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
        {myJobs.map((job) => {
          const status = STATUS_MAP[job.id] ?? { label: "진행중", color: "text-green-700", bg: "bg-green-100" };
          return (
            <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{job.companyLogo}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{job.titleKo}</h3>
                      <Badge className={`${status.bg} ${status.color} border-0 text-xs`}>
                        {status.label}
                      </Badge>
                      {job.isNew && (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">NEW</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{job.duration} · {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />{job.stipend}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    미리보기
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                    <Pencil className="w-3.5 h-3.5" />
                    수정
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-red-500 hover:text-red-600 hover:border-red-200">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-4 gap-4 bg-gray-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">{job.applicants}</div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" /> 지원자
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">
                    {Math.floor(job.applicants * 0.3)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">검토중</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-gray-900">
                    {Math.floor(job.applicants * 0.1)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">서류 합격</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-orange-500">{job.deadline}</div>
                  <div className="text-xs text-gray-500 mt-0.5">마감일</div>
                </div>
              </div>
            </div>
          );
        })}

        {myJobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <PlusCircle className="w-12 h-12 mx-auto mb-4 text-gray-200" />
            <p className="font-semibold text-gray-500">등록된 공고가 없습니다</p>
            <Link href="/company/post-job" className="block mt-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                첫 공고 등록하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

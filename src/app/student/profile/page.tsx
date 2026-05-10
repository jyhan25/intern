"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import StudentNav from "@/components/shared/StudentNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, Mail, GraduationCap, Star, Pencil, Plus, X,
  FileText, CheckCircle, Bookmark, Send, Zap
} from "lucide-react";
import { MOCK_JOBS } from "@/lib/mock-data";

export default function StudentProfile() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  if (!user || user.type !== "student") return null;

  const { data: student, university } = user;
  const navColor = university.primaryColor;

  const appliedJobDetails = MOCK_JOBS.filter((j) => student.appliedJobs.includes(j.id));
  const savedJobDetails = MOCK_JOBS.filter((j) => student.savedJobs.includes(j.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />

      {/* Profile hero */}
      <div className="relative" style={{ backgroundColor: navColor }}>
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-white/70 text-sm font-medium">내 프로필</h2>
            <Button
              size="sm"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20"
              onClick={() => setEditMode(!editMode)}
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" />
              {editMode ? "저장하기" : "편집하기"}
            </Button>
          </div>
        </div>

        {/* Avatar */}
        <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 md:-translate-y-0 md:bottom-0 md:top-auto">
          <div
            className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black text-white"
            style={{ backgroundColor: navColor }}
          >
            {student.avatar}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-16 md:pt-8 pb-8">
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {/* Left: Profile info */}
          <div className="md:col-span-1 space-y-4">
            {/* Basic info card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-1">{student.name}</h2>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full text-white mb-4"
                style={{ backgroundColor: navColor }}
              >
                <GraduationCap className="w-3 h-3" />
                {university.nameKo} 인증
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span>{student.major} · {student.year}학년</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>GPA <span className="font-bold text-gray-800">{student.gpa}</span> / 4.5</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{student.location}</span>
                </div>
              </div>

              {/* GPA bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">GPA</span>
                  <span className="font-bold">{student.gpa} / 4.5</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(student.gpa / 4.5) * 100}%`,
                      backgroundColor: navColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">보유 스킬</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {student.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1">
                    <Badge
                      className="text-xs border-0 text-white"
                      style={{ backgroundColor: navColor + "cc" }}
                    >
                      {skill}
                    </Badge>
                    {editMode && (
                      <button className="text-gray-400 hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="스킬 추가..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="h-8 text-xs rounded-lg"
                  />
                  <Button size="sm" className="h-8 px-3 rounded-lg" style={{ backgroundColor: navColor }}>
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">관심 분야</h3>
              <div className="flex flex-wrap gap-2">
                {student.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">이력서</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-gray-300 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-medium">PDF 또는 DOCX 업로드</p>
                <p className="text-xs text-gray-400 mt-1">최대 10MB</p>
              </div>
            </div>
          </div>

          {/* Right: Activity */}
          <div className="md:col-span-2 space-y-4">
            {/* Bio */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">자기소개</h3>
              {editMode ? (
                <textarea
                  defaultValue={student.bio}
                  className="w-full text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": navColor } as React.CSSProperties}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{student.bio}</p>
              )}
            </div>

            {/* Applied jobs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Send className="w-4 h-4" style={{ color: navColor }} />
                  지원한 공고
                  <Badge className="text-white text-xs border-0" style={{ backgroundColor: navColor }}>
                    {appliedJobDetails.length}
                  </Badge>
                </h3>
              </div>
              {appliedJobDetails.length > 0 ? (
                <div className="space-y-3">
                  {appliedJobDetails.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{job.companyLogo}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{job.titleKo}</p>
                          <p className="text-xs text-gray-500">{job.companyName} · {job.stipend}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        지원 완료
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">아직 지원한 공고가 없습니다</p>
              )}
            </div>

            {/* Saved jobs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-500" />
                  저장한 공고
                  <Badge className="bg-amber-100 text-amber-700 text-xs border-0">
                    {savedJobDetails.length}
                  </Badge>
                </h3>
              </div>
              {savedJobDetails.length > 0 ? (
                <div className="space-y-3">
                  {savedJobDetails.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{job.companyLogo}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{job.titleKo}</p>
                          <p className="text-xs text-gray-500">{job.companyName} · 마감 {job.deadline}</p>
                        </div>
                      </div>
                      <Button size="sm" className="h-8 text-xs rounded-lg text-white" style={{ backgroundColor: navColor }}>
                        <Zap className="w-3 h-3 mr-1" />
                        딸깍!
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">저장한 공고가 없습니다</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

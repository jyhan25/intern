"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MOCK_STUDENTS, MOCK_COMPANIES, type Student, type Company } from "./mock-data";
import { getUniversityFromEmail, type UniversityConfig, DEFAULT_UNIVERSITY } from "./universities";

type AuthUser =
  | { type: "student"; data: Student; university: UniversityConfig }
  | { type: "company"; data: Company }
  | null;

type AuthContextType = {
  user: AuthUser;
  loginStudent: (email: string) => boolean;
  loginCompany: (email: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    const stored = localStorage.getItem("intern-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const loginStudent = (email: string): boolean => {
    // For demo: accept any .ac.kr / .edu email, or find an existing mock student
    const existing = MOCK_STUDENTS.find((s) => s.email === email);
    const university = getUniversityFromEmail(email);

    const student: Student = existing ?? {
      id: "s-demo",
      name: "데모 학생",
      email,
      university: university.name,
      universityKo: university.nameKo,
      major: "컴퓨터공학",
      year: 2,
      gpa: 3.5,
      skills: ["Python", "JavaScript"],
      interests: ["스타트업", "AI"],
      bio: "성장 지향적인 대학생입니다.",
      avatar: email[0].toUpperCase(),
      location: "서울",
      appliedJobs: [],
      savedJobs: [],
    };

    const newUser: AuthUser = { type: "student", data: student, university };
    setUser(newUser);
    localStorage.setItem("intern-user", JSON.stringify(newUser));
    return true;
  };

  const loginCompany = (email: string): boolean => {
    const existing = MOCK_COMPANIES.find((c) => c.email === email);
    const company: Company = existing ?? {
      id: "c-demo",
      name: "데모 스타트업",
      email,
      industry: "IT",
      size: "50명",
      location: "서울",
      description: "혁신적인 스타트업입니다.",
      website: "",
      logo: "🚀",
      founded: "2023",
      culture: ["수평적 문화"],
      benefits: ["스톡옵션"],
    };

    const newUser: AuthUser = { type: "company", data: company };
    setUser(newUser);
    localStorage.setItem("intern-user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("intern-user");
  };

  return (
    <AuthContext.Provider value={{ user, loginStudent, loginCompany, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

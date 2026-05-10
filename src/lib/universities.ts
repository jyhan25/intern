export type UniversityConfig = {
  name: string;
  nameKo: string;
  domain: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  logo: string;
};

export const UNIVERSITIES: Record<string, UniversityConfig> = {
  "snu.ac.kr": {
    name: "Seoul National University",
    nameKo: "서울대학교",
    domain: "snu.ac.kr",
    primaryColor: "#003478",
    secondaryColor: "#C9A227",
    textColor: "#ffffff",
    logo: "SNU",
  },
  "korea.ac.kr": {
    name: "Korea University",
    nameKo: "고려대학교",
    domain: "korea.ac.kr",
    primaryColor: "#8B0000",
    secondaryColor: "#FFD700",
    textColor: "#ffffff",
    logo: "KU",
  },
  "yonsei.ac.kr": {
    name: "Yonsei University",
    nameKo: "연세대학교",
    domain: "yonsei.ac.kr",
    primaryColor: "#003087",
    secondaryColor: "#C5A028",
    textColor: "#ffffff",
    logo: "YU",
  },
  "kaist.ac.kr": {
    name: "KAIST",
    nameKo: "카이스트",
    domain: "kaist.ac.kr",
    primaryColor: "#000000",
    secondaryColor: "#E31837",
    textColor: "#ffffff",
    logo: "KAI",
  },
  "postech.ac.kr": {
    name: "POSTECH",
    nameKo: "포항공과대학교",
    domain: "postech.ac.kr",
    primaryColor: "#002395",
    secondaryColor: "#C1A000",
    textColor: "#ffffff",
    logo: "PST",
  },
  "skku.edu": {
    name: "Sungkyunkwan University",
    nameKo: "성균관대학교",
    domain: "skku.edu",
    primaryColor: "#0033A0",
    secondaryColor: "#FFB81C",
    textColor: "#ffffff",
    logo: "SKK",
  },
  "hanyang.ac.kr": {
    name: "Hanyang University",
    nameKo: "한양대학교",
    domain: "hanyang.ac.kr",
    primaryColor: "#003DA5",
    secondaryColor: "#D4AF37",
    textColor: "#ffffff",
    logo: "HYU",
  },
  "ewha.ac.kr": {
    name: "Ewha Womans University",
    nameKo: "이화여자대학교",
    domain: "ewha.ac.kr",
    primaryColor: "#2E5E4E",
    secondaryColor: "#8FBC8F",
    textColor: "#ffffff",
    logo: "EWH",
  },
  "sogang.ac.kr": {
    name: "Sogang University",
    nameKo: "서강대학교",
    domain: "sogang.ac.kr",
    primaryColor: "#9B1B30",
    secondaryColor: "#C0A060",
    textColor: "#ffffff",
    logo: "SG",
  },
  "sookmyung.ac.kr": {
    name: "Sookmyung Women's University",
    nameKo: "숙명여자대학교",
    domain: "sookmyung.ac.kr",
    primaryColor: "#6B2D8B",
    secondaryColor: "#D4A0D0",
    textColor: "#ffffff",
    logo: "SMU",
  },
};

export const DEFAULT_UNIVERSITY: UniversityConfig = {
  name: "University",
  nameKo: "대학교",
  domain: "",
  primaryColor: "#1a1a2e",
  secondaryColor: "#e94560",
  textColor: "#ffffff",
  logo: "UNI",
};

export function getUniversityFromEmail(email: string): UniversityConfig {
  const domain = email.split("@")[1];
  if (!domain) return DEFAULT_UNIVERSITY;
  return UNIVERSITIES[domain] || DEFAULT_UNIVERSITY;
}

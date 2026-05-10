export type Student = {
  id: string;
  name: string;
  email: string;
  university: string;
  universityKo: string;
  major: string;
  year: number;
  gpa: number;
  skills: string[];
  interests: string[];
  bio: string;
  resumeUrl?: string;
  avatar: string;
  location: string;
  appliedJobs: string[];
  savedJobs: string[];
};

export type Job = {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  titleKo: string;
  industry: string;
  location: string;
  type: "현장" | "원격" | "하이브리드";
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  preferredMajors: string[];
  minGPA?: number;
  skills: string[];
  postedAt: string;
  deadline: string;
  applicants: number;
  isNew: boolean;
  isFeatured: boolean;
};

export type Company = {
  id: string;
  name: string;
  email: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  website: string;
  logo: string;
  founded: string;
  culture: string[];
  benefits: string[];
};

export const MOCK_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "토스 (Toss)",
    email: "recruit@toss.im",
    industry: "핀테크",
    size: "1000명+",
    location: "서울 강남구",
    description: "대한민국 대표 핀테크 기업. 금융을 더 쉽고 간편하게 만들어갑니다.",
    website: "https://toss.im",
    logo: "💳",
    founded: "2013",
    culture: ["수평적 조직문화", "빠른 성장", "최고의 동료"],
    benefits: ["스톡옵션", "유연근무", "최신 장비 지원", "건강보험"],
  },
  {
    id: "c2",
    name: "당근마켓",
    email: "recruit@daangn.com",
    industry: "커머스",
    size: "500명+",
    location: "서울 서초구",
    description: "지역 기반 중고거래 플랫폼. 동네 이웃과 연결합니다.",
    website: "https://daangn.com",
    logo: "🥕",
    founded: "2015",
    culture: ["자율과 책임", "투명한 소통", "사용자 중심"],
    benefits: ["원격근무", "점심 제공", "교육비 지원", "팀 활동비"],
  },
  {
    id: "c3",
    name: "뤼이드 (Riiid)",
    email: "jobs@riiid.com",
    industry: "에듀테크",
    size: "200명+",
    location: "서울 강남구",
    description: "AI 기반 개인화 학습 플랫폼. 교육의 미래를 만들어갑니다.",
    website: "https://riiid.com",
    logo: "🎓",
    founded: "2014",
    culture: ["데이터 드리븐", "실험과 도전", "글로벌 마인드"],
    benefits: ["스톡옵션", "해외 출장", "도서 지원", "어학 지원"],
  },
  {
    id: "c4",
    name: "오늘의집",
    email: "recruit@bucketplace.com",
    industry: "라이프스타일",
    size: "400명+",
    location: "서울 강남구",
    description: "인테리어 커머스 플랫폼. 나다운 공간을 만들어갑니다.",
    website: "https://ohou.se",
    logo: "🏠",
    founded: "2014",
    culture: ["창의적 문화", "성장 지향", "사용자 경험 우선"],
    benefits: ["인테리어 지원", "유연근무", "식비 지원", "생일 휴가"],
  },
  {
    id: "c5",
    name: "직방",
    email: "hr@zigbang.com",
    industry: "프롭테크",
    size: "300명+",
    location: "서울 마포구",
    description: "부동산 플랫폼의 혁신. 더 쉬운 이사를 만들어갑니다.",
    website: "https://zigbang.com",
    logo: "🏢",
    founded: "2012",
    culture: ["혁신 지향", "팀워크", "워라밸"],
    benefits: ["재택근무", "탄력근무", "자기계발비", "경조사 지원"],
  },
  {
    id: "c6",
    name: "마켓컬리",
    email: "recruit@kurly.com",
    industry: "이커머스",
    size: "800명+",
    location: "서울 강남구",
    description: "새벽 배송의 선구자. 신선한 가치를 배달합니다.",
    website: "https://kurly.com",
    logo: "🛒",
    founded: "2015",
    culture: ["고객 집착", "데이터 기반", "빠른 실행"],
    benefits: ["컬리 쿠폰", "건강검진", "경력개발", "복지포인트"],
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    companyId: "c1",
    companyName: "토스 (Toss)",
    companyLogo: "💳",
    title: "Software Engineering Intern",
    titleKo: "소프트웨어 엔지니어 인턴",
    industry: "핀테크",
    location: "서울 강남구",
    type: "현장",
    duration: "3개월",
    stipend: "월 250만원",
    description: "토스의 핵심 서비스를 개발하는 인턴십입니다. 실제 프로덕트에 기여하며 최고의 엔지니어들과 함께 성장할 수 있습니다.",
    requirements: ["학부 2~4학년", "CS 관련 전공 또는 동등한 경험", "기본적인 프로그래밍 실력"],
    preferredMajors: ["컴퓨터공학", "소프트웨어학", "전기전자공학"],
    minGPA: 3.0,
    skills: ["React", "TypeScript", "Node.js"],
    postedAt: "2025-05-01",
    deadline: "2025-06-01",
    applicants: 142,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "j2",
    companyId: "c2",
    companyName: "당근마켓",
    companyLogo: "🥕",
    title: "Product Design Intern",
    titleKo: "프로덕트 디자인 인턴",
    industry: "커머스",
    location: "서울 서초구",
    type: "하이브리드",
    duration: "3개월",
    stipend: "월 220만원",
    description: "당근마켓 앱의 사용자 경험을 개선하는 인턴십입니다. 실제 유저 리서치부터 디자인 시스템까지 경험할 수 있습니다.",
    requirements: ["학부 1~4학년", "Figma 기초 사용 가능", "UX에 대한 관심"],
    preferredMajors: ["산업디자인", "시각디자인", "HCI", "컴퓨터공학"],
    skills: ["Figma", "User Research", "Prototyping"],
    postedAt: "2025-05-03",
    deadline: "2025-05-31",
    applicants: 87,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "j3",
    companyId: "c3",
    companyName: "뤼이드 (Riiid)",
    companyLogo: "🎓",
    title: "AI Research Intern",
    titleKo: "AI 연구 인턴",
    industry: "에듀테크",
    location: "서울 강남구",
    type: "현장",
    duration: "6개월",
    stipend: "월 280만원",
    description: "AI 기반 교육 알고리즘을 연구하는 인턴십입니다. ML/DL 모델 개발 및 실험에 참여할 수 있습니다.",
    requirements: ["학부 3~4학년 또는 대학원생", "Python 필수", "ML/DL 기초 지식"],
    preferredMajors: ["컴퓨터공학", "통계학", "수학", "AI"],
    minGPA: 3.5,
    skills: ["Python", "PyTorch", "Machine Learning"],
    postedAt: "2025-04-28",
    deadline: "2025-05-25",
    applicants: 203,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "j4",
    companyId: "c4",
    companyName: "오늘의집",
    companyLogo: "🏠",
    title: "Growth Marketing Intern",
    titleKo: "그로스 마케팅 인턴",
    industry: "라이프스타일",
    location: "서울 강남구",
    type: "현장",
    duration: "3개월",
    stipend: "월 200만원",
    description: "데이터 기반 그로스 마케팅을 배울 수 있는 인턴십입니다. A/B 테스트, 퍼포먼스 마케팅 등을 직접 진행합니다.",
    requirements: ["학부 1~4학년", "데이터 분석 기초", "마케팅에 대한 관심"],
    preferredMajors: ["경영학", "마케팅", "통계학", "컴퓨터공학"],
    skills: ["Google Analytics", "Excel", "SQL"],
    postedAt: "2025-05-05",
    deadline: "2025-06-10",
    applicants: 56,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "j5",
    companyId: "c5",
    companyName: "직방",
    companyLogo: "🏢",
    title: "Backend Engineering Intern",
    titleKo: "백엔드 엔지니어 인턴",
    industry: "프롭테크",
    location: "서울 마포구",
    type: "원격",
    duration: "3개월",
    stipend: "월 230만원",
    description: "부동산 플랫폼의 백엔드 시스템을 개발하는 인턴십입니다. 대용량 트래픽 처리 경험을 쌓을 수 있습니다.",
    requirements: ["학부 2~4학년", "Java 또는 Kotlin 경험", "RESTful API 이해"],
    preferredMajors: ["컴퓨터공학", "소프트웨어학"],
    minGPA: 3.2,
    skills: ["Java", "Spring Boot", "MySQL"],
    postedAt: "2025-04-30",
    deadline: "2025-05-28",
    applicants: 94,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "j6",
    companyId: "c6",
    companyName: "마켓컬리",
    companyLogo: "🛒",
    title: "Data Analysis Intern",
    titleKo: "데이터 분석 인턴",
    industry: "이커머스",
    location: "서울 강남구",
    type: "하이브리드",
    duration: "4개월",
    stipend: "월 210만원",
    description: "커머스 데이터를 분석하여 비즈니스 인사이트를 도출하는 인턴십입니다.",
    requirements: ["학부 2~4학년", "SQL 기초", "Python 또는 R 경험"],
    preferredMajors: ["통계학", "경영학", "컴퓨터공학", "경제학"],
    minGPA: 3.0,
    skills: ["SQL", "Python", "Tableau"],
    postedAt: "2025-05-06",
    deadline: "2025-06-15",
    applicants: 71,
    isNew: true,
    isFeatured: false,
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "김민준",
    email: "minjun.kim@snu.ac.kr",
    university: "Seoul National University",
    universityKo: "서울대학교",
    major: "컴퓨터공학",
    year: 3,
    gpa: 4.1,
    skills: ["React", "TypeScript", "Python", "Node.js"],
    interests: ["핀테크", "AI", "B2C 서비스"],
    bio: "풀스택 개발에 관심이 많고 사용자 경험을 개선하는 것을 좋아합니다.",
    avatar: "KM",
    location: "서울",
    appliedJobs: ["j1", "j3"],
    savedJobs: ["j2"],
  },
  {
    id: "s2",
    name: "이서연",
    email: "seoyeon.lee@korea.ac.kr",
    university: "Korea University",
    universityKo: "고려대학교",
    major: "경영학",
    year: 2,
    gpa: 3.8,
    skills: ["Excel", "SQL", "Python", "Google Analytics"],
    interests: ["이커머스", "마케팅", "데이터 분석"],
    bio: "데이터 기반 마케팅 전략에 관심이 있으며, 그로스 해킹을 배우고 싶습니다.",
    avatar: "LS",
    location: "서울",
    appliedJobs: ["j4", "j6"],
    savedJobs: ["j1"],
  },
  {
    id: "s3",
    name: "박지훈",
    email: "jihun.park@yonsei.ac.kr",
    university: "Yonsei University",
    universityKo: "연세대학교",
    major: "산업디자인",
    year: 3,
    gpa: 3.6,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    interests: ["UX/UI", "프로덕트 디자인", "모바일"],
    bio: "사용자 중심 디자인을 추구하며, 아름다운 인터페이스를 만드는 것을 좋아합니다.",
    avatar: "PJ",
    location: "서울",
    appliedJobs: ["j2"],
    savedJobs: ["j4"],
  },
  {
    id: "s4",
    name: "최수아",
    email: "sua.choi@kaist.ac.kr",
    university: "KAIST",
    universityKo: "카이스트",
    major: "AI",
    year: 4,
    gpa: 4.3,
    skills: ["Python", "PyTorch", "TensorFlow", "R", "C++"],
    interests: ["AI/ML", "에듀테크", "연구"],
    bio: "기계학습과 자연어처리 연구에 관심이 많습니다. 실제 제품에 AI를 적용하고 싶습니다.",
    avatar: "CS",
    location: "대전",
    appliedJobs: ["j3"],
    savedJobs: ["j1", "j5"],
  },
  {
    id: "s5",
    name: "정도윤",
    email: "doyun.jung@skku.edu",
    university: "Sungkyunkwan University",
    universityKo: "성균관대학교",
    major: "소프트웨어학",
    year: 2,
    gpa: 3.9,
    skills: ["Java", "Spring", "MySQL", "Docker"],
    interests: ["백엔드", "인프라", "스타트업"],
    bio: "확장 가능한 시스템을 설계하는 것에 관심이 있습니다. 대용량 트래픽 처리를 배우고 싶습니다.",
    avatar: "JD",
    location: "수원",
    appliedJobs: ["j5"],
    savedJobs: ["j1", "j3"],
  },
  {
    id: "s6",
    name: "한예린",
    email: "yerin.han@ewha.ac.kr",
    university: "Ewha Womans University",
    universityKo: "이화여자대학교",
    major: "통계학",
    year: 3,
    gpa: 3.7,
    skills: ["R", "Python", "SQL", "Tableau", "Excel"],
    interests: ["데이터 사이언스", "이커머스", "금융"],
    bio: "통계적 방법론으로 비즈니스 문제를 해결하는 것을 좋아합니다.",
    avatar: "HY",
    location: "서울",
    appliedJobs: ["j6"],
    savedJobs: ["j3", "j4"],
  },
];

export const INDUSTRIES = ["전체", "핀테크", "커머스", "에듀테크", "라이프스타일", "프롭테크", "이커머스", "헬스테크", "HR테크"];
export const MAJORS = ["전체", "컴퓨터공학", "소프트웨어학", "전기전자공학", "경영학", "통계학", "산업디자인", "시각디자인", "수학", "AI", "경제학", "화학공학"];
export const UNIVERSITIES_LIST = ["전체", "서울대학교", "고려대학교", "연세대학교", "카이스트", "포항공과대학교", "성균관대학교", "한양대학교", "이화여자대학교", "서강대학교"];
export const JOB_TYPES = ["전체", "현장", "원격", "하이브리드"];
export const DURATIONS = ["전체", "1개월", "2개월", "3개월", "4개월", "5개월", "6개월"];

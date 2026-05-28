// db.js — 딸깍 데이터 스토어
// NoSQL 스타일 인메모리 컬렉션 + 인증/테마 유틸리티

const DB = {

  /* ── 대학교 컬렉션 (도메인 + 학교 대표색) ────────────────────── */
  universities: [
    { id:'snu',      name:'서울대학교',       shortName:'서울대',     domains:['snu.ac.kr'],                        region:'서울',   color:'#0E4B93' },
    { id:'yonsei',   name:'연세대학교',       shortName:'연세대',     domains:['yonsei.ac.kr','g.yonsei.ac.kr'],    region:'서울',   color:'#00256C' },
    { id:'korea',    name:'고려대학교',       shortName:'고려대',     domains:['korea.ac.kr'],                      region:'서울',   color:'#C2002F' },
    { id:'skku',     name:'성균관대학교',     shortName:'성균관대',   domains:['skku.edu','g.skku.edu'],             region:'서울·수원', color:'#003876' },
    { id:'hanyang',  name:'한양대학교',       shortName:'한양대',     domains:['hanyang.ac.kr'],                    region:'서울',   color:'#005EB8' },
    { id:'sogang',   name:'서강대학교',       shortName:'서강대',     domains:['sogang.ac.kr'],                     region:'서울',   color:'#003D8F' },
    { id:'ewha',     name:'이화여자대학교',   shortName:'이화여대',   domains:['ewha.ac.kr','ewhain.net'],           region:'서울',   color:'#7B2D8B' },
    { id:'cau',      name:'중앙대학교',       shortName:'중앙대',     domains:['cau.ac.kr'],                        region:'서울',   color:'#002B7F' },
    { id:'khu',      name:'경희대학교',       shortName:'경희대',     domains:['khu.ac.kr'],                        region:'서울',   color:'#002D72' },
    { id:'kaist',    name:'KAIST',           shortName:'KAIST',     domains:['kaist.ac.kr','kaist.edu'],            region:'대전',   color:'#003D6C' },
    { id:'postech',  name:'포스텍',           shortName:'포스텍',     domains:['postech.ac.kr'],                    region:'포항',   color:'#002D72' },
    { id:'konkuk',   name:'건국대학교',       shortName:'건국대',     domains:['konkuk.ac.kr'],                     region:'서울',   color:'#005BAC' },
    { id:'sookmyung',name:'숙명여자대학교',   shortName:'숙명여대',   domains:['sookmyung.ac.kr'],                  region:'서울',   color:'#5C2D91' },
    { id:'dongguk',  name:'동국대학교',       shortName:'동국대',     domains:['dongguk.edu','dgu.ac.kr'],           region:'서울',   color:'#8B0C2C' },
    { id:'hongik',   name:'홍익대학교',       shortName:'홍익대',     domains:['hongik.ac.kr'],                     region:'서울',   color:'#C60024' },
    { id:'inha',     name:'인하대학교',       shortName:'인하대',     domains:['inha.ac.kr'],                       region:'인천',   color:'#004B9D' },
    { id:'ajou',     name:'아주대학교',       shortName:'아주대',     domains:['ajou.ac.kr'],                       region:'수원',   color:'#005EB8' },
    { id:'knu',      name:'경북대학교',       shortName:'경북대',     domains:['knu.ac.kr'],                        region:'대구',   color:'#003087' },
    { id:'pusan',    name:'부산대학교',       shortName:'부산대',     domains:['pusan.ac.kr'],                      region:'부산',   color:'#005EB8' },
    { id:'jnu',      name:'전남대학교',       shortName:'전남대',     domains:['jnu.ac.kr'],                        region:'광주',   color:'#006633' },
    { id:'cnu',      name:'충남대학교',       shortName:'충남대',     domains:['cnu.ac.kr'],                        region:'대전',   color:'#003087' },
    { id:'jbnu',     name:'전북대학교',       shortName:'전북대',     domains:['jbnu.ac.kr'],                       region:'전주',   color:'#003087' },
    { id:'kookmin',  name:'국민대학교',       shortName:'국민대',     domains:['kookmin.ac.kr'],                    region:'서울',   color:'#C8002D' },
    { id:'sejong',   name:'세종대학교',       shortName:'세종대',     domains:['sejong.ac.kr'],                     region:'서울',   color:'#003087' },
    { id:'hufs',     name:'한국외국어대학교', shortName:'한외대',     domains:['hufs.ac.kr'],                       region:'서울',   color:'#00693E' },
    { id:'dankook',  name:'단국대학교',       shortName:'단국대',     domains:['dankook.ac.kr'],                    region:'천안',   color:'#003087' },
    { id:'soongsil', name:'숭실대학교',       shortName:'숭실대',     domains:['soongsil.ac.kr'],                   region:'서울',   color:'#003087' },
    { id:'uos',      name:'서울시립대학교',   shortName:'서울시립대', domains:['uos.ac.kr'],                        region:'서울',   color:'#003087' },
    { id:'mju',      name:'명지대학교',       shortName:'명지대',     domains:['mju.ac.kr'],                        region:'서울',   color:'#003087' },
    { id:'gachon',   name:'가천대학교',       shortName:'가천대',     domains:['gachon.ac.kr'],                     region:'성남',   color:'#C01530' },
    { id:'inu',      name:'인천대학교',       shortName:'인천대',     domains:['inu.ac.kr'],                        region:'인천',   color:'#003087' },
    { id:'kau',      name:'한국항공대학교',   shortName:'항공대',     domains:['kau.ac.kr'],                        region:'고양',   color:'#003087' },
    { id:'chungbuk', name:'충북대학교',       shortName:'충북대',     domains:['chungbuk.ac.kr'],                   region:'청주',   color:'#003087' },
    { id:'kangwon',  name:'강원대학교',       shortName:'강원대',     domains:['kangwon.ac.kr'],                    region:'춘천',   color:'#007B40' },
  ],

  /* ── 공고 컬렉션 ────────────────────────────────────────────── */
  jobs: [
    { id:'job_001', company:'토스 (Viva Republica)', logo:'T', logoBg:'#EBF3FF', logoColor:'#0064FF', role:'그로스 마케팅 인턴',      score:91, tags:['마케팅','그로스해킹','SQL'],          period:'3개월', pay:'월 220만원', deadline:'6.15', loc:'서울 강남 (하이브리드)', status:'new' },
    { id:'job_002', company:'당근마켓',               logo:'당', logoBg:'#FFF0E6', logoColor:'#FF6F0F', role:'UX 리서치 인턴',          score:84, tags:['UX','사용자조사','Notion'],          period:'3개월', pay:'월 200만원', deadline:'6.20', loc:'원격 가능',             status:'new' },
    { id:'job_003', company:'무신사',                 logo:'무', logoBg:'#F0F0F0', logoColor:'#1A1A1A', role:'콘텐츠 마케팅 인턴',      score:77, tags:['콘텐츠','SNS','카피라이팅'],         period:'3개월', pay:'월 180만원', deadline:'6.25', loc:'서울 성수',             status:''    },
    { id:'job_004', company:'오늘의집',               logo:'오', logoBg:'#E8F8F3', logoColor:'#00A880', role:'데이터 분석 인턴',         score:68, tags:['데이터','Python','SQL'],            period:'6개월', pay:'월 190만원', deadline:'7.01', loc:'서울 역삼',             status:''    },
    { id:'job_005', company:'뱅크샐러드',             logo:'뱅', logoBg:'#E8F5E9', logoColor:'#2E7D32', role:'프로덕트 기획 인턴',      score:73, tags:['기획','PM','Figma'],               period:'3개월', pay:'월 185만원', deadline:'7.10', loc:'서울 종로',             status:''    },
    { id:'job_006', company:'직방',                   logo:'직', logoBg:'#FFE8EC', logoColor:'#FF385C', role:'프론트엔드 개발 인턴',    score:62, tags:['React','TypeScript','CSS'],         period:'6개월', pay:'월 200만원', deadline:'7.15', loc:'서울 서초',             status:''    },
    { id:'job_007', company:'클래스101',              logo:'클', logoBg:'#FFF3EE', logoColor:'#FF6B35', role:'퍼포먼스 마케팅 인턴',    score:79, tags:['퍼포먼스마케팅','Meta광고','GA4'],    period:'3개월', pay:'월 175만원', deadline:'7.05', loc:'서울 강남',             status:'new' },
    { id:'job_008', company:'마이리얼트립',           logo:'마', logoBg:'#E8F0FE', logoColor:'#1A73E8', role:'사업개발 인턴',           score:65, tags:['BizDev','기획','영어'],             period:'3개월', pay:'월 180만원', deadline:'7.20', loc:'서울 합정',             status:''    },
  ],

  /* ── 지원 이력 컬렉션 ───────────────────────────────────────── */
  applications: [
    { id:'app_001', company:'토스 (Viva Republica)', logo:'T',  logoBg:'#EBF3FF', logoColor:'#0064FF', role:'그로스 마케팅 인턴',   status:'review',    appliedDate:'2026.05.20', deadline:'6.15', matchScore:91 },
    { id:'app_002', company:'당근마켓',               logo:'당', logoBg:'#FFF0E6', logoColor:'#FF6F0F', role:'UX 리서치 인턴',       status:'interview', appliedDate:'2026.05.18', deadline:'6.20', matchScore:84, interviewNote:'6월 3일 오후 3시 · 화상면접' },
    { id:'app_003', company:'클래스101',              logo:'클', logoBg:'#FFF3EE', logoColor:'#FF6B35', role:'퍼포먼스 마케팅 인턴', status:'review',    appliedDate:'2026.05.22', deadline:'7.05', matchScore:79 },
  ],

  /* ── 지원자 컬렉션 (기업 뷰) ────────────────────────────────── */
  candidates: [
    { id:'cand_001', name:'김태현', school:'연세대 컴공 3학년',    email:'taehyun.kim@yonsei.ac.kr',  role:'프론트엔드 개발 인턴', score:94, status:'interview', tags:['React','TypeScript','Next.js'],   verified:true, bio:'React 기반 사이드 프로젝트 3개를 완성한 연세대 컴공 3학년입니다.',   appliedDate:'2026.05.14' },
    { id:'cand_002', name:'박지수', school:'KAIST 전산 2학년',     email:'jisu.park@kaist.ac.kr',      role:'프론트엔드 개발 인턴', score:88, status:'review',    tags:['Vue.js','Python','AI/ML'],       verified:true, bio:'머신러닝과 웹 개발을 함께 공부 중인 KAIST 전산학부 2학년입니다.',  appliedDate:'2026.05.16' },
    { id:'cand_003', name:'이채원', school:'서울대 경영 3학년',    email:'chaewon.lee@snu.ac.kr',      role:'마케팅 인턴',          score:82, status:'finalist',  tags:['마케팅','SQL','Tableau'],         verified:true, bio:'데이터 기반 마케팅에 관심 많은 서울대 경영학과 3학년입니다.',      appliedDate:'2026.05.12' },
    { id:'cand_004', name:'최민준', school:'고려대 경영 2학년',    email:'minjun.choi@korea.ac.kr',    role:'마케팅 인턴',          score:76, status:'review',    tags:['SNS운영','영상편집','Adobe'],     verified:true, bio:'유튜브 채널 운영 경험 있는 고려대 경영학과 2학년입니다.',          appliedDate:'2026.05.17' },
    { id:'cand_005', name:'정하은', school:'성균관대 통계 3학년',  email:'haeun.jung@g.skku.edu',      role:'프론트엔드 개발 인턴', score:71, status:'review',    tags:['SQL','Python','R'],              verified:true, bio:'데이터 분석·시각화에 강점 있는 성균관대 통계학과 3학년입니다.',   appliedDate:'2026.05.18' },
    { id:'cand_006', name:'윤서연', school:'한양대 광고홍보 2학년',email:'seoyeon.yoon@hanyang.ac.kr', role:'마케팅 인턴',          score:67, status:'rejected',  tags:['카피라이팅','SNS','Canva'],       verified:true, bio:'광고 공모전 수상 경험 있는 한양대 광고홍보학과 2학년입니다.',      appliedDate:'2026.05.19' },
    { id:'cand_007', name:'강지훈', school:'서강대 경제 3학년',    email:'jihun.kang@sogang.ac.kr',    role:'프론트엔드 개발 인턴', score:85, status:'interview', tags:['React','AWS','Node.js'],          verified:true, bio:'AWS 자격증을 취득한 서강대 경제학과 3학년 개발자입니다.',         appliedDate:'2026.05.15' },
  ],

  /* ── 채용 공고 컬렉션 (기업 뷰) ────────────────────────────── */
  positions: [
    { id:'pos_001', title:'프론트엔드 개발 인턴', field:'개발',    period:'6개월', pay:'월 200만원', deadline:'2026.06.30', applicants:4, active:true, location:'서울 성수 (하이브리드)' },
    { id:'pos_002', title:'마케팅 인턴 (그로스)', field:'마케팅', period:'3개월', pay:'월 180만원', deadline:'2026.07.15', applicants:3, active:true, location:'서울 성수' },
  ],

  /* ── 기본 학생/기업 (로그인 없이 앱 진입 시 폴백 없음) ──────── */
  currentStudent: null,
  currentCompany: {
    name:'뤼튼 테크놀로지스', shortName:'뤼튼',
    logo:'W', logoColor:'#7C3AED', logoBg:'#F3EEFF',
    description:'AI 글쓰기 어시스턴트 뤼튼(wrtn.ai)을 개발하는 생성형 AI 스타트업입니다.',
    website:'wrtn.ai', size:'11-50명', region:'서울 강남', stage:'서류 → 과제 → 면접',
    stats:{ totalApplicants:12, hired:2, avgResponse:'2.8일' },
  },

  /* ── 유틸리티: 대학 도메인 ──────────────────────────────────── */
  getUniversityByDomain(domain){
    return this.universities.find(u => u.domains.includes(domain)) || null;
  },
  resolveEmailDomain(email){
    const domain = (email || '').split('@')[1] || '';
    const uni = this.getUniversityByDomain(domain);
    if(uni) return { matched:true, name:uni.shortName, color:uni.color, uni };
    if(domain.endsWith('.ac.kr')) return { matched:false, name:'학교 이메일', color:null };
    return null;
  },

  /* ── 유틸리티: 인증 (localStorage 기반) ────────────────────── */
  auth: {
    _key: 'ttalkkak_users',
    _sessionKey: 'ttalkkak_session',

    getAll() {
      try { return JSON.parse(localStorage.getItem(this._key) || '[]'); } catch { return []; }
    },
    saveUser(data) {
      const users = this.getAll();
      const idx = users.findIndex(u => u.email.toLowerCase() === data.email.toLowerCase());
      if(idx >= 0) users[idx] = data; else users.push(data);
      localStorage.setItem(this._key, JSON.stringify(users));
      localStorage.setItem(this._sessionKey, JSON.stringify(data));
    },
    findUser(email, pw) {
      return this.getAll().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pw) || null;
    },
    emailExists(email) {
      return this.getAll().some(u => u.email.toLowerCase() === email.toLowerCase());
    },
    getSession() {
      try { return JSON.parse(localStorage.getItem(this._sessionKey)); } catch { return null; }
    },
    clearSession() {
      localStorage.removeItem(this._sessionKey);
    },
  },

  /* ── 유틸리티: 학교 테마 색상 적용 ─────────────────────────── */
  applyTheme(hex) {
    if(!hex) return;
    function h2r(h){ return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]; }
    function r2h(r,g,b){ return '#'+[r,g,b].map(v=>Math.min(255,Math.max(0,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
    function lighten(h,t){ const[r,g,b]=h2r(h); return r2h(r+(255-r)*t,g+(255-g)*t,b+(255-b)*t); }
    function darken(h,t){ const[r,g,b]=h2r(h); return r2h(r*(1-t),g*(1-t),b*(1-t)); }
    const[r,g,b]=h2r(hex);
    const d12=darken(hex,0.12), l92=lighten(hex,0.92), l85=lighten(hex,0.85), l70=lighten(hex,0.70), l50=lighten(hex,0.50), l20=lighten(hex,0.20);
    let el = document.getElementById('_school_theme');
    if(!el){ el=document.createElement('style'); el.id='_school_theme'; document.head.appendChild(el); }
    el.textContent = `
      .bg-brand-500{background-color:${hex}!important}
      .bg-brand-600{background-color:${d12}!important}
      .hover\\:bg-brand-600:hover{background-color:${d12}!important}
      .bg-brand-50{background-color:${l92}!important}
      .bg-brand-100{background-color:${l85}!important}
      .text-brand-500{color:${hex}!important}
      .text-brand-600{color:${d12}!important}
      .text-brand-400{color:${l20}!important}
      .text-brand-300{color:${lighten(hex,0.35)}!important}
      .text-brand-200{color:${l50}!important}
      .border-brand-500{border-color:${hex}!important}
      .border-brand-200{border-color:${l70}!important}
      .border-brand-100{border-color:${l85}!important}
      .nav-item.active{background:${l92}!important;color:${hex}!important}
      .ttalkkak-btn{background:${hex}!important;box-shadow:0 2px 8px rgba(${r},${g},${b},0.25)!important}
      .ttalkkak-btn:hover{background:${d12}!important}
      .btn-primary{background:${hex}!important;box-shadow:0 2px 8px rgba(${r},${g},${b},0.3)!important}
      .btn-primary:hover{background:${d12}!important}
      .badge-blue{background:${l92}!important;color:${hex}!important}
      .chip.on{border-color:${hex}!important;color:${hex}!important;background:${l92}!important}
      .score-fill{background:${hex}!important}
      .pipe-step.active .pipe-dot{background:${hex}!important;border-color:${hex}!important;box-shadow:0 0 0 4px rgba(${r},${g},${b},0.15)!important}
      .step-dot.active{background:${hex}!important;border-color:${hex}!important;box-shadow:0 0 0 4px rgba(${r},${g},${b},0.15)!important}
      .search-input:focus{border-color:${hex}!important;box-shadow:0 0 0 3px rgba(${r},${g},${b},0.08)!important}
      .field input:focus,.field select:focus,.field-input:focus{border-color:${hex}!important;box-shadow:0 0 0 3px rgba(${r},${g},${b},0.1)!important}
      .tab-link.active{color:${hex}!important;border-color:${hex}!important}
      .toggle-option.active{background:${hex}!important}
      button:focus-visible,a:focus-visible{outline-color:${hex}!important}
      .live{animation:ping 2s ease-in-out infinite}
      #nav.scrolled{box-shadow:0 1px 0 ${l85},0 4px 20px rgba(${r},${g},${b},0.05)!important}
    `;
  },
};

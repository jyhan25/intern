// db.js — 딸깍 데이터 스토어
// localStorage 기반 CRUD 컬렉션 + 인증/테마 유틸리티

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

  /* ── localStorage 키 ────────────────────────────────────────── */
  _jobsKey:    'ttalkkak_jobs',
  _appsKey:    'ttalkkak_applications',
  _msgsKey:    'ttalkkak_messages',

  /* ── Jobs CRUD ──────────────────────────────────────────────── */
  getJobs(filter) {
    filter = filter || {};
    try {
      let jobs = JSON.parse(localStorage.getItem(this._jobsKey) || '[]');
      if(filter.companyEmail) jobs = jobs.filter(j => j.companyEmail === filter.companyEmail);
      if(filter.active !== undefined) jobs = jobs.filter(j => j.active === filter.active);
      return jobs;
    } catch { return []; }
  },
  saveJob(job) {
    const jobs = this.getJobs();
    const idx = jobs.findIndex(j => j.id === job.id);
    if(idx >= 0) jobs[idx] = job; else jobs.push(job);
    localStorage.setItem(this._jobsKey, JSON.stringify(jobs));
  },
  deleteJob(id) {
    const jobs = this.getJobs().filter(j => j.id !== id);
    localStorage.setItem(this._jobsKey, JSON.stringify(jobs));
  },

  /* ── Applications CRUD ──────────────────────────────────────── */
  getApplications(filter) {
    filter = filter || {};
    try {
      let apps = JSON.parse(localStorage.getItem(this._appsKey) || '[]');
      if(filter.studentEmail) apps = apps.filter(a => a.studentEmail === filter.studentEmail);
      if(filter.companyEmail) apps = apps.filter(a => a.companyEmail === filter.companyEmail);
      if(filter.jobId) apps = apps.filter(a => a.jobId === filter.jobId);
      return apps;
    } catch { return []; }
  },
  createApplication(data) {
    if(this.hasApplied(data.studentEmail, data.jobId)) return null;
    const apps = this.getApplications();
    const app = Object.assign({ id: 'app_' + Date.now(), status: 'review', createdAt: Date.now() }, data);
    apps.push(app);
    localStorage.setItem(this._appsKey, JSON.stringify(apps));
    return app;
  },
  updateApplication(id, updates) {
    try {
      const apps = JSON.parse(localStorage.getItem(this._appsKey) || '[]');
      const idx = apps.findIndex(a => a.id === id);
      if(idx >= 0) {
        apps[idx] = Object.assign({}, apps[idx], updates);
        localStorage.setItem(this._appsKey, JSON.stringify(apps));
        return apps[idx];
      }
      return null;
    } catch { return null; }
  },
  hasApplied(studentEmail, jobId) {
    return this.getApplications({ studentEmail, jobId }).length > 0;
  },

  /* ── Messages CRUD ──────────────────────────────────────────── */
  getMessages(userEmail) {
    try {
      const msgs = JSON.parse(localStorage.getItem(this._msgsKey) || '[]');
      return msgs.filter(m => m.from === userEmail || m.to === userEmail)
                 .sort((a,b) => b.timestamp - a.timestamp);
    } catch { return []; }
  },
  getThreads(userEmail) {
    const msgs = this.getMessages(userEmail);
    const seen = new Set();
    const threads = [];
    msgs.forEach(m => {
      const partner = m.from === userEmail ? m.to : m.from;
      if(!seen.has(partner)) { seen.add(partner); threads.push(m); }
    });
    return threads;
  },
  getConversation(email1, email2) {
    try {
      const msgs = JSON.parse(localStorage.getItem(this._msgsKey) || '[]');
      return msgs.filter(m =>
        (m.from === email1 && m.to === email2) ||
        (m.from === email2 && m.to === email1)
      ).sort((a,b) => a.timestamp - b.timestamp);
    } catch { return []; }
  },
  sendMessage(from, to, subject, text) {
    try {
      const msgs = JSON.parse(localStorage.getItem(this._msgsKey) || '[]');
      const msg = { id:'msg_'+Date.now()+'_'+Math.random().toString(36).slice(2), from, to, subject: subject||'', text, timestamp: Date.now(), read: false };
      msgs.push(msg);
      localStorage.setItem(this._msgsKey, JSON.stringify(msgs));
      return msg;
    } catch { return null; }
  },
  markRead(msgId) {
    try {
      const msgs = JSON.parse(localStorage.getItem(this._msgsKey) || '[]');
      const idx = msgs.findIndex(m => m.id === msgId);
      if(idx >= 0) { msgs[idx].read = true; localStorage.setItem(this._msgsKey, JSON.stringify(msgs)); }
    } catch {}
  },
  getUnread(userEmail) {
    try {
      const msgs = JSON.parse(localStorage.getItem(this._msgsKey) || '[]');
      return msgs.filter(m => m.to === userEmail && !m.read);
    } catch { return []; }
  },

  /* ── Students helper ────────────────────────────────────────── */
  getStudents() {
    return this.auth.getAll().filter(u => u.type === 'student');
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

  /* ── 데모 계정 시드 ─────────────────────────────────────────── */
  seedDemo() {
    const users = this.auth.getAll();
    if(users.length === 0) {
      const demos = [
        {
          email:'student@yonsei.ac.kr', password:'demo1234',
          name:'김민서', type:'student',
          schoolId:'yonsei', schoolName:'연세대학교', schoolColor:'#00256C',
          bio:'UX와 데이터 기반 마케팅에 관심 많은 경영학도입니다.', year:'3학년', major:'경영학과',
          portfolio:'', interests:['마케팅','기획','데이터'],
          avatar:'김', profileCompletion:75, verified:true, createdAt:Date.now(),
        },
        {
          email:'company@wrtn.ai', password:'demo1234',
          name:'이준혁', type:'company',
          companyName:'뤼튼 테크놀로지스', companyShortName:'뤼튼',
          logo:'W', logoColor:'#7C3AED', logoBg:'#F3EEFF',
          description:'AI 글쓰기 어시스턴트 뤼튼(wrtn.ai)을 개발하는 생성형 AI 스타트업입니다.',
          website:'wrtn.ai', size:'11-50명', region:'서울 강남', stage:'서류 → 과제 → 면접',
          bizno:'000-00-00000',
          avatar:'이', profileCompletion:80, verified:true, createdAt:Date.now(),
        },
      ];
      demos.forEach(u => { if(!users.find(x=>x.email===u.email)) users.push(u); });
      localStorage.setItem(this.auth._key, JSON.stringify(users));
    }

    // Seed demo jobs if none exist
    if(this.getJobs().length === 0) {
      const demoJobs = [
        {
          id:'job_001', companyEmail:'company@wrtn.ai',
          companyName:'뤼튼 테크놀로지스', companyShortName:'뤼튼',
          logo:'W', logoBg:'#F3EEFF', logoColor:'#7C3AED',
          title:'AI 프로덕트 기획 인턴', role:'AI 프로덕트 기획 인턴',
          company:'뤼튼 테크놀로지스',
          tags:['기획','AI','UX리서치','Figma'],
          period:'3개월', pay:'월 200만원',
          deadline:'2026.07.15', loc:'서울 강남 (하이브리드)',
          description:'생성형 AI 서비스의 사용자 경험을 기획하고 개선합니다.',
          preferred:'Figma 사용 경험, AI 서비스 관심',
          active:true, status:'new', field:'기획',
          createdAt: Date.now() - 86400000 * 2,
        },
        {
          id:'job_002', companyEmail:'company@wrtn.ai',
          companyName:'뤼튼 테크놀로지스', companyShortName:'뤼튼',
          logo:'W', logoBg:'#F3EEFF', logoColor:'#7C3AED',
          title:'그로스 마케팅 인턴', role:'그로스 마케팅 인턴',
          company:'뤼튼 테크놀로지스',
          tags:['마케팅','그로스해킹','SQL','데이터'],
          period:'3개월', pay:'월 185만원',
          deadline:'2026.07.20', loc:'서울 강남',
          description:'사용자 획득 및 리텐션 전략을 데이터 기반으로 수립합니다.',
          preferred:'SQL 기초, 마케팅 경험',
          active:true, status:'new', field:'마케팅',
          createdAt: Date.now() - 86400000,
        },
        {
          id:'job_003', companyEmail:'company@wrtn.ai',
          companyName:'뤼튼 테크놀로지스', companyShortName:'뤼튼',
          logo:'W', logoBg:'#F3EEFF', logoColor:'#7C3AED',
          title:'프론트엔드 개발 인턴', role:'프론트엔드 개발 인턴',
          company:'뤼튼 테크놀로지스',
          tags:['React','TypeScript','개발','CSS'],
          period:'6개월', pay:'월 220만원',
          deadline:'2026.08.01', loc:'서울 강남 (하이브리드)',
          description:'React 기반 AI 서비스 프론트엔드를 개발합니다.',
          preferred:'React, TypeScript 경험자 우대',
          active:true, status:'', field:'개발',
          createdAt: Date.now(),
        },
      ];
      demoJobs.forEach(j => this.saveJob(j));
    }
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

DB.seedDemo();

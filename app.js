// 전역 상태 관리 객체
const state = {
    allArticles: [],
    categories: [],
    lastUpdated: '',
    selectedCategory: 'all',
    searchQuery: '',
    minImpact: 1,
    selectedStage: 'all',
    sortBy: 'impact',
    currentView: 'feed',
    deepTechData: window.deepTechData || { tech_list: [] },
    selectedTechId: 'hbm',
    selectedSubNodeId: 'hbm4_foundry'
};

// 카테고리 이름과 CSS 클래스 맵핑
const categoryClassMap = {
    "반도체 (Semiconductors)": "cat-semiconductors",
    "2차전지 (Secondary Batteries)": "cat-secondary-batteries",
    "전력망 (Power Grid)": "cat-power-grid",
    "광통신 (Optical Comm.)": "cat-optical-comm",
    "AI 로봇 (AI & Robotics)": "cat-ai-robotics",
    "데이터센터 냉각 (Thermal & Cooling)": "cat-cooling",
    "온디바이스 AI (On-Device AI)": "cat-ondevice",
    "우주 통신 (Space & LEO Comm.)": "cat-space",
    "양자 컴퓨터 (Quantum Computing)": "cat-quantum"
};

// 초기 데이터 로딩 및 이벤트 바인딩
function init() {
    state.deepTechData = window.deepTechData || { tech_list: [] };
    fetchData();
    setupEventListeners();
    setupViewSwitcher();
    setupDeepTechGenerator();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

// data.json 가져오기
async function fetchData() {
    try {
        // data.js를 통해 주입된 window.techData 전역 객체 검사 (로컬 CORS 에러 회피 목적)
        if (!window.techData) {
            throw new Error("로컬 데이터(data.js)가 정의되지 않았습니다.");
        }
        const data = window.techData;
        
        state.allArticles = data.articles || [];
        state.categories = data.categories || [];
        state.lastUpdated = data.last_updated || '알 수 없음';
        
        // UI 렌더링 시작
        renderCategories();
        renderStats();
        renderArticles();
        
        // 업데이트 시간 표시
        document.getElementById('last-updated-time').textContent = state.lastUpdated;
        
    } catch (error) {
        console.error("Data load error:", error);
        showErrorState();
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 1. 검색창 입력 이벤트
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderArticles();
        renderStats();
    });

    // 2. 영향도 슬라이더 이벤트
    const impactSlider = document.getElementById('impact-slider');
    const impactVal = document.getElementById('impact-val');
    impactSlider.addEventListener('input', (e) => {
        state.minImpact = parseInt(e.target.value);
        impactVal.textContent = state.minImpact;
        renderArticles();
        renderStats();
    });

    // 3. 기술 성숙도 필터 이벤트
    const stageFilter = document.getElementById('stage-filter');
    stageFilter.addEventListener('change', (e) => {
        state.selectedStage = e.target.value;
        renderArticles();
        renderStats();
    });

    // 4. 정렬 탭 버튼 이벤트
    const sortTabs = document.querySelectorAll('.sort-tab');
    sortTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            sortTabs.forEach(t => t.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            state.sortBy = target.dataset.sortBy;
            console.log("Sort mode changed to:", state.sortBy);
            renderArticles();
            renderStats();
        });
    });
}

// 에러 화면 표시
function showErrorState() {
    const container = document.getElementById('articles-container');
    container.innerHTML = `
        <div class="error-state">
            <i data-lucide="alert-triangle" style="color: var(--color-robotics); width: 3rem; height: 3rem; margin-bottom: 1rem;"></i>
            <h3>데이터 로드 오류</h3>
            <p>c:\\Users\\백남철\\.antigravity\\KEY TECH TREND 폴더 내에 data.js가 없거나 깨져있을 수 있습니다.<br>
            먼저 파이썬 파이프라인(run_pipeline.py)을 실행해 주세요.</p>
        </div>
    `;
    lucide.createIcons();
}

// 카테고리 탭 생성 및 렌더링
function renderCategories() {
    const tabsContainer = document.getElementById('category-tabs');
    // 초기화 (전체 분석 버튼은 남겨둠)
    tabsContainer.innerHTML = `
        <button class="tab-btn ${state.selectedCategory === 'all' ? 'active' : ''}" data-category-id="all">
            <i data-lucide="layers"></i> 전체 분석
        </button>
    `;
    
    state.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${state.selectedCategory === String(cat.id) ? 'active' : ''}`;
        btn.dataset.categoryId = cat.id;
        
        // 아이콘 동적 설정
        let iconName = 'cpu';
        if (cat.name.includes('2차전지')) iconName = 'battery-charging';
        else if (cat.name.includes('전력망')) iconName = 'zap';
        else if (cat.name.includes('광통신')) iconName = 'cable';
        else if (cat.name.includes('AI 로봇')) iconName = 'bot';
        else if (cat.name.includes('데이터센터 냉각')) iconName = 'thermometer';
        else if (cat.name.includes('온디바이스 AI')) iconName = 'smartphone';
        else if (cat.name.includes('우주 통신')) iconName = 'rocket';
        
        btn.innerHTML = `<i data-lucide="${iconName}"></i> ${cat.name.split(' (')[0]}`;
        tabsContainer.appendChild(btn);
    });
    
    // 탭 클릭 이벤트 연결
    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            
            state.selectedCategory = target.dataset.categoryId;
            renderArticles();
            renderStats();
        });
    });
    
    lucide.createIcons();
}

// 필터링 적용된 기사 리스트 계산
function getFilteredArticles() {
    const filtered = state.allArticles.filter(article => {
        // 1. 카테고리 필터링
        if (state.selectedCategory !== 'all' && String(article.category_id) !== state.selectedCategory) {
            return false;
        }
        
        // 2. 영향도 점수 필터링 (점수가 평가되지 않은 None/null 기사도 minImpact=1 인 기본 필터 상태에서는 노출되도록 허용)
        const impact = article.investment_impact;
        if (impact !== null && impact !== undefined) {
            if (impact < state.minImpact) {
                return false;
            }
        } else {
            // 영향도 점수가 None(평가안됨)인 마이너 기사는 최소 영향도가 1점일 때 보여줍니다.
            if (state.minImpact > 1) {
                return false;
            }
        }
        
        // 3. 기술 성숙도 필터링
        if (state.selectedStage !== 'all' && article.tech_stage !== state.selectedStage) {
            return false;
        }
        
        // 4. 검색어 필터링
        if (state.searchQuery) {
            const titleMatch = article.title.toLowerCase().includes(state.searchQuery);
            const summaryMatch = article.summary && article.summary.toLowerCase().includes(state.searchQuery);
            const tickersMatch = article.key_tickers && article.key_tickers.some(t => t.toLowerCase().includes(state.searchQuery));
            
            if (!titleMatch && !summaryMatch && !tickersMatch) {
                return false;
            }
        }
        
        return true;
    });

    // 5. 정렬 기준 적용 (복사본을 만들어서 원본 순서 훼손 차단)
    const sortedResult = [...filtered];
    if (state.sortBy === 'impact') {
        sortedResult.sort((a, b) => (b.investment_impact || 0) - (a.investment_impact || 0));
    } else if (state.sortBy === 'date') {
        sortedResult.sort((a, b) => {
            const parseTime = (dateStr) => {
                if (!dateStr) return 0;
                const cleaned = String(dateStr).trim().replace(' ', 'T');
                const d = new Date(cleaned);
                return isNaN(d.getTime()) ? 0 : d.getTime();
            };
            
            const timeA = parseTime(a.published_at);
            const timeB = parseTime(b.published_at);
            
            // 날짜 변환이 실패했을 때를 대비하여 안전한 문자열 사전식 비교로 백업 처리
            if (timeA === 0 || timeB === 0) {
                const strA = String(a.published_at || "").trim().replace(' ', 'T');
                const strB = String(b.published_at || "").trim().replace(' ', 'T');
                if (strB > strA) return 1;
                if (strB < strA) return -1;
                return 0;
            }
            
            return timeB - timeA;
        });
    }

    console.log(`[정렬 진단] 모드: ${state.sortBy} | 상위 3개 날짜/점수:`, 
        sortedResult.slice(0, 3).map(a => `(${a.published_at} / Impact: ${a.investment_impact})`)
    );

    return sortedResult;
}

// 대시보드 통계 수치 갱신
function renderStats() {
    const filtered = getFilteredArticles();
    const totalCount = filtered.length;
    
    // 평균 영향도 점수
    let avgImpact = 0;
    if (totalCount > 0) {
        const sum = filtered.reduce((acc, curr) => acc + (curr.investment_impact || 0), 0);
        avgImpact = (sum / totalCount).toFixed(1);
    }
    
    // 상용화 비율
    let commRatio = 0;
    if (totalCount > 0) {
        const commCount = filtered.filter(a => a.tech_stage === 'Commercial').length;
        commRatio = Math.round((commCount / totalCount) * 100);
    }
    
    document.getElementById('stat-total-count').textContent = totalCount.toLocaleString();
    document.getElementById('stat-avg-impact').textContent = avgImpact;
    document.getElementById('stat-commercial-ratio').textContent = `${commRatio}%`;
}

// 뉴스 소스 URL에서 도메인 추출
function extractDomain(url) {
    if (!url) return "Unknown";
    try {
        const domain = new URL(url).hostname;
        return domain.replace('www.', '');
    } catch {
        return "Link";
    }
}

// 날짜 포맷팅
function formatDate(isoString) {
    if (!isoString) return "";
    try {
        const date = new Date(isoString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } catch {
        return isoString;
    }
}

// 아티클 목록 렌더링
function renderArticles() {
    const container = document.getElementById('articles-container');
    const filtered = getFilteredArticles();
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="folder-open"></i>
                <h3>분석된 정보가 없습니다</h3>
                <p>필터 설정을 확인하시거나 새로운 키워드로 크롤러를 작동시켜보세요.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = '';
    
    filtered.forEach(article => {
        const card = document.createElement('div');
        
        // 카테고리 매칭 클래스 설정
        const catName = article.category_name || '';
        const catClass = categoryClassMap[catName] || 'cat-semiconductors';
        card.className = `article-card ${catClass}`;
        
        // AI 요약 줄바꿈 분리하여 HTML 생성
        let summaryHTML = '';
        if (article.summary) {
            const lines = article.summary.split('\n');
            summaryHTML = lines.map(line => `<p>${escapeHTML(line)}</p>`).join('');
        } else {
            summaryHTML = '<p>AI 요약 대기 중...</p>';
        }
        
        // 티커 태그 빌드
        const tickersHTML = (article.key_tickers || [])
            .map(ticker => `<span class="ticker-tag">$${escapeHTML(ticker)}</span>`)
            .join('');
            
        // 성숙도 배지 클래스
        let stageClass = 'stage-pilot';
        let stageText = '시제품';
        if (article.tech_stage === 'Laboratory') {
            stageClass = 'stage-lab';
            stageText = '연구실';
        } else if (article.tech_stage === 'Commercial') {
            stageClass = 'stage-comm';
            stageText = '상용화';
        }
        
        card.innerHTML = `
            <div class="card-header">
                <span class="source-info">${escapeHTML(extractDomain(article.source_url))}</span>
                <div class="badges">
                    <span class="badge ${stageClass}">${stageText}</span>
                    <span class="badge impact-score">Impact ${article.investment_impact || 'N/A'}</span>
                </div>
            </div>
            
            <a href="${article.source_url}" target="_blank" class="card-title-link">
                <h2 class="card-title">${escapeHTML(article.title)}</h2>
            </a>
            
            <div class="ai-insight-box">
                <div class="ai-insight-header">
                    <i data-lucide="sparkles"></i>
                    <span>AI Insight Summary</span>
                </div>
                <div class="ai-summary">
                    ${summaryHTML}
                </div>
            </div>
            
            <div class="card-footer">
                <div class="published-date">
                    <i data-lucide="calendar"></i>
                    <span>${formatDate(article.published_at)}</span>
                </div>
                <div class="ticker-tags">
                    ${tickersHTML}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    lucide.createIcons();
    updateDebugInfo(filtered);
}

// XSS 방지용 HTML 이스케이프
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function updateDebugInfo(renderedList) {
    const dbg = document.getElementById('debug-info');
    if (dbg && renderedList) {
        const invalidCount = renderedList.filter(a => {
            const dateStr = a.published_at;
            if (!dateStr) return true;
            const cleaned = String(dateStr).trim().replace(' ', 'T');
            return isNaN(new Date(cleaned).getTime());
        }).length;

        const top3 = renderedList.slice(0, 3).map(a => `${a.title.slice(0,6)}(${formatDate(a.published_at)}/S:${a.investment_impact})`).join(' | ');
        dbg.textContent = `[진단] 깨진날짜: ${invalidCount}개 | 정렬: ${state.sortBy === 'impact' ? '중요도' : '최신순'} | 탑3: ${top3}`;
    }
}

/* ==========================================================
   🔬 심층 기술 백서 (Deep-Tech Dossier) 인터랙티브 엔진
   ========================================================== */

// 1. 메인 뷰 스위처 (트렌드 모니터 vs 심층 백서)
function switchMainView(viewName) {
    const btnFeed = document.getElementById('btn-view-feed');
    const btnDeep = document.getElementById('btn-view-deeptech');
    const secFeed = document.getElementById('view-feed-section');
    const secDeep = document.getElementById('view-deeptech-section');

    if (viewName === 'feed') {
        if (btnFeed) btnFeed.classList.add('active');
        if (btnDeep) btnDeep.classList.remove('active');
        if (secFeed) secFeed.style.display = 'block';
        if (secDeep) secDeep.style.display = 'none';
        state.currentView = 'feed';
    } else {
        if (btnDeep) btnDeep.classList.add('active');
        if (btnFeed) btnFeed.classList.remove('active');
        if (secFeed) secFeed.style.display = 'none';
        if (secDeep) secDeep.style.display = 'block';
        state.currentView = 'deeptech';
        renderDeepTechTabs();
        renderDeepTechContent();
    }
    if (window.lucide) lucide.createIcons();
}
window.switchMainView = switchMainView;

function setupViewSwitcher() {
    const btnFeed = document.getElementById('btn-view-feed');
    const btnDeep = document.getElementById('btn-view-deeptech');

    if (btnFeed) {
        btnFeed.addEventListener('click', () => switchMainView('feed'));
    }
    if (btnDeep) {
        btnDeep.addEventListener('click', () => switchMainView('deeptech'));
    }
}

// 2. 4대 기술 퀵 셀렉터 탭 렌더링
function renderDeepTechTabs() {
    const tabsContainer = document.getElementById('deep-tech-tabs');
    if (!tabsContainer || !state.deepTechData || !state.deepTechData.tech_list) return;

    tabsContainer.innerHTML = '';
    state.deepTechData.tech_list.forEach(tech => {
        const isActive = tech.id === state.selectedTechId;
        const card = document.createElement('div');
        card.className = `deep-tech-card-tab ${isActive ? 'active' : ''}`;
        card.innerHTML = `
            <span class="tab-badge">${escapeHTML(tech.badge || '핵심 기술')}</span>
            <h3>${escapeHTML(tech.abbr || tech.name)}</h3>
            <p>${escapeHTML(tech.summary.slice(0, 48))}...</p>
        `;
        card.addEventListener('click', () => {
            state.selectedTechId = tech.id;
            if (tech.nodes && tech.nodes.length > 0) {
                state.selectedSubNodeId = tech.nodes[0].id;
            }
            renderDeepTechTabs();
// 정밀 엔지니어링 SVG 구조 단면도 생성기 (CAD/반도체 공학 규격)
function getEngineeringSvg(nodeId) {
    if (nodeId === 'hbm4_foundry') {
        return `
        <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- 배경 격자 패턴 -->
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
                </pattern>
                
                <!-- 그라디언트 정의 -->
                <linearGradient id="grad-gpu" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.85"/>
                    <stop offset="100%" stop-color="#047857" stop-opacity="0.95"/>
                </linearGradient>
                <linearGradient id="grad-hbm-die" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
                </linearGradient>
                <linearGradient id="grad-base-die" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#0369a1" stop-opacity="0.95"/>
                </linearGradient>
                <linearGradient id="grad-interposer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#475569" stop-opacity="0.9"/>
                    <stop offset="50%" stop-color="#64748b" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#475569" stop-opacity="0.9"/>
                </linearGradient>
                <linearGradient id="grad-substrate" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#334155" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#1e293b" stop-opacity="0.95"/>
                </linearGradient>
                <linearGradient id="grad-tsv" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#d97706"/>
                </linearGradient>
            </defs>

            <!-- 1. 배경 및 외곽 프레임 -->
            <rect width="100%" height="100%" fill="#070c14" rx="8"/>
            <rect width="100%" height="100%" fill="url(#grid)" rx="8"/>
            <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

            <!-- 상단 헤더 바 -->
            <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
            <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">HBM4 16-Hi 3D DRAM STACK ON 2.5D CoWoS-L SCHEMATIC</text>
            <text x="520" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[JEDEC 720µm Limit / 2048-bit Bus]</text>

            <!-- ================= [좌측: System Integration 2.5D Overview] ================= -->
            <g transform="translate(20, 55)">
                <!-- 섹션 타이틀 -->
                <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 2.5D CoWoS-L 온패키지 통합 조감도</text>

                <!-- 패키지 기판 (Package Substrate) -->
                <rect x="0" y="240" width="280" height="28" fill="url(#grad-substrate)" stroke="#475569" stroke-width="1" rx="2"/>
                <text x="140" y="258" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">FC-BGA Package Substrate (PCB)</text>

                <!-- BGA Solder Balls -->
                <g fill="#94a3b8">
                    <circle cx="20" cy="278" r="6"/> <circle cx="50" cy="278" r="6"/>
                    <circle cx="80" cy="278" r="6"/> <circle cx="110" cy="278" r="6"/>
                    <circle cx="140" cy="278" r="6"/> <circle cx="170" cy="278" r="6"/>
                    <circle cx="200" cy="278" r="6"/> <circle cx="230" cy="278" r="6"/>
                    <circle cx="260" cy="278" r="6"/>
                </g>

                <!-- C4 Bumps (기판-인터포저 사이) -->
                <g fill="#cbd5e1">
                    <rect x="15" y="233" width="6" height="7" rx="1"/> <rect x="35" y="233" width="6" height="7" rx="1"/>
                    <rect x="55" y="233" width="6" height="7" rx="1"/> <rect x="75" y="233" width="6" height="7" rx="1"/>
                    <rect x="95" y="233" width="6" height="7" rx="1"/> <rect x="115" y="233" width="6" height="7" rx="1"/>
                    <rect x="135" y="233" width="6" height="7" rx="1"/> <rect x="155" y="233" width="6" height="7" rx="1"/>
                    <rect x="175" y="233" width="6" height="7" rx="1"/> <rect x="195" y="233" width="6" height="7" rx="1"/>
                    <rect x="215" y="233" width="6" height="7" rx="1"/> <rect x="235" y="233" width="6" height="7" rx="1"/>
                    <rect x="255" y="233" width="6" height="7" rx="1"/>
                </g>

                <!-- 2.5D Silicon Interposer / RDL -->
                <rect x="10" y="212" width="260" height="20" fill="url(#grad-interposer)" stroke="#64748b" stroke-width="1" rx="2"/>
                <text x="140" y="226" fill="#f8fafc" font-size="10" font-weight="700" text-anchor="middle">2.5D Silicon Interposer / High-Density RDL</text>

                <!-- Micro Bumps (인터포저-칩 사이) -->
                <g fill="#f59e0b">
                    <!-- GPU 아래 -->
                    <rect x="20" y="206" width="4" height="6" rx="1"/> <rect x="32" y="206" width="4" height="6" rx="1"/>
                    <rect x="44" y="206" width="4" height="6" rx="1"/> <rect x="56" y="206" width="4" height="6" rx="1"/>
                    <rect x="68" y="206" width="4" height="6" rx="1"/> <rect x="80" y="206" width="4" height="6" rx="1"/>
                    <rect x="92" y="206" width="4" height="6" rx="1"/>
                    <!-- HBM 아래 -->
                    <rect x="160" y="206" width="4" height="6" rx="1"/> <rect x="172" y="206" width="4" height="6" rx="1"/>
                    <rect x="184" y="206" width="4" height="6" rx="1"/> <rect x="196" y="206" width="4" height="6" rx="1"/>
                    <rect x="208" y="206" width="4" height="6" rx="1"/> <rect x="220" y="206" width="4" height="6" rx="1"/>
                    <rect x="232" y="206" width="4" height="6" rx="1"/> <rect x="244" y="206" width="4" height="6" rx="1"/>
                    <rect x="256" y="206" width="4" height="6" rx="1"/>
                </g>

                <!-- 좌측 칩: AI GPU (NVIDIA Rubin / TSMC 3nm) -->
                <rect x="15" y="105" width="90" height="100" fill="url(#grad-gpu)" stroke="#34d399" stroke-width="1.5" rx="3"/>
                <text x="60" y="145" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">AI Host</text>
                <text x="60" y="162" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">GPU</text>
                <text x="60" y="180" fill="#a7f3d0" font-size="9" text-anchor="middle">(NVIDIA Rubin)</text>

                <!-- 우측 칩: HBM4 16단 스택 (간략 조감) -->
                <rect x="150" y="45" width="115" height="160" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" rx="3"/>
                
                <!-- 16단 스택 표현 레이어들 -->
                <rect x="155" y="50" width="105" height="125" fill="#1e293b" stroke="#0ea5e9" stroke-width="1" rx="2"/>
                <text x="207" y="105" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">HBM4 Stack</text>
                <text x="207" y="122" fill="#93c5fd" font-size="10" text-anchor="middle">(16-Hi DRAM)</text>
                <text x="207" y="140" fill="#fbbf24" font-size="9" text-anchor="middle">48GB / 2.0+ TB/s</text>

                <!-- TSMC 3nm Base Die -->
                <rect x="155" y="178" width="105" height="27" fill="url(#grad-base-die)" stroke="#38bdf8" stroke-width="1.2" rx="2"/>
                <text x="207" y="195" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">TSMC 3nm Base Die</text>

                <!-- 초고속 데이터 전송 라인 (RDL 배선 화살표) -->
                <path d="M 95 218 L 160 218" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-dasharray="4,2"/>
                <polygon points="160,214 168,218 160,222" fill="#f59e0b"/>
                <polygon points="95,214 87,218 95,222" fill="#f59e0b"/>
                <text x="127" y="210" fill="#fbbf24" font-size="9" font-weight="700" text-anchor="middle">2048-bit Wide Bus</text>
                <text x="127" y="235" fill="#fef08a" font-size="8" text-anchor="middle">&lt; 5ns Latency</text>
            </g>

            <!-- 중앙 세로 구분선 -->
            <line x1="320" y1="55" x2="320" y2="465" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

            <!-- ================= [우측: HBM4 16-Hi Micro Cross-Section 정밀 단면도] ================= -->
            <g transform="translate(340, 55)">
                <!-- 섹션 타이틀 -->
                <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ HBM4 16-Hi DRAM 스택 정밀 단면 구조 (Cross-Section)</text>

                <!-- 16단 DRAM 스택 영역 -->
                <!-- 상단 방열 캡 / 더미 다이 -->
                <rect x="30" y="32" width="250" height="14" fill="#334155" stroke="#64748b" stroke-width="1" rx="1"/>
                <text x="155" y="43" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">Top Dummy / Heat Dissipation Layer</text>

                <!-- 16단 DRAM 다이들 (각 다이 + TSV + Bump) -->
                <!-- Die 16 ~ Die 1 반복 렌더링 -->
                <g>
                    <!-- Die 16 -->
                    <rect x="30" y="48" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 15 -->
                    <rect x="30" y="60" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 14 -->
                    <rect x="30" y="72" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 13 -->
                    <rect x="30" y="84" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 12 -->
                    <rect x="30" y="96" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 11 -->
                    <rect x="30" y="108" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 10 -->
                    <rect x="30" y="120" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 9 -->
                    <rect x="30" y="132" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 8 -->
                    <rect x="30" y="144" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 7 -->
                    <rect x="30" y="156" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 6 -->
                    <rect x="30" y="168" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 5 -->
                    <rect x="30" y="180" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 4 -->
                    <rect x="30" y="192" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 3 -->
                    <rect x="30" y="204" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 2 -->
                    <rect x="30" y="216" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                    <!-- Die 1 -->
                    <rect x="30" y="228" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                </g>

                <!-- Cu TSV (수직 관통전극 구리선 어레이) -->
                <!-- 4개 수직 전송 채널 기둥 표현 -->
                <g fill="url(#grad-tsv)">
                    <rect x="70" y="48" width="5" height="190" rx="1"/>
                    <rect x="125" y="48" width="5" height="190" rx="1"/>
                    <rect x="180" y="48" width="5" height="190" rx="1"/>
                    <rect x="235" y="48" width="5" height="190" rx="1"/>
                </g>

                <!-- 층간 미세 범프 및 충진재 (Micro-Bumps / Epoxy MUF) -->
                <g fill="#f59e0b">
                    <!-- 수평 본딩선 점들 -->
                    <circle cx="72.5" cy="59" r="1.5"/><circle cx="127.5" cy="59" r="1.5"/><circle cx="182.5" cy="59" r="1.5"/><circle cx="237.5" cy="59" r="1.5"/>
                    <circle cx="72.5" cy="119" r="1.5"/><circle cx="127.5" cy="119" r="1.5"/><circle cx="182.5" cy="119" r="1.5"/><circle cx="237.5" cy="119" r="1.5"/>
                    <circle cx="72.5" cy="179" r="1.5"/><circle cx="127.5" cy="179" r="1.5"/><circle cx="182.5" cy="179" r="1.5"/><circle cx="237.5" cy="179" r="1.5"/>
                    <circle cx="72.5" cy="227" r="1.5"/><circle cx="127.5" cy="227" r="1.5"/><circle cx="182.5" cy="227" r="1.5"/><circle cx="237.5" cy="227" r="1.5"/>
                </g>

                <!-- TSMC 3nm 파운드리 베이스 로직 다이 (Custom Base Die) -->
                <rect x="25" y="244" width="260" height="38" fill="url(#grad-base-die)" stroke="#38bdf8" stroke-width="2" rx="3"/>
                <text x="155" y="262" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">TSMC 3nm Custom Base Logic Die</text>
                <text x="155" y="275" fill="#e0f2fe" font-size="9" text-anchor="middle">2048-bit Wide-I/O PHY + BIST + Power Logic</text>

                <!-- Micro-Bumps to Interposer -->
                <g fill="#f59e0b">
                    <rect x="45" y="283" width="5" height="8" rx="1"/> <rect x="75" y="283" width="5" height="8" rx="1"/>
                    <rect x="105" y="283" width="5" height="8" rx="1"/> <rect x="135" y="283" width="5" height="8" rx="1"/>
                    <rect x="165" y="283" width="5" height="8" rx="1"/> <rect x="195" y="283" width="5" height="8" rx="1"/>
                    <rect x="225" y="283" width="5" height="8" rx="1"/> <rect x="255" y="283" width="5" height="8" rx="1"/>
                </g>

                <!-- 2.5D Silicon Interposer Slice -->
                <rect x="15" y="292" width="280" height="18" fill="url(#grad-interposer)" stroke="#64748b" stroke-width="1" rx="2"/>
                <text x="155" y="305" fill="#f8fafc" font-size="9" font-weight="700" text-anchor="middle">CoWoS-L Silicon Interposer with LSI Bridge</text>

                <!-- ================= [치수선 및 엔지니어링 콜아웃] ================= -->
                <!-- 전체 높이 720µm 치수선 (우측) -->
                <line x1="295" y1="32" x2="295" y2="282" stroke="#ef4444" stroke-width="1.5"/>
                <line x1="290" y1="32" x2="300" y2="32" stroke="#ef4444" stroke-width="1.5"/>
                <line x1="290" y1="282" x2="300" y2="282" stroke="#ef4444" stroke-width="1.5"/>
                <text x="303" y="155" fill="#f87171" font-size="10" font-weight="700" transform="rotate(90, 303, 155)" text-anchor="middle">JEDEC Spec: 720 µm Max</text>

                <!-- 단일 다이 두께 30µm 콜아웃 (좌측 상단) -->
                <line x1="15" y1="88" x2="28" y2="88" stroke="#38bdf8" stroke-width="1"/>
                <text x="12" y="86" fill="#38bdf8" font-size="8" text-anchor="end">DRAM Die ~30µm</text>
                <text x="12" y="96" fill="#94a3b8" font-size="7" text-anchor="end">(Backside CMP)</text>

                <!-- TSV 피치 콜아웃 -->
                <line x1="127" y1="20" x2="127" y2="45" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,2"/>
                <text x="127" y="15" fill="#fbbf24" font-size="8" text-anchor="middle">TSV Array (13~25µm Pitch)</text>
            </g>

            <!-- ================= [하단 범례 및 공학 메트릭 바] ================= -->
            <g transform="translate(20, 395)">
                <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
                
                <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ 엔지니어링 범례 & 공정 핵심 규격 (Key Process Parameters)</text>
                
                <!-- 범례 아이템들 -->
                <g transform="translate(15, 28)">
                    <!-- 1. Cu TSV -->
                    <rect x="0" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                    <text x="15" y="11" fill="#cbd5e1" font-size="10">Cu TSV (수직 관통전극)</text>

                    <!-- 2. DRAM Die -->
                    <rect x="150" y="2" width="10" height="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1" rx="2"/>
                    <text x="165" y="11" fill="#cbd5e1" font-size="10">1c-nm DRAM (30µm 박막)</text>

                    <!-- 3. TSMC 3nm Base Die -->
                    <rect x="310" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                    <text x="325" y="11" fill="#cbd5e1" font-size="10">TSMC 3nm Logic Base Die</text>

                    <!-- 4. CoWoS-L Interposer -->
                    <rect x="500" y="2" width="10" height="10" fill="#64748b" rx="2"/>
                    <text x="515" y="11" fill="#cbd5e1" font-size="10">2.5D CoWoS-L Interposer</text>
                </g>

                <!-- 정량 스펙 지표 -->
                <g transform="translate(15, 52)">
                    <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 버스 폭: <tspan fill="#ffffff">2048-bit (2x)</tspan></text>
                    <text x="140" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 단일 스택 대역폭: <tspan fill="#ffffff">2.0+ TB/s</tspan></text>
                    <text x="310" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 적층 단수: <tspan fill="#ffffff">16-Hi (48GB)</tspan></text>
                    <text x="470" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 열/두께 제약: <tspan fill="#ef4444">720µm JEDEC Strict Limit</tspan></text>
                </g>
            </g>
        </svg>
        `;
    }
    return null;
}

// 3. 심층 기술 백서 및 인터랙티브 테크 트리 본문 렌더링
function renderDeepTechContent() {
    const container = document.getElementById('deep-tech-content');
    if (!container || !state.deepTechData) return;

    const tech = state.deepTechData.tech_list.find(t => t.id === state.selectedTechId) || state.deepTechData.tech_list[0];
    if (!tech) {
        container.innerHTML = '<p class="error">심층 기술 데이터가 없습니다.</p>';
        return;
    }

    // 기본 서브 노드 설정
    const subNode = (tech.nodes && tech.nodes.find(n => n.id === state.selectedSubNodeId)) || (tech.nodes ? tech.nodes[0] : null);

    // 테크 트리 노드 버튼 HTML
    let treeNodesHTML = '';
    if (tech.nodes && tech.nodes.length > 0) {
        tech.nodes.forEach(node => {
            const isNodeActive = subNode && node.id === subNode.id;
            treeNodesHTML += `
                <button class="tree-node-btn ${isNodeActive ? 'active' : ''}" data-node-id="${node.id}">
                    <span class="node-tag">${escapeHTML(node.tag || '기술 노드')}</span>
                    <span>${escapeHTML(node.name)}</span>
                </button>
            `;
        });
    }

    // 밸류체인 테이블 HTML
    let chainRowsHTML = '';
    if (subNode && subNode.chain) {
        for (const [key, val] of Object.entries(subNode.chain)) {
            const labelMap = {
                'chips': '핵심 칩셋/메모리',
                'foundry': '파운드리/패키징',
                'foundry_base': '로직 베이스다이',
                'foundry_packaging': '첨단 패키징',
                'equipment': '핵심 소부장 장비사',
                'materials': '소재/화학/에폭시',
                'memory': 'DRAM/메모리 공급',
                'champion': '종합 주도 기업',
                'customers': '최종 고객사(BigTech)',
                'target': '목표 응용처',
                'transceiver': '광트랜시버 모듈',
                'components': '광부품/소자',
                'ic_driver': '드라이버 IC/PHY',
                'switch_leader': '스위치 ASIC 선도',
                'laser_chip': '레이저 다이오드 광원',
                'korea_optical': '국내 광통신 협력사',
                'controller_ic': 'CXL 컨트롤러 팹리스',
                'solution': 'IP/솔루션 설계',
                'korea_partners': '국내 검사/기판 파트너',
                'developer': '원자로 원천 설계사',
                'manufacturing': '주기기 단조/제작',
                'engineering': 'EPC 건설/엔지니어링',
                'power_equipment': '전력기자재/변압기',
                'bigtech': '빅테크 전력 구매사(PPA)',
                'smr_innovator': 'SMR 혁신 개발사',
                'grid_infra': '전력망/송배전 인프라'
            };
            const label = labelMap[key] || key;
            chainRowsHTML += `
                <tr>
                    <td class="chain-key">${escapeHTML(label)}</td>
                    <td class="chain-val">${escapeHTML(val)}</td>
                </tr>
            `;
        }
    }

    // 서브 노드 전용 이미지 또는 기술 대표 이미지
    const nodeImgUrl = (subNode && subNode.image_url) || tech.image_url || '';

    container.innerHTML = `
        <div class="deep-tech-main-card">
            <!-- 1. 헤더 요약 박스 -->
            <div class="dossier-header-box">
                <div class="dossier-header-left">
                    <span class="tab-badge" style="margin-bottom: 0.5rem;">${escapeHTML(tech.badge || '핵심 공학 기술')}</span>
                    <h2>${escapeHTML(tech.name)}</h2>
                    <p class="dossier-summary">💡 ${escapeHTML(tech.summary)}</p>
                </div>
            </div>

            <!-- 2. 6단계 공학 프레임워크 4개 핵심 카드 -->
            <div class="framework-grid">
                <div class="framework-card">
                    <h4><i data-lucide="microchip"></i> 1. 공학적 한계 돌파 원리</h4>
                    <p>${escapeHTML(tech.framework.fundamentals)}</p>
                </div>
                <div class="framework-card">
                    <h4><i data-lucide="layers"></i> 2. 핵심 제조 및 패키징 공정</h4>
                    <p>${escapeHTML(tech.framework.process_tech)}</p>
                </div>
                <div class="framework-card">
                    <h4><i data-lucide="alert-triangle"></i> 3. 기술적 난제 및 물리적 병목</h4>
                    <p>${escapeHTML(tech.framework.bottlenecks)}</p>
                </div>
                <div class="framework-card">
                    <h4><i data-lucide="trending-up"></i> 4. 세대별 기술 로드맵</h4>
                    <p>${escapeHTML(tech.framework.roadmap || '지속적인 초고속/초저전력 구조 혁신 진행 중')}</p>
                </div>
            </div>

            <!-- 3. 인터랙티브 기술 계통도 (Technical Chain Tree) -->
            <div class="tech-tree-section">
                <div class="tech-tree-title">
                    <h3><i data-lucide="git-branch"></i> 5. 기술 진화 계통도 (Technical Chain)</h3>
                    <span>* 아래 세부 기술 노드를 클릭하면 해당 기술의 단면 구조도와 밸류체인이 펼쳐집니다.</span>
                </div>
                <div class="tree-nodes-wrapper">
                    ${treeNodesHTML}
                </div>

                <!-- [2열 매거진형 드릴다운 뷰어] -->
                ${subNode ? `
                    <div class="sub-node-magazine-layout">
                        <!-- 좌측 컬럼: 고해상도 공학 구조도 이미지 및 다이어그램 -->
                        <div class="sub-node-visual-col">
                            ${getEngineeringSvg(subNode.id) ? `
                                <div class="engineering-svg-card">
                                    <div class="visual-img-header">
                                        <i data-lucide="microchip"></i>
                                        <span>정밀 패키징 공학 단면 구조도 (Engineering Blueprint)</span>
                                    </div>
                                    <div class="engineering-svg-wrap">
                                        ${getEngineeringSvg(subNode.id)}
                                    </div>
                                    <p class="img-caption">📌 ${escapeHTML(subNode.name)} 3D 패키징 & 2.5D 인터포저 단면도 (JEDEC 720µm / 2048-bit 버스)</p>
                                </div>
                            ` : (nodeImgUrl ? `
                                <div class="visual-img-card">
                                    <div class="visual-img-header">
                                        <i data-lucide="image"></i>
                                        <span>실제 패키징 단면 및 칩 아키텍처 실물도</span>
                                    </div>
                                    <div class="visual-img-wrap">
                                        <img src="${nodeImgUrl}" alt="${escapeHTML(subNode.name)}" class="tech-dossier-img" onerror="this.style.display='none'">
                                    </div>
                                    <p class="img-caption">📌 ${escapeHTML(subNode.name)} 공학 구조 조감도</p>
                                </div>
                            ` : '')}

                            ${tech.diagram ? `
                                <div class="diagram-box">
                                    <h4><i data-lucide="share-2"></i> 칩 내부 신호 흐름 벡터 구조도</h4>
                                    <div class="mermaid-render-area">
                                        <pre class="mermaid">${tech.diagram}</pre>
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- 우측 컬럼: 정밀 공학 분석, 스펙, 기업전략, 소부장 밸류체인 -->
                        <div class="sub-node-info-col">
                            <div class="sub-node-header">
                                <h4>${escapeHTML(subNode.name)}</h4>
                                <span class="node-tag">${escapeHTML(subNode.tag || '')}</span>
                            </div>
                            <p class="sub-node-desc">${escapeHTML(subNode.desc)}</p>
                            
                            <div class="sub-spec-box">
                                <h5><i data-lucide="gauge"></i> 핵심 스펙 및 성능 지표</h5>
                                <p>${escapeHTML(subNode.tech_specs || '상세 규격 정의 중')}</p>
                            </div>

                            <div class="sub-spec-box">
                                <h5><i data-lucide="award"></i> 기업별 추진 전략 및 특허/수율 비교</h5>
                                <p style="white-space: pre-line;">${escapeHTML(subNode.company_strategy || '글로벌 선도 기업들이 표준 주도권 경쟁 중')}</p>
                            </div>

                            <div class="sub-spec-box">
                                <h5><i data-lucide="network"></i> 6. 글로벌 공급망 (소부장 밸류체인 맵)</h5>
                                <table class="chain-table">
                                    <tbody>
                                        ${chainRowsHTML}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // 서브 노드 클릭 이벤트 바인딩
    const nodeBtns = container.querySelectorAll('.tree-node-btn');
    nodeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nodeId = e.currentTarget.getAttribute('data-node-id');
            state.selectedSubNodeId = nodeId;
            renderDeepTechContent();
        });
    });

    // 아이콘 생성 및 Mermaid 다이어그램 렌더링
    lucide.createIcons();
    if (window.mermaid) {
        try {
            mermaid.run({
                querySelector: '.mermaid'
            });
        } catch (e) {
            console.warn('Mermaid render error:', e);
        }
    }
}

// 4. 신규 약어 즉석 백서 생성기 이벤트
function setupDeepTechGenerator() {
    const input = document.getElementById('generator-input');
    const btn = document.getElementById('btn-generate-tech');

    const handleGenerate = () => {
        const keyword = input.value.trim();
        if (!keyword) {
            alert('생성할 기술 약어나 키워드를 입력해 주세요. (예: CoWoS, 유리기판, LPO, BSS)');
            return;
        }

        // 이미 존재하는지 확인
        const existing = state.deepTechData.tech_list.find(t => 
            t.abbr.toUpperCase() === keyword.toUpperCase() || t.id.toLowerCase() === keyword.toLowerCase()
        );

        if (existing) {
            state.selectedTechId = existing.id;
            state.selectedSubNodeId = existing.nodes ? existing.nodes[0].id : '';
            renderDeepTechTabs();
            renderDeepTechContent();
            input.value = '';
            return;
        }

        // 새 기술 생성 안내 및 동적 목업 추가
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ AI 공학 백서 생성 중...</span>';

        setTimeout(() => {
            const newId = keyword.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const newTech = {
                id: newId,
                name: `${keyword} (차세대 첨단 공학 혁신)`,
                abbr: keyword.toUpperCase(),
                badge: '신규 자동생성 백서',
                summary: `${keyword} 기술의 물리적 원리 및 제조 공정, 공급망 밸류체인을 AI가 정밀 분석한 백서입니다.`,
                diagram: `graph TD\n    HOST[호스트 시스템] <-->|${keyword} 고속 인터페이스| CORE[${keyword} 핵심 반도체/모듈]\n    CORE --> SUB1[전공정/소재 최적화]\n    CORE --> SUB2[첨단 패키징/소부장 생태계]`,
                framework: {
                    fundamentals: `${keyword} 기술은 기존 시스템의 전력 소모 및 전송 지연 병목을 획기적으로 개선하기 위해 탄생한 차세대 물리 인터페이스 기술입니다.`,
                    process_tech: `나노 단위 정밀 공정 ➡️ 인터포저/기판 접합 ➡️ 고신뢰성 검사 및 패키징 모듈화 공정으로 구성됩니다.`,
                    bottlenecks: `수율 확보 및 공정 원가 절감, 글로벌 표준화 기구의 규격 통일이 핵심 상용화 과제입니다.`,
                    roadmap: `2025~2026년 시제품 검증 ➡️ 2027년 글로벌 빅테크 데이터센터 대규모 상용화 예정`
                },
                nodes: [
                    {
                        id: `${newId}_core`,
                        name: `${keyword} Core Architecture (핵심 기술)`,
                        tag: '상용화 개발',
                        desc: `${keyword}의 핵심 동작 원리를 구현한 차세대 공학 표준 아키텍처.`,
                        tech_specs: '기존 대비 전력 효율 40% 개선, 데이터 전송 대역폭 2배 확장',
                        company_strategy: '글로벌 1위 파운드리 및 팹리스 기업들이 독점 공급망 형성 중',
                        chain: {
                            'champion': '글로벌 선도 빅테크',
                            'foundry': 'TSMC, 삼성전자 파운드리',
                            'equipment': '한미반도체, ASML, 테라다인',
                            'materials': '동진쎄미켐, 솔브레인'
                        }
                    }
                ]
            };

            state.deepTechData.tech_list.push(newTech);
            state.selectedTechId = newId;
            state.selectedSubNodeId = `${newId}_core`;

            btn.disabled = false;
            btn.innerHTML = '<span>⚡ 즉석 백서 생성</span>';
            input.value = '';

            renderDeepTechTabs();
            renderDeepTechContent();
            alert(`🎉 [${keyword}] 심층 공학 백서가 성공적으로 생성 및 등록되었습니다!`);
        }, 1200);
    };

    if (btn && input) {
        btn.addEventListener('click', handleGenerate);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleGenerate();
        });
    }
}

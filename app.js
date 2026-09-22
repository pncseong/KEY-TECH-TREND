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
    selectedSubNodeId: 'hbm4_foundry',
    currentPage: 1,
    pageSize: 30
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

// 영구 저장소 및 삭제 상태 동기화 상수 (TDZ 방지를 위해 상단 배치)
const STORAGE_KEY_CUSTOM_TECHS = 'KEY_TECH_SAVED_CUSTOM_TECHS_V2';
const STORAGE_KEY_CUSTOM_SVGS = 'KEY_TECH_SAVED_CUSTOM_SVGS_V2';
const STORAGE_KEY_DELETED_TECHS = 'KEY_TECH_DELETED_TECH_IDS_V2';

// 초기 데이터 로딩 및 이벤트 바인딩
function init() {
    try {
        state.deepTechData = window.deepTechData || { tech_list: [] };
        loadCustomTechsFromStorage();
    } catch (e) {
        console.error("Init deepTechData error:", e);
    }
    
    try {
        fetchData();
    } catch (e) {
        console.error("Init fetchData error:", e);
    }
    
    try {
        setupEventListeners();
    } catch (e) {
        console.error("Init setupEventListeners error:", e);
    }
    
    try {
        setupViewSwitcher();
    } catch (e) {
        console.error("Init setupViewSwitcher error:", e);
    }
    
    try {
        setupDeepTechGenerator();
    } catch (e) {
        console.error("Init setupDeepTechGenerator error:", e);
    }
    
    try {
        updateApiStatusBadge();
    } catch (e) {
        console.error("Init updateApiStatusBadge error:", e);
    }
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
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            state.currentPage = 1;
            renderArticles();
            renderStats();
        });
    }

    // 2. 영향도 슬라이더 이벤트
    const impactSlider = document.getElementById('impact-slider');
    const impactVal = document.getElementById('impact-val');
    if (impactSlider && impactVal) {
        impactSlider.addEventListener('input', (e) => {
            state.minImpact = parseInt(e.target.value);
            impactVal.textContent = state.minImpact;
            state.currentPage = 1;
            renderArticles();
            renderStats();
        });
    }

    // 3. 기술 성숙도 필터 이벤트
    const stageFilter = document.getElementById('stage-filter');
    if (stageFilter) {
        stageFilter.addEventListener('change', (e) => {
            state.selectedStage = e.target.value;
            state.currentPage = 1;
            renderArticles();
            renderStats();
        });
    }

    // 4. 정렬 탭 버튼 이벤트
    const sortTabs = document.querySelectorAll('.sort-tab');
    if (sortTabs && sortTabs.length > 0) {
        sortTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                sortTabs.forEach(t => t.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                
                state.sortBy = target.dataset.sortBy;
                state.currentPage = 1;
                console.log("Sort mode changed to:", state.sortBy);
                renderArticles();
                renderStats();
            });
        });
    }
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
            state.currentPage = 1;
            renderArticles();
            renderStats();
        });
    });
    
    lucide.createIcons();
}

// 혼합 날짜 포맷(RFC 2822, ISO 8601, 공백/점 구분자 등)을 안전하게 파싱하여 밀리초 반환
// 파싱 실패 또는 유효하지 않은 날짜는 -1을 반환하여 최신순 정렬 시 항상 가장 뒤로 보냄
function parseCanonicalDate(dateStr) {
    if (!dateStr) return -1;
    const s = String(dateStr).trim();
    
    // 1. 표준 날짜 생성자 시도 (RFC 2822: "Wed, 26 Aug 2026 07:00:00 GMT" 및 ISO 8601)
    const d = new Date(s);
    const t = d.getTime();
    if (!isNaN(t) && t > 0) return t;
    
    // 2. 공백 구분 포맷 ("2024-01-09 16:44:17" 등)
    if (s.includes(' ') && !s.includes(',')) {
        const dIso = new Date(s.replace(' ', 'T'));
        const tIso = dIso.getTime();
        if (!isNaN(tIso) && tIso > 0) return tIso;
    }
    
    // 3. 점(.) 구분자 포맷 ("2024.01.09")
    if (s.includes('.')) {
        const cleaned = s.replace(/\./g, '-').replace(/\s+/g, ' ').trim();
        const dDot = new Date(cleaned);
        const tDot = dDot.getTime();
        if (!isNaN(tDot) && tDot > 0) return tDot;
    }
    
    return -1;
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
            const timeA = parseCanonicalDate(a.published_at);
            const timeB = parseCanonicalDate(b.published_at);
            return timeB - timeA;
        });
    }

    console.log(`[정렬 진단] 모드: ${state.sortBy} | 상위 3개 날짜/점수:`, 
        sortedResult.slice(0, 3).map(a => `(${a.published_at} / Impact: ${a.investment_impact})`)
    );

    return sortedResult;
}

// 대시보드 통계 수치 갱신 (누적 총계 및 필터 뷰 명확화)
function renderStats() {
    const filtered = getFilteredArticles();
    const filteredCount = filtered.length;
    const accumulatedTotal = (state.allArticles && state.allArticles.length) || 0;
    
    // 평균 영향도 점수
    let avgImpact = 0;
    if (filteredCount > 0) {
        const sum = filtered.reduce((acc, curr) => acc + (curr.investment_impact || 0), 0);
        avgImpact = (sum / filteredCount).toFixed(1);
    }
    
    // 상용화 비율
    let commRatio = 0;
    if (filteredCount > 0) {
        const commCount = filtered.filter(a => a.tech_stage === 'Commercial').length;
        commRatio = Math.round((commCount / filteredCount) * 100);
    }
    
    const countElem = document.getElementById('stat-total-count');
    if (countElem) {
        if (filteredCount === accumulatedTotal || state.selectedCategory === 'all' && state.minImpact === 1 && state.selectedStage === 'all' && !state.searchQuery) {
            countElem.textContent = accumulatedTotal.toLocaleString();
        } else {
            countElem.innerHTML = `${filteredCount.toLocaleString()} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">/ ${accumulatedTotal.toLocaleString()}건 (누적)</span>`;
        }
    }
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

// 아티클 목록 렌더링 (고정 30개 페이지네이션 및 경량 정적 SVG 최적화)
function renderArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;

    const filtered = getFilteredArticles();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / state.pageSize) || 1;

    // 페이지 범위 유효성 보정
    if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
    }
    if (state.currentPage < 1) {
        state.currentPage = 1;
    }

    if (totalItems === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg class="lucide-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); margin-bottom: 1rem;"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>
                <h3>분석된 정보가 없습니다</h3>
                <p>필터 설정을 확인하시거나 새로운 키워드로 크롤러를 작동시켜보세요.</p>
            </div>
        `;
        renderPaginationControls(0, 1);
        updateDebugInfo([], filtered);
        return;
    }

    const startIndex = (state.currentPage - 1) * state.pageSize;
    const pageArticles = filtered.slice(startIndex, startIndex + state.pageSize);

    // DOM 컨테이너 초기화
    container.innerHTML = '';

    pageArticles.forEach(article => {
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

        // 카드 내부 아이콘: Lucide 전체 document 파싱 오버헤드를 원천 제거하기 위해 경량 인라인 SVG 적용
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
                    <svg class="lucide-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    <span>AI Insight Summary</span>
                </div>
                <div class="ai-summary">
                    ${summaryHTML}
                </div>
            </div>

            <div class="card-footer">
                <div class="published-date">
                    <svg class="lucide-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>${formatDate(article.published_at)}</span>
                </div>
                <div class="ticker-tags">
                    ${tickersHTML}
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // 페이지네이션 컨트롤 렌더링
    renderPaginationControls(totalItems, totalPages);
    updateDebugInfo(pageArticles, filtered);
}

// 고정 페이지네이션 컨트롤러 렌더링
function renderPaginationControls(totalItems, totalPages) {
    const controls = document.getElementById('pagination-controls');
    if (!controls) return;

    if (totalItems <= 0) {
        controls.innerHTML = '';
        controls.style.display = 'none';
        return;
    }

    controls.style.display = 'flex';
    const isPrevDisabled = state.currentPage <= 1;
    const isNextDisabled = state.currentPage >= totalPages;

    controls.innerHTML = `
        <button id="btn-page-prev" class="pagination-btn" ${isPrevDisabled ? 'disabled aria-disabled="true"' : ''} title="이전 페이지">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            이전
        </button>
        <span class="pagination-info" aria-live="polite">
            <strong>${state.currentPage}</strong> / ${totalPages} 페이지 <span style="font-size: 0.85rem; color: var(--text-muted);">(총 ${totalItems.toLocaleString()}건)</span>
        </span>
        <button id="btn-page-next" class="pagination-btn" ${isNextDisabled ? 'disabled aria-disabled="true"' : ''} title="다음 페이지">
            다음
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
    `;

    const btnPrev = document.getElementById('btn-page-prev');
    if (btnPrev && !isPrevDisabled) {
        btnPrev.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderArticles();
                scrollToFeedTop();
            }
        });
    }

    const btnNext = document.getElementById('btn-page-next');
    if (btnNext && !isNextDisabled) {
        btnNext.addEventListener('click', () => {
            if (state.currentPage < totalPages) {
                state.currentPage++;
                renderArticles();
                scrollToFeedTop();
            }
        });
    }
}

function scrollToFeedTop() {
    const nav = document.querySelector('.category-nav');
    if (nav) {
        const topPos = nav.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
    }
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

function updateDebugInfo(renderedList, fullList) {
    const dbg = document.getElementById('debug-info');
    const targetList = fullList || renderedList;
    if (dbg && targetList) {
        const invalidCount = targetList.filter(a => {
            const dateStr = a.published_at;
            if (!dateStr) return true;
            const cleaned = String(dateStr).trim().replace(' ', 'T');
            return isNaN(new Date(cleaned).getTime());
        }).length;

        const top3 = targetList.slice(0, 3).map(a => `${a.title.slice(0,6)}(${formatDate(a.published_at)}/S:${a.investment_impact})`).join(' | ');
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


// ================= [영구 저장소 및 삭제 상태 동기화 엔진] =================
function loadCustomTechsFromStorage() {
    try {
        const deletedIds = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_TECHS) || '[]');
        
        // 1. 사용자가 삭제한 기술 제외
        if (deletedIds.length > 0 && state.deepTechData && state.deepTechData.tech_list) {
            state.deepTechData.tech_list = state.deepTechData.tech_list.filter(t => !deletedIds.includes(t.id));
        }

        // 2. 저장된 커스텀 기술 복원
        const savedCustoms = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_TECHS) || '[]');
        if (state.deepTechData && state.deepTechData.tech_list) {
            savedCustoms.forEach(cTech => {
                if (!deletedIds.includes(cTech.id)) {
                    const idx = state.deepTechData.tech_list.findIndex(t => t.id === cTech.id);
                    if (idx >= 0) {
                        state.deepTechData.tech_list[idx] = cTech;
                    } else {
                        state.deepTechData.tech_list.push(cTech);
                    }
                }
            });
        }

        // 3. 저장된 SVG 블루프린트 복원
        const savedSvgs = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_SVGS) || '{}');
        if (window.EngineeringBlueprints && typeof window.EngineeringBlueprints.registerDynamicSvg === 'function') {
            Object.keys(savedSvgs).forEach(nodeId => {
                window.EngineeringBlueprints.registerDynamicSvg(nodeId, savedSvgs[nodeId]);
            });
        }
    } catch (e) {
        console.error("loadCustomTechsFromStorage error:", e);
    }
}

function saveCustomTechToStorage(newTech) {
    try {
        let savedCustoms = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_TECHS) || '[]');
        const idx = savedCustoms.findIndex(t => t.id === newTech.id);
        if (idx >= 0) {
            savedCustoms[idx] = newTech;
        } else {
            savedCustoms.push(newTech);
        }
        localStorage.setItem(STORAGE_KEY_CUSTOM_TECHS, JSON.stringify(savedCustoms));

        let deletedIds = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_TECHS) || '[]');
        deletedIds = deletedIds.filter(id => id !== newTech.id);
        localStorage.setItem(STORAGE_KEY_DELETED_TECHS, JSON.stringify(deletedIds));

        let savedSvgs = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_SVGS) || '{}');
        if (newTech.nodes) {
            newTech.nodes.forEach(node => {
                if (node.blueprint_svg) {
                    savedSvgs[node.id] = node.blueprint_svg;
                }
            });
        }
        localStorage.setItem(STORAGE_KEY_CUSTOM_SVGS, JSON.stringify(savedSvgs));
    } catch (e) {
        console.error("saveCustomTechToStorage error:", e);
    }
}

function removeCustomTechFromStorage(techId) {
    try {
        let deletedIds = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_TECHS) || '[]');
        if (!deletedIds.includes(techId)) {
            deletedIds.push(techId);
            localStorage.setItem(STORAGE_KEY_DELETED_TECHS, JSON.stringify(deletedIds));
        }

        let savedCustoms = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_TECHS) || '[]');
        savedCustoms = savedCustoms.filter(t => t.id !== techId);
        localStorage.setItem(STORAGE_KEY_CUSTOM_TECHS, JSON.stringify(savedCustoms));
    } catch (e) {
        console.error("removeCustomTechFromStorage error:", e);
    }
}

function deleteTechBlock(techId, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (!state.deepTechData || !state.deepTechData.tech_list) return;
    const targetTech = state.deepTechData.tech_list.find(t => t.id === techId);
    const techName = targetTech ? (targetTech.abbr || targetTech.name) : techId;
    
    if (!confirm(`[${techName}] 기술 블록을 삭제하시겠습니까?`)) {
        return;
    }
    
    state.deepTechData.tech_list = state.deepTechData.tech_list.filter(t => t.id !== techId);
    removeCustomTechFromStorage(techId);

    if (state.selectedTechId === techId) {
        if (state.deepTechData.tech_list.length > 0) {
            state.selectedTechId = state.deepTechData.tech_list[0].id;
            state.selectedSubNodeId = state.deepTechData.tech_list[0].nodes && state.deepTechData.tech_list[0].nodes[0] 
                ? state.deepTechData.tech_list[0].nodes[0].id : '';
        } else {
            state.selectedTechId = '';
            state.selectedSubNodeId = '';
        }
    }
    
    renderDeepTechTabs();
    renderDeepTechContent();
}
window.deleteTechBlock = deleteTechBlock;

// 2. 기술 퀵 셀렉터 탭 렌더링 (컴팩트 & 1줄 요약형 & 삭제 버튼 탑재)
function renderDeepTechTabs() {
    const tabsContainer = document.getElementById('deep-tech-tabs');
    if (!tabsContainer || !state.deepTechData || !state.deepTechData.tech_list) return;

    tabsContainer.innerHTML = '';
    state.deepTechData.tech_list.forEach(tech => {
        const isActive = tech.id === state.selectedTechId;
        const card = document.createElement('div');
        card.className = `deep-tech-card-tab ${isActive ? 'active' : ''}`;
        
        const cleanSummary = (tech.summary || '').replace(/\s+/g, ' ').trim();
        const displayName = tech.abbr || tech.name;

        card.innerHTML = `
            <div class="tab-top-row">
                <span class="tab-badge" title="${escapeHTML(tech.badge || '핵심 기술')}">${escapeHTML(tech.badge || '핵심 기술')}</span>
                <button class="btn-delete-tech-tab" title="[${escapeHTML(displayName)}] 블록 삭제" onclick="deleteTechBlock('${tech.id}', event)">×</button>
            </div>
            <h3 title="${escapeHTML(displayName)}">${escapeHTML(displayName)}</h3>
            <p title="${escapeHTML(cleanSummary)}">${escapeHTML(cleanSummary)}</p>
        `;
        card.addEventListener('click', () => {
            state.selectedTechId = tech.id;
            renderDeepTechTabs();
            renderDeepTechContent();
        });
        tabsContainer.appendChild(card);
    });
}

// 정밀 엔지니어링 SVG 구조 단면도 생성기 (blueprints.js 모듈 연동)
function getEngineeringSvg(nodeId) {
    if (window.EngineeringBlueprints && typeof window.EngineeringBlueprints.getSvg === 'function') {
        return window.EngineeringBlueprints.getSvg(nodeId);
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
                                    <div class="engineering-svg-wrap" onclick="openBlueprintModal('${subNode.id}', '${escapeHTML(subNode.name)}')" title="클릭하여 대화면으로 확대">
                                        <div class="zoom-overlay-hint">
                                            <i data-lucide="zoom-in"></i> 클릭하여 대화면 확대
                                        </div>
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

    // 아이콘 렌더링
    lucide.createIcons();
}

// ================= [Gemini API Key 관리 및 보안 제어 (Session Only)] =================
// 보안 규정: 하드코딩 금지, 서버 키 자동탐색 금지, 로컬스토리지 영구저장 금지 (세션 전용)
// 공식 셧다운 및 구글 정책에 따라 종료/사용 불가 판정된 모델 목록
const OFFICIALLY_SHUTDOWN_MODELS = [
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-3.1-flash-lite-preview',
    'gemini-3-pro-image-preview',
    'gemini-3.1-flash-image-preview',
    'gemini-1.0-pro',
    'gemini-1.0-pro-vision'
];
const SHUTDOWN_GEMINI_MODELS = OFFICIALLY_SHUTDOWN_MODELS;

function getStoredGeminiApiKey() {
    try {
        // 오직 브라우저 세션(sessionStorage)에서만 읽음 (탭 종료 시 자동 소멸)
        return sessionStorage.getItem('KEY_TECH_GEMINI_API_KEY') || '';
    } catch (e) {
        return '';
    }
}

function getStoredGeminiModel() {
    try {
        const stored = sessionStorage.getItem('KEY_TECH_GEMINI_MODEL');
        // gemini-2.5-pro는 신규 사용자 계정 404 차단 모델이므로 저장되어 있어도 제외
        if (stored && !OFFICIALLY_SHUTDOWN_MODELS.includes(stored.toLowerCase()) && stored.toLowerCase() !== 'gemini-2.5-pro') {
            return stored;
        }
        return '';
    } catch (e) {
        return '';
    }
}

function updateApiStatusBadge() {
    const badge = document.getElementById('api-status-badge');
    const key = getStoredGeminiApiKey();
    if (badge) {
        if (key) {
            badge.textContent = '🟢 세션 연동됨';
            badge.className = 'api-status-badge connected';
            badge.title = '현재 탭 세션에 Gemini API Key가 등록되어 있습니다 (탭 닫을 시 자동 소멸)';
        } else {
            badge.textContent = '⚪ API 키 설정';
            badge.className = 'api-status-badge disconnected';
            badge.title = '즉석 백서 생성을 위해 Gemini API Key를 입력하세요';
        }
    }
}

// 제외 대상 특수 목적 패밀리 및 카테고리 키워드
const SPECIAL_PURPOSE_FAMILIES = [
    'nano-banana',
    'omni',
    'image',
    'imagen',
    'veo',
    'video',
    'lyria',
    'music',
    'audio',
    'tts',
    'transcribe',
    'live-audio',
    'robotics',
    'robot',
    'computer-use',
    'antigravity',
    'deep-research',
    'embedding',
    'embed',
    'aqa',
    'customtools',
    'custom-tools',
    'custom tools',
    'tool-use',
    'tool use',
    'tooling',
    'function-calling-specialized'
];

// 중앙화된 Deep-Tech 보고서/CAD 생성 적격 일반 텍스트 모델 판정 함수 (Fail-Closed)
function isEligibleGeneralTextModel(m) {
    if (!m) return false;
    
    // 1. generateContent 지원 여부 검증
    const methods = m.supportedGenerationMethods;
    const isGenerateContent = Array.isArray(methods) && methods.includes('generateContent');
    if (!isGenerateContent) return false;

    const id = (m.name || '').replace(/^models\//, '').toLowerCase();
    const displayName = (m.displayName || '').toLowerCase();
    const description = (m.description || '').toLowerCase();

    // 2. Positive General-Text Family Check (승인된 일반 텍스트 패밀리: gemini- 또는 gemma- 계열 필수)
    if (!id.startsWith('gemini-') && !id.startsWith('gemma-')) {
        return false;
    }

    // 3. 공식 셧다운 및 해당 계정 404 확인 모델 배제
    if (OFFICIALLY_SHUTDOWN_MODELS.includes(id)) return false;
    if (id === 'gemini-2.5-pro') return false; // 계정별 404 확인된 모델 배제
    if (id.startsWith('gemini-1.5') || id.startsWith('gemini-1.0')) return false;

    // 4. 특수 목적 모델 (nano-banana, omni, lyria, image, video, music, audio, tts, robotics, agent, embedding 등) 전면 배제
    for (const family of SPECIAL_PURPOSE_FAMILIES) {
        if (id.includes(family) || displayName.includes(family) || description.includes(family)) {
            return false;
        }
    }

    // 5. 툴 전용 특수 엔드포인트 배제 (id 서픽스 -tools, -tool-use 등 및 custom tool 설명 검사)
    if (id.endsWith('-tools') || id.endsWith('-tool') || id.includes('-tools-') || id.includes('customtool')) {
        return false;
    }
    if (description.includes('optimized for custom tool') || description.includes('specialized for tool')) {
        return false;
    }

    return true;
}

// nextPageToken을 끝까지 따라가서 전체 페이지의 모델 목록 수집 (Pagination Complete)
async function fetchAllRawModels(apiKey) {
    let allModels = [];
    let pageToken = '';
    let pageCount = 0;
    
    do {
        pageCount++;
        let url = 'https://generativelanguage.googleapis.com/v1beta/models';
        if (pageToken) {
            url += `?pageToken=${encodeURIComponent(pageToken)}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-goog-api-key': apiKey
            }
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson.error?.message || `모델 목록 조회 실패 (Status: ${response.status})`);
        }

        const data = await response.json();
        if (Array.isArray(data.models)) {
            allModels = allModels.concat(data.models);
        }
        
        pageToken = data.nextPageToken || '';
    } while (pageToken && pageCount < 20);
    
    return allModels;
}

// 모델 실제 호출 가능 여부 검증 (Tiny Smoke Probe)
async function probeModelSmoke(apiKey, modelId) {
    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Reply with OK." }]
                }],
                generationConfig: {
                    maxOutputTokens: 5,
                    temperature: 0.0
                }
            })
        });

        return response.ok;
    } catch (e) {
        return false;
    }
}

// x-goog-api-key 헤더와 pagination, 필터링 및 tiny smoke probe를 통해 실제 사용 가능한 모델 동적 discovery
async function fetchAvailableGeminiModels(apiKey) {
    const modelSelect = document.getElementById('gemini-model-select');
    const statusEl = document.getElementById('model-select-status');
    if (!modelSelect) return [];

    if (!apiKey) {
        modelSelect.innerHTML = '<option value="">API Key를 입력하면 사용 가능한 모델이 로드됩니다</option>';
        if (statusEl) {
            statusEl.textContent = '💡 API Key를 입력 후 모델 목록을 조회해 주세요.';
            statusEl.style.color = 'var(--text-muted)';
        }
        return [];
    }

    if (statusEl) {
        statusEl.textContent = '⏳ 계정에서 사용 가능한 Gemini 모델 목록 전체 페이지 조회 중...';
        statusEl.style.color = 'var(--color-semiconductors)';
    }

    try {
        // 1. Pagination 끝까지 추적하여 전체 모델 로드
        const rawModels = await fetchAllRawModels(apiKey);

        // 2. 중앙 적격성 검증 함수 적용 (generateContent 지원, 셧다운 제외, 특수 목적 제외)
        const capableModels = rawModels.filter(isEligibleGeneralTextModel);

        if (capableModels.length === 0) {
            modelSelect.innerHTML = '<option value="">사용 가능한 일반 텍스트 모델이 없습니다.</option>';
            if (statusEl) {
                statusEl.textContent = '⚠️ 계정에 generateContent 권한을 가진 적격 일반 텍스트 모델이 없습니다.';
                statusEl.style.color = 'var(--color-batteries)';
            }
            return [];
        }

        if (statusEl) {
            statusEl.textContent = '⏳ 최적 default 모델의 실제 계정 접근 권한 검증 중(Tiny Smoke)...';
        }

        // 3. Default 후보 탐색 우선순위:
        //    1) gemini-3.1-pro-preview
        //    2) gemini-pro-latest
        //    3) 최신 stable general-text Pro
        //    4) 최신 stable general-text Flash
        const modelIds = capableModels.map(m => m.name.replace(/^models\//, ''));
        
        const candidateQueue = [];
        if (modelIds.includes('gemini-3.1-pro-preview')) candidateQueue.push('gemini-3.1-pro-preview');
        if (modelIds.includes('gemini-pro-latest')) candidateQueue.push('gemini-pro-latest');
        
        // Stable Pro 후보들 (preview 제외)
        modelIds.filter(id => id.includes('pro') && !id.includes('preview') && !candidateQueue.includes(id))
                .forEach(id => candidateQueue.push(id));
                
        // Stable Flash 후보들 (preview 제외, e.g. gemini-2.5-flash)
        modelIds.filter(id => id.includes('flash') && !id.includes('preview') && !candidateQueue.includes(id))
                .forEach(id => candidateQueue.push(id));
                
        // 그 외 남은 모델들
        modelIds.filter(id => !candidateQueue.includes(id))
                .forEach(id => candidateQueue.push(id));

        // 4. Tiny Smoke Probe 실행 -> 최초 PASS 모델을 default로 확정
        let chosenDefaultModel = '';
        for (const candidate of candidateQueue) {
            const passed = await probeModelSmoke(apiKey, candidate);
            if (passed) {
                chosenDefaultModel = candidate;
                break;
            }
        }

        // Smoke probe 통과 모델이 없으면 fail-closed
        if (!chosenDefaultModel) {
            modelSelect.innerHTML = '<option value="">계정에서 실제 호출(Smoke Test) 가능한 모델이 없습니다.</option>';
            if (statusEl) {
                statusEl.textContent = '❌ 후보 모델들의 실제 API 호출(Smoke Test)이 모두 거부되었습니다(404 또는 권한 부족).';
                statusEl.style.color = 'var(--color-batteries)';
            }
            return [];
        }

        // Fast model 식별 (목록 중 최신 stable Flash)
        const fastCandidate = modelIds.find(id => id.includes('flash') && !id.includes('preview')) || '';

        // 5. 셀렉터 렌더링
        modelSelect.innerHTML = '';
        capableModels.forEach(m => {
            const id = m.name.replace(/^models\//, '');
            const isPreview = id.toLowerCase().includes('preview') || 
                             ((m.displayName || '').toLowerCase().includes('preview'));
            
            let label = m.displayName ? `${m.displayName} (${id})` : id;
            if (isPreview && !label.includes('[PREVIEW]')) {
                label = `[PREVIEW] ${label}`;
            }
            if (id === chosenDefaultModel) {
                label += ' (검증됨 - 기본 추천)';
            } else if (id === fastCandidate) {
                label += ' (고속 모드)';
            }

            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = label;
            if (id === chosenDefaultModel) {
                opt.selected = true;
            }
            modelSelect.appendChild(opt);
        });

        // 세션에 검증된 기본 모델 저장
        try {
            sessionStorage.setItem('KEY_TECH_GEMINI_MODEL', chosenDefaultModel);
        } catch (e) {}

        if (statusEl) {
            statusEl.textContent = `✅ 적격 모델 ${capableModels.length}개 로드 완료 (Smoke PASS 기본 모델: ${chosenDefaultModel})`;
            statusEl.style.color = 'var(--color-power-grid)';
        }

        return capableModels;
    } catch (err) {
        console.error('Gemini 모델 목록 조회 실패:', err);
        // hardcoded 2.5-pro fallback 절대 금지! Fail-Closed!
        modelSelect.innerHTML = `<option value="">모델 조회 실패: ${err.message}</option>`;
        if (statusEl) {
            statusEl.textContent = `❌ 모델 목록 조회 실패: ${err.message}`;
            statusEl.style.color = 'var(--color-batteries)';
        }
        return [];
    }
}

async function handleFetchModelsClick() {
    const input = document.getElementById('gemini-api-key-input');
    const key = input ? input.value.trim() : '';
    if (!key) {
        alert('먼저 Gemini API Key를 입력해 주세요.');
        if (input) input.focus();
        return;
    }
    await fetchAvailableGeminiModels(key);
}

function openGeminiApiModal() {
    const modal = document.getElementById('gemini-api-modal');
    const input = document.getElementById('gemini-api-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    if (!modal) return;
    
    const key = getStoredGeminiApiKey();
    if (input) {
        input.value = key;
    }
    
    // 키가 있으면 즉시 모델 목록 동적 조회
    if (key) {
        fetchAvailableGeminiModels(key);
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
    if (input) input.focus();
}

function closeGeminiApiModal() {
    const modal = document.getElementById('gemini-api-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }, 200);
    
    document.body.style.overflow = '';
}

function toggleApiKeyVisibility() {
    const input = document.getElementById('gemini-api-key-input');
    const icon = document.getElementById('btn-toggle-key-icon');
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        if (icon) icon.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide) lucide.createIcons();
}

async function saveGeminiApiKey() {
    const input = document.getElementById('gemini-api-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    if (!input) return;
    
    const key = input.value.trim();
    if (!key) {
        alert('Gemini API Key를 입력해 주세요.');
        return;
    }
    
    let chosenModel = modelSelect ? modelSelect.value : '';
    if (!chosenModel) {
        // 모델 목록이 아직 비어있다면 조회 시도
        await fetchAvailableGeminiModels(key);
        chosenModel = modelSelect ? modelSelect.value : '';
    }

    if (!chosenModel) {
        alert('사용 가능한 Gemini 모델이 확인되지 않았습니다. API Key와 네트워크 상태를 확인해 주세요.');
        return;
    }

    // 세션 스토리지에만 저장 (브라우저/탭 닫으면 소멸)
    try {
        sessionStorage.setItem('KEY_TECH_GEMINI_API_KEY', key);
        sessionStorage.setItem('KEY_TECH_GEMINI_MODEL', chosenModel);
    } catch (e) {}

    // 이전 버전의 localStorage 잔여 키 완전 삭제
    try {
        localStorage.removeItem('KEY_TECH_GEMINI_API_KEY');
    } catch (e) {}
    
    updateApiStatusBadge();
    closeGeminiApiModal();
    alert(`✅ Gemini API Key 및 검증된 모델(${chosenModel})이 현재 탭 세션에 등록되었습니다.\n(브라우저 탭을 닫으면 자동으로 완전히 삭제됩니다.)`);
}

function clearGeminiApiKey() {
    if (confirm('현재 세션에 등록된 Gemini API Key를 삭제하시겠습니까?')) {
        try {
            sessionStorage.removeItem('KEY_TECH_GEMINI_API_KEY');
            sessionStorage.removeItem('KEY_TECH_GEMINI_MODEL');
            localStorage.removeItem('KEY_TECH_GEMINI_API_KEY');
        } catch (e) {}
        const input = document.getElementById('gemini-api-key-input');
        if (input) input.value = '';
        const modelSelect = document.getElementById('gemini-model-select');
        if (modelSelect) {
            modelSelect.innerHTML = '<option value="">API Key를 입력하면 사용 가능한 모델이 로드됩니다</option>';
        }
        const statusEl = document.getElementById('model-select-status');
        if (statusEl) {
            statusEl.textContent = '💡 generateContent가 지원되는 실제 활성 모델을 계정 권한에 맞춰 실시간 조회합니다.';
            statusEl.style.color = 'var(--text-muted)';
        }
        updateApiStatusBadge();
        closeGeminiApiModal();
        alert('API Key가 삭제되었습니다.');
    }
}

// 레거시 localStorage 키 자동 소탕
try {
    localStorage.removeItem('KEY_TECH_GEMINI_API_KEY');
} catch (e) {}

// 전역 단독 실행 가능한 즉석 백서 생성 함수
async function handleGenerateTech() {
    const input = document.getElementById('generator-input');
    const btn = document.getElementById('btn-generate-tech');
    const keyword = input ? input.value.trim() : '';

    if (!keyword) {
        alert('생성할 기술 약어나 키워드를 입력해 주세요. (예: COWOS, 유리기판, 뉴로모픽, 전고체배터리)');
        if (input) input.focus();
        return;
    }

    // 1. 이미 존재하는 기술인지 확인 (대소문자 무관)
    const existing = state.deepTechData && state.deepTechData.tech_list ? state.deepTechData.tech_list.find(t => 
        (t.abbr && t.abbr.toUpperCase() === keyword.toUpperCase()) || 
        (t.id && t.id.toLowerCase() === keyword.toLowerCase()) ||
        (t.name && t.name.toLowerCase().includes(keyword.toLowerCase()))
    ) : null;

    if (existing) {
        state.selectedTechId = existing.id;
        state.selectedSubNodeId = existing.nodes && existing.nodes[0] ? existing.nodes[0].id : '';
        renderDeepTechTabs();
        renderDeepTechContent();
        if (input) input.value = '';
        return;
    }

    // 2. API Key 확인
    const apiKey = getStoredGeminiApiKey();
    if (!apiKey) {
        alert('즉석 백서 및 정밀 CAD 도면 생성을 위해 구글 Gemini API Key가 필요합니다.\n설정 창을 열어드립니다.');
        openGeminiApiModal();
        return;
    }

    let modelName = getStoredGeminiModel();
    if (!modelName) {
        alert('즉석 백서 생성을 위한 Gemini 모델이 설정되지 않았습니다. [API 키 설정] 창에서 모델 조회를 진행해 주세요.');
        openGeminiApiModal();
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ AI 공학 백서 및 CAD 도면 실시간 렌더링 중...</span>';
    }

    const SYSTEM_INSTRUCTION = `
당신은 전 세계 최고의 반도체 및 첨단 하드웨어 수석 CAD 설계 엔지니어입니다.
주어진 첨단 기술 키워드에 대해 학술 백서 수준의 심층 분석 데이터와 함께, 실제 반도체 백서 및 특허 도면과 동일한 고품질의 "정밀 엔지니어링 CAD 단면도(Engineering Blueprint SVG)"를 생성하십시오.

[STRICT SVG BLUEPRINT GUIDELINES]
모든 blueprint_svg는 반드시 아래의 CAD 블루프린트 설계 규격을 100% 엄격하게 준수해야 합니다:
1. 루트 태그: <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
2. 배경 그리드:
   - <rect width="100%" height="100%" fill="#070c14"/>
   - <defs>에 CAD 방안 그리드 패턴(#162238) 정의 및 채우기
3. 상단 헤더 (x: 20 ~ 740, y: 15 ~ 45):
   - 타이틀: "ENGINEERING CAD BLUEPRINT // [기술명/세부노드]" (fill="#38bdf8", font-size="13", font-family="monospace", font-weight="bold")
   - 우측 상태 태그: "PRECISION CROSS-SECTION ARCHITECTURE" (fill="#10b981", font-size="10")
4. 중앙 정밀 단면도 영역 (x: 20 ~ 460, y: 55 ~ 385, width: 440, height: 330):
   - 배경 박스: fill="#090e1a", stroke="#1e293b", stroke-width="1.5", rx="6"
   - 실제 마이크로 단위의 정밀 단면 적층 구조 (기판, 인터포저, 마이크로범프, TSV, 다이, 히트싱크 등)
   - 각 구성요소마다 정확한 공학 레이블(영문/한글)과 인출선(pointer line: stroke="#38bdf8", stroke-width="1")
   - 치수선: stroke-dasharray="3,3", 치수 라벨
   - 하단 공학 메커니즘 박스 (배경 #0f172a, stroke #1e293b)
5. 우측 분석 및 밸류체인 영역 (x: 480 ~ 740, y: 55 ~ 385, width: 260, height: 330):
   - 배경 박스: fill="#0b1329", stroke="#1e293b", stroke-width="1.5", rx="6"
   - 상단: 기존 기술(예: 유기물 FC-BGA) vs 신기술 비교 박스
   - 하단: 핵심 생태계 밸류체인 (글로벌 챔피언 및 국내 실제 상장사 실명)
6. 하단 엔지니어링 메트릭 바 (x: 20 ~ 740, y: 395 ~ 465, width: 720, height: 70):
   - 배경: fill="#0f172a", stroke="#1e293b", rx="4"
   - 첫째 줄: 3대 물리/공학 규격 (컬러 사각형 인디케이터 포함)
   - 둘째 줄: 3대 성능 개선 효과 (예: 휨 현상 50% 개선, 초미세 I/O 밀도 10배, 전력 손실 30% 감소)
`;

    const deepTechJsonSchema = {
        type: "OBJECT",
        properties: {
            id: { type: "STRING", description: "기술 식별자 (영문소문자_언더바)" },
            name: { type: "STRING", description: "기술 공식 명칭 (한글/원어 병기)" },
            abbr: { type: "STRING", description: "기술 영문 약어" },
            badge: { type: "STRING", description: "기술 분류 카테고리 배지" },
            summary: { type: "STRING", description: "1~2문장의 학술/엔지니어링 핵심 정의" },
            diagram: { type: "STRING", description: "Mermaid.js graph TD 아키텍처 다이어그램 코드" },
            framework: {
                type: "OBJECT",
                properties: {
                    fundamentals: { type: "STRING", description: "물리적/재료공학적 작동 원리 (유전율, 열팽창계수, 휨 현상 등 구체적 수치 명시)" },
                    process_tech: { type: "STRING", description: "1단계부터 5단계까지의 정밀 제조 공정 흐름" },
                    bottlenecks: { type: "STRING", description: "핵심 공학적 난제 및 수율 한계 (미세 크랙, 레이저 가공, 열충격 등)" },
                    roadmap: { type: "STRING", description: "기술 상용화 및 양산 로드맵" }
                },
                required: ["fundamentals", "process_tech", "bottlenecks", "roadmap"]
            },
            nodes: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        id: { type: "STRING", description: "세부 기술 노드 ID (영문소문자_언더바)" },
                        name: { type: "STRING", description: "세부 기술 노드 명칭" },
                        tag: { type: "STRING", description: "개발 및 상용화 단계 태그" },
                        desc: { type: "STRING", description: "학술/엔지니어링 상세 기술 설명 (물리적 원리 포함)" },
                        tech_specs: { type: "STRING", description: "주요 공학 사양 및 수치 (피치, 종횡비, 대역폭 등)" },
                        company_strategy: { type: "STRING", description: "글로벌/국내 선도 기업 상용화 전략" },
                        chain: {
                            type: "OBJECT",
                            properties: {
                                champion: { type: "STRING", description: "글로벌 선도 칩메이커/파운드리" },
                                equipment: { type: "STRING", description: "핵심 제조/검사 장비사 (국내외 상장사)" },
                                materials: { type: "STRING", description: "원소재/부품사 (국내외 상장사)" }
                            },
                            required: ["champion", "equipment", "materials"]
                        },
                        blueprint_svg: { type: "STRING", description: "완전한 정밀 엔지니어링 CAD SVG 블루프린트 코드 (viewBox=\"0 0 760 480\" 준수)" }
                    },
                    required: ["id", "name", "tag", "desc", "tech_specs", "company_strategy", "chain", "blueprint_svg"]
                }
            }
        },
        required: ["id", "name", "abbr", "badge", "summary", "diagram", "framework", "nodes"]
    };

    const userPrompt = `분석할 첨단 기술 키워드: ${keyword}
이 기술에 대해 학술 논문 및 백서 수준의 심층 엔지니어링 분석을 수행하고, 규격에 맞는 완전한 760x480 정밀 엔지니어링 CAD SVG 블루프린트를 포함한 DeepTechDossier JSON을 생성해 주십시오. 반드시 실제 공학 수치와 실제 소부장 상장사 밸류체인을 상세히 작성하십시오.`;

    try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }]
                },
                contents: [{
                    parts: [{ text: userPrompt }]
                }],
                generationConfig: {
                    response_mime_type: "application/json",
                    response_schema: deepTechJsonSchema,
                    temperature: 0.2
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            if (response.status === 404) {
                try {
                    sessionStorage.removeItem('KEY_TECH_GEMINI_MODEL');
                } catch (e) {}
                throw new Error(`선택된 모델(${modelName})은 이 계정에서 제공되지 않습니다(HTTP 404). [API 키 설정]에서 모델 목록을 다시 조회하여 최신 지원 모델을 선택해 주세요.`);
            }
            throw new Error(errData.error?.message || `API 호출 실패 (Status: ${response.status})`);
        }

        const resJson = await response.json();
        const textContent = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textContent) throw new Error('Gemini 응답 내용이 비어 있습니다.');

        const newTech = JSON.parse(textContent.trim());

        // 동적 SVG 블루프린트 등록
        if (window.EngineeringBlueprints && newTech.nodes) {
            newTech.nodes.forEach(node => {
                if (node.blueprint_svg) {
                    window.EngineeringBlueprints.registerDynamicSvg(node.id, node.blueprint_svg);
                }
            });
        }

        // 기존 목록에서 같은 ID가 있으면 교체, 없으면 추가
        if (!state.deepTechData) state.deepTechData = { tech_list: [] };
        if (!state.deepTechData.tech_list) state.deepTechData.tech_list = [];
        const tlist = state.deepTechData.tech_list;
        const idx = tlist.findIndex(t => t.id === newTech.id || (t.abbr && t.abbr.toUpperCase() === newTech.abbr.toUpperCase()));
        if (idx >= 0) {
            tlist[idx] = newTech;
        } else {
            tlist.push(newTech);
        }

        state.selectedTechId = newTech.id;
        state.selectedSubNodeId = newTech.nodes && newTech.nodes[0] ? newTech.nodes[0].id : '';

        // 영구 저장소에 자동 저장
        saveCustomTechToStorage(newTech);

        if (input) input.value = '';
        renderDeepTechTabs();
        renderDeepTechContent();

        alert(`🎉 [${newTech.name}] 심층 공학 백서 및 정밀 CAD 도면이 성공적으로 생성 및 등록되었습니다!`);
    } catch (error) {
        // 보안: 오류 메시지 내 API Key 패턴 마스킹
        const safeMsg = (error && error.message ? error.message : String(error))
            .replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]');
        console.error('Gemini Generation Error occurred');
        alert(`⚠️ 백서 생성 중 오류가 발생했습니다:\n${safeMsg}\n\n입력하신 API Key와 지원 모델, 네트워크 상태를 확인해 주세요.`);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>⚡ 즉석 백서 생성</span>';
        }
    }
}

// 이벤트 바인딩 전용 함수
function setupDeepTechGenerator() {
    updateApiStatusBadge();
    const input = document.getElementById('generator-input');
    const btn = document.getElementById('btn-generate-tech');

    if (btn) {
        btn.onclick = handleGenerateTech;
    }
    if (input) {
        input.onkeydown = (e) => {
            if (e.key === 'Enter') handleGenerateTech();
        };
    }

    const configBtn = document.getElementById('btn-gemini-config');
    if (configBtn) {
        configBtn.onclick = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            openGeminiApiModal();
        };
    }
}

// ================= [대화면 도면 라이트박스 모달 제어 함수] =================
function openBlueprintModal(nodeId, title) {
    const modal = document.getElementById('blueprint-modal');
    const modalTitle = document.getElementById('blueprint-modal-title');
    const modalBody = document.getElementById('blueprint-modal-body');
    if (!modal || !modalBody) return;

    const svgHtml = typeof getEngineeringSvg === 'function' ? getEngineeringSvg(nodeId) : '';
    if (!svgHtml) return;

    if (modalTitle) {
        modalTitle.textContent = title ? `${title} - 정밀 공학 단면도 확대 뷰어` : '정밀 엔지니어링 단면 구조도 대화면 확대 뷰어';
    }
    modalBody.innerHTML = svgHtml;
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
}

function closeBlueprintModal() {
    const modal = document.getElementById('blueprint-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        const modalBody = document.getElementById('blueprint-modal-body');
        if (modalBody) modalBody.innerHTML = '';
    }, 250);
    
    document.body.style.overflow = '';
}

// ESC 키 입력 시 모달 닫기
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBlueprintModal();
        closeGeminiApiModal();
    }
});

// 전역 객체(window) 바인딩 보장
window.getStoredGeminiApiKey = getStoredGeminiApiKey;
window.getStoredGeminiModel = getStoredGeminiModel;
window.updateApiStatusBadge = updateApiStatusBadge;
window.openGeminiApiModal = openGeminiApiModal;
window.closeGeminiApiModal = closeGeminiApiModal;
window.toggleApiKeyVisibility = toggleApiKeyVisibility;
window.saveGeminiApiKey = saveGeminiApiKey;
window.clearGeminiApiKey = clearGeminiApiKey;
window.handleGenerateTech = handleGenerateTech;
window.setupDeepTechGenerator = setupDeepTechGenerator;
window.openBlueprintModal = openBlueprintModal;
window.closeBlueprintModal = closeBlueprintModal;

// 스크립트 로드 시 즉시 배지 상태 갱신
try {
    updateApiStatusBadge();
} catch(e) {}

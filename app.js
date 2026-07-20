// 전역 상태 관리 객체
const state = {
    allArticles: [],
    categories: [],
    lastUpdated: '',
    selectedCategory: 'all',
    searchQuery: '',
    minImpact: 1,
    selectedStage: 'all',
    sortBy: 'impact'
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
    fetchData();
    setupEventListeners();
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
    return state.allArticles.filter(article => {
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
            const dateA = a.published_at || "";
            const dateB = b.published_at || "";
            return dateB.localeCompare(dateA); // 문자열 역순 (최신순)
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
    updateDebugInfo();
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

function updateDebugInfo() {
    const dbg = document.getElementById('debug-info');
    if (dbg) {
        dbg.textContent = `[진단] 기사수: ${state.allArticles.length}개 | 정렬: ${state.sortBy === 'impact' ? '중요도' : '최신순'}`;
    }
}

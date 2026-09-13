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
            renderArticles();
            renderStats();
        });
    }

    // 3. 기술 성숙도 필터 이벤트
    const stageFilter = document.getElementById('stage-filter');
    if (stageFilter) {
        stageFilter.addEventListener('change', (e) => {
            state.selectedStage = e.target.value;
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


// ================= [영구 저장소 및 삭제 상태 동기화 엔진] =================
const STORAGE_KEY_CUSTOM_TECHS = 'KEY_TECH_SAVED_CUSTOM_TECHS_V2';
const STORAGE_KEY_CUSTOM_SVGS = 'KEY_TECH_SAVED_CUSTOM_SVGS_V2';
const STORAGE_KEY_DELETED_TECHS = 'KEY_TECH_DELETED_TECH_IDS_V2';

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

// ================= [Gemini API Key 관리 및 상태 제어] =================
const DEFAULT_GEMINI_KEY = '';

function getStoredGeminiApiKey() {
    return localStorage.getItem('KEY_TECH_GEMINI_API_KEY') || DEFAULT_GEMINI_KEY;
}

function getStoredGeminiModel() {
    return localStorage.getItem('KEY_TECH_GEMINI_MODEL') || 'gemini-2.5-pro';
}

function updateApiStatusBadge() {
    const badge = document.getElementById('api-status-badge');
    const key = getStoredGeminiApiKey();
    if (badge) {
        if (key) {
            badge.textContent = '🟢 API 연동됨';
            badge.className = 'api-status-badge connected';
        } else {
            badge.textContent = '⚪ API 키 설정';
            badge.className = 'api-status-badge disconnected';
        }
    }
}

function openGeminiApiModal() {
    const modal = document.getElementById('gemini-api-modal');
    const input = document.getElementById('gemini-api-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    if (!modal) return;
    
    if (input) {
        input.value = getStoredGeminiApiKey();
    }
    if (modelSelect) modelSelect.value = getStoredGeminiModel();
    
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

function saveGeminiApiKey() {
    const input = document.getElementById('gemini-api-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    if (!input) return;
    
    const key = input.value.trim();
    if (!key) {
        alert('Gemini API Key를 입력해 주세요.');
        return;
    }
    
    localStorage.setItem('KEY_TECH_GEMINI_API_KEY', key);
    if (modelSelect) {
        localStorage.setItem('KEY_TECH_GEMINI_MODEL', modelSelect.value);
    }
    
    updateApiStatusBadge();
    closeGeminiApiModal();
    alert('✅ Gemini API Key가 브라우저에 안전하게 저장되었습니다!');
}

function clearGeminiApiKey() {
    if (confirm('저장된 Gemini API Key를 삭제하시겠습니까?')) {
        localStorage.removeItem('KEY_TECH_GEMINI_API_KEY');
        const input = document.getElementById('gemini-api-key-input');
        if (input) input.value = '';
        updateApiStatusBadge();
        closeGeminiApiModal();
        alert('API Key가 삭제되었습니다.');
    }
}

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

    const modelName = getStoredGeminiModel();

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
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        console.error('Gemini Generation Error:', error);
        alert(`⚠️ 백서 생성 중 오류가 발생했습니다:\n${error.message}\n\nAPI Key와 네트워크 상태를 확인해 주세요.`);
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

# KEY TECH TREND — Deep-Tech Model Security, Dynamic Discovery, Workflow Guard & Chronology Narrow Remediation Report

- **일자**: 2026-09-19
- **대상 저장소**: `pncseong/KEY-TECH-TREND` (`c:\Users\백남철\.antigravity\KEY TECH TREND`)
- **실행 원칙**: 사용자 지정 4대 긴급 교정 항목 한정 수정, ETNews 거버넌스 및 백엔드 분석기 보존, 엄격한 Fail-Closed 적용

---

## 1. 개요 및 요약 (Executive Summary)

독립 검토(Fresh Independent Review)를 통해 도출된 핵심 4대 과제를 정확하게 선별하여 교정 작업을 완료하였습니다:

1. **Gemini API Key 전송 방식 개선 (URL 쿼리 스트링 -> `x-goog-api-key` 헤더)**:
   - 브라우저 상의 즉석 백서/CAD 생성 API 호출 시 URL의 `?key=${apiKey}` 파라미터를 완전히 제거하고 HTTP Request Header `x-goog-api-key`로 전환하였습니다.
   - 브라우저 히스토리, 웹 프록시 로깅, CDN 캐시 로그 등에 API Key가 평문으로 노출되는 리스크를 원천 차단하였습니다.

2. **종료(Shutdown) 모델 제거 및 계정 맞춤형 동적 모델 디스커버리 (Dynamic Discovery)**:
   - 구글 정책에 따라 사용 중단된 `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-2.0-flash`의 하드코딩 옵션을 UI 및 기본값에서 전면 제거하였습니다.
   - 사용자가 입력한 실제 API Key로 `https://generativelanguage.googleapis.com/v1beta/models`를 조회하여, 해당 계정에서 `generateContent` 권한을 가진 활성 모델만 동적으로 드롭다운에 표시합니다.
   - 기본 선택 우선순위는 (1) `gemini-2.5-pro`, (2) `gemini-2.5-flash`, (3) 최신 프리뷰 모델 순으로 안전하게 할당되며, 프리뷰 모델의 경우 명확히 `[PREVIEW]` 태그를 부착합니다.

3. **GitHub Actions Workflow Guard의 엄격한 Fail-Closed 전환**:
   - `.github/workflows/update_tech.yml` 내 `|| exit 0` 우회 코드를 완전히 제거하였습니다.
   - (1) `window.techData =` 마커 부재, (2) JSON 파싱 실패, (3) 1,000건 미만 기사, (4) 중복 ID 검출 시 즉시 `sys.exit(1)`로 차단되며, 커밋 및 푸시 스텝으로의 진입을 절대 허용하지 않습니다.

4. **최신순 날짜 정렬 복원 및 Canonical Date Parser 도입**:
   - `RFC 2822` 포맷(`Wed, 26 Aug 2026 07:00:00 GMT`), `ISO 8601`, 공백 분리형 일시(`2024-01-09 16:44:17`) 등 혼합된 날짜 형식을 표준 밀리초 타임스탬프로 정규화하는 `parseCanonicalDate`를 적용하였습니다.
   - 기존의 결함 있는 문자열 사전식 비교(Lexical Comparison Fallback)를 제거하여, 2026년 기사가 2023년 기사보다 무조건 상위에 노출되도록 날짜 정렬의 연대기적 일관성을 100% 회복하였습니다.

---

## 2. 4대 세부 교정 내역

### 1) Gemini API Key 전송 헤더화 (`x-goog-api-key`)
- **수정 파일**: `app.js`
- **적용 내용**:
  - `handleGenerateTech()`:
    ```javascript
    // 변경 전: https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}
    // 변경 후:
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
        },
        body: JSON.stringify(...)
    });
    ```
  - 모델 목록 조회 API:
    ```javascript
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
        method: 'GET',
        headers: { 'x-goog-api-key': apiKey }
    });
    ```
- **검증**: 코드베이스 전체 대상 `?key=` 검색 결과 **0건 (완전 소멸)** 확인.

---

### 2) 셧다운 모델 제거 및 계정별 동적 모델 검색 (Dynamic Discovery)
- **수정 파일**: `index.html`, `app.js`
- **적용 내용**:
  - `index.html`: 정적 `<option>`에 잔존하던 `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-2.0-flash` 완전 삭제. `[🔄 모델 목록 조회]` 버튼 및 동적 마운트 안내 문구 배치.
  - `app.js`:
    - `SHUTDOWN_GEMINI_MODELS` 블랙리스트 정의 (`gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-1.0-pro`).
    - `fetchAvailableGeminiModels(apiKey)`:
      - 계정별 `models` 엔드포인트 실시간 질의
      - `m.supportedGenerationMethods.includes('generateContent')` 필터링
      - 셧다운 모델 배제
      - `[PREVIEW]` 라벨링 지원
      - 선호도 기본값 순위(`gemini-2.5-pro` -> `gemini-2.5-flash` -> 최신 모델) 적용
- **검증**: mock 및 구조 테스트 통과, 셧다운 모델 완전 제외 및 `gemini-2.5-pro` 1순위 타겟 확인.

---

### 3) GitHub Actions Fail-Closed 가드 체계 구축
- **수정 파일**: `.github/workflows/update_tech.yml`
- **적용 내용**:
  - `|| exit 0` 우회 구문 완전 삭제
  - 검증 스텝과 푸시 스텝 분리:
    ```yaml
    - name: data.js 무결성 및 역사 데이터 검증 (Fail-Closed Safety Guard)
      run: |
        python -c "
        import json, sys
        try:
            with open('data.js', 'r', encoding='utf-8') as f:
                c = f.read()
            idx = c.find('window.techData =')
            if idx == -1:
                print('FATAL GUARD ERROR: missing window.techData marker')
                sys.exit(1)
            raw_json = c[idx+17:].strip().rstrip(';')
            d = json.loads(raw_json)
            articles = d.get('articles', [])
            cnt = len(articles)
            if cnt < 1000:
                print(f'FATAL GUARD ERROR: Article count {cnt} < 1000')
                sys.exit(1)
            ids = [a.get('id') for a in articles if 'id' in a]
            if len(ids) != cnt or len(set(ids)) != cnt:
                print('FATAL GUARD ERROR: Duplicate or missing IDs detected')
                sys.exit(1)
            print(f'PASS: data.js integrity verified ({cnt} articles).')
        except Exception as e:
            print(f'FATAL GUARD ERROR: {e}')
            sys.exit(1)
        "

    - name: 깃허브 푸시 (검증 통과 시에만 실행)
      run: |
        ...
        git diff --quiet && git diff --staged --quiet || (git commit -m \"Auto-update tech data [skip ci]\" && git push)
    ```
- **검증**:
  - 정상 data.js (4,052건, 중복 없음): PASS (exit 0)
  - 마커 부재: FATAL DETECTED -> exit 1
  - 비정상 JSON: FATAL DETECTED -> exit 1
  - 1000건 미만 (50건 테스트): FATAL DETECTED -> exit 1
  - 중복 ID: FATAL DETECTED -> exit 1

---

### 4) 최신순 날짜 정렬 수정 (Canonical Date Parser)
- **수정 파일**: `app.js`
- **원인 분석**:
  - RFC 2822 형식(`Wed, 26 Aug 2026 ...`)에 `replace(' ', 'T')`를 적용하여 `Wed,T26...`으로 변환됨으로써 브라우저 `Date` 객체가 `NaN`을 반환함.
  - 이로 인해 사전식 백업 비교(`strB > strA`)를 탔고, `Wed, 30 Aug 2023`의 '30'이 `Wed, 26 Aug 2026`의 '26'보다 앞서게 되는 치명적 역전 현상 발생.
- **해결책**:
  ```javascript
  function parseCanonicalDate(dateStr) {
      if (!dateStr) return -1;
      const s = String(dateStr).trim();
      const d = new Date(s);
      const t = d.getTime();
      if (!isNaN(t) && t > 0) return t;
      if (s.includes(' ') && !s.includes(',')) {
          const dIso = new Date(s.replace(' ', 'T'));
          const tIso = dIso.getTime();
          if (!isNaN(tIso) && tIso > 0) return tIso;
      }
      if (s.includes('.')) {
          const cleaned = s.replace(/\./g, '-').replace(/\s+/g, ' ').trim();
          const dDot = new Date(cleaned);
          const tDot = dDot.getTime();
          if (!isNaN(tDot) && tDot > 0) return tDot;
      }
      return -1;
  }
  ```
  - 정렬 함수에서 사전식 백업을 전면 폐기하고 `return timeB - timeA;`로 단순화.
- **검증**:
  - `Wed, 26 Aug 2026 07:00:00 GMT` 타임스탬프: `1787727600.0`
  - `Wed, 30 Aug 2023 07:00:00 GMT` 타임스탬프: `1693378800.0`
  - 2026년 기사가 2023년 기사보다 높은 우선순위로 명확히 정렬됨 확인.
  - 전체 4,052건 데이터 중 파싱 실패 0건, 완전한 최신순 내림차순 정렬 확인.

---

## 3. 검증 결과 요약 표

| 검증 항목 | 기준 | 결과 | 상태 |
| :--- | :--- | :--- | :---: |
| **API Key Transport** | `?key=` 완전 제거, `x-goog-api-key` 헤더 적용 | `app.js` 내 `?key=` 0건, 헤더 인증 적용 | **PASS** |
| **Shutdown Model Removal** | 1.5-pro, 1.5-flash, 2.0-flash 정적 옵션 삭제 | `index.html` 하드코딩 완전 제거 | **PASS** |
| **Dynamic Model Discovery** | `models` API 실시간 조회 및 `gemini-2.5-pro` 기본 할당 | `fetchAvailableGeminiModels` 구현 완료 | **PASS** |
| **Fail-Closed Guard** | `|| exit 0` 제거 및 마커/JSON/<1000/중복ID 차단 | 4대 차단 시뮬레이션 전건 정상 실패 확인 | **PASS** |
| **Chronological Sort** | 2026 기사가 2023 기사보다 상위에 위치 | 2026 타임스탬프 > 2023 타임스탬프 확인 | **PASS** |
| **보호 경계 준수** | ETNews / Lineage / 백엔드 분석기 미수정 | 관련 파일 일체 무변경 유지 | **PASS** |

---

## 4. 결론

사용자께서 지시하신 4가지 핀포인트 개선 작업이 완벽하고 안전하게 완료되었으며, KTT 시스템의 프로덕션 데이터 보존성과 브라우저 즉석 백서의 보안/안정성이 완벽히 확보되었습니다.

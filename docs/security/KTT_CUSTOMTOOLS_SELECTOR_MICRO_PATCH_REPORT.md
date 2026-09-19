# KTT — CustomTools Selector Micro-Patch Report
## Fail-Closed Tool-Specialized Endpoint Exclusion

- **일자**: 2026-09-19
- **수행자**: Antigravity
- **검토자**: Codex after completion
- **수정 범위**: Deep-Tech selector eligibility only (`app.js`)
- **보호 경계**: NO Production / ETNews / lineage / workflow / history changes

---

## 1. 종합 판정 결과 (Final Desired State)

```text
GENERAL_TEXT_MODEL_FILTER = PASS
SPECIAL_PURPOSE_MODELS_IN_SELECTOR = 0
gemini-3.1-pro-preview-customtools = EXCLUDED

SELECTED_DEFAULT_MODEL = gemini-3.1-pro-preview
DEFAULT_MODEL_SMOKE = PASS
LITERAL_PREVIEW_TAG_PRESENT = YES

MODEL_LIST_PAGINATION_COMPLETE = YES
OFFICIALLY_SHUTDOWN_MODELS_IN_SELECTOR = 0

QUERY_STRING_API_KEY_USAGE = 0
X_GOOG_API_KEY_HEADER_USAGE = YES
SESSION_ONLY_KEY_HANDLING = PASS
ACCOUNT_404_FAILOVER = PASS
DISCOVERY_FAILURE_FAILS_CLOSED = YES
UNVERIFIED_2_5_PRO_FALLBACK = ABSENT

LOW_COUNT_PUSH_GUARD_FAILS_CLOSED = YES
LATEST_SORT_CHRONOLOGY = PASS
DASHBOARD_ACCUMULATED_HISTORY_VISIBLE = PASS
DEPLOYED_DATA_JS_COUNT >= 4052
UNIQUE_ID_COUNT = ITEM_COUNT

KTT_PRODUCTION_ANALYZER_MODEL_CHANGED = NO
ETNEWS_GOVERNANCE_CHANGED = NO
LINEAGE_CHANGED = NO
PRODUCTION_MUTATIONS = 0

READY_FOR_FINAL_CODEX_CLOSEOUT_REVIEW = YES
STOP = YES
```

---

## 2. 세부 교정 내역

### 1) `gemini-3.1-pro-preview-customtools` 특수 엔드포인트 차단
- **결함 배경**:
  - `gemini-3.1-pro-preview-customtools`는 일반 백서/리포트 생성 모델이 아니라 `optimized for custom tool usage`로 제공되는 툴 전용 특수 엔드포인트임에도 불구하고 기존 필터를 통과하여 셀렉터에 노출됨.
- **적용 조치**:
  - `app.js` 내 중앙화된 적격성 판단 함수 `isEligibleGeneralTextModel(m)`에 툴 특화 엔드포인트를 식별하여 차단하는 정책을 Fail-Closed 방식으로 구현함:
    1. **Positive General-Text Family Check**: 승인된 텍스트 패밀리(`gemini-` 또는 `gemma-`)로 시작하지 않는 모델 원천 차단.
    2. **SPECIAL_PURPOSE_FAMILIES 확장**: `customtools`, `custom-tools`, `custom tools`, `tool-use`, `tool use`, `tooling`, `function-calling-specialized` 키워드를 블랙리스트에 추가.
    3. **Endpoint 서픽스 및 설명 검증**:
       - `id.endsWith('-tools')`, `id.endsWith('-tool')`, `id.includes('-tools-')`, `id.includes('customtool')` 차단.
       - `description.includes('optimized for custom tool')`, `description.includes('specialized for tool')` 차단.
    4. **일반 툴 지원 기능과의 명확한 분리**:
       - 일반 목적 모델(예: `gemini-3.1-pro-preview`, `gemini-2.5-flash` 등)이 일반 기능으로서 툴/함수 호출을 지원하는 설명은 정상 허용(`ALLOWED`).
       - 툴 전용으로 특화된 엔드포인트(endpoint)만 정밀 배제(`EXCLUDED`).

---

## 3. 회귀 검증 결과 (Regression Verification)

### 1) 특수 목적 모델 제외 전수 검증:
- `gemini-3.1-pro-preview-customtools` = **EXCLUDED** (PASS)
- `nano-banana-pro-preview` = **EXCLUDED** (PASS)
- `gemini-omni-flash-preview` = **EXCLUDED** (PASS)
- `gemini-omni-1.1-flash` = **EXCLUDED** (PASS)
- `lyria-3-clip-preview` = **EXCLUDED** (PASS)
- `lyria-3-pro-preview` = **EXCLUDED** (PASS)
- `lyria-3.5` = **EXCLUDED** (PASS)
- `veo-2.0-generate` / `imagen-3.0-generate-002` = **EXCLUDED** (PASS)
- `gemini-robotics-er` / `gemini-deep-research` = **EXCLUDED** (PASS)
- `gemini-2.0-flash-exp-tts` / `gemini-2.0-flash-live-audio` = **EXCLUDED** (PASS)
- `SPECIAL_PURPOSE_MODELS_IN_SELECTOR = 0` (PASS)

### 2) 필수 일반 텍스트 모델 유지 검증:
- `gemini-2.5-flash` = **ACCEPTED** (PASS)
- `gemini-flash-latest` = **ACCEPTED** (PASS)
- `gemini-flash-lite-latest` = **ACCEPTED** (PASS)
- `gemini-pro-latest` = **ACCEPTED** (PASS)
- `gemini-2.5-flash-lite` = **ACCEPTED** (PASS)
- `gemini-3-flash-preview` = **ACCEPTED** (PASS)
- `gemini-3.1-pro-preview` = **ACCEPTED** (PASS)
- `gemini-3.1-flash-lite` = **ACCEPTED** (PASS)
- `gemini-3.5-flash` = **ACCEPTED** (PASS)
- `gemini-3.5-flash-lite` = **ACCEPTED** (PASS)
- `gemini-3.6-flash` = **ACCEPTED** (PASS)
- `gemini-3.7-flash` = **ACCEPTED** (PASS)
- `gemini-3.8-flash` = **ACCEPTED** (PASS)
- `gemma-4-26b-a4b-it` = **ACCEPTED** (PASS)
- `gemma-4-31b-it` = **ACCEPTED** (PASS)
- `GENERAL_TEXT_MODEL_FILTER = PASS`

### 3) Default 모델 및 UI 라벨:
- `SELECTED_DEFAULT_MODEL = gemini-3.1-pro-preview` (PASS)
- `DEFAULT_MODEL_SMOKE = PASS` (PASS)
- `LITERAL_PREVIEW_TAG_PRESENT = YES` (`[PREVIEW]` 리터럴 브래킷 보장)

---

## 4. 보호 경계 및 불변 항목 준수 확인

- 백엔드 프로덕션 분석기(`llm_analyzer.py`): 변경 없음 (`KTT_PRODUCTION_ANALYZER_MODEL_CHANGED = NO`)
- ETNews V1/V2 수집 거버넌스: 변경 없음 (`ETNEWS_GOVERNANCE_CHANGED = NO`)
- 데이터 계통(Lineage) 및 마이그레이션: 변경 없음 (`LINEAGE_CHANGED = NO`)
- GitHub Actions 가드, 기사 정렬, 4052건 역사 데이터: 완전 보존 (`PRODUCTION_MUTATIONS = 0`)
- API 키 전송: `x-goog-api-key` 헤더 사용, `?key=` 전송 0건

---

## 5. 최종 결론

`gemini-3.1-pro-preview-customtools`를 포함한 툴 전용 특수 엔드포인트가 Fail-Closed 정책에 따라 Deep-Tech 셀렉터에서 완벽히 배제되었으며, 일반 텍스트 모델 집합과 기본 모델 설정이 안정적으로 유지되고 있음을 확인하였습니다.

**READY_FOR_FINAL_CODEX_CLOSEOUT_REVIEW = YES**

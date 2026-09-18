# KTT — Final Selector Eligibility Patch Report
## Special-Purpose Model Exclusion + Preview Label Normalization

- **일자**: 2026-09-19
- **수행자**: Antigravity
- **검토자**: Codex after completion
- **수정 범위**: Deep-Tech browser selector only (`app.js`)
- **보호 경계**: NO Production / ETNews / lineage changes

---

## 1. 종합 판정 결과 (Final Desired State)

```text
GENERAL_TEXT_MODEL_FILTER = PASS
SPECIAL_PURPOSE_MODELS_IN_SELECTOR = 0
OFFICIALLY_SHUTDOWN_MODELS_IN_SELECTOR = 0

nano-banana-pro-preview = EXCLUDED
gemini-omni-flash-preview = EXCLUDED
gemini-omni-1.1-flash = EXCLUDED
lyria-3-clip-preview = EXCLUDED
lyria-3-pro-preview = EXCLUDED
lyria-3.5 = EXCLUDED

SELECTED_DEFAULT_MODEL = gemini-3.1-pro-preview
DEFAULT_MODEL_SMOKE = PASS
LITERAL_PREVIEW_TAG_PRESENT = YES
PREVIEW_LABEL_VISIBLE = YES

QUERY_STRING_API_KEY_USAGE = 0
X_GOOG_API_KEY_HEADER_USAGE = YES
SESSION_ONLY_KEY_HANDLING = PASS
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

### 1) 특수 목적 모델(Special-Purpose Models) 패밀리 기반 완전 배제
- **원인 분석**:
  - 기존의 부분 문자열 필터링을 우회하여 6개의 이미지/비디오/오디오/음악 특수 모델이 Deep-Tech 기술 백서 셀렉터에 잔존함:
    - `nano-banana-pro-preview`
    - `gemini-omni-flash-preview`
    - `gemini-omni-1.1-flash`
    - `lyria-3-clip-preview`
    - `lyria-3-pro-preview`
    - `lyria-3.5`
- **적용 조치**:
  - `app.js` 내 중앙화된 적격성 판단 함수 `isEligibleGeneralTextModel(m)`에 `SPECIAL_PURPOSE_FAMILIES` 블랙리스트를 전면 도입함:
    ```javascript
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
        'aqa'
    ];
    ```
  - 모델의 ID(`name`), `displayName`, `description`에 대해 해당 패밀리 키워드가 포함될 경우 즉시 배제 처리함.
- **검증 결과**:
  - 6대 문제 모델 전건 `EXCLUDED` 확인.
  - 추가 특수 모델(`veo`, `imagen`, `robotics`, `deep-research`, `tts` 등) 전건 `EXCLUDED` 확인.
  - 일반 텍스트 모델(`gemini-3.1-pro-preview`, `gemini-pro-latest`, `gemini-2.5-flash`, `gemini-3.5-flash` 등) 정상 허용(`ACCEPTED`) 확인.

### 2) Preview 라벨 정규화 (Literal `[PREVIEW]` 태그 보장)
- **원인 분석**:
  - 기존 코드에서 `if (isPreview && !label.toUpperCase().includes('PREVIEW'))` 로 검사하여, 모델의 displayName에 단어 "Preview"가 포함되어 있으면 리터럴 대괄호 태그 `[PREVIEW]` 추가가 누락되는 현상이 발생함.
- **적용 조치**:
  - `if (isPreview && !label.includes('[PREVIEW]'))`로 변경하여, 프리뷰 모델의 경우 displayName의 단어 포함 여부와 무관하게 명시적인 `[PREVIEW]` 브래킷 태그가 라벨 최상단에 붙도록 정규화함:
    ```javascript
    let label = m.displayName ? `${m.displayName} (${id})` : id;
    if (isPreview && !label.includes('[PREVIEW]')) {
        label = `[PREVIEW] ${label}`;
    }
    ```
- **검증 결과**:
  - 기본 모델 라벨: `[PREVIEW] Gemini 3.1 Pro Preview (gemini-3.1-pro-preview) (검증됨 - 기본 추천)`
  - `LITERAL_PREVIEW_TAG_PRESENT = YES` 확인.

---

## 3. 회귀 테스트 및 보호 경계 보존 확인

1. **기존 PASS 상태 100% 보존**:
   - `gemini-3.1-pro-preview` Tiny Smoke Probe 및 Default 확정 유지
   - `models` API Pagination (`nextPageToken`) 지원 유지
   - 미검증 `gemini-2.5-pro` 폴백 부재 (`UNVERIFIED_2_5_PRO_FALLBACK = ABSENT`)
   - 404 발생 시 계정 모델 Failover 및 Discovery Fail-Closed 유지
   - `x-goog-api-key` 헤더 전송 및 URL `?key=` 전송 0건
   - GitHub Actions 시맨틱 ID 가드 (null, empty, bool, non-scalar 차단)
   - 기사 연대기 정렬 (2026 기사 상위 노출)
   - 4,052건 누적 역사 데이터 보존
2. **보호 경계 엄수**:
   - 백엔드 프로덕션 분석기(`llm_analyzer.py`), ETNews 거버넌스, 데이터 계통(Lineage), 서버 자격증명 일체 무변경.

---

## 4. 최종 결론

Codex의 Fresh Independent Review에서 지적된 6개 특수 목적 모델의 셀렉터 유입 및 Preview 리터럴 태그 누락 결함이 단일 중앙화된 적격성 함수와 정규화 로직을 통해 완벽히 해결되었습니다.

**READY_FOR_FINAL_CODEX_CLOSEOUT_REVIEW = YES**

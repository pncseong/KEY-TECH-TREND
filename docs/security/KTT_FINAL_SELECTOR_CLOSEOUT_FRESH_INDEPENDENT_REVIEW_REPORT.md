# KTT — Final Selector Closeout Fresh Independent Review

Reviewer: Codex. Executor under review: Antigravity.  
Review date: 2026-09-19 Asia/Seoul. Production observation: 2026-09-18T23:56:24.319830+00:00.  
Reviewed revision: **854eecf3aa3b696a88dffce058a2f4dea11a63d7**.

## Verdict

```text
FINAL_FRESH_INDEPENDENT_REVIEW = FAIL
EXACT_BLOCKER = GEMINI_3_1_PRO_PREVIEW_CUSTOMTOOLS_SPECIAL_PURPOSE_ENDPOINT_SURVIVES_SELECTOR
READY_FOR_TEMP_KEY_DECOMMISSION = NO
KTT_BROWSER_SECURITY_MODEL_HISTORY_CLOSEOUT = FAIL
PRODUCTION_MUTATIONS = 0
AUTOMATIC_REMEDIATION = NONE
STOP = YES
```

The six named former blockers are excluded. However, the actual deployed selector still includes **gemini-3.1-pro-preview-customtools**. The live Google model metadata describes this distinct endpoint as “Gemini 3.1 Pro Preview optimized for custom tool usage.” It is therefore a special-purpose tool endpoint, not the ordinary general report-generation endpoint. The work order requires zero remaining special-purpose families; that gate fails.

## Exact revision and deployment

```text
LOCAL_HEAD = 854eecf3aa3b696a88dffce058a2f4dea11a63d7
GITHUB_MAIN = 854eecf3aa3b696a88dffce058a2f4dea11a63d7
LOCAL_WORKTREE = CLEAN
DEPLOYED_APP_JS_MATCHES_COMMIT = YES
DEPLOYED_INDEX_HTML_MATCHES_COMMIT = YES
DEPLOYED_DATA_JS_MATCHES_COMMIT = YES
UNEXPECTED_REVIEWED_FILE_DELTA = NO
```

Identities:

```text
app.js = 774bc6176241350434eb85729a19d4502a8cf6a246ea49853aa3829ab730cb0e
index.html = 79bc5d0230b8e1c4acfa5a12c9678eae862815813c163121dc9ca27c51300986
workflow = 6d1cbdc2b1fbf0d394652d442e48b1bc39d87848e5882e75d4108a862b2a5579
data.js = 32f942caad1f22ee34b57f93e44a01d224aa81a39dbad647806a610777bf945f
```

Local copies match after line-ending normalization; main and deployed assets match bytes.

## Temporary key and full live model discovery

Only the authorized Windows User variable **KTT_DEEPTECH_TEMP_BROWSER_TEST_KEY** was used. Its value was never printed, logged, stored in a file, inserted into a URL, or put into browser storage. No other key was searched for. The variable remains unchanged.

```text
MODEL_LIST_PAGE_1 = HTTP 200 / 50 models / nextPageToken present
MODEL_LIST_PAGE_2 = HTTP 200 / 8 models / nextPageToken absent
MODEL_LIST_TOTAL = 58
MODEL_LIST_PAGINATION_COMPLETE = YES
MODEL_LIST_RETRIES = 0
```

The exact deployed isEligibleGeneralTextModel() and selector construction were executed in an isolated memory DOM with all 58 live account records, including actual name, displayName, description and supportedGenerationMethods metadata.

Resulting options:

- gemini-2.5-flash — "Gemini 2.5 Flash (gemini-2.5-flash) (고속 모드)"
- gemma-4-26b-a4b-it — "Gemma 4 26B A4B IT (gemma-4-26b-a4b-it)"
- gemma-4-31b-it — "Gemma 4 31B IT (gemma-4-31b-it)"
- gemini-flash-latest — "Gemini Flash Latest (gemini-flash-latest)"
- gemini-flash-lite-latest — "Gemini Flash-Lite Latest (gemini-flash-lite-latest)"
- gemini-pro-latest — "Gemini Pro Latest (gemini-pro-latest)"
- gemini-2.5-flash-lite — "Gemini 2.5 Flash-Lite (gemini-2.5-flash-lite)"
- gemini-3-flash-preview — "[PREVIEW] Gemini 3 Flash Preview (gemini-3-flash-preview)"
- gemini-3.1-pro-preview — "[PREVIEW] Gemini 3.1 Pro Preview (gemini-3.1-pro-preview) (검증됨 - 기본 추천)"
- gemini-3.1-pro-preview-customtools — "[PREVIEW] Gemini 3.1 Pro Preview Custom Tools (gemini-3.1-pro-preview-customtools)"
- gemini-3.1-flash-lite — "Gemini 3.1 Flash Lite (gemini-3.1-flash-lite)"
- gemini-3.5-flash — "Gemini 3.5 Flash (gemini-3.5-flash)"
- gemini-3.5-flash-lite — "Gemini 3.5 Flash Lite (gemini-3.5-flash-lite)"
- gemini-3.6-flash — "Gemini 3.6 Flash (gemini-3.6-flash)"
- gemini-3.7-flash — "Gemini 3.7 Flash (gemini-3.7-flash)"
- gemini-3.8-flash — "Gemini 3.8 Flash (gemini-3.8-flash)"

The filter correctly removes image, banana, omni, Lyria, music, audio, TTS, transcription, robotics, computer-use, Antigravity agents, deep-research, embedding, Veo and AQA IDs/descriptions exposed by this account. The **customtools** endpoint remains because SPECIAL_PURPOSE_FAMILIES does not contain customtools/tools and its metadata contains no currently blocked family token.

```text
GENERAL_TEXT_MODEL_FILTER = FAIL
SPECIAL_PURPOSE_MODELS_IN_SELECTOR = 1
SURVIVING_SPECIAL_PURPOSE_MODEL = gemini-3.1-pro-preview-customtools
OFFICIALLY_SHUTDOWN_MODELS_IN_SELECTOR = 0
```

The shutdown comparison uses the current official Google lifecycle schedule, independently of account listing. 2.5 Pro is explicitly excluded for this account and no fallback inserts it.

Six required exclusions:

```text
nano-banana-pro-preview = EXCLUDED
gemini-omni-flash-preview = EXCLUDED
gemini-omni-1.1-flash = EXCLUDED
lyria-3-clip-preview = EXCLUDED
lyria-3-pro-preview = EXCLUDED
lyria-3.5 = EXCLUDED
UNVERIFIED_2_5_PRO_FALLBACK = ABSENT
```

## Default selection and live tiny smoke

Exact selector replay selected **gemini-3.1-pro-preview**. The live full list includes it and advertises generateContent. Exactly one live bounded request used the deployed probe payload: “Reply with OK.”, maxOutputTokens=5, temperature=0.

```text
SELECTED_DEFAULT_MODEL = gemini-3.1-pro-preview
DEFAULT_MODEL_ACTUALLY_LISTED = YES
DEFAULT_MODEL_GENERATECONTENT_CAPABLE = YES
DEFAULT_MODEL_ACTUAL_GENERATION_ACCESS = YES
DEFAULT_MODEL_SMOKE = PASS [deployed response.ok criterion; HTTP 200]
LIVE_SMOKE_REQUESTS = 1
LIVE_SMOKE_RETRIES = 0
SMOKE_FINISH_REASON = MAX_TOKENS
SMOKE_TEXT_PRESENT = NO
```

The HTTP 200 proves this key can access the generation endpoint. The five-token bound was consumed by thought tokens and returned no visible text, so this does not prove dossier/schema output quality. No second provider request was made.

Selected label:

```text
[PREVIEW] Gemini 3.1 Pro Preview (gemini-3.1-pro-preview) (검증됨 - 기본 추천)
LITERAL_PREVIEW_TAG_PRESENT = YES
```

## API-key handling and failure behavior

Fresh source and memory-function verification:

```text
QUERY_STRING_API_KEY_USAGE = 0
X_GOOG_API_KEY_HEADER_USAGE = YES [list, probe and generation paths]
HARDCODED_GEMINI_KEY_COUNT = 0 [inspected current app.js]
LOCALSTORAGE_GEMINI_KEY_GET_SET = 0
SESSION_ONLY_KEY_HANDLING = PASS
SERVER_KEY_AUTO_DISCOVERY = ABSENT
KEY_CLEAR_CONTROL = PASS
```

A nonsecret sentinel was saved to sessionStorage and cleared; localStorage key writes=0. The browser key remains visible to its own user through browser/devtools/network inspection; no contrary secrecy claim is made.

Isolated exact-source failure replay:
- First candidate simulated 404, second candidate success: selected gemini-pro-latest.
- Discovery failure: zero-value error option only.
- All smoke probes fail: zero-value unavailable option only.
- No usable unverified model is inserted.

```text
ACCOUNT_404_FAILOVER = PASS
DISCOVERY_FAILURE_FAILS_CLOSED = YES
UNVERIFIED_MODEL_INSERTION_ON_FAILURE = NO
UNVERIFIED_2_5_PRO_FALLBACK = ABSENT
```

The dossier-generation 404 branch clears the stored model and requires rediscovery; it does not silently retry dossier generation.

## Workflow regression

The workflow is unchanged from the previously verified semantic guard. The exact committed guard was freshly executed against the real export and semantic fixtures:

```text
VALID_EXPORT = PASS [4,052 items, exit 0]
LOW_COUNT = BLOCKED [999 items, exit 1]
NULL_ID = BLOCKED
EMPTY_ID = BLOCKED
BOOLEAN_ID = BLOCKED
INVALID_LIST_ID = BLOCKED
INVALID_DICT_ID = BLOCKED
INVALID_FLOAT_ID = BLOCKED
LOW_COUNT_PUSH_GUARD_FAILS_CLOSED = YES
SCHEDULED_EMPTY_DB_EXPORT_REENABLED = NO
```

Push remains a later success-only step. No Git command that changes state was executed.

## Latest sort and history

The exact deployed date parser processed all 4,052 real entries with zero failures and selected article 21353 first. The live deployed browser rendered 4,052 cards and count 4,052. After activating latest sort, the first title/date/source URL matched article 21353.

```text
LATEST_SORT_CHRONOLOGY = PASS
DATE_PARSE_FAILURE_COUNT = 0
LATEST_ITEM_ID = 21353
LATEST_ITEM_DATE = 2026-09-09T23:10:11Z
FIRST_RENDERED_LATEST_ITEM_ID = 21353 [unique title/source URL match]
FIRST_RENDERED_BROWSER_DATE = 2026-09-10 08:10 [Asia/Seoul]
PRODUCTION_DATA_JS_COUNT = 4052
DEPLOYED_DATA_JS_COUNT = 4052
UNIQUE_ID_COUNT = 4052
BROWSER_ACCUMULATED_COUNT = 4052
BROWSER_RENDERED_CARD_COUNT = 4052
DASHBOARD_ACCUMULATED_HISTORY_VISIBLE = PASS
NO_HISTORY_REIMPORT = YES
DUPLICATE_HISTORY_CREATED = NO
```

Production articles=21,511 and insights=4,022. integrity_check=ok, foreign_key_check empty, duplicate source_url groups=0. Full article and insight row hashes equal the prior independent baselines. Historical id 19957 and latest id 21353 remain present.

## Protected Production state

```text
CURRENT_PRODUCTION_ANALYZER_MODEL = gemini-2.5-flash
KTT_PRODUCTION_ANALYZER_MODEL_CHANGED_BY_ANTI = NO
ETNEWS_GOVERNANCE_CHANGED = NO
LINEAGE_CHANGED = NO
PRODUCTION_MUTATIONS = 0
```

Fresh identities:

```json
{
  "analyzer_sha256": "92d3fd5d860599f28d30c909a253c7886a1f196855877990fd9203abc27104ba",
  "protected_files": {
    "ktt_publisher_identity_candidate/publisher_identity.py": "b64edafdb3b8b259ebfaeb8d3f06ffcc95142d19d6c0fdbb9ea621c3266a44a6",
    "ktt_publisher_identity_candidate/migration.py": "bece4c9fb7fb4994eb84281651c04f660e54296c8159ec5d89ddc4a1373bc6c0",
    "ktt_publisher_identity_candidate/lineage_successor_contract.json": "07522b93ec37dd0ea5fa5aede1a5f966ab45ceb62fc829a9c706a4ec9cfc5de2"
  },
  "schema_sha256": "20ba80ee82491fc0ea375746c74807395fdbeb5be42e672288105152ad96f06f",
  "direct_source_authorities_rows_sha256": "d090ca38e8104bd53f9efe6103434033997d7cb0c09dcfa3ebfe0cd834719b10",
  "publisher_identity_schema_migrations_rows_sha256": "4f71eac9ffb61d17a29ca7c79ec0536ab63fb271fb0d49bca3f4fe35031f41ce",
  "row_content_sha256": {
    "articles": "87ac46114e725fc0356528f6aed2e472885150bf0b4335702c572daad76384a2",
    "insights": "46f4e7b2c7b5371bddde5fd1cceec9e3fae6375ee799e70308ae8d28ad128d6a"
  }
}
```

All match previous independently read baselines. Production SQLite was opened mode=ro/query_only and closed. No crawler, analyzer invocation, email, pipeline, migration/apply, signing, Git mutation, key rotation, KIS, Spanish or AACT operation occurred. This mandated report is the sole created artifact.

## STOP

Closeout approval and temporary-key decommission readiness are withheld on the single precise special-purpose selector blocker. No remediation was attempted.

```text
FINAL_FRESH_INDEPENDENT_REVIEW = FAIL
EXACT_BLOCKER = GEMINI_3_1_PRO_PREVIEW_CUSTOMTOOLS_SPECIAL_PURPOSE_ENDPOINT_SURVIVES_SELECTOR
READY_FOR_TEMP_KEY_DECOMMISSION = NO
KTT_BROWSER_SECURITY_MODEL_HISTORY_CLOSEOUT = FAIL
PRODUCTION_MUTATIONS = 0
STOP = YES
```

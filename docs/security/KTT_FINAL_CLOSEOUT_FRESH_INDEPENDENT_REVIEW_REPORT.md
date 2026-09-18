# KTT — Final Closeout Fresh Independent Review

Reviewer: Codex. Executor under review: Antigravity.  
Date: 2026-09-19 Asia/Seoul. Production observation: 2026-09-18T23:30:54.774218+00:00.  
Project: C:/Users/백남철/.antigravity/KEY TECH TREND.  
Reviewed revision: **c9b5684a198e01a262e8ec61133df83f317bc79b**.

## Verdict

```text
FINAL_FRESH_INDEPENDENT_REVIEW = FAIL
EXACT_BLOCKER = GENERAL_TEXT_ELIGIBILITY_FILTER_ADMITS_SPECIAL_PURPOSE_IMAGE_VIDEO_MUSIC_MODELS
READY_FOR_TEMP_KEY_DECOMMISSION = NO
APPROVAL = NOT_GRANTED
PRODUCTION_MUTATIONS = 0
AUTOMATIC_REMEDIATION = NONE
STOP = YES
```

The exact deployed eligibility/selector implementation, replayed with the complete live account list, admits **six special-purpose models**. Therefore the required general-text-only selector and special-purpose count zero are not satisfied. Successful default-model endpoint access does not make the complete selector eligible.

## Exact revision and security

Local HEAD and GitHub main both equal c9b5684a198e01a262e8ec61133df83f317bc79b. Local Git status was clean. app.js, index.html, workflow and data.js match committed/main source (local line endings normalized). Deployed app.js/index.html/data.js match commit bytes exactly.

```text
app.js:
84caa1ef41112ead02a29b8bb1b1b9b723f24fd7ab7f262c8840c7f8ca0b20ef
index.html:
79bc5d0230b8e1c4acfa5a12c9678eae862815813c163121dc9ca27c51300986
.github/workflows/update_tech.yml:
6d1cbdc2b1fbf0d394652d442e48b1bc39d87848e5882e75d4108a862b2a5579
data.js:
32f942caad1f22ee34b57f93e44a01d224aa81a39dbad647806a610777bf945f
```

Inspected source shows three API request paths using x-goog-api-key headers: model list, tiny probe and report generation. Key query patterns=0. No hardcoded Gemini-key-shape match was found in the four inspected committed files. No key-specific localStorage get/set calls or server-key auto-discovery path were found. Unrelated custom-report localStorage is distinct from key storage.

Exact save/get/clear functions passed a memory-only test with a nonsecret sentinel. Session key/model entries were saved then removed; key input was blanked; legacy localStorage key was removed; localStorage key writes=0. No real test key was put into browser storage. Browser restart/session-restore erasure was not independently exercised.

```text
SECURITY_REVIEW = PASS [inspected current first-party key paths]
QUERY_STRING_API_KEY_USAGE = 0
X_GOOG_API_KEY_HEADER_USAGE = YES
HARDCODED_GEMINI_KEY_COUNT = 0 [inspected current source]
LOCALSTORAGE_GEMINI_KEY_GET_SET = 0
SESSION_ONLY_KEY_HANDLING = PASS
SERVER_KEY_AUTO_DISCOVERY = ABSENT
```

The header does not hide a browser key from its own user's browser/devtools. This review verifies URL/storage handling, not such invisibility.

## Live account discovery and actual selected-default smoke

Only the specifically authorized Windows User environment variable KTT_DEEPTECH_TEMP_BROWSER_TEST_KEY was used. Presence was confirmed without displaying the value. No other key was searched for. Its value was read in process memory and transmitted only to Google's official generativelanguage.googleapis.com endpoint in a header. No key value was persisted, logged or emitted. The environment variable was left unchanged.

Live models list pagination:
- Page 1: HTTP 200, 50 entries, nextPageToken present.
- Page 2: HTTP 200, 8 entries, nextPageToken absent.
- Total: 58 entries; full pagination complete; zero retries.

The deployed pagination code was also replayed against both actual response pages in a memory DOM. The deployed selector's first candidate is gemini-3.1-pro-preview. One live request to that candidate used the exact deployed probe payload: “Reply with OK.”, maxOutputTokens=5, temperature=0.0.

```text
MODEL_LIST_PAGINATION_COMPLETE = YES
SELECTED_DEFAULT_MODEL = gemini-3.1-pro-preview
DEFAULT_MODEL_ACTUALLY_LISTED = YES
DEFAULT_MODEL_GENERATECONTENT_CAPABLE = YES [advertised method]
DEFAULT_MODEL_ACTUAL_GENERATION_ACCESS = YES [live HTTP 200]
DEFAULT_MODEL_SMOKE = PASS [deployed probe criterion: response.ok]
LIVE_DEFAULT_SMOKE_REQUESTS = 1
LIVE_DEFAULT_SMOKE_RETRIES = 0
SMOKE_TEXT_PRESENT = NO
SMOKE_FINISH_REASON = MAX_TOKENS
```

HTTP 200 establishes acceptance of this account's generateContent request. The five-token probe exhausted its token bound and returned no text; this is not evidence of successful long-form dossier/schema generation or output quality. No second request was made.

The exact-source replay uses real account model metadata and the HTTP outcome independently established by that one live smoke. Other failover tests use synthetic HTTP outcomes, not additional provider calls. No live browser model-network/CORS verification is claimed; replay is explicitly allowed by this work order.

## Eligibility failure and preview labeling

isEligibleGeneralTextModel() checks generateContent and rejects descriptive substrings such as image, music, video and audio. Some special-purpose families use IDs/display names without those words and survive.

Six included special-purpose IDs:
- nano-banana-pro-preview — image model. Google's [official API model enumeration](https://ai.google.dev/api/triggers) identifies it as Gemini 3 Pro Image Preview.
- gemini-omni-flash-preview and gemini-omni-1.1-flash — video models, according to the [official model catalog](https://ai.google.dev/gemini-api/docs/models).
- lyria-3-clip-preview, lyria-3-pro-preview and lyria-3.5 — music-generation models. The catalog identifies this family; Google's [music-generation guide](https://ai.google.dev/gemini-api/docs/music-generation) confirms its audio purpose.

All six are actually exposed by the supplied key and advertise generateContent, but that method flag does not establish suitability for technical text reports.

```text
GENERAL_TEXT_MODEL_FILTER = FAIL
SPECIAL_PURPOSE_MODELS_IN_SELECTOR = 6
OFFICIALLY_SHUTDOWN_MODELS_IN_SELECTOR = 0 [direct exact-ID lifecycle comparison]
UNVERIFIED_2_5_PRO_FALLBACK = ABSENT
```

The three direct shutdown IDs found in the previous review are now excluded, and 2.5 Pro is explicitly excluded for this account. Shutdown comparison used the [official lifecycle schedule](https://ai.google.dev/gemini-api/docs/deprecations), separately from live account listing. nano-banana-pro-preview is a preview image alias; its current shutdown status was not independently inferred solely from another endpoint's date. Its special-purpose inclusion alone is a proven failure.

Exact selected label:

```text
Gemini 3.1 Pro Preview (gemini-3.1-pro-preview) (검증됨 - 기본 추천)
PREVIEW_WORD_VISIBLE = YES
LITERAL_[PREVIEW]_TAG_PRESENT = NO
```

The source adds [PREVIEW] only when the existing label does not already contain “PREVIEW”. Thus the preview nature is indicated in words, but the user's requested literal bracketed tag is absent. This additional discrepancy is recorded without changing the single principal blocker.

All replayed selector options (22) and exact labels:

- gemini-2.5-flash — "Gemini 2.5 Flash (gemini-2.5-flash) (고속 모드)"
- gemma-4-26b-a4b-it — "Gemma 4 26B A4B IT (gemma-4-26b-a4b-it)"
- gemma-4-31b-it — "Gemma 4 31B IT (gemma-4-31b-it)"
- gemini-flash-latest — "Gemini Flash Latest (gemini-flash-latest)"
- gemini-flash-lite-latest — "Gemini Flash-Lite Latest (gemini-flash-lite-latest)"
- gemini-pro-latest — "Gemini Pro Latest (gemini-pro-latest)"
- gemini-2.5-flash-lite — "Gemini 2.5 Flash-Lite (gemini-2.5-flash-lite)"
- gemini-3-flash-preview — "Gemini 3 Flash Preview (gemini-3-flash-preview)"
- gemini-3.1-pro-preview — "Gemini 3.1 Pro Preview (gemini-3.1-pro-preview) (검증됨 - 기본 추천)"
- gemini-3.1-pro-preview-customtools — "Gemini 3.1 Pro Preview Custom Tools (gemini-3.1-pro-preview-customtools)"
- gemini-3.1-flash-lite — "Gemini 3.1 Flash Lite (gemini-3.1-flash-lite)"
- nano-banana-pro-preview — "Nano Banana Pro (nano-banana-pro-preview)"
- gemini-3.5-flash — "Gemini 3.5 Flash (gemini-3.5-flash)"
- gemini-3.5-flash-lite — "Gemini 3.5 Flash Lite (gemini-3.5-flash-lite)"
- gemini-omni-flash-preview — "Gemini Omni Flash Preview (gemini-omni-flash-preview)"
- gemini-omni-1.1-flash — "Gemini Omni 1.1 Flash (gemini-omni-1.1-flash)"
- gemini-3.6-flash — "Gemini 3.6 Flash (gemini-3.6-flash)"
- gemini-3.7-flash — "Gemini 3.7 Flash (gemini-3.7-flash)"
- gemini-3.8-flash — "Gemini 3.8 Flash (gemini-3.8-flash)"
- lyria-3-clip-preview — "Lyria 3 Clip Preview (lyria-3-clip-preview)"
- lyria-3-pro-preview — "Lyria 3 Pro Preview (lyria-3-pro-preview)"
- lyria-3.5 — "Lyria 3.5 (lyria-3.5)"

## 404 failover and fail-closed discovery

Isolated exact-source tests:
- First candidate smoke returns simulated 404; next candidate gemini-pro-latest returns simulated 200. Default changes to gemini-pro-latest.
- Discovery/network failure renders only an empty-value error placeholder, with no hardcoded usable option.
- Every candidate probe failing renders only an empty-value unavailable placeholder.
- No 2.5 Pro fallback is inserted.

```text
ACCOUNT_404_FAILOVER = PASS [isolated candidate probe path]
DISCOVERY_FAILURE_FAILS_CLOSED = YES [no usable option]
UNVERIFIED_MODEL_INSERTION_ON_FAILURE = NO
UNVERIFIED_2_5_PRO_FALLBACK = ABSENT
```

Separately, actual dossier generation's 404 branch clears the saved model and tells the user to rediscover; it does not silently send a second dossier request. These tests made no live provider calls.

## Exact workflow semantic guard

The exact committed Python guard was extracted and executed in memory. The valid case used the real deployed 4,052-item export. Failure fixtures each produced exit 1:

```text
VALID_EXPORT = PASS [exit 0]
MISSING_MARKER = BLOCKED [exit 1]
MALFORMED_JSON = BLOCKED [exit 1]
LOW_COUNT = BLOCKED [exit 1]
DUPLICATE_IDS = BLOCKED [exit 1]
NULL_ID = BLOCKED [exit 1]
EMPTY_ID = BLOCKED [exit 1]
WHITESPACE_ID = BLOCKED [exit 1]
BOOLEAN_ID = BLOCKED [exit 1]
BOOLEAN_FALSE_ID = BLOCKED [exit 1]
LIST_ID = BLOCKED [exit 1]
DICT_ID = BLOCKED [exit 1]
FLOAT_ID = BLOCKED [exit 1]
MISSING_IDS = BLOCKED [exit 1]
INVALID_ID_TYPE = BLOCKED [list/dict/float all exit 1]
LOW_COUNT_PUSH_GUARD_FAILS_CLOSED = YES
PUSH_REACHABLE_AFTER_FAILED_GUARD = NO
SCHEDULED_EMPTY_DB_EXPORT_REENABLED = NO
```

Push is a subsequent default-success-only workflow step; no continue-on-error/always condition permits it after a failed guard. Schedule remains commented and workflow_dispatch-only. No Git mutation commands were run. This is a guarantee for the inspected workflow cases, not every other Production/local export path.

## Latest sort and history

Exact deployed parser/comparator execution over all real 4,052 entries had zero date parse failures and selected article 21353 first. Actual browser latest-sort was active; first title and source URL uniquely matched that article.

```text
LATEST_SORT_CHRONOLOGY = PASS
DATE_PARSE_FAILURE_COUNT = 0
LATEST_ITEM_ID = 21353
LATEST_ITEM_DATE = 2026-09-09T23:10:11Z
FIRST_RENDERED_ID_IN_LATEST_SORT = 21353 [title/source URL match]
FIRST_RENDERED_BROWSER_DATE = 2026-09-10 08:10 [Asia/Seoul]
PRODUCTION_DATA_JS_COUNT = 4052
DEPLOYED_DATA_JS_COUNT = 4052
UNIQUE_ID_COUNT = 4052
BROWSER_ACCUMULATED_COUNT = 4052
BROWSER_RENDERED_CARD_COUNT = 4052
DASHBOARD_ACCUMULATED_HISTORY_VISIBLE = PASS
NO_HISTORY_REIMPORT = YES [unchanged complete article/insight row hashes]
DUPLICATE_HISTORY_CREATED = NO [unchanged row hashes, duplicate source_url groups 0]
```

Latest title: 삼성전자, 독자 NPU로 ‘반도체 비전 2030’ 달성 가속화 - Samsung Global Newsroom. Historical id 19957 (2014-09-17) remains present. The display contains 4,022 analyzed plus 30 unanalysed export rows.

Production articles=21,511; insights=4,022. integrity_check=ok; foreign_key_check empty. Full row-content hashes exactly match the prior independently read baseline, supporting no re-import/rewriting during this remediation interval.

## Protected state

```text
CURRENT_PRODUCTION_ANALYZER_MODEL = gemini-2.5-flash
KTT_PRODUCTION_ANALYZER_MODEL_CHANGED_BY_ANTI = NO
ETNEWS_GOVERNANCE_CHANGED = NO
LINEAGE_CHANGED = NO
PRODUCTION_MUTATIONS = 0
```

Fresh file/schema/authority identities equal prior baseline:

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

Production DB connections used mode=ro and query_only and were closed. No initializer/UDF installation, crawler, analyzer invocation, email, full pipeline, credentials, governance, lineage, migration authority, signing, KIS/Spanish/AACT, commit/push, history rewrite or force push operation occurred. Memory fixtures produced no source changes. This mandated report is the only file created.

## STOP

Closeout approval and temp-key decommission readiness are withheld because special-purpose selector entries remain. No key decommission, automatic remediation, extra model smoke or retry was performed.

```text
FINAL_FRESH_INDEPENDENT_REVIEW = FAIL
EXACT_BLOCKER = GENERAL_TEXT_ELIGIBILITY_FILTER_ADMITS_SPECIAL_PURPOSE_IMAGE_VIDEO_MUSIC_MODELS
READY_FOR_TEMP_KEY_DECOMMISSION = NO
STOP = YES
```

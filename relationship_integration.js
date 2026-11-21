/**
 * KTT Relationship MVP v1.1 - Minimal Integration Controller
 * - 기존 app.js를 단 1줄도 수정하지 않고(0줄 수정),
 *   메인 Dashboard의 3개 탭(실시간 트렌드 모니터 / 기술·기업 연결 / 심층 기술 백서) 전환 및
 *   Failure Isolation(오류 격리)을 담당하는 독립 스크립트입니다.
 */

(function () {
  "use strict";

  let iframeLoaded = false;

  function hideRelationshipSection() {
    const btnRel = document.getElementById("btn-view-relationship");
    const secRel = document.getElementById("view-relationship-section");
    if (btnRel) btnRel.classList.remove("active");
    if (secRel) secRel.style.display = "none";
  }

  function showRelationshipError() {
    const iframe = document.getElementById("relationship-v11-iframe");
    const errBox = document.getElementById("relationship-fallback-error");
    if (iframe) iframe.style.display = "none";
    if (errBox) {
      errBox.textContent = "Relationship 데이터를 불러올 수 없습니다.";
      errBox.style.display = "block";
    }
  }

  function loadRelationshipIframeIfNeeded() {
    const iframe = document.getElementById("relationship-v11-iframe");
    const errBox = document.getElementById("relationship-fallback-error");
    if (!iframe) {
      showRelationshipError();
      return;
    }

    if (iframeLoaded) return;

    const targetSrc = iframe.getAttribute("data-src") || "relationship_mvp_v1_1/relationship_view_v11.html";

    iframe.onload = function () {
      try {
        const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc || !doc.body || doc.title.indexOf("404") !== -1 || doc.title.indexOf("Error") !== -1) {
          showRelationshipError();
          return;
        }
        const titleEl = doc.getElementById("selectedTechTitle");
        if (titleEl && titleEl.textContent === "Relationship 데이터를 불러올 수 없습니다.") {
          showRelationshipError();
          return;
        }
        if (errBox) errBox.style.display = "none";
        iframe.style.display = "block";
        iframeLoaded = true;
      } catch (e) {
        // Cross-origin 또는 접근 예외 시에도 기본 iframe 표시 유지
        iframeLoaded = true;
      }
    };

    iframe.onerror = function () {
      showRelationshipError();
    };

    try {
      iframe.src = targetSrc;
    } catch (e) {
      showRelationshipError();
    }
  }

  function activateRelationshipView() {
    try {
      const btnFeed = document.getElementById("btn-view-feed");
      const btnRel = document.getElementById("btn-view-relationship");
      const btnDeep = document.getElementById("btn-view-deeptech");

      const secFeed = document.getElementById("view-feed-section");
      const secRel = document.getElementById("view-relationship-section");
      const secDeep = document.getElementById("view-deeptech-section");

      if (btnFeed) btnFeed.classList.remove("active");
      if (btnDeep) btnDeep.classList.remove("active");
      if (btnRel) btnRel.classList.add("active");

      if (secFeed) secFeed.style.display = "none";
      if (secDeep) secDeep.style.display = "none";
      if (secRel) secRel.style.display = "block";

      if (typeof state === "object" && state !== null) {
        state.currentView = "relationship";
      }

      loadRelationshipIframeIfNeeded();

      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.error("[Relationship Integration] 탭 전환 오류:", err);
      showRelationshipError();
    }
  }

  function initRelationshipIntegration() {
    const originalSwitchMainView = window.switchMainView;

    window.switchMainView = function (viewName) {
      if (viewName === "relationship") {
        activateRelationshipView();
        return;
      }
      hideRelationshipSection();
      if (typeof originalSwitchMainView === "function") {
        originalSwitchMainView(viewName);
      }
    };

    // 기존 app.js 내부 클로저 이벤트 리스너와 함께 동작하도록 버튼 리스너 보강
    const btnFeed = document.getElementById("btn-view-feed");
    const btnDeep = document.getElementById("btn-view-deeptech");
    const btnRel = document.getElementById("btn-view-relationship");

    if (btnFeed) {
      btnFeed.addEventListener("click", function () {
        hideRelationshipSection();
      });
    }
    if (btnDeep) {
      btnDeep.addEventListener("click", function () {
        hideRelationshipSection();
      });
    }
    if (btnRel) {
      btnRel.addEventListener("click", function () {
        activateRelationshipView();
      });
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRelationshipIntegration);
  } else {
    initRelationshipIntegration();
  }
})();

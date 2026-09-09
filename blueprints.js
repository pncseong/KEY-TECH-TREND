// ============================================================================
// KEY TECH TREND - 정밀 엔지니어링 블루프린트 모듈 (Engineering Blueprints)
// 반도체 패키징, 관통전극(TSV), 직접접합(Hybrid Bonding), V-NAND 수직적층 정밀 도면
// ============================================================================

window.EngineeringBlueprints = {
    getSvg: function(nodeId) {
        switch(nodeId) {
            case 'hbm4_foundry':
                return getHbm4Svg();
            case 'hbm3e':
                return getHbm3eSvg();
            case 'hybrid_hbm_samsung':
                return getHybridHbmSvg();
            case 'hbf_flash':
                return getHbfSvg();
            default:
                return null;
        }
    }
};

// 1. HBM4 16-Hi TSMC 파운드리 베이스다이 & 2.5D CoWoS-L 정밀 단면도
function getHbm4Svg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-hbm4" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
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

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-hbm4)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">HBM4 16-Hi 3D DRAM STACK ON 2.5D CoWoS-L SCHEMATIC</text>
        <text x="520" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[JEDEC 720µm Limit / 2048-bit Bus]</text>

        <!-- 좌측: 조감도 -->
        <g transform="translate(20, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 2.5D CoWoS-L 온패키지 통합 조감도</text>
            <rect x="0" y="240" width="280" height="28" fill="url(#grad-substrate)" stroke="#475569" stroke-width="1" rx="2"/>
            <text x="140" y="258" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">FC-BGA Package Substrate (PCB)</text>

            <g fill="#94a3b8">
                <circle cx="20" cy="278" r="6"/> <circle cx="50" cy="278" r="6"/>
                <circle cx="80" cy="278" r="6"/> <circle cx="110" cy="278" r="6"/>
                <circle cx="140" cy="278" r="6"/> <circle cx="170" cy="278" r="6"/>
                <circle cx="200" cy="278" r="6"/> <circle cx="230" cy="278" r="6"/>
                <circle cx="260" cy="278" r="6"/>
            </g>

            <g fill="#cbd5e1">
                <rect x="15" y="233" width="6" height="7" rx="1"/> <rect x="35" y="233" width="6" height="7" rx="1"/>
                <rect x="55" y="233" width="6" height="7" rx="1"/> <rect x="75" y="233" width="6" height="7" rx="1"/>
                <rect x="95" y="233" width="6" height="7" rx="1"/> <rect x="115" y="233" width="6" height="7" rx="1"/>
                <rect x="135" y="233" width="6" height="7" rx="1"/> <rect x="155" y="233" width="6" height="7" rx="1"/>
                <rect x="175" y="233" width="6" height="7" rx="1"/> <rect x="195" y="233" width="6" height="7" rx="1"/>
                <rect x="215" y="233" width="6" height="7" rx="1"/> <rect x="235" y="233" width="6" height="7" rx="1"/>
                <rect x="255" y="233" width="6" height="7" rx="1"/>
            </g>

            <rect x="10" y="212" width="260" height="20" fill="url(#grad-interposer)" stroke="#64748b" stroke-width="1" rx="2"/>
            <text x="140" y="226" fill="#f8fafc" font-size="10" font-weight="700" text-anchor="middle">2.5D Silicon Interposer / High-Density RDL</text>

            <g fill="#f59e0b">
                <rect x="20" y="206" width="4" height="6" rx="1"/> <rect x="32" y="206" width="4" height="6" rx="1"/>
                <rect x="44" y="206" width="4" height="6" rx="1"/> <rect x="56" y="206" width="4" height="6" rx="1"/>
                <rect x="68" y="206" width="4" height="6" rx="1"/> <rect x="80" y="206" width="4" height="6" rx="1"/>
                <rect x="92" y="206" width="4" height="6" rx="1"/>
                <rect x="160" y="206" width="4" height="6" rx="1"/> <rect x="172" y="206" width="4" height="6" rx="1"/>
                <rect x="184" y="206" width="4" height="6" rx="1"/> <rect x="196" y="206" width="4" height="6" rx="1"/>
                <rect x="208" y="206" width="4" height="6" rx="1"/> <rect x="220" y="206" width="4" height="6" rx="1"/>
                <rect x="232" y="206" width="4" height="6" rx="1"/> <rect x="244" y="206" width="4" height="6" rx="1"/>
                <rect x="256" y="206" width="4" height="6" rx="1"/>
            </g>

            <rect x="15" y="105" width="90" height="100" fill="url(#grad-gpu)" stroke="#34d399" stroke-width="1.5" rx="3"/>
            <text x="60" y="145" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">AI Host</text>
            <text x="60" y="162" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">GPU</text>
            <text x="60" y="180" fill="#a7f3d0" font-size="9" text-anchor="middle">(NVIDIA Rubin)</text>

            <rect x="150" y="45" width="115" height="160" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" rx="3"/>
            <rect x="155" y="50" width="105" height="125" fill="#1e293b" stroke="#0ea5e9" stroke-width="1" rx="2"/>
            <text x="207" y="105" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">HBM4 Stack</text>
            <text x="207" y="122" fill="#93c5fd" font-size="10" text-anchor="middle">(16-Hi DRAM)</text>
            <text x="207" y="140" fill="#fbbf24" font-size="9" text-anchor="middle">48GB / 2.0+ TB/s</text>

            <rect x="155" y="178" width="105" height="27" fill="url(#grad-base-die)" stroke="#38bdf8" stroke-width="1.2" rx="2"/>
            <text x="207" y="195" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">TSMC 3nm Base Die</text>

            <path d="M 95 218 L 160 218" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-dasharray="4,2"/>
            <polygon points="160,214 168,218 160,222" fill="#f59e0b"/>
            <polygon points="95,214 87,218 95,222" fill="#f59e0b"/>
            <text x="127" y="210" fill="#fbbf24" font-size="9" font-weight="700" text-anchor="middle">2048-bit Wide Bus</text>
            <text x="127" y="235" fill="#fef08a" font-size="8" text-anchor="middle">&lt; 5ns Latency</text>
        </g>

        <line x1="320" y1="55" x2="320" y2="465" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: 16단 단면도 -->
        <g transform="translate(340, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ HBM4 16-Hi DRAM 스택 정밀 단면 구조 (Cross-Section)</text>

            <rect x="30" y="32" width="250" height="14" fill="#334155" stroke="#64748b" stroke-width="1" rx="1"/>
            <text x="155" y="43" fill="#cbd5e1" font-size="9" font-weight="600" text-anchor="middle">Top Dummy / Heat Dissipation Layer</text>

            <!-- 16단 다이 -->
            <g>
                <rect x="30" y="48" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="60" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="72" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="84" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="96" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="108" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="120" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="132" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="144" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="156" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="168" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="180" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="192" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="204" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="216" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
                <rect x="30" y="228" width="250" height="10" fill="url(#grad-hbm-die)" stroke="#38bdf8" stroke-width="0.7"/>
            </g>

            <!-- TSV 기둥 -->
            <g fill="url(#grad-tsv)">
                <rect x="70" y="48" width="5" height="190" rx="1"/>
                <rect x="125" y="48" width="5" height="190" rx="1"/>
                <rect x="180" y="48" width="5" height="190" rx="1"/>
                <rect x="235" y="48" width="5" height="190" rx="1"/>
            </g>

            <!-- 본딩 범프 점 -->
            <g fill="#f59e0b">
                <circle cx="72.5" cy="59" r="1.5"/><circle cx="127.5" cy="59" r="1.5"/><circle cx="182.5" cy="59" r="1.5"/><circle cx="237.5" cy="59" r="1.5"/>
                <circle cx="72.5" cy="119" r="1.5"/><circle cx="127.5" cy="119" r="1.5"/><circle cx="182.5" cy="119" r="1.5"/><circle cx="237.5" cy="119" r="1.5"/>
                <circle cx="72.5" cy="179" r="1.5"/><circle cx="127.5" cy="179" r="1.5"/><circle cx="182.5" cy="179" r="1.5"/><circle cx="237.5" cy="179" r="1.5"/>
                <circle cx="72.5" cy="227" r="1.5"/><circle cx="127.5" cy="227" r="1.5"/><circle cx="182.5" cy="227" r="1.5"/><circle cx="237.5" cy="227" r="1.5"/>
            </g>

            <rect x="25" y="244" width="260" height="38" fill="url(#grad-base-die)" stroke="#38bdf8" stroke-width="2" rx="3"/>
            <text x="155" y="262" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">TSMC 3nm Custom Base Logic Die</text>
            <text x="155" y="275" fill="#e0f2fe" font-size="9" text-anchor="middle">2048-bit Wide-I/O PHY + BIST + Power Logic</text>

            <g fill="#f59e0b">
                <rect x="45" y="283" width="5" height="8" rx="1"/> <rect x="75" y="283" width="5" height="8" rx="1"/>
                <rect x="105" y="283" width="5" height="8" rx="1"/> <rect x="135" y="283" width="5" height="8" rx="1"/>
                <rect x="165" y="283" width="5" height="8" rx="1"/> <rect x="195" y="283" width="5" height="8" rx="1"/>
                <rect x="225" y="283" width="5" height="8" rx="1"/> <rect x="255" y="283" width="5" height="8" rx="1"/>
            </g>

            <rect x="15" y="292" width="280" height="18" fill="url(#grad-interposer)" stroke="#64748b" stroke-width="1" rx="2"/>
            <text x="155" y="305" fill="#f8fafc" font-size="9" font-weight="700" text-anchor="middle">CoWoS-L Silicon Interposer with LSI Bridge</text>

            <!-- 치수선 -->
            <line x1="295" y1="32" x2="295" y2="282" stroke="#ef4444" stroke-width="1.5"/>
            <line x1="290" y1="32" x2="300" y2="32" stroke="#ef4444" stroke-width="1.5"/>
            <line x1="290" y1="282" x2="300" y2="282" stroke="#ef4444" stroke-width="1.5"/>
            <text x="303" y="155" fill="#f87171" font-size="10" font-weight="700" transform="rotate(90, 303, 155)" text-anchor="middle">JEDEC Spec: 720 µm Max</text>

            <line x1="15" y1="88" x2="28" y2="88" stroke="#38bdf8" stroke-width="1"/>
            <text x="12" y="86" fill="#38bdf8" font-size="8" text-anchor="end">DRAM Die ~30µm</text>
            <text x="12" y="96" fill="#94a3b8" font-size="7" text-anchor="end">(Backside CMP)</text>

            <line x1="127" y1="20" x2="127" y2="45" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,2"/>
            <text x="127" y="15" fill="#fbbf24" font-size="8" text-anchor="middle">TSV Array (13~25µm Pitch)</text>
        </g>

        <!-- 하단 범례 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ 엔지니어링 범례 & 공정 핵심 규격 (Key Process Parameters)</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">Cu TSV (수직 관통전극)</text>
                <rect x="150" y="2" width="10" height="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1" rx="2"/>
                <text x="165" y="11" fill="#cbd5e1" font-size="10">1c-nm DRAM (30µm 박막)</text>
                <rect x="310" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="325" y="11" fill="#cbd5e1" font-size="10">TSMC 3nm Logic Base Die</text>
                <rect x="500" y="2" width="10" height="10" fill="#64748b" rx="2"/>
                <text x="515" y="11" fill="#cbd5e1" font-size="10">2.5D CoWoS-L Interposer</text>
            </g>
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

// 2. HBM3E 12-Hi Advanced MR-MUF (SK하이닉스) vs TC-NCF (삼성전자) 비교 단면도
function getHbm3eSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-hbm3e" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-muf" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#059669" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#047857" stop-opacity="0.35"/>
            </linearGradient>
            <linearGradient id="grad-ncf" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.35"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-hbm3e)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">HBM3E 12-Hi PACKAGING: Advanced MR-MUF (SK hynix) vs TC-NCF (Samsung) PROCESS</text>
        <text x="560" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[1.18 TB/s / 1024-bit Wide-IO]</text>

        <!-- 좌측: SK하이닉스 Advanced MR-MUF -->
        <g transform="translate(25, 55)">
            <rect x="0" y="0" width="340" height="330" fill="rgba(6, 78, 59, 0.15)" stroke="#059669" stroke-width="1" rx="6"/>
            <rect x="0" y="0" width="340" height="28" fill="#064e3b" rx="6 6 0 0"/>
            <text x="170" y="19" fill="#6ee7b7" font-size="11" font-weight="700" text-anchor="middle">SK hynix: Advanced MR-MUF 공정 단면</text>

            <rect x="30" y="40" width="280" height="210" fill="url(#grad-muf)" stroke="#10b981" stroke-width="1" stroke-dasharray="3,3" rx="4"/>
            <text x="295" y="145" fill="#34d399" font-size="9" font-weight="600" transform="rotate(90, 295, 145)" text-anchor="middle">Liquid EMC 일괄 주입 경화 (Void Zero)</text>

            <!-- 12단 다이 -->
            <g>
                <rect x="45" y="50" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="65" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="80" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="95" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="110" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="125" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="140" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="155" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="170" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="185" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="200" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <rect x="45" y="215" width="230" height="9" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
            </g>

            <g fill="#f59e0b">
                <rect x="90" y="50" width="4" height="174" rx="1"/>
                <rect x="150" y="50" width="4" height="174" rx="1"/>
                <rect x="210" y="50" width="4" height="174" rx="1"/>
            </g>
            <g fill="#fbbf24">
                <circle cx="92" cy="62" r="2"/><circle cx="152" cy="62" r="2"/><circle cx="212" cy="62" r="2"/>
                <circle cx="92" cy="122" r="2"/><circle cx="152" cy="122" r="2"/><circle cx="212" cy="122" r="2"/>
                <circle cx="92" cy="182" r="2"/><circle cx="152" cy="182" r="2"/><circle cx="212" cy="182" r="2"/>
            </g>

            <rect x="35" y="235" width="270" height="28" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2" rx="2"/>
            <text x="170" y="253" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">Base Logic Die (1024-bit Wide-IO)</text>

            <rect x="15" y="272" width="310" height="48" fill="#064e3b" rx="4" stroke="#059669" stroke-width="0.8"/>
            <text x="25" y="288" fill="#a7f3d0" font-size="9" font-weight="700">✓ 장점: 열전도율 2.5배 우수 (방열 특성 최강)</text>
            <text x="25" y="302" fill="#a7f3d0" font-size="9" font-weight="700">✓ 공정: 1회 일괄 열경화(Mass Reflow)로 휨/수율 극대화</text>
            <text x="25" y="315" fill="#fef08a" font-size="9" font-weight="700">✓ 핵심 장비: 한미반도체 Dual TC 본더 독점</text>
        </g>

        <!-- 우측: 삼성전자 TC-NCF -->
        <g transform="translate(395, 55)">
            <rect x="0" y="0" width="340" height="330" fill="rgba(88, 28, 135, 0.15)" stroke="#7c3aed" stroke-width="1" rx="6"/>
            <rect x="0" y="0" width="340" height="28" fill="#581c87" rx="6 6 0 0"/>
            <text x="170" y="19" fill="#d8b4fe" font-size="11" font-weight="700" text-anchor="middle">Samsung: 12단 TC-NCF 열압착 공정 단면</text>

            <rect x="30" y="40" width="280" height="210" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="3,3" rx="4"/>
            <text x="295" y="145" fill="#c084fc" font-size="9" font-weight="600" transform="rotate(90, 295, 145)" text-anchor="middle">층간 개별 NCF 고체 필름 열압착</text>

            <g>
                <rect x="45" y="59" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="74" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="89" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="104" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="119" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="134" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="149" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="164" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="179" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="194" width="230" height="6" fill="url(#grad-ncf)"/>
                <rect x="45" y="209" width="230" height="6" fill="url(#grad-ncf)"/>

                <rect x="45" y="50" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="65" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="80" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="95" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="110" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="125" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="140" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="155" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="170" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="185" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="200" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
                <rect x="45" y="215" width="230" height="9" fill="#1e293b" stroke="#a78bfa" stroke-width="0.8"/>
            </g>

            <g fill="#f59e0b">
                <rect x="90" y="50" width="4" height="174" rx="1"/>
                <rect x="150" y="50" width="4" height="174" rx="1"/>
                <rect x="210" y="50" width="4" height="174" rx="1"/>
            </g>
            <g fill="#fbbf24">
                <circle cx="92" cy="62" r="2"/><circle cx="152" cy="62" r="2"/><circle cx="212" cy="62" r="2"/>
                <circle cx="92" cy="122" r="2"/><circle cx="152" cy="122" r="2"/><circle cx="212" cy="122" r="2"/>
                <circle cx="92" cy="182" r="2"/><circle cx="152" cy="182" r="2"/><circle cx="212" cy="182" r="2"/>
            </g>

            <rect x="35" y="235" width="270" height="28" fill="#0284c7" stroke="#38bdf8" stroke-width="1.2" rx="2"/>
            <text x="170" y="253" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">Base Logic Die (1024-bit Wide-IO)</text>

            <rect x="15" y="272" width="310" height="48" fill="#581c87" rx="4" stroke="#7c3aed" stroke-width="0.8"/>
            <text x="25" y="288" fill="#e9d5ff" font-size="9" font-weight="700">✓ 장점: 칩 두께 제어가 용이 (NCF 두께 7um ➡️ 4um 초박막)</text>
            <text x="25" y="302" fill="#e9d5ff" font-size="9" font-weight="700">✓ 난제: 층마다 열압착 반복에 따른 열누적 & 마이크로 보이드 리스크</text>
            <text x="25" y="315" fill="#fef08a" font-size="9" font-weight="700">✓ 핵심 공정: 메모리-파운드리-패키징 원스톱 턴키</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ HBM3E 기술 규격 & 공정 메트릭 비교 요약</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">Advanced MR-MUF (액상 EMC 일괄 주입)</text>
                <rect x="250" y="2" width="10" height="10" fill="#8b5cf6" rx="2"/>
                <text x="265" y="11" fill="#cbd5e1" font-size="10">TC-NCF (층간 비전도성 필름 열압착)</text>
                <rect x="500" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="515" y="11" fill="#cbd5e1" font-size="10">Micro-Bump (Sn-Ag 솔더)</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 최대 대역폭: <tspan fill="#ffffff">1.18 TB/s</tspan></text>
                <text x="150" y="8" fill="#38bdf8" font-size="10" font-weight="600">• I/O 전송속도: <tspan fill="#ffffff">9.6 Gbps</tspan></text>
                <text x="310" y="8" fill="#38bdf8" font-size="10" font-weight="600">• DRAM 노드: <tspan fill="#ffffff">1b-nm (10나노급 5세대)</tspan></text>
                <text x="500" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 패키지 두께: <tspan fill="#ffffff">720µm (12-Hi 36GB)</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 3. 삼성 Hybrid HBM (Z-HBM): 무범프 Cu-Cu 직접 접합 블루프린트
function getHybridHbmSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-hybrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-cu" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f97316"/>
                <stop offset="100%" stop-color="#c2410c"/>
            </linearGradient>
            <linearGradient id="grad-sio2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#0369a1" stop-opacity="0.4"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-hybrid)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">SAMSUNG HYBRID HBM (Z-HBM): BUMP-LESS Cu-Cu DIRECT BONDING BLUEPRINT</text>
        <text x="535" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[Pitch &lt; 1µm / 350°C Atomic Diffusion]</text>

        <!-- 좌측: 비교 -->
        <g transform="translate(25, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 기존 마이크로 범프 vs 차세대 하이브리드 본딩 접합 비교</text>

            <g transform="translate(10, 30)">
                <rect x="0" y="0" width="135" height="150" fill="#0f172a" stroke="#475569" stroke-width="1" rx="4"/>
                <text x="67" y="18" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">기존 Micro-Bump</text>
                <rect x="10" y="30" width="115" height="25" fill="#1e293b" stroke="#64748b" stroke-width="0.8"/>
                <text x="67" y="46" fill="#cbd5e1" font-size="9" text-anchor="middle">Upper DRAM Die</text>

                <g fill="#f59e0b">
                    <circle cx="35" cy="75" r="8"/>
                    <circle cx="67" cy="75" r="8"/>
                    <circle cx="99" cy="75" r="8"/>
                </g>
                <text x="67" y="100" fill="#fbbf24" font-size="8" text-anchor="middle">Solder Bump (15µm Height)</text>

                <rect x="10" y="110" width="115" height="25" fill="#1e293b" stroke="#64748b" stroke-width="0.8"/>
                <text x="67" y="126" fill="#cbd5e1" font-size="9" text-anchor="middle">Lower DRAM Die</text>
                <text x="67" y="145" fill="#ef4444" font-size="8" font-weight="600" text-anchor="middle">⚠️ 범프 피치 한계: ~25µm</text>
            </g>

            <g transform="translate(160, 30)">
                <rect x="0" y="0" width="145" height="150" fill="#022c22" stroke="#10b981" stroke-width="1.2" rx="4"/>
                <text x="72" y="18" fill="#34d399" font-size="10" font-weight="800" text-anchor="middle">무범프 Cu-Cu 직접 접합</text>
                <rect x="10" y="30" width="125" height="25" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <text x="72" y="46" fill="#ffffff" font-size="9" text-anchor="middle">Upper DRAM Die</text>

                <rect x="10" y="55" width="125" height="38" fill="url(#grad-sio2)" stroke="#38bdf8" stroke-width="0.5"/>
                <g fill="url(#grad-cu)">
                    <rect x="25" y="55" width="6" height="38"/>
                    <rect x="45" y="55" width="6" height="38"/>
                    <rect x="65" y="55" width="6" height="38"/>
                    <rect x="85" y="55" width="6" height="38"/>
                    <rect x="105" y="55" width="6" height="38"/>
                </g>
                <text x="72" y="78" fill="#fef08a" font-size="8" font-weight="700" text-anchor="middle">Bump-less Cu-Cu</text>

                <rect x="10" y="93" width="125" height="25" fill="#1e293b" stroke="#38bdf8" stroke-width="0.8"/>
                <text x="72" y="109" fill="#ffffff" font-size="9" text-anchor="middle">Lower DRAM Die</text>

                <text x="72" y="132" fill="#34d399" font-size="8" font-weight="700" text-anchor="middle">✓ 피치: &lt; 1µm (10배 고밀도)</text>
                <text x="72" y="143" fill="#a7f3d0" font-size="7" text-anchor="middle">기생 저항 0Ω / 열저항 -35%</text>
            </g>

            <rect x="10" y="195" width="295" height="125" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="215" fill="#38bdf8" font-size="10" font-weight="700">■ 하이브리드 본딩 도입 혁신 메트릭</text>
            <text x="20" y="235" fill="#e2e8f0" font-size="9">• <tspan fill="#34d399" font-weight="700">인터커넥트 밀도:</tspan> 범프 대비 10배 이상 향상</text>
            <text x="20" y="255" fill="#e2e8f0" font-size="9">• <tspan fill="#34d399" font-weight="700">초박막 적층 두께:</tspan> 범프 높이 제거로 16~20단도 720µm 유지</text>
            <text x="20" y="275" fill="#e2e8f0" font-size="9">• <tspan fill="#34d399" font-weight="700">방열 성능 개선:</tspan> 계면 열저항 -35% 감소 (열적 병목 해결)</text>
            <text x="20" y="295" fill="#e2e8f0" font-size="9">• <tspan fill="#f59e0b" font-weight="700">전력 효율(pJ/bit):</tspan> 신호 감쇄 및 기생 정전용량 제로화</text>
        </g>

        <line x1="345" y1="55" x2="345" y2="385" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: 원자 단위 접합 계면 확대도 -->
        <g transform="translate(365, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ Cu-Cu & SiO₂ 계면 원자 단위 접합 구조 (Atomic Cross-Section)</text>

            <rect x="10" y="30" width="340" height="40" fill="#1e293b" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <text x="180" y="55" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Upper Silicon Die Layer (Top DRAM)</text>

            <rect x="10" y="70" width="340" height="150" fill="#082f49" stroke="#0ea5e9" stroke-width="1.5" rx="2"/>
            <rect x="10" y="70" width="340" height="150" fill="url(#grad-sio2)"/>
            <text x="20" y="90" fill="#38bdf8" font-size="9" font-weight="600">SiO₂ Dielectric Layer (Ra &lt; 0.5nm 초평탄 CMP)</text>

            <rect x="110" y="70" width="140" height="150" fill="url(#grad-cu)" stroke="#fb923c" stroke-width="1.5"/>
            <text x="180" y="115" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">Cu-to-Cu Electrode Pad</text>

            <line x1="10" y1="145" x2="350" y2="145" stroke="#e0f2fe" stroke-width="2" stroke-dasharray="3,2"/>
            <text x="180" y="141" fill="#fef08a" font-size="9" font-weight="800" text-anchor="middle">⚡ 350°C 고온 원자 상호확산 계면 (Direct Atomic Diffusion)</text>
            <text x="180" y="158" fill="#fef08a" font-size="8" text-anchor="middle">[친수성 Si-O-Si 결합 + 구리 결정립계 일체화]</text>

            <rect x="165" y="30" width="30" height="40" fill="#ea580c"/>
            <rect x="165" y="220" width="30" height="40" fill="#ea580c"/>
            <text x="180" y="45" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Cu TSV</text>
            <text x="180" y="235" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Cu TSV</text>

            <rect x="10" y="220" width="340" height="40" fill="#1e293b" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <text x="180" y="250" fill="#f8fafc" font-size="11" font-weight="700" text-anchor="middle">Lower Silicon Die Layer (Bottom DRAM)</text>

            <text x="10" y="285" fill="#f97316" font-size="9" font-weight="700">• 접합 온도 조건: 350°C 질소(N₂) 분위기 원자 확산 열처리</text>
            <text x="10" y="303" fill="#38bdf8" font-size="9" font-weight="700">• 표면 평탄도 요구: AFM 계측 거칠기 0.5nm 이하 (파크시스템스 계측)</text>
            <text x="10" y="321" fill="#a7f3d0" font-size="9" font-weight="700">• 주도 기업: 삼성전자 SAINT-D 독자 턴키 & 네덜란드 Besi 본더</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ Hybrid HBM (Z-HBM) 핵심 공학 파라미터 요약</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#f97316" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">Cu 전극 패드 (원자 확산)</text>
                <rect x="200" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="215" y="11" fill="#cbd5e1" font-size="10">SiO₂ 산화막 유전층</text>
                <rect x="400" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="415" y="11" fill="#cbd5e1" font-size="10">무범프 초미세 피치 (&lt; 1µm)</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 인터커넥트 피치: <tspan fill="#ffffff">&lt; 1µm (범프의 1/20)</tspan></text>
                <text x="210" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 기생 저항: <tspan fill="#ffffff">0 Ω (전력 손실 제로)</tspan></text>
                <text x="400" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 열저항 개선: <tspan fill="#ffffff">-35% 발열 해소</tspan></text>
                <text x="560" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 적층 한계: <tspan fill="#ffffff">16~24단 확장</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 4. HBF (High Bandwidth Flash): 3D V-NAND 수직 적층 AI 추론 메모리 블루프린트
function getHbfSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-hbf" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-nand" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4c1d95"/>
                <stop offset="100%" stop-color="#2e1065"/>
            </linearGradient>
            <linearGradient id="grad-controller" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#075985"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-hbf)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">HIGH BANDWIDTH FLASH (HBF): 3D V-NAND TSV ON-PACKAGE MEMORY ARCHITECTURE</text>
        <text x="545" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[128~512GB Stack / Low-Cost LLM Inference]</text>

        <!-- 좌측: 조감도 -->
        <g transform="translate(25, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ AI 가속기 온패키지(On-Package) HBF 결합 조감도</text>

            <rect x="10" y="240" width="280" height="25" fill="#334155" stroke="#475569" stroke-width="1" rx="2"/>
            <text x="150" y="256" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">Package Substrate (FC-BGA)</text>

            <rect x="15" y="215" width="270" height="18" fill="#475569" stroke="#64748b" stroke-width="1" rx="2"/>
            <text x="150" y="228" fill="#f8fafc" font-size="9" font-weight="700" text-anchor="middle">2.5D Interposer / High-Speed RDL Interface</text>

            <rect x="25" y="110" width="85" height="95" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="3"/>
            <text x="67" y="150" fill="#ffffff" font-size="12" font-weight="800" text-anchor="middle">AI NPU</text>
            <text x="67" y="166" fill="#6ee7b7" font-size="9" text-anchor="middle">Inference Host</text>

            <rect x="145" y="55" width="130" height="150" fill="none" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="3,3" rx="3"/>
            <rect x="150" y="60" width="120" height="115" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="1" rx="2"/>
            <text x="210" y="105" fill="#e9d5ff" font-size="11" font-weight="800" text-anchor="middle">HBF Stack</text>
            <text x="210" y="122" fill="#c084fc" font-size="9" text-anchor="middle">3D V-NAND 8-Hi</text>
            <text x="210" y="138" fill="#fef08a" font-size="9" font-weight="700" text-anchor="middle">256GB~512GB</text>

            <rect x="150" y="180" width="120" height="28" fill="url(#grad-controller)" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <text x="210" y="197" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">Flash Controller Base Die</text>

            <path d="M 110 220 L 150 220" fill="none" stroke="#c084fc" stroke-width="3" stroke-dasharray="3,2"/>
            <text x="130" y="210" fill="#e9d5ff" font-size="8" text-anchor="middle">High-Speed Bus</text>

            <rect x="10" y="275" width="280" height="45" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="293" fill="#a855f7" font-size="9" font-weight="700">✓ 핵심 목적: 거대 LLM 추론 시 온패키지 Weight 저장</text>
            <text x="20" y="308" fill="#cbd5e1" font-size="8">✓ 비용: DRAM(HBM) 대비 1/5 이하의 극저원가 테라바이트 구현</text>
        </g>

        <line x1="335" y1="55" x2="335" y2="385" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: 3D V-NAND 스택 상세 단면도 -->
        <g transform="translate(355, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ HBF 수직 8단 3D V-NAND 다이 & TSV 단면 구조</text>

            <g>
                <rect x="30" y="35" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="58" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="81" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="104" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="127" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="150" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="173" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
                <rect x="30" y="196" width="260" height="18" fill="url(#grad-nand)" stroke="#c084fc" stroke-width="0.8"/>
            </g>

            <g fill="#9333ea" opacity="0.4">
                <rect x="40" y="38" width="160" height="12"/>
                <rect x="40" y="61" width="160" height="12"/>
                <rect x="40" y="84" width="160" height="12"/>
                <rect x="40" y="107" width="160" height="12"/>
                <rect x="40" y="130" width="160" height="12"/>
                <rect x="40" y="153" width="160" height="12"/>
                <rect x="40" y="176" width="160" height="12"/>
                <rect x="40" y="199" width="160" height="12"/>
            </g>
            <text x="120" y="120" fill="#f3e8ff" font-size="10" font-weight="700" text-anchor="middle">300+ Layer 3D V-NAND Cell Stack</text>

            <g fill="#f59e0b">
                <rect x="220" y="35" width="5" height="180" rx="1"/>
                <rect x="245" y="35" width="5" height="180" rx="1"/>
                <rect x="270" y="35" width="5" height="180" rx="1"/>
            </g>
            <text x="245" y="28" fill="#fbbf24" font-size="8" font-weight="700" text-anchor="middle">High-Speed TSV Array</text>

            <rect x="25" y="222" width="270" height="38" fill="url(#grad-controller)" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
            <text x="160" y="240" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">Flash Controller Base Die</text>
            <text x="160" y="253" fill="#bae6fd" font-size="8" text-anchor="middle">Multi-Channel Flash Interface + SRAM Read Cache (레이턴시 보완)</text>

            <rect x="10" y="270" width="300" height="50" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="288" fill="#38bdf8" font-size="9" font-weight="700">• 읽기 레이턴시 극복: 베이스 다이 내 고속 SRAM 캐시 탑재</text>
            <text x="20" y="305" fill="#c084fc" font-size="9" font-weight="700">• 단일 스택 용량: HBM(36GB)의 8~14배에 달하는 256~512GB 구현</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ High Bandwidth Flash (HBF) 기술 지표 요약</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#a855f7" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">3D V-NAND 플래시 다이 (300단+)</text>
                <rect x="220" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="235" y="11" fill="#cbd5e1" font-size="10">SRAM 캐시 내장 컨트롤러 베이스다이</text>
                <rect x="470" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="485" y="11" fill="#cbd5e1" font-size="10">수직 관통 TSV 어레이</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 단일 스택 용량: <tspan fill="#ffffff">128GB~512GB (HBM의 10배)</tspan></text>
                <text x="250" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 비트당 단가: <tspan fill="#ffffff">DRAM 대비 1/5 이하</tspan></text>
                <text x="460" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 주요 용도: <tspan fill="#ffffff">LLM 추론 온패키지 파라미터 저장</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

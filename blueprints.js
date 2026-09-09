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
            case 'lpo_bridge':
                return getLpoSvg();
            case 'cpo_main_node':
                return getCpoSvg();
            case 'els_module':
                return getElsSvg();
            case 'cxl_expansion':
                return getCxlExpansionSvg();
            case 'cxl_pooling_fab':
                return getCxlPoolingSvg();
            case 'pwr_smr_nuscale':
                return getPwrSmrSvg();
            case 'sfr_terrapower_natrium':
                return getSfrNatriumSvg();
            case 'ai_datacenter_grid_link':
                return getAiSmrMicrogridSvg();
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


// ============================================================================
// [CPO 카테고리 3대 정밀 엔지니어링 도면 (광통신 / 실리콘 포토닉스)]
// ============================================================================

// 5. LPO (Linear Pluggable Optics): DSP-Less Direct Drive 광트랜시버 단면도
function getLpoSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-lpo" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-lpo-case" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#334155"/>
                <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
            <linearGradient id="grad-optic-fiber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#06b6d4"/>
                <stop offset="50%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-lpo)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">LINEAR PLUGGABLE OPTICS (LPO): DSP-LESS DIRECT-DRIVE TRANSCEIVER ARCHITECTURE</text>
        <text x="560" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[Power -50% / Latency &lt; 100ns]</text>

        <!-- 좌측: 기존 DSP 모듈 vs LPO 신호 체인 비교 -->
        <g transform="translate(25, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 신호 체인 비교: 기존 DSP 광모듈 vs 저전력 LPO</text>

            <!-- A. 기존 DSP 방식 -->
            <g transform="translate(10, 30)">
                <rect x="0" y="0" width="300" height="75" fill="#0f172a" stroke="#475569" stroke-width="1" rx="4"/>
                <text x="15" y="20" fill="#94a3b8" font-size="10" font-weight="700">기존 광트랜시버 (DSP Retimer 탑재)</text>
                
                <rect x="15" y="32" width="60" height="26" fill="#1e293b" stroke="#64748b" rx="2"/>
                <text x="45" y="48" fill="#94a3b8" font-size="8" text-anchor="middle">Switch SerDes</text>
                
                <text x="83" y="48" fill="#64748b" font-size="10">→</text>

                <!-- 고발열 DSP 칩 -->
                <rect x="95" y="32" width="80" height="26" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.2" rx="2"/>
                <text x="135" y="45" fill="#fca5a5" font-size="8" font-weight="700" text-anchor="middle">DSP / CDR 칩</text>
                <text x="135" y="54" fill="#f87171" font-size="7" text-anchor="middle">전력 50% 소모</text>

                <text x="183" y="48" fill="#64748b" font-size="10">→</text>

                <rect x="195" y="32" width="90" height="26" fill="#1e293b" stroke="#64748b" rx="2"/>
                <text x="240" y="48" fill="#94a3b8" font-size="8" text-anchor="middle">Driver / Laser EML</text>

                <text x="15" y="68" fill="#ef4444" font-size="7">⚠️ 지연시간(Latency) ~100ns / 포트당 16~20W 고발열</text>
            </g>

            <!-- B. LPO 혁신 방식 (DSP 완전 제거) -->
            <g transform="translate(10, 115)">
                <rect x="0" y="0" width="300" height="85" fill="#022c22" stroke="#10b981" stroke-width="1.2" rx="4"/>
                <text x="15" y="20" fill="#34d399" font-size="10" font-weight="800">LPO 혁신 (DSP-Less 직결 구동)</text>

                <rect x="15" y="32" width="75" height="32" fill="#065f46" stroke="#34d399" rx="2"/>
                <text x="52" y="47" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Switch SerDes</text>
                <text x="52" y="58" fill="#a7f3d0" font-size="7" text-anchor="middle">112G PAM4 직결</text>

                <!-- 굵은 직접 전송선 (Direct Drive) -->
                <path d="M 95 48 L 175 48" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="4,2"/>
                <polygon points="175,44 183,48 175,52" fill="#10b981"/>
                <text x="135" y="42" fill="#34d399" font-size="7" font-weight="700" text-anchor="middle">DSP 제거 (Bypass)</text>

                <!-- Linear Driver / TIA -->
                <rect x="185" y="32" width="100" height="32" fill="#064e3b" stroke="#34d399" rx="2"/>
                <text x="235" y="47" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Linear Driver &amp; TIA</text>
                <text x="235" y="58" fill="#fef08a" font-size="7" text-anchor="middle">광엔진(Optical) 결합</text>

                <text x="15" y="77" fill="#a7f3d0" font-size="8" font-weight="700">✓ 전력 소모 -50% (포트당 &lt; 8W) | 지연시간 &lt; 10ns 극저지연</text>
            </g>

            <!-- LPO 핵심 과제 박스 -->
            <rect x="10" y="210" width="300" height="110" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="230" fill="#38bdf8" font-size="10" font-weight="700">■ LPO 상용화 핵심 공학 과제</text>
            <text x="20" y="250" fill="#cbd5e1" font-size="8">• <tspan fill="#f59e0b" font-weight="700">신호 무결성(SI):</tspan> DSP 리타이머 없이 112Gbps/lane 지터(Jitter) 제어</text>
            <text x="20" y="270" fill="#cbd5e1" font-size="8">• <tspan fill="#f59e0b" font-weight="700">전송 거리 제약:</tspan> 최대 수 미터(DAC/AOC)에서 데이터센터 내부 단거리용</text>
            <text x="20" y="290" fill="#cbd5e1" font-size="8">• <tspan fill="#34d399" font-weight="700">과도기적 위상:</tspan> CPO 본격 양산 전 2024~2026 AI 클러스터 우선 채택</text>
        </g>

        <line x1="345" y1="55" x2="345" y2="385" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: LPO 플러그형 트랜시버 폼팩터 단면 구조도 -->
        <g transform="translate(365, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ OSFP / QSFP-DD LPO 플러그형 광모듈 단면 구조</text>

            <!-- 모듈 메탈 하우징 (Metal Shell) -->
            <rect x="10" y="35" width="340" height="155" fill="url(#grad-lpo-case)" stroke="#64748b" stroke-width="1.2" rx="4"/>
            <text x="25" y="55" fill="#94a3b8" font-size="9" font-weight="600">OSFP Transceiver Metal Shell (방열 핀 일체형)</text>

            <!-- PCB 기판 -->
            <rect x="25" y="115" width="310" height="10" fill="#047857" stroke="#10b981" stroke-width="0.8" rx="1"/>

            <!-- 좌측: 골드 핑거 커넥터 (스위치 보드 결합부) -->
            <g fill="#f59e0b">
                <rect x="12" y="112" width="13" height="4"/>
                <rect x="12" y="118" width="13" height="4"/>
                <rect x="12" y="124" width="13" height="4"/>
            </g>
            <text x="20" y="145" fill="#f59e0b" font-size="8" font-weight="700">Gold Finger</text>
            <text x="20" y="155" fill="#cbd5e1" font-size="7">(Host SerDes)</text>

            <!-- 중앙: Linear Driver IC & Linear TIA -->
            <rect x="75" y="85" width="70" height="28" fill="#0284c7" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <text x="110" y="100" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Linear Driver</text>
            <text x="110" y="109" fill="#bae6fd" font-size="7" text-anchor="middle">IC (Macom/Marvell)</text>

            <rect x="155" y="85" width="60" height="28" fill="#0284c7" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <text x="185" y="100" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Linear TIA</text>
            <text x="185" y="109" fill="#bae6fd" font-size="7" text-anchor="middle">수신 증폭기</text>

            <!-- 우측: TOSA / ROSA 광학 서브어셈블리 -->
            <rect x="235" y="75" width="85" height="48" fill="#065f46" stroke="#34d399" stroke-width="1.2" rx="3"/>
            <text x="277" y="93" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">TOSA / ROSA</text>
            <text x="277" y="104" fill="#a7f3d0" font-size="7" text-anchor="middle">EML Laser &amp; PD</text>
            <text x="277" y="115" fill="#fef08a" font-size="7" text-anchor="middle">800G / 1.6T 광소자</text>

            <!-- 우측 끝: MPO 광케이블 리셉터클 -->
            <rect x="325" y="88" width="22" height="22" fill="#1e293b" stroke="#38bdf8" stroke-width="1" rx="2"/>
            <!-- 광섬유 빔 라인 -->
            <line x1="320" y1="99" x2="347" y2="99" stroke="url(#grad-optic-fiber)" stroke-width="4"/>
            <text x="336" y="125" fill="#38bdf8" font-size="7" font-weight="700" text-anchor="middle">MPO</text>

            <!-- 광학 경로 표시 -->
            <path d="M 295 99 L 325 99" fill="none" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>

            <!-- 설명 박스 -->
            <rect x="10" y="200" width="340" height="120" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="220" fill="#38bdf8" font-size="10" font-weight="700">■ 주요 밸류체인 및 제조 생태계</text>
            <text x="20" y="240" fill="#cbd5e1" font-size="9">• <tspan fill="#ffffff" font-weight="700">광트랜시버 선도:</tspan> 중국 이노라이트(Innolight), 미국 코히런트, 루멘텀</text>
            <text x="20" y="260" fill="#cbd5e1" font-size="9">• <tspan fill="#ffffff" font-weight="700">Linear IC 공급:</tspan> 마벨(Marvell), 맥스리니어(MaxLinear), 마콤(Macom)</text>
            <text x="20" y="280" fill="#cbd5e1" font-size="9">• <tspan fill="#ffffff" font-weight="700">국내 광부품 수혜:</tspan> 옵티코어, 오이솔루션, 우리넷, 피피아이</text>
            <text x="20" y="300" fill="#10b981" font-size="8">✓ 핵심: 기존 데이터센터 스위치 슬롯에 바로 꽂아 쓸 수 있어 즉각 도입 가능</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ LPO (Linear Pluggable Optics) 기술 지표 요약</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">Linear Driver &amp; TIA (DSP 제거)</text>
                <rect x="230" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="245" y="11" fill="#cbd5e1" font-size="10">기존 OSFP/QSFP-DD 호환 폼팩터</text>
                <rect x="480" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="495" y="11" fill="#cbd5e1" font-size="10">112G PAM4 고속 신호 직결</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 전력 절감율: <tspan fill="#ffffff">-50% (포트당 &lt; 8W)</tspan></text>
                <text x="180" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 지연시간(Latency): <tspan fill="#ffffff">&lt; 100ns (극저지연)</tspan></text>
                <text x="370" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 대역폭 규격: <tspan fill="#ffffff">800G / 1.6T AI 클러스터</tspan></text>
                <text x="560" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 역할: <tspan fill="#fef08a">CPO 이전 징검다리</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 6. CPO (Co-Packaged Optics): 102.4Tbps 단일 패키지 광엔진 3D 본딩 및 인터포저 정밀 단면도
function getCpoSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-cpo" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-switch-asic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#1e3a8a"/>
                <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
            <linearGradient id="grad-siph-pic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0891b2"/>
                <stop offset="100%" stop-color="#0e7490"/>
            </linearGradient>
            <linearGradient id="grad-eic" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4f46e5"/>
                <stop offset="100%" stop-color="#3730a3"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-cpo)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">102.4Tbps CO-PACKAGED OPTICS (CPO): ASIC + 3D SILICON PHOTONICS BLUEPRINT</text>
        <text x="540" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[Energy &lt; 5 pJ/bit / TSMC COUPE 3D]</text>

        <!-- 좌측: 단일 인터포저 온패키지 통합 조감도 (Top-down & Side View) -->
        <g transform="translate(25, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 2.5D 인터포저 기판 온패키지 통합 조감도</text>

            <!-- 대형 패키지 기판 (FC-BGA Substrate) -->
            <rect x="0" y="240" width="300" height="28" fill="#334155" stroke="#475569" stroke-width="1" rx="2"/>
            <text x="150" y="258" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="middle">Large-Scale FC-BGA Substrate (100x100mm)</text>

            <!-- 2.5D 고밀도 인터포저 (Silicon / Organic Interposer) -->
            <rect x="10" y="210" width="280" height="22" fill="#475569" stroke="#64748b" stroke-width="1" rx="2"/>
            <text x="150" y="225" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">2.5D High-Density Interposer with Sub-Micron RDL</text>

            <!-- 중앙: 102.4T 스위치 ASIC (대형 칩) -->
            <rect x="80" y="90" width="140" height="110" fill="url(#grad-switch-asic)" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <text x="150" y="135" fill="#ffffff" font-size="13" font-weight="800" text-anchor="middle">102.4Tbps Switch</text>
            <text x="150" y="152" fill="#38bdf8" font-size="11" font-weight="800" text-anchor="middle">ASIC 반도체</text>
            <text x="150" y="170" fill="#94a3b8" font-size="9" text-anchor="middle">(Broadcom Tomahawk / TSMC 3nm)</text>

            <!-- 좌측 광엔진 (Optical Engine #1) -->
            <rect x="10" y="125" width="55" height="75" fill="url(#grad-siph-pic)" stroke="#06b6d4" stroke-width="1.2" rx="3"/>
            <text x="37" y="155" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">Optical</text>
            <text x="37" y="167" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">Engine</text>
            <text x="37" y="180" fill="#cffafe" font-size="7" text-anchor="middle">(SiPh PIC)</text>

            <!-- 우측 광엔진 (Optical Engine #2) -->
            <rect x="235" y="125" width="55" height="75" fill="url(#grad-siph-pic)" stroke="#06b6d4" stroke-width="1.2" rx="3"/>
            <text x="262" y="155" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">Optical</text>
            <text x="262" y="167" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">Engine</text>
            <text x="262" y="180" fill="#cffafe" font-size="7" text-anchor="middle">(SiPh PIC)</text>

            <!-- 초단거리 인터커넥트 연결선 (수 mm 단위 거리) -->
            <path d="M 65 160 L 80 160" fill="none" stroke="#f59e0b" stroke-width="3"/>
            <path d="M 220 160 L 235 160" fill="none" stroke="#f59e0b" stroke-width="3"/>
            <text x="72" y="152" fill="#fbbf24" font-size="7" text-anchor="middle">&lt;5mm</text>
            <text x="227" y="152" fill="#fbbf24" font-size="7" text-anchor="middle">&lt;5mm</text>

            <!-- 광섬유 리본 케이블 출력 (Fiber Ribbon) -->
            <path d="M 10 160 L -10 160" fill="none" stroke="#06b6d4" stroke-width="4"/>
            <path d="M 290 160 L 310 160" fill="none" stroke="#06b6d4" stroke-width="4"/>

            <!-- CPO 혁신 효과 -->
            <rect x="0" y="275" width="300" height="45" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="10" y="293" fill="#38bdf8" font-size="9" font-weight="700">✓ 전기 구리 배선 거리: 기존 30~50cm ➡️ 수 mm (1/100 단축)</text>
            <text x="10" y="308" fill="#34d399" font-size="8">✓ 통신 전력 50% 절감 &amp; SerDes 고열 간섭 원천 제거</text>
        </g>

        <line x1="335" y1="55" x2="335" y2="385" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: 광엔진(Optical Engine) 3D 적층 단면 초정밀 확대도 -->
        <g transform="translate(355, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 실리콘 포토닉스(SiPh) 3D 광엔진 단면 구조</text>

            <!-- 상단: EIC 다이 (Electronic IC: TIA/Driver) -->
            <rect x="20" y="35" width="280" height="35" fill="url(#grad-eic)" stroke="#818cf8" stroke-width="1.2" rx="3"/>
            <text x="160" y="52" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">Electronic IC (EIC 다이)</text>
            <text x="160" y="63" fill="#c7d2fe" font-size="8" text-anchor="middle">초고속 드라이버(Driver) &amp; TIA 아날로그 회로</text>

            <!-- Direct Cu-Cu 하이브리드 본딩 인터페이스 (EIC-PIC 간) -->
            <rect x="20" y="70" width="280" height="15" fill="#082f49" stroke="#38bdf8" stroke-width="0.8"/>
            <g fill="#f59e0b">
                <circle cx="50" cy="77" r="2.5"/><circle cx="90" cy="77" r="2.5"/><circle cx="130" cy="77" r="2.5"/>
                <circle cx="170" cy="77" r="2.5"/><circle cx="210" cy="77" r="2.5"/><circle cx="250" cy="77" r="2.5"/>
            </g>
            <text x="295" y="81" fill="#fbbf24" font-size="7">Cu-Cu Direct Bonding</text>

            <!-- 하단: PIC 다이 (Photonic IC: 실리콘 포토닉스 광학 칩) -->
            <rect x="20" y="85" width="280" height="85" fill="url(#grad-siph-pic)" stroke="#06b6d4" stroke-width="1.5" rx="3"/>
            <text x="160" y="105" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle">Photonic IC (PIC 다이 / Silicon Photonics)</text>

            <!-- 실리콘 광도파로(Waveguide) 및 링 변조기 패턴 -->
            <g fill="#083344" stroke="#67e8f9" stroke-width="1">
                <!-- 광도파로 라인 -->
                <line x1="30" y1="130" x2="290" y2="130" stroke="#22d3ee" stroke-width="2"/>
                <!-- 마이크로 링 변조기 (Micro-Ring Modulator) -->
                <circle cx="90" cy="130" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
                <circle cx="150" cy="130" r="10" fill="none" stroke="#f59e0b" stroke-width="2"/>
                <!-- Ge 광검출기 (Germanium PD) -->
                <rect x="210" y="122" width="30" height="16" fill="#1e293b" stroke="#34d399" rx="1"/>
            </g>
            <text x="90" y="152" fill="#fbbf24" font-size="7" text-anchor="middle">Micro-Ring</text>
            <text x="150" y="152" fill="#fbbf24" font-size="7" text-anchor="middle">Modulator</text>
            <text x="225" y="152" fill="#34d399" font-size="7" text-anchor="middle">Ge PD</text>

            <!-- V-Groove 광섬유 결합부 (우측 끝) -->
            <polygon points="275,120 295,130 275,140" fill="#0f172a" stroke="#38bdf8"/>
            <text x="270" y="160" fill="#38bdf8" font-size="8" font-weight="700">V-Groove 정렬</text>

            <!-- 하부 2.5D 인터포저 접합 범프 -->
            <g fill="#cbd5e1">
                <rect x="40" y="170" width="8" height="10" rx="1"/>
                <rect x="90" y="170" width="8" height="10" rx="1"/>
                <rect x="140" y="170" width="8" height="10" rx="1"/>
                <rect x="190" y="170" width="8" height="10" rx="1"/>
                <rect x="240" y="170" width="8" height="10" rx="1"/>
            </g>

            <!-- 3D 광엔진 설명 박스 -->
            <rect x="10" y="195" width="300" height="125" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="215" fill="#38bdf8" font-size="10" font-weight="700">■ TSMC COUPE 3D 광학 패키징 기술</text>
            <text x="20" y="235" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">EIC-PIC 3D 수직 적층:</tspan> 기생 커패시턴스를 1/10 이하로 줄여 초고속 구동</text>
            <text x="20" y="255" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">마이크로 링 변조기:</tspan> 기존 마하젠더 대비 소자 면적 90% 이상 축소</text>
            <text x="20" y="275" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">광섬유 정렬 공차:</tspan> 자동화 V-Groove 피치로 서브마이크론(&lt;0.5µm) 정밀 결합</text>
            <text x="20" y="295" fill="#34d399" font-size="8">✓ 핵심 장비사: 한미반도체, 팸텍, 제이앤티씨 (광학 결합 및 테스트 장비)</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ CPO (Co-Packaged Optics) 정량 엔지니어링 메트릭</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#0891b2" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">SiPh PIC (실리콘 포토닉스 광학 칩)</text>
                <rect x="230" y="2" width="10" height="10" fill="#4f46e5" rx="2"/>
                <text x="245" y="11" fill="#cbd5e1" font-size="10">EIC 드라이버 (3D Cu-Cu 직접 적층)</text>
                <rect x="480" y="2" width="10" height="10" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1" rx="2"/>
                <text x="495" y="11" fill="#cbd5e1" font-size="10">102.4Tbps 초고속 스위치 ASIC</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 통신 에너지 효율: <tspan fill="#ffffff">&lt; 5 pJ/bit (구리 대비 -50%)</tspan></text>
                <text x="240" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 전송 대역폭: <tspan fill="#ffffff">102.4 Tbps 차세대 스위치</tspan></text>
                <text x="460" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 패키징 기술: <tspan fill="#fef08a">TSMC COUPE 3D 이종집적</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 7. ELS (External Laser Source): 외장 레이저 광원 모듈 핫스왑 블루프린트
function getElsSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-els" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-laser-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ef4444"/>
                <stop offset="50%" stop-color="#f97316"/>
                <stop offset="100%" stop-color="#fbbf24"/>
            </linearGradient>
            <linearGradient id="grad-tec" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="#070c14" rx="8"/>
        <rect width="100%" height="100%" fill="url(#grid-els)" rx="8"/>
        <rect x="1" y="1" width="758" height="478" fill="none" stroke="#1e293b" stroke-width="1.5" rx="8"/>

        <!-- 헤더 -->
        <rect x="12" y="12" width="736" height="32" fill="#0f172a" rx="4" stroke="#334155" stroke-width="1"/>
        <text x="24" y="33" fill="#38bdf8" font-size="12" font-weight="700" font-family="'Outfit', sans-serif">EXTERNAL LASER SOURCE (ELS): BLIND-MATE HOT-SWAPPABLE CW LASER BLUEPRINT</text>
        <text x="540" y="33" fill="#94a3b8" font-size="11" font-family="monospace">[OIF ELSFP Standard / Laser Thermal Isolation]</text>

        <!-- 좌측: 전면 패널 핫스왑 분리 개념도 -->
        <g transform="translate(25, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ 시스템 섀시 열 분리 (Thermal Isolation) 개념도</text>

            <!-- 스위치 섀시 외곽 (1RU Chassis) -->
            <rect x="0" y="35" width="300" height="230" fill="#0f172a" stroke="#334155" stroke-width="1.2" rx="4"/>
            <text x="15" y="55" fill="#94a3b8" font-size="9" font-weight="700">1RU Data Center Switch Chassis</text>

            <!-- 전면 패널 (Front Panel) -->
            <rect x="10" y="65" width="75" height="185" fill="#1e293b" stroke="#64748b" stroke-width="1" rx="3"/>
            <text x="47" y="85" fill="#cbd5e1" font-size="9" font-weight="700" text-anchor="middle">Front Panel</text>
            <text x="47" y="96" fill="#94a3b8" font-size="7" text-anchor="middle">(40~50°C)</text>

            <!-- ELSFP 핫스왑 모듈 슬롯 (전면 꽂힘) -->
            <rect x="15" y="110" width="65" height="50" fill="#b91c1c" stroke="#ef4444" stroke-width="1.2" rx="2"/>
            <text x="47" y="130" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">ELSFP 모듈</text>
            <text x="47" y="142" fill="#fca5a5" font-size="7" text-anchor="middle">CW Laser 광원</text>
            <text x="47" y="153" fill="#fef08a" font-size="7" text-anchor="middle">Hot-Swappable</text>

            <!-- 레이저 빛 전송 광섬유 (PMF 케이블) -->
            <path d="M 80 135 C 120 135, 130 180, 165 180" fill="none" stroke="url(#grad-laser-beam)" stroke-width="3" stroke-dasharray="4,2"/>
            <text x="125" y="150" fill="#fbbf24" font-size="7" font-weight="700">PMF 광섬유</text>
            <text x="125" y="160" fill="#cbd5e1" font-size="6">(빛만 공급)</text>

            <!-- 내부 고열 스위치 ASIC + CPO 패키지 (중앙) -->
            <rect x="165" y="130" width="120" height="95" fill="#7f1d1d" stroke="#dc2626" stroke-width="1.5" rx="4"/>
            <text x="225" y="155" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">CPO Switch 패키지</text>
            <text x="225" y="170" fill="#fca5a5" font-size="8" text-anchor="middle">100°C+ 극심한 고열</text>
            <text x="225" y="195" fill="#fef08a" font-size="8" font-weight="700" text-anchor="middle">✓ 레이저 부재 (안전)</text>
            <text x="225" y="210" fill="#ffffff" font-size="7" text-anchor="middle">SiPh 변조기만 존재</text>

            <!-- 분리 효과 요약 -->
            <rect x="0" y="275" width="300" height="45" fill="#022c22" rx="4" stroke="#10b981" stroke-width="1"/>
            <text x="10" y="293" fill="#34d399" font-size="9" font-weight="700">✓ 고열 분리 효과: 레이저 다이오드 수명 10배 연장 (신뢰성)</text>
            <text x="10" y="308" fill="#a7f3d0" font-size="8">✓ 무중단 유지보수: 레이저 고장 시 스위치 전원 끄지 않고 즉시 교체</text>
        </g>

        <line x1="335" y1="55" x2="335" y2="385" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4,4"/>

        <!-- 우측: ELSFP 플러그형 광원 모듈 내부 정밀 단면도 -->
        <g transform="translate(355, 55)">
            <text x="0" y="15" fill="#e2e8f0" font-size="12" font-weight="600">■ ELSFP 플러그형 외장 레이저 모듈 내부 단면</text>

            <!-- 메탈 모듈 하우징 -->
            <rect x="15" y="35" width="330" height="150" fill="#1e293b" stroke="#475569" stroke-width="1.2" rx="4"/>
            <text x="30" y="55" fill="#94a3b8" font-size="9" font-weight="700">OIF ELSFP Standard Metal Housing</text>

            <!-- 마이크로 TEC 냉각기 (Thermo-Electric Cooler) -->
            <rect x="35" y="130" width="180" height="15" fill="url(#grad-tec)" stroke="#0284c7" stroke-width="1" rx="1"/>
            <text x="125" y="141" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Micro-TEC 항온 냉각기 (45°C 정밀 유지)</text>

            <!-- 서브마운트 기판 -->
            <rect x="45" y="118" width="160" height="10" fill="#334155" rx="1"/>

            <!-- InP CW High-Power DFB 레이저 다이오드 어레이 (4채널) -->
            <g fill="#dc2626">
                <rect x="55" y="90" width="20" height="25" rx="2"/>
                <rect x="85" y="90" width="20" height="25" rx="2"/>
                <rect x="115" y="90" width="20" height="25" rx="2"/>
                <rect x="145" y="90" width="20" height="25" rx="2"/>
            </g>
            <text x="107" y="82" fill="#fca5a5" font-size="8" font-weight="800" text-anchor="middle">InP CW DFB Laser Array</text>

            <!-- 레이저 빔 방출선 -->
            <line x1="170" y1="102" x2="225" y2="102" stroke="url(#grad-laser-beam)" stroke-width="3"/>

            <!-- 광 아이솔레이터 (Optical Isolator: 반사광 차단) -->
            <rect x="200" y="88" width="25" height="28" fill="#475569" stroke="#94a3b8" stroke-width="1" rx="1"/>
            <text x="212" y="125" fill="#94a3b8" font-size="7" text-anchor="middle">Isolator</text>

            <!-- 초정밀 집광 렌즈 (Coupling Lens) -->
            <circle cx="240" cy="102" r="8" fill="#0891b2" stroke="#22d3ee" stroke-width="1"/>
            <text x="240" y="125" fill="#22d3ee" font-size="7" text-anchor="middle">Lens</text>

            <!-- 블라인드 메이트 (Blind-Mate) MPO 광학 커넥터 -->
            <rect x="265" y="85" width="65" height="35" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
            <text x="297" y="102" fill="#ffffff" font-size="8" font-weight="700" text-anchor="middle">Blind-Mate</text>
            <text x="297" y="113" fill="#38bdf8" font-size="7" text-anchor="middle">MPO Connector</text>

            <!-- 설명 박스 -->
            <rect x="10" y="195" width="340" height="125" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="20" y="215" fill="#38bdf8" font-size="10" font-weight="700">■ ELS 핵심 밸류체인 및 기술 규격</text>
            <text x="20" y="235" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">핵심 광원 공급사:</tspan> 루멘텀(Lumentum), 코히런트(Coherent), 브로드컴</text>
            <text x="20" y="255" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">광출력 규격:</tspan> 채널당 100mW+ 초고출력 연속파(CW) 1310nm 대역</text>
            <text x="20" y="275" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">국내 수혜 생태계:</tspan> 오이솔루션, 빛과전자, 라이트론 (광원 모듈 패키징)</text>
            <text x="20" y="295" fill="#10b981" font-size="8">✓ CPO의 가장 큰 약점이었던 레이저 수명 및 교체 난제를 해결한 열쇠</text>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ ELS (External Laser Source) 주요 엔지니어링 지표</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#b91c1c" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">InP High-Power CW Laser (연속파 광원)</text>
                <rect x="230" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="245" y="11" fill="#cbd5e1" font-size="10">Micro-TEC 능동 온도 제어 (45°C)</text>
                <rect x="470" y="2" width="10" height="10" fill="#38bdf8" rx="2"/>
                <text x="485" y="11" fill="#cbd5e1" font-size="10">Blind-Mate MPO 초정밀 접속</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 수명 연장(MTBF): <tspan fill="#ffffff">고열 분리로 10배 연장</tspan></text>
                <text x="230" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 광출력: <tspan fill="#ffffff">채널당 100mW+ CW 파워</tspan></text>
                <text x="460" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 유지보수: <tspan fill="#fef08a">무중단 핫스왑(Hot-Swap) 교체</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 8. CXL 2.0 메모리 확장 (CMM-D / EDSFF E3.S) 정밀 단면 & 모듈 구조도
function getCxlExpansionSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-cxl-exp" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-cxl-heatsink" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#475569" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#1e293b" stop-opacity="0.95"/>
            </linearGradient>
            <linearGradient id="grad-cxl-ctrl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="50%" stop-color="#0369a1"/>
                <stop offset="100%" stop-color="#075985"/>
            </linearGradient>
            <linearGradient id="grad-cxl-dram" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#312e81"/>
                <stop offset="100%" stop-color="#1e1b4b"/>
            </linearGradient>
            <linearGradient id="grad-cxl-pcb" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#064e3b"/>
                <stop offset="50%" stop-color="#065f46"/>
                <stop offset="100%" stop-color="#064e3b"/>
            </linearGradient>
            <linearGradient id="grad-cxl-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fef08a"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
            <filter id="cxl-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- 배경 그리드 -->
        <rect width="100%" height="100%" fill="#070c14"/>
        <rect width="100%" height="100%" fill="url(#grid-cxl-exp)"/>

        <!-- 상단 도면 타이틀 & 스펙 태그 -->
        <g transform="translate(20, 24)">
            <text x="0" y="0" fill="#38bdf8" font-family="'Consolas', monospace" font-size="12" font-weight="700" letter-spacing="1.5">
                [CXL-EXP-01] CXL 2.0 CMM-D MEMORY EXPANDER (EDSFF E3.S FORM FACTOR)
            </text>
            <text x="0" y="15" fill="#64748b" font-family="'Consolas', monospace" font-size="9">
                Cross-Section &amp; Architecture Blueprint | PCIe 5.0 x8/x16 (32~64GB/s) | DDR5 8-Channel Buffer Bridge
            </text>
            <rect x="620" y="-12" width="100" height="22" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" rx="3"/>
            <text x="670" y="3" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">CLICK TO ZOOM</text>
        </g>

        <!-- 좌측: EDSFF E3.S 모듈 정밀 단면 & 어셈블리 (Cross-Section & Top Assembly) -->
        <g transform="translate(20, 55)">
            <rect x="0" y="0" width="430" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ EDSFF E3.S CMM-D 모듈 기구 및 단면 구조도</text>

            <!-- 치수 보조선 (EDSFF E3.S: 76mm x 112.75mm) -->
            <line x1="25" y1="36" x2="405" y2="36" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>
            <text x="215" y="33" fill="#64748b" font-size="8" text-anchor="middle">EDSFF E3.S 표준 길이 (112.75mm)</text>

            <!-- 1. 알루미늄 방열핀 (Extruded Aluminum Fin Heat Sink) -->
            <g transform="translate(30, 45)">
                <!-- 방열핀 베이스 -->
                <rect x="0" y="0" width="370" height="10" fill="url(#grad-cxl-heatsink)" stroke="#64748b" stroke-width="1" rx="1"/>
                <!-- 다층 방열핀 어레이 -->
                <g fill="#475569" stroke="#334155" stroke-width="0.5">
                    <rect x="10" y="-18" width="6" height="18"/>
                    <rect x="25" y="-18" width="6" height="18"/>
                    <rect x="40" y="-18" width="6" height="18"/>
                    <rect x="55" y="-18" width="6" height="18"/>
                    <rect x="70" y="-18" width="6" height="18"/>
                    <rect x="85" y="-18" width="6" height="18"/>
                    <rect x="100" y="-18" width="6" height="18"/>
                    <rect x="115" y="-18" width="6" height="18"/>
                    <rect x="130" y="-18" width="6" height="18"/>
                    <rect x="145" y="-18" width="6" height="18"/>
                    <rect x="160" y="-18" width="6" height="18"/>
                    <rect x="175" y="-18" width="6" height="18"/>
                    <rect x="190" y="-18" width="6" height="18"/>
                    <rect x="205" y="-18" width="6" height="18"/>
                    <rect x="220" y="-18" width="6" height="18"/>
                    <rect x="235" y="-18" width="6" height="18"/>
                    <rect x="250" y="-18" width="6" height="18"/>
                    <rect x="265" y="-18" width="6" height="18"/>
                    <rect x="280" y="-18" width="6" height="18"/>
                    <rect x="295" y="-18" width="6" height="18"/>
                    <rect x="310" y="-18" width="6" height="18"/>
                    <rect x="325" y="-18" width="6" height="18"/>
                    <rect x="340" y="-18" width="6" height="18"/>
                    <rect x="355" y="-18" width="6" height="18"/>
                </g>
                <text x="185" y="-6" fill="#94a3b8" font-size="8" font-weight="700" text-anchor="middle">고밀도 알루미늄 압출 방열판 (Heat Sink Fin Array, 25W TDP 해소)</text>
            </g>

            <!-- 써멀 인터페이스 패드 (TIM: Thermal Interface Material) -->
            <rect x="30" y="57" width="370" height="5" fill="#0284c7" fill-opacity="0.4" stroke="#0ea5e9" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="405" y="62" fill="#38bdf8" font-size="7">TIM (6.5 W/mK)</text>

            <!-- 2. 모듈 부품 실장층 (Components Layer) -->
            <!-- 2-1. 좌측 DDR5 DRAM 어레이 (채널 0~3) -->
            <g transform="translate(35, 68)">
                <rect x="0" y="0" width="38" height="50" fill="url(#grad-cxl-dram)" stroke="#6366f1" stroke-width="1.2" rx="2"/>
                <text x="19" y="24" fill="#a5b4fc" font-size="7" font-weight="700" text-anchor="middle">DDR5</text>
                <text x="19" y="34" fill="#c7d2fe" font-size="6.5" text-anchor="middle">D1a DRAM</text>
                <text x="19" y="44" fill="#818cf8" font-size="6" text-anchor="middle">CH #0</text>

                <rect x="44" y="0" width="38" height="50" fill="url(#grad-cxl-dram)" stroke="#6366f1" stroke-width="1.2" rx="2"/>
                <text x="63" y="24" fill="#a5b4fc" font-size="7" font-weight="700" text-anchor="middle">DDR5</text>
                <text x="63" y="34" fill="#c7d2fe" font-size="6.5" text-anchor="middle">D1a DRAM</text>
                <text x="63" y="44" fill="#818cf8" font-size="6" text-anchor="middle">CH #1</text>

                <rect x="88" y="0" width="38" height="50" fill="url(#grad-cxl-dram)" stroke="#6366f1" stroke-width="1.2" rx="2"/>
                <text x="107" y="24" fill="#a5b4fc" font-size="7" font-weight="700" text-anchor="middle">DDR5</text>
                <text x="107" y="34" fill="#c7d2fe" font-size="6.5" text-anchor="middle">D1a DRAM</text>
                <text x="107" y="44" fill="#818cf8" font-size="6" text-anchor="middle">CH #2</text>
            </g>

            <!-- 2-2. 중앙 핵심: CXL 2.0 메모리 컨트롤러 ASIC (BGA) -->
            <g transform="translate(170, 65)">
                <rect x="0" y="0" width="90" height="56" fill="url(#grad-cxl-ctrl)" stroke="#38bdf8" stroke-width="1.8" rx="3" filter="url(#cxl-glow)"/>
                <!-- 실리콘 다이 코어 -->
                <rect x="8" y="8" width="74" height="40" fill="#0f172a" stroke="#0ea5e9" stroke-width="1"/>
                <text x="45" y="22" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">CXL 2.0 ASIC</text>
                <text x="45" y="33" fill="#38bdf8" font-size="7" font-weight="700" text-anchor="middle">Memory Controller</text>
                <text x="45" y="43" fill="#94a3b8" font-size="6.5" text-anchor="middle">PCIe 5.0 PHY + DDR5 Hub</text>

                <!-- BGA 솔더볼 어레이 (하단) -->
                <g fill="#94a3b8">
                    <circle cx="15" cy="59" r="1.8"/>
                    <circle cx="27" cy="59" r="1.8"/>
                    <circle cx="39" cy="59" r="1.8"/>
                    <circle cx="51" cy="59" r="1.8"/>
                    <circle cx="63" cy="59" r="1.8"/>
                    <circle cx="75" cy="59" r="1.8"/>
                </g>
            </g>

            <!-- 2-3. 우측 DDR5 DRAM 어레이 (채널 4~7) & PMIC -->
            <g transform="translate(268, 68)">
                <rect x="0" y="0" width="38" height="50" fill="url(#grad-cxl-dram)" stroke="#6366f1" stroke-width="1.2" rx="2"/>
                <text x="19" y="24" fill="#a5b4fc" font-size="7" font-weight="700" text-anchor="middle">DDR5</text>
                <text x="19" y="34" fill="#c7d2fe" font-size="6.5" text-anchor="middle">D1a DRAM</text>
                <text x="19" y="44" fill="#818cf8" font-size="6" text-anchor="middle">CH #3</text>

                <rect x="44" y="0" width="38" height="50" fill="url(#grad-cxl-dram)" stroke="#6366f1" stroke-width="1.2" rx="2"/>
                <text x="63" y="24" fill="#a5b4fc" font-size="7" font-weight="700" text-anchor="middle">DDR5</text>
                <text x="63" y="34" fill="#c7d2fe" font-size="6.5" text-anchor="middle">D1a DRAM</text>
                <text x="63" y="44" fill="#818cf8" font-size="6" text-anchor="middle">CH #4</text>

                <!-- PMIC 및 전원 인덕터 -->
                <rect x="90" y="5" width="34" height="42" fill="#7f1d1d" stroke="#ef4444" stroke-width="1" rx="2"/>
                <text x="107" y="22" fill="#fca5a5" font-size="7" font-weight="700" text-anchor="middle">CXL PMIC</text>
                <text x="107" y="33" fill="#fecaca" font-size="6" text-anchor="middle">12V -> VDD/VPP</text>
                <text x="107" y="42" fill="#f87171" font-size="5.5" text-anchor="middle">Power Supply</text>
            </g>

            <!-- 3. 고다층 초저손실 모듈 PCB 기판 (14-Layer Ultra Low Loss PCB) -->
            <g transform="translate(30, 130)">
                <rect x="0" y="0" width="370" height="22" fill="url(#grad-cxl-pcb)" stroke="#059669" stroke-width="1.2" rx="1"/>
                <line x1="0" y1="5" x2="370" y2="5" stroke="#10b981" stroke-width="0.6" stroke-dasharray="4,2"/>
                <line x1="0" y1="11" x2="370" y2="11" stroke="#10b981" stroke-width="0.6" stroke-dasharray="4,2"/>
                <line x1="0" y1="17" x2="370" y2="17" stroke="#10b981" stroke-width="0.6" stroke-dasharray="4,2"/>
                <text x="185" y="14" fill="#ecfdf5" font-size="7.5" font-weight="700" text-anchor="middle">14-Layer High-Tg Low-Loss Module PCB (티엘비 전용 기판)</text>
            </g>

            <!-- 4. 하단 PCIe 5.0 x8/x16 EDSFF 골드 핑거 커넥터 (Gold Fingers) -->
            <g transform="translate(70, 153)">
                <!-- 커넥터 베이스 서브스트레이트 -->
                <polygon points="0,0 290,0 280,24 10,24" fill="#1e293b" stroke="#334155" stroke-width="1"/>
                <!-- 골드 핑거 핀 어레이 -->
                <g fill="url(#grad-cxl-gold)" stroke="#b45309" stroke-width="0.4">
                    <rect x="20" y="2" width="4" height="20" rx="1"/>
                    <rect x="28" y="2" width="4" height="20" rx="1"/>
                    <rect x="36" y="2" width="4" height="20" rx="1"/>
                    <rect x="44" y="2" width="4" height="20" rx="1"/>
                    <rect x="52" y="2" width="4" height="20" rx="1"/>
                    <rect x="60" y="2" width="4" height="20" rx="1"/>
                    <rect x="68" y="2" width="4" height="20" rx="1"/>
                    <rect x="76" y="2" width="4" height="20" rx="1"/>
                    <rect x="84" y="2" width="4" height="20" rx="1"/>
                    <rect x="92" y="2" width="4" height="20" rx="1"/>
                    <!-- 중간 키 홈 (Key Notch) -->
                    <rect x="108" y="2" width="4" height="20" rx="1"/>
                    <rect x="116" y="2" width="4" height="20" rx="1"/>
                    <rect x="124" y="2" width="4" height="20" rx="1"/>
                    <rect x="132" y="2" width="4" height="20" rx="1"/>
                    <rect x="140" y="2" width="4" height="20" rx="1"/>
                    <rect x="148" y="2" width="4" height="20" rx="1"/>
                    <rect x="156" y="2" width="4" height="20" rx="1"/>
                    <rect x="164" y="2" width="4" height="20" rx="1"/>
                    <rect x="172" y="2" width="4" height="20" rx="1"/>
                    <rect x="180" y="2" width="4" height="20" rx="1"/>
                    <rect x="188" y="2" width="4" height="20" rx="1"/>
                    <rect x="196" y="2" width="4" height="20" rx="1"/>
                    <rect x="204" y="2" width="4" height="20" rx="1"/>
                    <rect x="212" y="2" width="4" height="20" rx="1"/>
                    <rect x="220" y="2" width="4" height="20" rx="1"/>
                    <rect x="228" y="2" width="4" height="20" rx="1"/>
                    <rect x="236" y="2" width="4" height="20" rx="1"/>
                    <rect x="244" y="2" width="4" height="20" rx="1"/>
                    <rect x="252" y="2" width="4" height="20" rx="1"/>
                    <rect x="260" y="2" width="4" height="20" rx="1"/>
                </g>
                <text x="145" y="36" fill="#f59e0b" font-size="8" font-weight="700" text-anchor="middle">
                    PCIe 5.0 x8 / x16 Gold Finger Interface (32GT/s NRZ 차동 신호 핀 어레이)
                </text>
            </g>

            <!-- 세부 부품 라벨 및 신호 경로 설명 박스 -->
            <g transform="translate(15, 205)">
                <rect x="0" y="0" width="400" height="110" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
                <text x="12" y="18" fill="#38bdf8" font-size="9" font-weight="700">■ CXL 2.0 CMM-D 하드웨어 핵심 기술 포인트</text>
                <text x="12" y="36" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">CXL 컨트롤러 ASIC:</tspan> 호스트 PCIe 5.0 신호를 수신해 DDR5 채널로 초저지연 직렬 변환</text>
                <text x="12" y="52" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">추가 지연시간(Latency):</tspan> 직접 부착 DDR5 대비 단 <tspan fill="#38bdf8">+50~70ns</tspan> 수준의 오버헤드로 극소화</text>
                <text x="12" y="68" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">핫플러그(Hot-Plug) 지원:</tspan> 서버 무중단 상태에서 메모리 모듈 탈부착 및 용량 동적 증설</text>
                <text x="12" y="84" fill="#cbd5e1" font-size="8">• <tspan fill="#ffffff" font-weight="700">국내 제조 밸류체인:</tspan> 삼성전자(CMM-D 양산), SK하이닉스, 티엘비(PCB), 파두(컨트롤러)</text>
                <text x="12" y="100" fill="#10b981" font-size="8">✓ 1U/2U 랙 서버의 DIMM 슬롯 수 제약(최대 16~32개)을 돌파하여 메모리 테라바이트급 확장</text>
            </g>
        </g>

        <!-- 우측: CXL 프로토콜 스택 및 호스트 인터페이스 구조 (Protocol & Flow Architecture) -->
        <g transform="translate(465, 55)">
            <rect x="0" y="0" width="275" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ CXL 통신 프로토콜 계층도</text>

            <!-- 호스트 CPU 블록 -->
            <g transform="translate(15, 36)">
                <rect x="0" y="0" width="245" height="42" fill="#1e293b" stroke="#0284c7" stroke-width="1.5" rx="3"/>
                <text x="122" y="18" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">호스트 CPU (인텔 Xeon / AMD EPYC)</text>
                <text x="122" y="32" fill="#38bdf8" font-size="7.5" text-anchor="middle">CXL Root Complex / Direct Memory Map</text>
            </g>

            <!-- 연결 신호선 화살표 -->
            <line x1="80" y1="78" x2="80" y2="105" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3,2"/>
            <line x1="180" y1="78" x2="180" y2="105" stroke="#10b981" stroke-width="2"/>

            <!-- CXL Dual Protocol Dual-Channel -->
            <g transform="translate(15, 105)">
                <!-- CXL.io 블록 -->
                <rect x="0" y="0" width="118" height="65" fill="#0f172a" stroke="#0284c7" stroke-width="1.2" rx="3"/>
                <text x="59" y="18" fill="#38bdf8" font-size="8.5" font-weight="700" text-anchor="middle">CXL.io</text>
                <text x="59" y="32" fill="#94a3b8" font-size="7" text-anchor="middle">표준 PCIe 프로토콜 호환</text>
                <text x="59" y="44" fill="#64748b" font-size="6.5" text-anchor="middle">• 장치 검색 및 열거</text>
                <text x="59" y="55" fill="#64748b" font-size="6.5" text-anchor="middle">• RAS 에러 핸들링/구성</text>

                <!-- CXL.mem 블록 -->
                <rect x="127" y="0" width="118" height="65" fill="#0f172a" stroke="#10b981" stroke-width="1.5" rx="3"/>
                <text x="186" y="18" fill="#34d399" font-size="8.5" font-weight="800" text-anchor="middle">CXL.mem</text>
                <text x="186" y="32" fill="#6ee7b7" font-size="7" font-weight="700" text-anchor="middle">초저지연 메모리 트랜잭션</text>
                <text x="186" y="44" fill="#a7f3d0" font-size="6.5" text-anchor="middle">• 바이트 단위 직접 로드/스토어</text>
                <text x="186" y="55" fill="#a7f3d0" font-size="6.5" text-anchor="middle">• Host-Managed Device Mem</text>
            </g>

            <!-- CXL 컨트롤러 하드웨어 로직 레이어 -->
            <g transform="translate(15, 185)">
                <rect x="0" y="0" width="245" height="60" fill="#0284c7" fill-opacity="0.15" stroke="#38bdf8" stroke-width="1.2" rx="3"/>
                <text x="122" y="16" fill="#38bdf8" font-size="8.5" font-weight="700" text-anchor="middle">CXL Controller Protocol Engine</text>
                <rect x="10" y="24" width="68" height="28" fill="#1e293b" stroke="#475569" stroke-width="0.8" rx="2"/>
                <text x="44" y="41" fill="#cbd5e1" font-size="6.5" text-anchor="middle">Address Map</text>

                <rect x="88" y="24" width="68" height="28" fill="#1e293b" stroke="#475569" stroke-width="0.8" rx="2"/>
                <text x="122" y="41" fill="#cbd5e1" font-size="6.5" text-anchor="middle">Retry/ECC Log</text>

                <rect x="166" y="24" width="68" height="28" fill="#1e293b" stroke="#475569" stroke-width="0.8" rx="2"/>
                <text x="200" y="41" fill="#cbd5e1" font-size="6.5" text-anchor="middle">DDR5 PHY/Hub</text>
            </g>

            <!-- 최하단: CMM-D DDR5 로컬 메모리 -->
            <g transform="translate(15, 260)">
                <rect x="0" y="0" width="245" height="55" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5" rx="3"/>
                <text x="122" y="18" fill="#c7d2fe" font-size="8.5" font-weight="700" text-anchor="middle">CMM-D Local DDR5 DRAM 풀</text>
                <text x="122" y="32" fill="#a5b4fc" font-size="7" text-anchor="middle">단일 모듈당 128GB ~ 최대 512GB 고용량 구성</text>
                <text x="122" y="45" fill="#818cf8" font-size="6.5" text-anchor="middle">DDR5-5600/6400 MT/s 8채널 병렬 인터리빙</text>
            </g>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ CXL 2.0 메모리 확장(CMM-D) 핵심 기술 규격 요약</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">폼팩터: EDSFF E3.S (76 × 112.75 × 7.5 mm)</text>
                <rect x="250" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="265" y="11" fill="#cbd5e1" font-size="10">대역폭: PCIe 5.0 x8 (32GB/s) / x16 (64GB/s)</text>
                <rect x="505" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="520" y="11" fill="#cbd5e1" font-size="10">확장 용량: 모듈당 최대 512GB DDR5</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 추가 지연시간: <tspan fill="#ffffff">+50~70ns (DDR5 대비 미미한 지연)</tspan></text>
                <text x="250" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 핫플러그(Hot-Plug): <tspan fill="#ffffff">서버 무중단 실시간 장착 지원</tspan></text>
                <text x="505" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 시장 적용: <tspan fill="#fef08a">인텔 Xeon 4/5/6세대, AMD EPYC 4/5세대</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 9. CXL 3.0 메모리 풀링 & 스위치 (Memory Pooling Fabric) 정밀 아키텍처 구조도
function getCxlPoolingSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-cxl-pool" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-cxl-switch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0891b2"/>
                <stop offset="50%" stop-color="#0e7490"/>
                <stop offset="100%" stop-color="#155e75"/>
            </linearGradient>
            <linearGradient id="grad-host-cpu" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
            <linearGradient id="grad-host-gpu" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#10b981"/>
                <stop offset="100%" stop-color="#047857"/>
            </linearGradient>
            <linearGradient id="grad-host-ai" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6"/>
                <stop offset="100%" stop-color="#6d28d9"/>
            </linearGradient>
            <linearGradient id="grad-cxl-pool-mem" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#b45309"/>
                <stop offset="50%" stop-color="#d97706"/>
                <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
            <filter id="cxl-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- 배경 그리드 -->
        <rect width="100%" height="100%" fill="#070c14"/>
        <rect width="100%" height="100%" fill="url(#grid-cxl-pool)"/>

        <!-- 상단 도면 타이틀 & 스펙 태그 -->
        <g transform="translate(20, 24)">
            <text x="0" y="0" fill="#38bdf8" font-family="'Consolas', monospace" font-size="12" font-weight="700" letter-spacing="1.5">
                [CXL-FABRIC-02] CXL 3.0 MULTI-HOST MEMORY POOLING &amp; SWITCH FABRIC
            </text>
            <text x="0" y="15" fill="#64748b" font-family="'Consolas', monospace" font-size="9">
                Disaggregated Composable Architecture | PCIe 6.0 64GT/s PAM4 | Dynamic Memory Sharing &amp; Hardware Coherency
            </text>
            <rect x="620" y="-12" width="100" height="22" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" rx="3"/>
            <text x="670" y="3" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">CLICK TO ZOOM</text>
        </g>

        <!-- 좌측 메인: CXL 3.0 다중 호스트 메모리 풀링 토폴로지 (3-Tier Fabric Topology) -->
        <g transform="translate(20, 55)">
            <rect x="0" y="0" width="455" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="20" fill="#94a3b8" font-size="10.5" font-weight="700">■ CXL 3.0 멀티 호스트 동적 풀링 패브릭 구조도</text>

            <!-- 계층 1: Multi-Host Compute Nodes (독립 서버 노드들) -->
            <g transform="translate(15, 32)">
                <!-- Host 1: General CPU Cluster -->
                <rect x="0" y="0" width="130" height="52" fill="url(#grad-host-cpu)" stroke="#38bdf8" stroke-width="1.2" rx="3"/>
                <text x="65" y="18" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">Host #1: Xeon/EPYC</text>
                <text x="65" y="30" fill="#bae6fd" font-size="7" text-anchor="middle">CPU Computing Cluster</text>
                <rect x="15" y="36" width="100" height="12" fill="#082f49" rx="1"/>
                <text x="65" y="45" fill="#38bdf8" font-size="6.5" font-weight="700" text-anchor="middle">CXL 3.0 Root Port</text>

                <!-- Host 2: GPU AI Training Cluster -->
                <rect x="145" y="0" width="135" height="52" fill="url(#grad-host-gpu)" stroke="#34d399" stroke-width="1.2" rx="3"/>
                <text x="212" y="18" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">Host #2: B200 / H100</text>
                <text x="212" y="30" fill="#a7f3d0" font-size="7" text-anchor="middle">GPU AI Training Cluster</text>
                <rect x="162" y="36" width="100" height="12" fill="#064e3b" rx="1"/>
                <text x="212" y="45" fill="#34d399" font-size="6.5" font-weight="700" text-anchor="middle">CXL 3.0 Root Port</text>

                <!-- Host 3: AI Inference NPU -->
                <rect x="290" y="0" width="135" height="52" fill="url(#grad-host-ai)" stroke="#a78bfa" stroke-width="1.2" rx="3"/>
                <text x="357" y="18" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">Host #3: NPU / AI Accel</text>
                <text x="357" y="30" fill="#ddd6fe" font-size="7" text-anchor="middle">Large Model Inference</text>
                <rect x="307" y="36" width="100" height="12" fill="#2e1065" rx="1"/>
                <text x="357" y="45" fill="#a78bfa" font-size="6.5" font-weight="700" text-anchor="middle">CXL 3.0 Root Port</text>
            </g>

            <!-- 패브릭 상하 링크 버스 (PCIe 6.0 64GT/s PAM4 Link) -->
            <g stroke="#06b6d4" stroke-width="2">
                <line x1="80" y1="84" x2="130" y2="110"/>
                <line x1="227" y1="84" x2="227" y2="110"/>
                <line x1="372" y1="84" x2="325" y2="110"/>
            </g>
            <text x="227" y="102" fill="#67e8f9" font-size="7" font-weight="700" text-anchor="middle">PCIe 6.0 64GT/s PAM4 링크 (포트당 양방향 128GB/s)</text>

            <!-- 계층 2: 중앙 CXL 3.0 고속 패브릭 스위치 코어 (Astera Labs Leo Platform Core) -->
            <g transform="translate(45, 110)">
                <rect x="0" y="0" width="365" height="74" fill="url(#grad-cxl-switch)" stroke="#22d3ee" stroke-width="1.8" rx="4" filter="url(#cxl-glow-cyan)"/>
                <!-- 스위치 타이틀 -->
                <text x="182" y="18" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">
                    CXL 3.0 Fabric Switch (Astera Labs Leo Platform Core)
                </text>

                <!-- 내부 엔진 블록 3개 -->
                <rect x="12" y="26" width="105" height="38" fill="#083344" stroke="#06b6d4" stroke-width="1" rx="2"/>
                <text x="64" y="41" fill="#67e8f9" font-size="7.5" font-weight="700" text-anchor="middle">Dynamic Allocator</text>
                <text x="64" y="53" fill="#cbd5e1" font-size="6.5" text-anchor="middle">실시간 메모리 가상화 슬라이싱</text>

                <rect x="130" y="26" width="105" height="38" fill="#083344" stroke="#06b6d4" stroke-width="1" rx="2"/>
                <text x="182" y="41" fill="#67e8f9" font-size="7.5" font-weight="800" text-anchor="middle">Hardware Coherency</text>
                <text x="182" y="53" fill="#cbd5e1" font-size="6.5" text-anchor="middle">Back-Invalidation (BI) 엔진</text>

                <rect x="248" y="26" width="105" height="38" fill="#083344" stroke="#06b6d4" stroke-width="1" rx="2"/>
                <text x="300" y="41" fill="#67e8f9" font-size="7.5" font-weight="700" text-anchor="middle">Multi-Head Router</text>
                <text x="300" y="53" fill="#cbd5e1" font-size="6.5" text-anchor="middle">P2P 다이렉트 바이패스 라우팅</text>
            </g>

            <!-- 패브릭 하부 링크 -->
            <g stroke="#f59e0b" stroke-width="2">
                <line x1="140" y1="184" x2="100" y2="210"/>
                <line x1="227" y1="184" x2="227" y2="210"/>
                <line x1="315" y1="184" x2="355" y2="210"/>
            </g>
            <text x="227" y="202" fill="#fcd34d" font-size="7" font-weight="700" text-anchor="middle">MHD(Multi-Headed Device) 메모리 풀 직결 연결</text>

            <!-- 계층 3: 거대 공유 분산 메모리 풀 (Disaggregated Pooled Memory Sleds) -->
            <g transform="translate(15, 210)">
                <rect x="0" y="0" width="425" height="108" fill="#1e1b4b" fill-opacity="0.6" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
                <text x="15" y="18" fill="#fbbf24" font-size="9" font-weight="700">■ Disaggregated Memory Pool (CMM-D / CMM-B 고밀도 랙 어레이)</text>

                <!-- 메모리 슬라이스 시각화 (동적 할당 현황) -->
                <!-- 슬라이스 1: Host #1 할당 -->
                <rect x="15" y="28" width="115" height="42" fill="#0369a1" stroke="#38bdf8" stroke-width="1" rx="2"/>
                <text x="72" y="44" fill="#ffffff" font-size="7.5" font-weight="700" text-anchor="middle">Host #1 전용 풀 (640GB)</text>
                <text x="72" y="56" fill="#bae6fd" font-size="6.5" text-anchor="middle">OS 커널 / DB 인메모리 버퍼</text>

                <!-- 슬라이스 2: Host #2 GPU AI 학습 할당 -->
                <rect x="135" y="28" width="155" height="42" fill="#047857" stroke="#34d399" stroke-width="1" rx="2"/>
                <text x="212" y="44" fill="#ffffff" font-size="7.5" font-weight="700" text-anchor="middle">Host #2 AI 학습 풀 (1.5TB)</text>
                <text x="212" y="56" fill="#a7f3d0" font-size="6.5" text-anchor="middle">LLM 가중치 캐시 및 KV-Cache 공유</text>

                <!-- 슬라이스 3: Host #3 추론 및 유동 여유 풀 -->
                <rect x="295" y="28" width="115" height="42" fill="#6d28d9" stroke="#a78bfa" stroke-width="1" rx="2"/>
                <text x="352" y="44" fill="#ffffff" font-size="7.5" font-weight="700" text-anchor="middle">Host #3 전용 풀 (800GB)</text>
                <text x="352" y="56" fill="#ddd6fe" font-size="6.5" text-anchor="middle">배치 추론 동적 스케일아웃</text>

                <!-- 유휴 메모리 0% (Zero Stranded Memory) 알림 바 -->
                <rect x="15" y="76" width="395" height="22" fill="#0f172a" stroke="#10b981" stroke-width="1" rx="2"/>
                <circle cx="28" cy="87" r="4" fill="#10b981"/>
                <text x="38" y="90" fill="#34d399" font-size="7.5" font-weight="700">
                    Zero Stranded Memory: 서버별 고정 할당 방식 대비 유휴 메모리 낭비 제로화 (활용률 95%+ 달성)
                </text>
            </g>
        </g>

        <!-- 우측: 기존 방식 vs CXL 3.0 풀링 비교 및 밸류체인 -->
        <g transform="translate(485, 55)">
            <rect x="0" y="0" width="255" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ CXL 3.0 핵심 혁신 비교</text>

            <!-- 비교 1: 기존 서버 아키텍처 (메모리 고립) -->
            <g transform="translate(15, 36)">
                <rect x="0" y="0" width="225" height="60" fill="#1e293b" stroke="#64748b" stroke-width="1" rx="3"/>
                <text x="10" y="16" fill="#ef4444" font-size="8" font-weight="700">[기존] 사일로(Silo) 메모리 구조</text>
                <text x="10" y="32" fill="#94a3b8" font-size="7">• 각 서버 DIMM 슬롯에 물리적 고정</text>
                <text x="10" y="44" fill="#94a3b8" font-size="7">• 유휴 메모리 타 서버 공유 불가 (30% 낭비)</text>
                <text x="10" y="54" fill="#f87171" font-size="6.5">⚠️ Memory Stranding으로 인프라 비용 급증</text>
            </g>

            <!-- 비교 2: CXL 3.0 풀링 패브릭 (동적 공유) -->
            <g transform="translate(15, 105)">
                <rect x="0" y="0" width="225" height="70" fill="#083344" stroke="#06b6d4" stroke-width="1.2" rx="3"/>
                <text x="10" y="16" fill="#22d3ee" font-size="8" font-weight="700">[CXL 3.0] 동적 메모리 풀링</text>
                <text x="10" y="32" fill="#cbd5e1" font-size="7">• 중앙 스위치에서 테라바이트급 풀 구성</text>
                <text x="10" y="44" fill="#cbd5e1" font-size="7">• 서버 필요량에 따라 실시간 할당/회수</text>
                <text x="10" y="56" fill="#34d399" font-size="7.5" font-weight="700">✓ 데이터센터 TCO 30% 이상 절감</text>
            </g>

            <!-- 밸류체인 및 핵심 수혜 기업 -->
            <g transform="translate(15, 185)">
                <rect x="0" y="0" width="225" height="135" fill="#0f172a" stroke="#1e293b" stroke-width="1" rx="3"/>
                <text x="10" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ CXL 3.0 핵심 생태계 밸류체인</text>

                <text x="10" y="36" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">패브릭 스위치 독점:</tspan> 아스테라랩스 (ALAB)</text>
                <text x="10" y="50" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">메모리 모듈 양산:</tspan> 삼성전자, SK하이닉스</text>
                <text x="10" y="64" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">차세대 검사 장비:</tspan> 엑시콘, 네오셈</text>
                <text x="10" y="78" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">초고속 모듈 기판:</tspan> 티엘비 (CXL 기판 공급)</text>
                <text x="10" y="92" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">인터페이스 IP:</tspan> 오픈엣지테크놀로지</text>

                <rect x="10" y="104" width="205" height="22" fill="#1e1b4b" rx="2"/>
                <text x="112" y="118" fill="#a5b4fc" font-size="6.5" font-weight="700" text-anchor="middle">
                    차세대 AI 데이터센터 메모리 병목의 최종 해법
                </text>
            </g>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ CXL 3.0 메모리 풀링 &amp; 스위치 패브릭 핵심 엔지니어링 지표</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#0891b2" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">물리 계층: PCIe 6.0 기반 64GT/s PAM4 (Flit 모드)</text>
                <rect x="250" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="265" y="11" fill="#cbd5e1" font-size="10">코히런시: 다중 호스트 하드웨어 캐시 일관성</text>
                <rect x="505" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="520" y="11" fill="#cbd5e1" font-size="10">대역폭: 포트당 양방향 최대 128GB/s</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 유휴 메모리 낭비: <tspan fill="#ffffff">Stranded Memory 0% 달성</tspan></text>
                <text x="250" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 데이터센터 TCO: <tspan fill="#ffffff">총소유비용 30% 이상 절감</tspan></text>
                <text x="505" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 스위치 리더: <tspan fill="#fef08a">Astera Labs Leo Fabric Switch 독점</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 10. 경수로형 SMR (뉴스케일 VOYGR 77MWe) 정밀 일체형 RPV 단면도
function getPwrSmrSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-smr-pwr" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-pool-water" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#0369a1" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="grad-cnv-vessel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#334155"/>
                <stop offset="50%" stop-color="#475569"/>
                <stop offset="100%" stop-color="#334155"/>
            </linearGradient>
            <linearGradient id="grad-rpv-vessel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#1e293b"/>
                <stop offset="50%" stop-color="#334155"/>
                <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
            <linearGradient id="grad-smr-core" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ef4444"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#dc2626"/>
            </linearGradient>
            <linearGradient id="grad-smr-helical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
            <filter id="pwr-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- 배경 그리드 -->
        <rect width="100%" height="100%" fill="#070c14"/>
        <rect width="100%" height="100%" fill="url(#grid-smr-pwr)"/>

        <!-- 상단 도면 타이틀 & 스펙 태그 -->
        <g transform="translate(20, 24)">
            <text x="0" y="0" fill="#38bdf8" font-family="'Consolas', monospace" font-size="12" font-weight="700" letter-spacing="1.5">
                [SMR-PWR-01] INTEGRAL PWR SMR ARCHITECTURE (NUSCALE VOYGR 77MWe)
            </text>
            <text x="0" y="15" fill="#64748b" font-family="'Consolas', monospace" font-size="9">
                Dual-Vessel (RPV/CNV) | Helical-Coil SG | 100% Passive Safety Pool Cooling | Doosan Heavy Forging
            </text>
            <rect x="620" y="-12" width="100" height="22" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" rx="3"/>
            <text x="670" y="3" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">CLICK TO ZOOM</text>
        </g>

        <!-- 좌측: 뉴스케일 VOYGR 일체형 원자로 정밀 단면도 (Integral SMR Cross-Section) -->
        <g transform="translate(20, 55)">
            <!-- 1. 지하 비상 냉각 수조 (Underground Safety Water Pool) -->
            <rect x="0" y="0" width="435" height="330" fill="url(#grad-pool-water)" rx="6" stroke="#0284c7" stroke-width="1.5"/>
            <!-- 수면 라인 -->
            <line x1="0" y1="20" x2="435" y2="20" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="6,3"/>
            <text x="15" y="15" fill="#7dd3fc" font-size="9" font-weight="700">■ 지하 피동 비상 냉각 수조 (무한 자연 방열원 - 멜트다운 0%)</text>

            <!-- 2. 격납용기 (CNV: Containment Vessel - 외경 약 4.5m, 높이 약 25m 축소 도면) -->
            <g transform="translate(130, 25)">
                <!-- CNV 외벽 (고장력 탄소강 / 내부 고진공 유지) -->
                <path d="M 20,15 C 20,5 155,5 155,15 L 165,260 C 165,285 10,285 10,260 Z" 
                      fill="url(#grad-cnv-vessel)" stroke="#94a3b8" stroke-width="1.8"/>
                <text x="87" y="14" fill="#cbd5e1" font-size="7" font-weight="700" text-anchor="middle">격납용기 (CNV, 진공 단열)</text>

                <!-- 3. 원자로 압력용기 (RPV: Reactor Pressure Vessel - 두산에너빌리티 일체형 단조품) -->
                <path d="M 35,25 C 35,18 140,18 140,25 L 148,245 C 148,265 27,265 27,245 Z" 
                      fill="url(#grad-rpv-vessel)" stroke="#0ea5e9" stroke-width="2"/>
                <text x="87" y="27" fill="#38bdf8" font-size="6.5" font-weight="800" text-anchor="middle">원자로 압력용기 (RPV)</text>

                <!-- 3-1. 최상단: 내장형 가압기 (Integrated Pressurizer, 13.8 MPa) -->
                <rect x="45" y="32" width="85" height="20" fill="#0f172a" stroke="#38bdf8" stroke-width="0.8" rx="2"/>
                <text x="87" y="44" fill="#bae6fd" font-size="6.5" font-weight="700" text-anchor="middle">가압기 (Pressurizer 13.8MPa)</text>

                <!-- 3-2. 제어봉 구동장치 (CRDM 관통선) -->
                <line x1="75" y1="52" x2="75" y2="185" stroke="#f59e0b" stroke-width="1.2"/>
                <line x1="99" y1="52" x2="99" y2="185" stroke="#f59e0b" stroke-width="1.2"/>

                <!-- 3-3. 헬리컬 코일 증기발생기 (Helical-Coil Steam Generator, 양측 2세트) -->
                <g fill="none" stroke="url(#grad-smr-helical)" stroke-width="1.6">
                    <!-- 좌측 헬리컬 코일 -->
                    <path d="M 40,75 Q 52,82 40,90 Q 52,98 40,106 Q 52,114 40,122 Q 52,130 40,138 Q 52,146 40,154"/>
                    <path d="M 45,75 Q 57,82 45,90 Q 57,98 45,106 Q 57,114 45,122 Q 57,130 45,138 Q 57,146 45,154"/>
                    <!-- 우측 헬리컬 코일 -->
                    <path d="M 135,75 Q 123,82 135,90 Q 123,98 135,106 Q 123,114 135,122 Q 123,130 135,138 Q 123,146 135,154"/>
                    <path d="M 130,75 Q 118,82 130,90 Q 118,98 130,106 Q 118,114 130,122 Q 118,130 130,138 Q 118,146 130,154"/>
                </g>
                <text x="87" y="112" fill="#38bdf8" font-size="7" font-weight="700" text-anchor="middle">중앙 라이저 (Riser)</text>
                <text x="87" y="122" fill="#67e8f9" font-size="6" text-anchor="middle">고온 냉각재 자연 상승로</text>
                <text x="36" y="68" fill="#38bdf8" font-size="6" font-weight="700">Helical SG</text>
                <text x="115" y="68" fill="#38bdf8" font-size="6" font-weight="700">Helical SG</text>

                <!-- 증기 방출 노즐 (터빈 발전기 연계) -->
                <line x1="35" y1="62" x2="5" y2="62" stroke="#38bdf8" stroke-width="2"/>
                <line x1="140" y1="62" x2="170" y2="62" stroke="#38bdf8" stroke-width="2"/>
                <text x="5" y="58" fill="#bae6fd" font-size="5.5">Steam Out</text>
                <text x="145" y="58" fill="#bae6fd" font-size="5.5">Feedwater In</text>

                <!-- 3-4. 하단 노심 (Reactor Core: 37개 UO2/HALEU 핵연료 집합체) -->
                <g transform="translate(52, 185)">
                    <rect x="0" y="0" width="71" height="52" fill="url(#grad-smr-core)" stroke="#ef4444" stroke-width="1.5" rx="2" filter="url(#pwr-glow)"/>
                    <text x="35" y="18" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">SMR CORE</text>
                    <text x="35" y="28" fill="#fef08a" font-size="6.5" font-weight="700" text-anchor="middle">37 Fuel Assemblies</text>
                    <text x="35" y="38" fill="#fee2e2" font-size="6" text-anchor="middle">열출력 250MWth</text>
                    <text x="35" y="47" fill="#ffffff" font-size="6" font-weight="800" text-anchor="middle">전기출력 77MWe</text>
                </g>

                <!-- 자연 순환 냉각재 순환 화살표 (Natural Circulation Arrows) -->
                <!-- 중앙 상승류 (빨강) -->
                <path d="M 87,175 L 87,80" stroke="#f87171" stroke-width="1.5" stroke-dasharray="3,2" marker-end="url(#arrow)"/>
                <!-- 양측 하강류 (파랑 - 다운커머) -->
                <path d="M 33,85 L 33,180" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="3,2"/>
                <path d="M 142,85 L 142,180" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="3,2"/>
                <text x="26" y="140" fill="#93c5fd" font-size="5" -webkit-writing-mode="vertical-rl" text-anchor="middle">Downcomer</text>
            </g>

            <!-- 좌측 하단 상세 스펙 박스 -->
            <g transform="translate(15, 230)">
                <rect x="0" y="0" width="130" height="85" fill="#0f172a" fill-opacity="0.85" rx="3" stroke="#1e293b" stroke-width="1"/>
                <text x="10" y="15" fill="#38bdf8" font-size="7.5" font-weight="700">■ VOYGR 안전계통</text>
                <text x="10" y="30" fill="#cbd5e1" font-size="6.5">• 무전원 자연대류 냉각</text>
                <text x="10" y="43" fill="#cbd5e1" font-size="6.5">• 냉각재 펌프 없음 (No RCP)</text>
                <text x="10" y="56" fill="#cbd5e1" font-size="6.5">• 배관 파단 사고(LOCA) 원천 배제</text>
                <text x="10" y="69" fill="#10b981" font-size="6.5" font-weight="700">✓ 무기한 무전원 냉각 유지</text>
            </g>

            <!-- 우측 하단 두산에너빌리티 주기기 단조 박스 -->
            <g transform="translate(290, 230)">
                <rect x="0" y="0" width="130" height="85" fill="#0f172a" fill-opacity="0.85" rx="3" stroke="#1e293b" stroke-width="1"/>
                <text x="10" y="15" fill="#f59e0b" font-size="7.5" font-weight="700">■ 두산에너빌리티 독점</text>
                <text x="10" y="30" fill="#cbd5e1" font-size="6.5">• RPV 대형 단조품 단독 수주</text>
                <text x="10" y="43" fill="#cbd5e1" font-size="6.5">• 증기발생기 튜브 용접 제작</text>
                <text x="10" y="56" fill="#cbd5e1" font-size="6.5">• 연간 수십 기 공장 모듈 양산</text>
                <text x="10" y="69" fill="#fcd34d" font-size="6.5" font-weight="700">✓ 글로벌 SMR 파운드리 1위</text>
            </g>
        </g>

        <!-- 우측: 원자로 자연 순환 메커니즘 & 사업 모델 -->
        <g transform="translate(465, 55)">
            <rect x="0" y="0" width="275" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ 자연 순환 원리 &amp; 밸류체인</text>

            <!-- 1. 100% 무전원 피동 순환 원리 -->
            <g transform="translate(15, 36)">
                <rect x="0" y="0" width="245" height="75" fill="#082f49" stroke="#0284c7" stroke-width="1.2" rx="3"/>
                <text x="10" y="16" fill="#38bdf8" font-size="8" font-weight="700">1. 무전원 자연대류 (Natural Circulation)</text>
                <text x="10" y="32" fill="#cbd5e1" font-size="7">• 밀도 차이에 의한 자동 순환 (펌프 전력 0W)</text>
                <text x="10" y="46" fill="#cbd5e1" font-size="7">• 노심 발열 ➡️ 비중 감소로 중앙 상승(Riser)</text>
                <text x="10" y="60" fill="#cbd5e1" font-size="7">• 증기발생기 열교환 후 하강(Downcomer)</text>
            </g>

            <!-- 2. 공장 일괄 모듈 조립 (Shop Fabrication) -->
            <g transform="translate(15, 120)">
                <rect x="0" y="0" width="245" height="65" fill="#1e293b" stroke="#475569" stroke-width="1" rx="3"/>
                <text x="10" y="16" fill="#f59e0b" font-size="8" font-weight="700">2. 공장 제작 &amp; 운송 (Modular Construction)</text>
                <text x="10" y="32" fill="#94a3b8" font-size="7">• 부지 건설 공기: 10년 ➡️ 단 3~4년으로 단축</text>
                <text x="10" y="46" fill="#94a3b8" font-size="7">• 바지선/트럭으로 완성형 모듈 운송 후 결합</text>
                <text x="10" y="58" fill="#10b981" font-size="7">✓ 건설비 40% 절감 및 초기 리스크 최소화</text>
            </g>

            <!-- 3. 글로벌 밸류체인 및 수혜 기업 -->
            <g transform="translate(15, 195)">
                <rect x="0" y="0" width="245" height="120" fill="#0f172a" stroke="#1e293b" stroke-width="1" rx="3"/>
                <text x="10" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ 핵심 생태계 밸류체인</text>
                <text x="10" y="36" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">설계 원천사:</tspan> 뉴스케일파워 (NuScale - SMR)</text>
                <text x="10" y="50" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">주기기 단독 제작:</tspan> 두산에너빌리티 (단조/가공)</text>
                <text x="10" y="64" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">EPC 건설 시공:</tspan> 삼성물산, 현대건설</text>
                <text x="10" y="78" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">원전 설계/엔지니어링:</tspan> 한전기술, 한전KPS</text>
                <rect x="10" y="90" width="225" height="20" fill="#1e1b4b" rx="2"/>
                <text x="122" y="103" fill="#c7d2fe" font-size="6.5" font-weight="700" text-anchor="middle">
                    미국 NRC 세계 최초 표준설계인가(SDA) 획득
                </text>
            </g>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ 뉴스케일 VOYGR 경수로형 SMR 핵심 엔지니어링 지표</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">모듈 출력: 모듈당 77MWe (12기 결합 시 924MWe)</text>
                <rect x="260" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="275" y="11" fill="#cbd5e1" font-size="10">안전성: 100% 무전원 자연대류 냉각 (무기한 멜트다운 0%)</text>
                <rect x="525" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="540" y="11" fill="#cbd5e1" font-size="10">주기기 제조: 두산에너빌리티 단독</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 일체형 구조: <tspan fill="#ffffff">RPV 내 증기발생기/가압기 통합 (대형 배관 파단 배제)</tspan></text>
                <text x="320" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 건설 공기: <tspan fill="#ffffff">공장 모듈 제작으로 3~4년 내 준공</tspan></text>
                <text x="540" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 상용화: <tspan fill="#fef08a">루마니아 및 미국 데이터센터 공급</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 11. 4세대 소듐냉각고속로 (테라파워 Natrium SFR) 정밀 아키텍처 구조도
function getSfrNatriumSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-sfr-nat" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-liquid-na" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.85"/>
                <stop offset="100%" stop-color="#d97706" stop-opacity="0.95"/>
            </linearGradient>
            <linearGradient id="grad-molten-salt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ef4444"/>
                <stop offset="50%" stop-color="#f97316"/>
                <stop offset="100%" stop-color="#dc2626"/>
            </linearGradient>
            <linearGradient id="grad-cold-salt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
            <linearGradient id="grad-natrium-vessel" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#334155"/>
                <stop offset="50%" stop-color="#64748b"/>
                <stop offset="100%" stop-color="#334155"/>
            </linearGradient>
            <filter id="natrium-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- 배경 그리드 -->
        <rect width="100%" height="100%" fill="#070c14"/>
        <rect width="100%" height="100%" fill="url(#grid-sfr-nat)"/>

        <!-- 상단 도면 타이틀 & 스펙 태그 -->
        <g transform="translate(20, 24)">
            <text x="0" y="0" fill="#38bdf8" font-family="'Consolas', monospace" font-size="12" font-weight="700" letter-spacing="1.5">
                [SMR-SFR-02] GEN-IV SODIUM FAST REACTOR &amp; MOLTEN-SALT STORAGE (NATRIUM)
            </text>
            <text x="0" y="15" fill="#64748b" font-family="'Consolas', monospace" font-size="9">
                TerraPower &amp; GE Hitachi | Liquid Sodium (Atmospheric Pressure) | 345MWe Base ➡️ 500MWe Peak Boosting | 1GWh TES
            </text>
            <rect x="620" y="-12" width="100" height="22" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" rx="3"/>
            <text x="670" y="3" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">CLICK TO ZOOM</text>
        </g>

        <!-- 좌측: 테라파워 Natrium 3계통 하이브리드 아키텍처 (Reactor + Salt TES + Power Block) -->
        <g transform="translate(20, 55)">
            <rect x="0" y="0" width="460" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="20" fill="#94a3b8" font-size="10.5" font-weight="700">■ Natrium SFR 원자로 + 기가와트시급 용융염 저장(TES) 연계 계통도</text>

            <!-- 1. 1차 소듐 풀형 원자로 용기 (Primary Sodium Pool Reactor) -->
            <g transform="translate(15, 32)">
                <rect x="0" y="0" width="135" height="190" fill="#1e293b" stroke="#64748b" stroke-width="1.5" rx="4"/>
                <text x="67" y="16" fill="#f59e0b" font-size="8" font-weight="800" text-anchor="middle">1차 풀형 원자로 용기</text>
                <text x="67" y="26" fill="#cbd5e1" font-size="6.5" text-anchor="middle">대기압 운전 (고압폭발 0%)</text>

                <!-- 액체 나트륨(소듐) 풀 (비등점 883°C, 550°C 운전) -->
                <rect x="8" y="32" width="119" height="148" fill="url(#grad-liquid-na)" fill-opacity="0.3" stroke="#f59e0b" stroke-width="0.8" rx="2"/>
                <text x="67" y="45" fill="#fef08a" font-size="7" font-weight="700" text-anchor="middle">액체 나트륨 풀 (550°C)</text>

                <!-- 중간 열교환기 (IHX: Intermediate Heat Exchanger) -->
                <rect x="15" y="55" width="42" height="65" fill="#082f49" stroke="#0284c7" stroke-width="1" rx="2"/>
                <text x="36" y="85" fill="#38bdf8" font-size="7" font-weight="700" text-anchor="middle">중간열교환기</text>
                <text x="36" y="96" fill="#bae6fd" font-size="6" text-anchor="middle">(IHX)</text>

                <!-- 1차 전자기 펌프 (EM Pump - 구동부 없는 영구자석 방식) -->
                <rect x="75" y="55" width="45" height="35" fill="#0f172a" stroke="#10b981" stroke-width="1" rx="2"/>
                <text x="97" y="72" fill="#34d399" font-size="6.5" font-weight="700" text-anchor="middle">전자기 펌프</text>
                <text x="97" y="82" fill="#a7f3d0" font-size="5.5" text-anchor="middle">(EM Pump)</text>

                <!-- 고속로 노심 (HALEU 금속 연료 / 845MWth) -->
                <rect x="25" y="130" width="85" height="42" fill="#dc2626" stroke="#ef4444" stroke-width="1.5" rx="2" filter="url(#natrium-glow)"/>
                <text x="67" y="148" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">HALEU 금속 노심</text>
                <text x="67" y="159" fill="#fef08a" font-size="6.5" font-weight="700" text-anchor="middle">고에너지 고속 중성자</text>
                <text x="67" y="168" fill="#fee2e2" font-size="5.5" text-anchor="middle">845 MWth 열출력</text>
            </g>

            <!-- 2차 중간 소듐 루프 배관 (Intermediate Loop) -->
            <g stroke="#f59e0b" stroke-width="2.5" fill="none">
                <path d="M 51,87 L 165,87 L 165,115 L 180,115"/>
                <path d="M 180,135 L 165,135 L 165,145 L 51,145"/>
            </g>
            <text x="165" y="78" fill="#f59e0b" font-size="6.5" font-weight="700" text-anchor="middle">2차 소듐 루프</text>

            <!-- 2. 용융염 열에너지 저장장치 (Molten Salt Energy Island, 1GWh급) -->
            <g transform="translate(180, 45)">
                <rect x="0" y="0" width="135" height="175" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="1.2" rx="4"/>
                <text x="67" y="16" fill="#c4b5fd" font-size="7.5" font-weight="800" text-anchor="middle">용융염 열에너지 저장 (TES)</text>
                <text x="67" y="26" fill="#a78bfa" font-size="6.5" text-anchor="middle">1,000 MWh (1GWh) 버퍼</text>

                <!-- 고온 용융염 탱크 (Hot Salt Tank: 565°C) -->
                <rect x="12" y="35" width="111" height="52" fill="url(#grad-molten-salt)" stroke="#ef4444" stroke-width="1" rx="3"/>
                <text x="67" y="58" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">Hot Salt Tank</text>
                <text x="67" y="70" fill="#fef08a" font-size="7" font-weight="700" text-anchor="middle">565°C 고온 질산염 저장</text>

                <!-- 저온 용융염 탱크 (Cold Salt Tank: 290°C) -->
                <rect x="12" y="100" width="111" height="52" fill="url(#grad-cold-salt)" stroke="#0284c7" stroke-width="1" rx="3"/>
                <text x="67" y="123" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">Cold Salt Tank</text>
                <text x="67" y="135" fill="#bae6fd" font-size="7" font-weight="700" text-anchor="middle">290°C 회수 탱크</text>
            </g>

            <!-- 용융염 -> 증기발생기 연결관 -->
            <g stroke="#ef4444" stroke-width="2" fill="none">
                <path d="M 303,80 L 335,80"/>
            </g>
            <g stroke="#0284c7" stroke-width="2" fill="none">
                <path d="M 335,145 L 303,145"/>
            </g>

            <!-- 3. 초임계 증기 터빈 발전기 파워 아일랜드 (Power Conversion Island) -->
            <g transform="translate(335, 45)">
                <rect x="0" y="0" width="110" height="175" fill="#082f49" stroke="#0ea5e9" stroke-width="1.2" rx="4"/>
                <text x="55" y="18" fill="#38bdf8" font-size="7.5" font-weight="800" text-anchor="middle">초임계 터빈 발전기</text>

                <!-- 증기발생기 (Steam Generator) -->
                <rect x="10" y="28" width="90" height="38" fill="#0f172a" stroke="#38bdf8" stroke-width="1" rx="2"/>
                <text x="55" y="47" fill="#bae6fd" font-size="7" font-weight="700" text-anchor="middle">증기발생기 (SG)</text>
                <text x="55" y="58" fill="#94a3b8" font-size="6" text-anchor="middle">용융염 열 ➡️ 초임계 증기</text>

                <!-- 터빈 & 발전기 블록 -->
                <rect x="10" y="75" width="90" height="50" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.2" rx="2"/>
                <text x="55" y="93" fill="#34d399" font-size="7.5" font-weight="800" text-anchor="middle">345MWe 상시 기저</text>
                <text x="55" y="106" fill="#fef08a" font-size="8" font-weight="800" text-anchor="middle">➡️ 500MWe 부스팅</text>
                <text x="55" y="118" fill="#ffffff" font-size="6" text-anchor="middle">(5.5시간 피크 공급)</text>

                <!-- 냉각기 / 콘덴서 -->
                <rect x="10" y="133" width="90" height="30" fill="#0f172a" stroke="#475569" stroke-width="0.8" rx="2"/>
                <text x="55" y="152" fill="#94a3b8" font-size="6.5" text-anchor="middle">공랭식 콘덴서 (물 소비 없음)</text>
            </g>

            <!-- 하단 핵심 기술 해설 박스 -->
            <g transform="translate(15, 230)">
                <rect x="0" y="0" width="430" height="85" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
                <text x="12" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ 테라파워 Natrium SFR의 결정적 공학 혁신</text>
                <text x="12" y="34" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">대기압 상압 운전:</tspan> 물과 달리 끓는점이 883°C에 달해 가압용기 불필요, 고압 폭발 위험 원천 차단</text>
                <text x="12" y="48" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">피크 전력 부스팅:</tspan> AI 데이터센터 급증 부하 시 용융염 열을 방출해 출력을 345MWe에서 <tspan fill="#f59e0b">500MWe로 45% 증폭</tspan></text>
                <text x="12" y="62" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">방사성 폐기물 감축:</tspan> 고속 중성자로 핵분열 효율을 30배 이상 높여 장수명 폐기물 발생량 획기적 감소</text>
                <text x="12" y="76" fill="#10b981" font-size="7">✓ 미국 와이오밍주 1호기 착공 완료, HD현대(선박 추진 원자로/지분) 및 SK그룹 전략 파트너십</text>
            </g>
        </g>

        <!-- 우측: 원전 비교 & 생태계 밸류체인 -->
        <g transform="translate(490, 55)">
            <rect x="0" y="0" width="250" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ 4세대 원전 차별성 &amp; 밸류체인</text>

            <!-- 경수로 vs 소듐고속로 비교 표 -->
            <g transform="translate(12, 36)">
                <rect x="0" y="0" width="226" height="78" fill="#0f172a" stroke="#334155" stroke-width="1" rx="2"/>
                <text x="8" y="16" fill="#38bdf8" font-size="7.5" font-weight="700">■ 냉각재 특성 비교</text>
                <text x="8" y="32" fill="#94a3b8" font-size="6.5">• 냉각재: <tspan fill="#f87171">기존 경수로(경수 H2O)</tspan> vs <tspan fill="#34d399">SFR(액체 Na)</tspan></text>
                <text x="8" y="46" fill="#94a3b8" font-size="6.5">• 운전 압력: <tspan fill="#f87171">150기압(초고압)</tspan> vs <tspan fill="#34d399">1기압(대기압)</tspan></text>
                <text x="8" y="60" fill="#94a3b8" font-size="6.5">• 열효율: <tspan fill="#f87171">약 33%</tspan> vs <tspan fill="#34d399">40%+ (고온 초임계)</tspan></text>
                <text x="8" y="72" fill="#10b981" font-size="6" font-weight="700">✓ 상압 운전으로 원자로 용기 두께/비용 1/3 축소</text>
            </g>

            <!-- 핵심 밸류체인 -->
            <g transform="translate(12, 125)">
                <rect x="0" y="0" width="226" height="190" fill="#0f172a" stroke="#1e293b" stroke-width="1" rx="3"/>
                <text x="10" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ 테라파워 Natrium 밸류체인</text>

                <text x="10" y="36" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">설립자:</tspan> 빌 게이츠 (TerraPower)</text>
                <text x="10" y="50" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">원자로 공동개발:</tspan> GE 히타치(GEH)</text>
                <text x="10" y="66" fill="#94a3b8" font-size="7">• <tspan fill="#f59e0b" font-weight="700">HD현대그룹:</tspan></text>
                <text x="18" y="78" fill="#cbd5e1" font-size="6.5">- 테라파워 지분 투자 및 전략적 제휴</text>
                <text x="18" y="90" fill="#cbd5e1" font-size="6.5">- 해상 부유식 SMR 및 선박용 원전 개발</text>
                <text x="18" y="102" fill="#cbd5e1" font-size="6.5">- HD현대일렉트릭 (초고압 전력 변전 계통)</text>
                <text x="10" y="120" fill="#94a3b8" font-size="7">• <tspan fill="#f59e0b" font-weight="700">SK그룹:</tspan> 2.5억 달러 지분 투자</text>
                <text x="10" y="136" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">원전 기기 제작:</tspan> 두산에너빌리티</text>
                <text x="10" y="150" fill="#94a3b8" font-size="7">• <tspan fill="#ffffff" font-weight="700">정부 지원:</tspan> 미국 DOE ARDP 20억$</text>

                <rect x="8" y="162" width="210" height="20" fill="#1e1b4b" rx="2"/>
                <text x="113" y="175" fill="#a5b4fc" font-size="6.5" font-weight="700" text-anchor="middle">
                    2030년 상용화 목표 와이오밍 1호기 착공
                </text>
            </g>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ 테라파워 Natrium 4세대 소듐고속로 핵심 엔지니어링 지표</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">냉각재: 액체 나트륨 (비등점 883°C / 1기압 대기압 운전)</text>
                <rect x="270" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="285" y="11" fill="#cbd5e1" font-size="10">출력: 345MWe 상시 ➡️ 500MWe 피크 (1GWh TES)</text>
                <rect x="540" y="2" width="10" height="10" fill="#8b5cf6" rx="2"/>
                <text x="555" y="11" fill="#cbd5e1" font-size="10">열효율: 40% 이상 (초임계 증기 사이클)</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 부하 추종성: <tspan fill="#ffffff">AI 연산 부하 급증 시 즉각 45% 출력 부스팅</tspan></text>
                <text x="310" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 물 소비 제로: <tspan fill="#ffffff">사막·내륙 데이터센터 설치 가능(공랭식)</tspan></text>
                <text x="540" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 국내 파트너: <tspan fill="#fef08a">HD현대 &amp; SK그룹 전략적 투자</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

// 12. AI 데이터센터 직결 SMR 마이크로그리드 아키텍처 도면
function getAiSmrMicrogridSvg() {
    return `
    <svg viewBox="0 0 760 480" class="engineering-svg-blueprint" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="grid-ai-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#162238" stroke-width="0.8"/>
            </pattern>
            <linearGradient id="grad-grid-smr" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
            <linearGradient id="grad-grid-sub" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#d97706"/>
                <stop offset="50%" stop-color="#f59e0b"/>
                <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
            <linearGradient id="grad-grid-dc" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#047857"/>
                <stop offset="100%" stop-color="#065f46"/>
            </linearGradient>
            <filter id="grid-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
        </defs>

        <!-- 배경 그리드 -->
        <rect width="100%" height="100%" fill="#070c14"/>
        <rect width="100%" height="100%" fill="url(#grid-ai-grid)"/>

        <!-- 상단 도면 타이틀 & 스펙 태그 -->
        <g transform="translate(20, 24)">
            <text x="0" y="0" fill="#38bdf8" font-family="'Consolas', monospace" font-size="12" font-weight="700" letter-spacing="1.5">
                [SMR-GRID-03] AI DATA CENTER DIRECT SMR MICROGRID ARCHITECTURE
            </text>
            <text x="0" y="15" fill="#64748b" font-family="'Consolas', monospace" font-size="9">
                Behind-The-Meter (BTM) Direct PPA | 24/365 95%+ Capacity Factor | Zero Transmission Loss | Dedicated AI Island
            </text>
            <rect x="620" y="-12" width="100" height="22" fill="#0369a1" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1" rx="3"/>
            <text x="670" y="3" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">CLICK TO ZOOM</text>
        </g>

        <!-- 좌측 메인: BTM 마이크로그리드 캠퍼스 토폴로지 (Campus Layout) -->
        <g transform="translate(20, 55)">
            <rect x="0" y="0" width="460" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="20" fill="#94a3b8" font-size="10.5" font-weight="700">■ AI 데이터센터 단지 구내 독립 마이크로그리드(Behind-The-Meter) 배치도</text>

            <!-- 1. SMR 발전 아일랜드 (SMR Power Island - 400MWe) -->
            <g transform="translate(15, 32)">
                <rect x="0" y="0" width="130" height="185" fill="#082f49" stroke="#0ea5e9" stroke-width="1.5" rx="4"/>
                <text x="65" y="16" fill="#38bdf8" font-size="8" font-weight="800" text-anchor="middle">SMR 파워 아일랜드</text>
                <text x="65" y="26" fill="#bae6fd" font-size="6.5" text-anchor="middle">4기 결합 모듈 (308MWe)</text>

                <!-- 4기 SMR 원자로 모듈 시각화 -->
                <g transform="translate(12, 35)">
                    <!-- 모듈 1 -->
                    <rect x="0" y="0" width="48" height="42" fill="url(#grad-grid-smr)" stroke="#38bdf8" stroke-width="1" rx="2"/>
                    <text x="24" y="18" fill="#ffffff" font-size="6.5" font-weight="700" text-anchor="middle">SMR #1</text>
                    <text x="24" y="30" fill="#bae6fd" font-size="5.5" text-anchor="middle">77MWe</text>

                    <!-- 모듈 2 -->
                    <rect x="58" y="0" width="48" height="42" fill="url(#grad-grid-smr)" stroke="#38bdf8" stroke-width="1" rx="2"/>
                    <text x="82" y="18" fill="#ffffff" font-size="6.5" font-weight="700" text-anchor="middle">SMR #2</text>
                    <text x="82" y="30" fill="#bae6fd" font-size="5.5" text-anchor="middle">77MWe</text>

                    <!-- 모듈 3 -->
                    <rect x="0" y="48" width="48" height="42" fill="url(#grad-grid-smr)" stroke="#38bdf8" stroke-width="1" rx="2"/>
                    <text x="24" y="66" fill="#ffffff" font-size="6.5" font-weight="700" text-anchor="middle">SMR #3</text>
                    <text x="24" y="78" fill="#bae6fd" font-size="5.5" text-anchor="middle">77MWe</text>

                    <!-- 모듈 4 -->
                    <rect x="58" y="48" width="48" height="42" fill="url(#grad-grid-smr)" stroke="#38bdf8" stroke-width="1" rx="2"/>
                    <text x="82" y="66" fill="#ffffff" font-size="6.5" font-weight="700" text-anchor="middle">SMR #4</text>
                    <text x="82" y="78" fill="#bae6fd" font-size="5.5" text-anchor="middle">77MWe</text>
                </g>

                <!-- 터빈 및 고압 발전 출력단 -->
                <rect x="12" y="135" width="106" height="40" fill="#0f172a" stroke="#0ea5e9" stroke-width="1" rx="2"/>
                <text x="65" y="152" fill="#38bdf8" font-size="7" font-weight="700" text-anchor="middle">터빈 발전기 (TG Set)</text>
                <text x="65" y="165" fill="#fef08a" font-size="6.5" font-weight="700" text-anchor="middle">24kV 3상 무탄소 기저발전</text>
            </g>

            <!-- 발전 -> 변전 직결 링크 (BTM 버스덕트) -->
            <g stroke="#f59e0b" stroke-width="3" fill="none">
                <line x1="145" y1="125" x2="175" y2="125"/>
            </g>
            <text x="160" y="118" fill="#f59e0b" font-size="6" font-weight="700" text-anchor="middle">송전손실 0%</text>

            <!-- 2. 단지 내 초고압 독립 변전 및 지능형 EMS 배전센터 (On-Site Substation) -->
            <g transform="translate(175, 45)">
                <rect x="0" y="0" width="120" height="160" fill="#1e1b4b" stroke="#f59e0b" stroke-width="1.2" rx="4"/>
                <text x="60" y="16" fill="#fef08a" font-size="7.5" font-weight="800" text-anchor="middle">구내 독립 변전소 (Substation)</text>
                <text x="60" y="26" fill="#cbd5e1" font-size="6" text-anchor="middle">공공 송전망 완전 분리(BTM)</text>

                <!-- 초고압 변압기 (Power Transformer) -->
                <rect x="10" y="35" width="100" height="38" fill="#0f172a" stroke="#d97706" stroke-width="1" rx="2"/>
                <text x="60" y="52" fill="#fcd34d" font-size="7" font-weight="700" text-anchor="middle">초고압 변압기 (154kV/24kV)</text>
                <text x="60" y="63" fill="#cbd5e1" font-size="6" text-anchor="middle">HD현대일렉트릭 / 산일전기</text>

                <!-- 스마트 EMS 및 전력 안정화 장치 -->
                <rect x="10" y="80" width="100" height="34" fill="#0f172a" stroke="#10b981" stroke-width="1" rx="2"/>
                <text x="60" y="96" fill="#34d399" font-size="7" font-weight="700" text-anchor="middle">지능형 EMS / PQC 장치</text>
                <text x="60" y="106" fill="#a7f3d0" font-size="6" text-anchor="middle">전압 강하/주파수 왜곡 0%</text>

                <!-- 공공 그리드 비상 연계 (Grid Tie Backfeed) -->
                <rect x="10" y="120" width="100" height="30" fill="#1e293b" stroke="#475569" stroke-width="0.8" rx="2"/>
                <text x="60" y="135" fill="#94a3b8" font-size="6" text-anchor="middle">외곽 공공 송전선로</text>
                <text x="60" y="144" fill="#64748b" font-size="5.5" text-anchor="middle">(잉여 전력 역송전 또는 비상백업)</text>
            </g>

            <!-- 변전 -> 데이터센터 피더 라인 -->
            <g stroke="#10b981" stroke-width="3" fill="none">
                <line x1="295" y1="125" x2="325" y2="125"/>
            </g>
            <text x="310" y="118" fill="#10b981" font-size="6" font-weight="700" text-anchor="middle">직접 PPA</text>

            <!-- 3. 하이퍼스케일 AI 데이터센터 빌딩 (Hyperscale AI DC Campus) -->
            <g transform="translate(325, 32)">
                <rect x="0" y="0" width="120" height="185" fill="url(#grad-grid-dc)" stroke="#10b981" stroke-width="1.5" rx="4"/>
                <text x="60" y="16" fill="#ffffff" font-size="8" font-weight="800" text-anchor="middle">AI 하이퍼스케일 DC</text>
                <text x="60" y="26" fill="#a7f3d0" font-size="6.5" text-anchor="middle">AWS / MS / 구글 / OpenAI</text>

                <!-- GPU 서버 랙 클러스터 (B200 / H100 수만 대) -->
                <g transform="translate(10, 35)">
                    <rect x="0" y="0" width="100" height="65" fill="#064e3b" stroke="#34d399" stroke-width="1" rx="2"/>
                    <text x="50" y="18" fill="#ffffff" font-size="7" font-weight="800" text-anchor="middle">GPU 클러스터 (수만 장)</text>
                    <text x="50" y="32" fill="#a7f3d0" font-size="6.5" text-anchor="middle">LLM 거대 모델 24/365 학습</text>
                    <text x="50" y="44" fill="#fef08a" font-size="7" font-weight="800" text-anchor="middle">전력소비: 100~300MW</text>
                    <text x="50" y="56" fill="#ecfdf5" font-size="6" text-anchor="middle">연중 무휴 기저전력 공급</text>
                </g>

                <!-- PDU & 초고효율 액체 냉각(Liquid Cooling) -->
                <rect x="10" y="108" width="100" height="35" fill="#0f172a" stroke="#0ea5e9" stroke-width="0.8" rx="2"/>
                <text x="50" y="123" fill="#38bdf8" font-size="6.5" font-weight="700" text-anchor="middle">액체 냉각(CDU) &amp; PDU</text>
                <text x="50" y="134" fill="#bae6fd" font-size="6" text-anchor="middle">원전 폐열 흡수식 냉각 연계</text>

                <!-- 무정전 전원 공급기 (Flywheel / UPS) -->
                <rect x="10" y="150" width="100" height="26" fill="#0f172a" stroke="#64748b" stroke-width="0.8" rx="2"/>
                <text x="50" y="166" fill="#cbd5e1" font-size="6" text-anchor="middle">N+2 무정전 UPS 백업</text>
            </g>

            <!-- 하단 BTM 직결 핵심 메커니즘 박스 -->
            <g transform="translate(15, 230)">
                <rect x="0" y="0" width="430" height="85" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
                <text x="12" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ Behind-The-Meter (BTM) 직결 전력 공급의 핵심 강점</text>
                <text x="12" y="34" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">송전망 병목(Grid Bottleneck) 극복:</tspan> 미 전력망 접속 대기 5~7년 소요 ➡️ SMR 부지 내 직결로 <tspan fill="#34d399">즉각 전력 수급</tspan></text>
                <text x="12" y="48" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">압도적 전력 가동률:</tspan> 태양광(25%), 풍력(35%)과 비교 불가한 <tspan fill="#fef08a">95%+ 연중무휴 기저전력(Base Load)</tspan></text>
                <text x="12" y="62" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">전력 손실 제로:</tspan> 수백 km 장거리 고압 송전선 불필요 ➡️ 송전 손실 0% 및 송전망 사용료 전액 절감</text>
                <text x="12" y="76" fill="#10b981" font-size="7">✓ AWS(탈렌 원전 인수), MS(스리마일 PPA), 오클로(샘 알트만 주도 데이터센터 직결 계약 체결)</text>
            </g>
        </g>

        <!-- 우측: 에너지 공급원 비교 & 국내외 빅테크 생태계 -->
        <g transform="translate(490, 55)">
            <rect x="0" y="0" width="250" height="330" fill="#0b1329" rx="6" stroke="#1e293b" stroke-width="1.5"/>
            <text x="15" y="22" fill="#94a3b8" font-size="11" font-weight="700">■ 전력원 비교 &amp; 빅테크 밸류체인</text>

            <!-- 에너지원별 가동률(Capacity Factor) 비교 바 차트 -->
            <g transform="translate(12, 36)">
                <rect x="0" y="0" width="226" height="95" fill="#0f172a" stroke="#334155" stroke-width="1" rx="2"/>
                <text x="8" y="15" fill="#38bdf8" font-size="7.5" font-weight="700">■ 발전원별 연평균 가동률(CF) 비교</text>

                <!-- 태양광 바 (25%) -->
                <text x="8" y="32" fill="#94a3b8" font-size="6.5">태양광 (Solar)</text>
                <rect x="68" y="24" width="38" height="10" fill="#f59e0b" rx="1"/>
                <text x="112" y="32" fill="#f59e0b" font-size="6.5" font-weight="700">25% (날씨 의존)</text>

                <!-- 풍력 바 (35%) -->
                <text x="8" y="48" fill="#94a3b8" font-size="6.5">풍력 (Wind)</text>
                <rect x="68" y="40" width="53" height="10" fill="#0ea5e9" rx="1"/>
                <text x="127" y="48" fill="#0ea5e9" font-size="6.5" font-weight="700">35% (바람 간헐성)</text>

                <!-- SMR 원전 바 (95%+) -->
                <text x="8" y="66" fill="#10b981" font-size="7" font-weight="800">SMR 원자력</text>
                <rect x="68" y="58" width="145" height="12" fill="#10b981" rx="1" filter="url(#grid-glow)"/>
                <text x="135" y="67" fill="#ffffff" font-size="7" font-weight="800">95%+ (24/365 기저)</text>

                <text x="8" y="86" fill="#67e8f9" font-size="6">※ AI GPU는 24시간 풀가동되므로 기저전력 필수</text>
            </g>

            <!-- 핵심 기업 및 밸류체인 -->
            <g transform="translate(12, 140)">
                <rect x="0" y="0" width="226" height="175" fill="#0f172a" stroke="#1e293b" stroke-width="1" rx="3"/>
                <text x="10" y="18" fill="#38bdf8" font-size="8.5" font-weight="700">■ 빅테크-SMR 핵심 공급망</text>

                <text x="10" y="36" fill="#cbd5e1" font-size="7">• <tspan fill="#ffffff" font-weight="700">빅테크 수요처:</tspan></text>
                <text x="18" y="48" fill="#94a3b8" font-size="6.5">- Amazon AWS (탈렌 6.5억$ 원전 캠퍼스 인수)</text>
                <text x="18" y="60" fill="#94a3b8" font-size="6.5">- Microsoft (컨스텔레이션 20년 원전 PPA)</text>
                <text x="18" y="72" fill="#94a3b8" font-size="6.5">- OpenAI (샘 알트만 주도 Oklo 원전 계약)</text>

                <text x="10" y="90" fill="#cbd5e1" font-size="7">• <tspan fill="#f59e0b" font-weight="700">SMR 혁신 개발사:</tspan></text>
                <text x="18" y="102" fill="#94a3b8" font-size="6.5">- 오클로 (Oklo - OKLO), 테라파워, 뉴스케일</text>

                <text x="10" y="120" fill="#cbd5e1" font-size="7">• <tspan fill="#10b981" font-weight="700">구내 변전/배전 전력망 수혜:</tspan></text>
                <text x="18" y="132" fill="#94a3b8" font-size="6.5">- HD현대일렉트릭, 효성중공업 (초고압 변압기)</text>
                <text x="18" y="144" fill="#94a3b8" font-size="6.5">- 산일전기, 일진전기, 제룡전기 (배전 변압기)</text>

                <rect x="8" y="152" width="210" height="18" fill="#1e1b4b" rx="2"/>
                <text x="113" y="164" fill="#a5b4fc" font-size="6" font-weight="700" text-anchor="middle">
                    AI 전력 인프라 슈퍼사이클의 최정점
                </text>
            </g>
        </g>

        <!-- 하단 메트릭 바 -->
        <g transform="translate(20, 395)">
            <rect x="0" y="0" width="720" height="70" fill="#0f172a" rx="4" stroke="#1e293b" stroke-width="1"/>
            <text x="15" y="18" fill="#94a3b8" font-size="10" font-weight="700">■ AI 데이터센터 직결 SMR 마이크로그리드 핵심 엔지니어링 지표</text>
            <g transform="translate(15, 28)">
                <rect x="0" y="2" width="10" height="10" fill="#10b981" rx="2"/>
                <text x="15" y="11" fill="#cbd5e1" font-size="10">공급 안정성: 가동률 95%+ 무정전 기저전력 (24/365)</text>
                <rect x="270" y="2" width="10" height="10" fill="#f59e0b" rx="2"/>
                <text x="285" y="11" fill="#cbd5e1" font-size="10">송전 손실: 0% (부지 내 Behind-The-Meter 직결)</text>
                <rect x="525" y="2" width="10" height="10" fill="#0284c7" rx="2"/>
                <text x="540" y="11" fill="#cbd5e1" font-size="10">탄소 배출: 0g (100% 무탄소 청정 에너지)</text>
            </g>
            <g transform="translate(15, 52)">
                <text x="0" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 송전망 인허가: <tspan fill="#ffffff">공공망 대기(5~7년) 완전 우회 즉시 전력화</tspan></text>
                <text x="310" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 열병합 시너지: <tspan fill="#ffffff">원전 고온 폐열을 흡수식 DC 냉각에 재활용</tspan></text>
                <text x="540" y="8" fill="#38bdf8" font-size="10" font-weight="600">• 빅테크 PPA: <tspan fill="#fef08a">Amazon, Microsoft, OpenAI 체결</tspan></text>
            </g>
        </g>
    </svg>
    `;
}

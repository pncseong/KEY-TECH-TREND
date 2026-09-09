window.deepTechData = {
  "last_updated": "2026-09-09",
  "tech_list": [
    {
      "id": "hbm",
      "name": "HBM (High Bandwidth Memory, 고대역폭 메모리)",
      "abbr": "HBM",
      "badge": "반도체 / AI 패키징",
      "summary": "TSV(실리콘 관통전극)를 통해 DRAM 다이를 수직 적층하여 데이터 전송 대역폭을 초당 수 테라바이트(TB/s)급으로 극대화한 AI 가속기 필수 메모리",
      "diagram": "graph TD\n    GPU[AI 가속기 / GPU / NPU] <-->|인터포저 초고속 신호| HBM[HBM 메모리 스택]\n    subgraph HBM_STACK [HBM 내부 적층 구조]\n        DRAM16[16단 DRAM 다이] --> TSV[TSV 실리콘 관통전극]\n        DRAM12[12단 DRAM 다이] --> TSV\n        DRAM8[8단 DRAM 다이] --> TSV\n        DRAM4[4단 DRAM 다이] --> TSV\n        TSV --> BASE[로직 베이스 다이 (Base Die)]\n    end\n    BASE --> INTERPOSER[실리콘 인터포저 2.5D]\n    INTERPOSER --> SUBSTRATE[패키지 기판 (PCB)]",
      "framework": {
        "fundamentals": "기존 GDDR/DDR 메모리는 PCB 기판 위의 구리 배선(Trace)을 통해 병렬 통신하므로 기생 커패시턴스와 신호 감쇄(RC Delay)로 인해 대역폭 확장에 물리적 한계(Memory Wall)가 발생함. HBM은 칩 두께를 30um 이하로 얇게 갈아내고 수천 개의 미세 수직 전극(TSV)을 뚫어 다이를 적층함으로써 1024/2048개의 초광폭 I/O 버스를 형성하여 데이터 병목을 물리적으로 돌파함.",
        "process_tech": "웨이퍼 후면 연마(Backside Thinning 30um) ➡️ 레이저 드릴링 및 Cu 전기도금(TSV) ➡️ 마이크로 범프 형성 ➡️ MR-MUF(액상 에폭시 주입 후 일괄 열경화) 또는 NCF(필름 접합) ➡️ 하이브리드 본딩(Direct Cu-Cu 접합) 전환.",
        "bottlenecks": "16단/20단 고적층 시 실리콘 다이 간 열팽창계수(CTE) 불일치로 인한 웨이퍼 휨(Warpage) 현상, 고발열 제어(Thermal Dissipation) 한계, 하이브리드 본딩 도입 시 표면 파티클 제어 및 초고가 장비 투자 부담.",
        "roadmap": "HBM3E 8H/12H (현재 양산) ➡️ HBM4 16H (2026년 파운드리 3nm 로직 베이스 다이 도입) ➡️ HBM4E (하이브리드 본딩 기반 커스텀 HBM) ➡️ HBM5 / Z-HBM"
      },
      "nodes": [
        {
          "id": "hbm3e",
          "name": "HBM3E (현재 주력 양산)",
          "tag": "현재 주력",
          "desc": "24GB/36GB 8단·12단 적층 구조. Advanced MR-MUF 공정 주도로 NVIDIA H200 및 Blackwell B200에 공급 중.",
          "tech_specs": "대역폭 1.18 TB/s, I/O 속도 9.6Gbps, 1b-nm DRAM 적용",
          "company_strategy": "SK하이닉스가 MR-MUF 기술 우위로 글로벌 독점 공급망 장악, 삼성전자는 12단 NCF로 추격 중",
          "chain": {
            "chips": "SK하이닉스, 삼성전자, 마이크론",
            "equipment": "한미반도체 (듀얼 TC 본더), 디아이티 (레이저어닐링), 피에스케이홀딩스",
            "materials": "솔브레인, 동진쎄미켐, 헨켈 (MUF 에폭시 소재)"
          }
        },
        {
          "id": "hbm4_foundry",
          "name": "HBM4 (SK하이닉스 & TSMC 연합 로드맵)",
          "tag": "2026년 양산 개시",
          "desc": "메모리 업계 최초로 로직 베이스 다이를 TSMC 3nm/5nm 첨단 파운드리 공정으로 외주 제작하여 2048-bit 인터페이스와 맞춤형(Customized) 로직 기능을 결합.",
          "tech_specs": "I/O 버스 2048-bit (기존 1024-bit 대비 2배), 대역폭 2.0 TB/s 돌파, 16단 적층 지원",
          "company_strategy": "SK하이닉스(메모리) + TSMC(CoWoS 첨단 패키징) 연합으로 NVIDIA Rubin 플랫폼 선점 전략",
          "chain": {
            "foundry": "TSMC (CoWoS-L 3nm 베이스 다이)",
            "memory": "SK하이닉스 (1c-nm DRAM)",
            "equipment": "한미반도체 (마일드 TC 본더), 이오테크닉스 (레이저 마킹/드릴링)",
            "customers": "NVIDIA, AMD"
          }
        },
        {
          "id": "hybrid_hbm_samsung",
          "name": "삼성 Hybrid HBM (Z-HBM / 하이브리드 본딩)",
          "tag": "차세대 게임체인저",
          "desc": "마이크로 범프를 완전히 제거하고 구리와 절연체를 다이 간 직접 접합(Direct Cu-Cu Bonding)하여 두께를 획기적으로 줄이고 16단/20단 이상 초고적층 구현.",
          "tech_specs": "인터커넥트 피치 1um 이하, 범프 저항 제로화, 열저항 -35% 감소, 적층 두께 표준 720um 충족",
          "company_strategy": "삼성전자가 SAINT-D 턴키 및 독자 하이브리드 본딩 기술로 HBM4E/HBM5 세대에서 단숨에 역전 노림",
          "chain": {
            "champion": "삼성전자 (SAINT-D 파운드리-메모리 턴키)",
            "equipment": "베시 (Besi 하이브리드 본더), 파크시스템스 (원자현미경 검사)",
            "materials": "케이씨텍 (초정밀 CMP 슬러리), 에프에스티 (펠리클/칠러)"
          }
        },
        {
          "id": "hbf_flash",
          "name": "HBF (High Bandwidth Flash / 차세대 융합)",
          "tag": "선행 연구",
          "desc": "초고가 DRAM 대신 3D V-NAND 플래시를 HBM처럼 TSV 수직 적층하여 초대용량 LLM 추론 가속용 저비용 테라바이트(TB)급 메모리 구축.",
          "tech_specs": "GB당 단가 DRAM의 1/5 수준, 온패키지 TB급 모델 가중치 저장 용량",
          "company_strategy": "삼성전자, SK하이닉스가 AI 추론 시장(Inference) 특화 메모리로 선행 특허 확보 중",
          "chain": {
            "nand": "삼성전자, SK하이닉스, 키옥시아",
            "controller_ip": "파두 (FADU), 네오와인, 오픈엣지테크놀로지",
            "target": "대규모 온디바이스 AI / LLM 추론 서버"
          }
        }
      ]
    },
    {
      "id": "cpo",
      "name": "CPO (Co-Packaged Optics, 공동 패키지 광학)",
      "badge": "광통신 / 데이터센터",
      "summary": "전기 신호의 구리선 한계를 극복하기 위해, 스위치 ASIC 반도체와 실리콘 포토닉스 광엔진(Optical Engine)을 동일 기판 위에 하나의 패키지로 집적한 차세대 초고속 광통신 기술",
      "diagram": "graph TD\n    SWITCH[초고속 스위치 ASIC (51.2T/102.4T)] <-->|초단거리 전기 인터페이스| OE[실리콘 포토닉스 광엔진 (Optical Engine)]\n    OE <-->|광섬유 MPO 커넥터| FIBER[광섬유 케이블 (빛 신호 전송)]\n    ELS[외장 레이저 광원 (External Laser Source)] -.->|빛 공급 (발열 분리)| OE\n    subgraph CPO_MODULE [단일 2.5D 기판 패키지]\n        SWITCH\n        OE\n    end",
      "framework": {
        "fundamentals": "데이터센터 스위치 대역폭이 51.2Tbps ➡️ 102.4Tbps로 급증하면서, 스위치 칩에서 전면 패널(Pluggable 트랜시버)까지 가는 구리 배선의 신호 감쇄 및 전력 소모(전체 시스템 전력의 30% 이상)가 한계에 달함. CPO는 광엔진을 칩 바로 옆(수 밀리미터 거리)에 배치하여 전력 소모를 50% 이상 절감함.",
        "process_tech": "실리콘 포토닉스(SiPh) 도파로(Waveguide) 식각 ➡️ 광엔진-ASIC 간 2.5D 인터포저 본딩 ➡️ 광섬유 정밀 자동 정렬(Optical Fiber Alignment) ➡️ 외장 레이저 광원(ELS) 모듈화.",
        "bottlenecks": "스위치 ASIC의 극심한 발열이 레이저 다이오드 수명을 단축시키는 문제(ELS 분리로 해결 중), 패키지 불량 시 전체 스위치 폐기 리스크, 수천 가닥 광섬유 접속의 제조 수율 및 수리성(Reworkability) 한계.",
        "roadmap": "전통 Pluggable (현재) ➡️ LPO (2024~2025 과도기) ➡️ NPO ➡️ 102.4T CPO (2026~2027년 본격 상용화)"
      },
      "nodes": [
        {
          "id": "pluggable_vs_lpo",
          "name": "LPO (Linear Pluggable Optics / 중간 징검다리)",
          "tag": "현재 도입기",
          "desc": "광모듈 내부의 고발열 DSP(디지털 신호 처리기) 칩을 제거하고 스위치 ASIC의 SerDes에 직결하여 전력과 지연시간을 대폭 줄인 징검다리 기술.",
          "tech_specs": "전력 소모 -50% 절감, 지연시간(Latency) 100ns 이하, 기존 플러그형 폼팩터 유지",
          "company_strategy": "엔비디아(NVIDIA), 마벨(Marvell), 이노라이트(Innolight)가 800G/1.6T 스위치에 우선 채택 중",
          "chain": {
            "transceiver": "이노라이트, 코히런트(Coherent), 루멘텀",
            "components": "옵티코어, 우리넷, 오이솔루션",
            "ic_driver": "마벨 (Marvell), 맥스리니어 (MaxLinear)"
          }
        },
        {
          "id": "cpo_main",
          "name": "CPO (공동 패키지 광학 / 최종 종착지)",
          "tag": "2026년 대규모 양산",
          "desc": "광엔진을 스위치 칩 기판에 직접 통합하여 구리선 전송 길이를 0에 가깝게 단축. 102.4Tbps 이상 AI 클러스터의 필수 인프라.",
          "tech_specs": "에너지 효율 5 pJ/bit 이하, 대역폭 밀도 10배 향상, 102.4T 스위치 표준화",
          "company_strategy": "브로드컴(Broadcom), TSMC(COUPE 기술), 인텔이 주도권 경쟁 중",
          "chain": {
            "switch_leader": "브로드컴 (Tomahawk 5 CPO), 엔비디아 (Quantum-X)",
            "foundry_packaging": "TSMC (COUPE 실리콘 포토닉스 플랫폼)",
            "optics_equipment": "한미반도체, 제이앤티씨, 팸텍"
          }
        },
        {
          "id": "els_laser",
          "name": "ELS (External Laser Source / 외장 레이저 광원)",
          "tag": "핵심 부품",
          "desc": "고열에 약한 레이저 다이오드를 CPO 패키지 내부에서 분리하여 전면 패널에 장착하는 분리형 광원 아키텍처. 고장 시 레이저만 핫스왑(교체) 가능.",
          "tech_specs": "CW(연속파) 고출력 DFB 레이저, QSFP-DD/OSFP ELS 폼팩터 표준화",
          "company_strategy": "OIF(광인터넷포럼) 표준화 주도, 루멘텀 및 코히런트가 양산 공급",
          "chain": {
            "laser_chip": "루멘텀 (Lumentum), 코히런트 (Coherent), 브로드컴",
            "korea_optical": "오이솔루션, 빛과전자, 라이트론"
          }
        }
      ]
    },
    {
      "id": "cxl",
      "name": "CXL (Compute Express Link, 차세대 메모리 인터커넥트)",
      "badge": "시스템 아키텍처 / D-RAM",
      "summary": "PCIe 5.0/6.0 물리 계층을 기반으로 CPU, GPU, 메모리 가속기를 초고속·저지연으로 연결하여 메모리 용량을 무한대로 확장(Pooling)하는 차세대 표준 인터페이스",
      "diagram": "graph TD\n    CPU[서버 CPU / Host] <-->|CXL 3.0 고속 버스| SWITCH[CXL 스위치]\n    GPU[AI 가속기 / GPU] <-->|CXL 3.0 고속 버스| SWITCH\n    SWITCH <-->|메모리 공유/풀링| POOL[CXL 메모리 풀 (CMM-D / DRAM)]\n    subgraph MEMORY_EXPANSION [메모리 용량 무제한 확장]\n        POOL --> DRAM1[CXL DRAM 128GB]\n        POOL --> DRAM2[CXL DRAM 256GB]\n        POOL --> DRAM3[CXL DRAM 512GB]\n    end",
      "framework": {
        "fundamentals": "서버 CPU당 꽂을 수 있는 DDR5 메모리 슬롯(Dimm) 수가 물리적 공간과 핀 수 제한으로 한계에 도달함. CXL은 PCIe 슬롯을 통해 메모리를 연결함으로써 서버 1대당 메모리 용량을 테라바이트 단위로 확장하고, 여러 대의 서버가 하나의 거대한 메모리 풀(Pool)을 공유(Sharing)할 수 있게 함.",
        "process_tech": "CXL 2.0/3.0 컨트롤러 ASIC 설계 ➡️ DDR5 인터페이스 브릿지 본딩 ➡️ CMM(CXL Memory Module) EDSFF E3.S 폼팩터 패키징.",
        "bottlenecks": "기존 직접 연결 DDR5 대비 추가적인 프로토콜 변환 지연시간(Latency 약 50~100ns 추가), CXL 스위치 칩의 높은 단가 및 서버 OS/소프트웨어 생태계 지원 성숙도.",
        "roadmap": "CXL 1.1 (포인트 투 포인트 연결) ➡️ CXL 2.0 (단일 스위치 풀링) ➡️ CXL 3.0/3.1 (다중 스위치 패브릭 & 직접 P2P 메모리 공유)"
      },
      "nodes": [
        {
          "id": "cxl_memory_expansion",
          "name": "CXL 2.0 메모리 확장 (CMM-D)",
          "tag": "현재 상용화 단계",
          "desc": "서버의 PCIe 슬롯에 꽂아 DRAM 용량을 8배 이상 확장하는 CXL 메모리 모듈. 데이터센터 TCO(총소유비용)를 획기적으로 절감.",
          "tech_specs": "PCIe 5.0 x8/x16, 대역폭 32GB/s ~ 64GB/s, 최대 512GB 용량 지원",
          "company_strategy": "삼성전자(CMM-D 128/256GB 양산) 및 SK하이닉스가 인텔 제온 플랫폼과 검증 완료",
          "chain": {
            "memory": "삼성전자, SK하이닉스, 마이크론",
            "controller_ic": "아스테라랩스 (Astera Labs), 파두 (FADU), 네오와인",
            "solution": "오픈엣지테크놀로지, 퀄리타스반도체 (인터페이스 IP)"
          }
        },
        {
          "id": "cxl_pooling_3",
          "name": "CXL 3.0 메모리 풀링 & 스위치 (Memory Pooling)",
          "tag": "차세대 대규모 데이터센터",
          "desc": "여러 대의 서버가 거대한 CXL 메모리 풀을 실시간으로 나누어 쓰는 가상화 기술. 메모리 유휴율(Stranded Memory)을 0%로 줄임.",
          "tech_specs": "PCIe 6.0 기반 64GT/s PAM4, 캐시 코히런시(Cache Coherency) 다중 호스트 지원",
          "company_strategy": "아스테라랩스(Leo 스위치), 브로드컴, 삼성전자가 표준 생태계 주도",
          "chain": {
            "switch_leader": "아스테라랩스 (Astera Labs - ALAB), 브로드컴",
            "ip_design": "시놉시스 (Synopsys), 케이던스 (Cadence)",
            "korea_partners": "엑시콘 (CXL 검사장비), 네오셈 (CXL 테스터), 티엘비 (CXL 기판)"
          }
        }
      ]
    },
    {
      "id": "smr",
      "name": "SMR (Small Modular Reactor, 차세대 소형 모듈 원자로)",
      "badge": "원자력 / AI 전력망",
      "summary": "공장에서 모듈 형태로 일괄 제작하여 현장 조립이 가능하고, 자연 대류 냉각으로 멜트다운 위험을 원천 차단한 300MWe 이하급 차세대 무탄소 분산형 원자력 발전소",
      "diagram": "graph TD\n    SMR[소형 모듈 원자로 (SMR 모듈)] -->|무탄소 24시간 상시 전력 (기저부하)| GRID[AI 데이터센터 전용 마이크로그리드]\n    GRID --> DC1[빅테크 AI 슈퍼컴퓨터 클러스터]\n    GRID --> DC2[LLM 학습용 데이터센터]\n    SMR -->|고온 스팀 부산물| HYDROGEN[청정 핑크 수소 생산]\n    subgraph SAFETY_SYSTEM [피동형 자연 냉각 안전장치]\n        SMR --- PSS[중력/자연대류 무전원 비상냉각수조]\n    end",
      "framework": {
        "fundamentals": "AI 데이터센터의 전력 소모가 기하급수적으로 폭증함에 따라, 태양광·풍력의 간헐성(날씨 의존)을 극복하고 24시간 끊김 없이 대규모 전력(기저부하)을 공급할 수 있는 유일한 무탄소 솔루션. 대형 원전 대비 1/100 크기로 건설 기간을 2~3년으로 단축하고 공사비를 대폭 절감함.",
        "process_tech": "공장 내 대형 단조품 일체형 제작 ➡️ 수송(육로/해상) ➡️ 현장 모듈 결합 ➡️ 피동형 안전계통(전력 공급 없이 자연 대류 냉각) 가동.",
        "bottlenecks": "HALEU(고순도 저농축 우라늄) 연료 공급망의 러시아 의존도 탈피 문제, 각국 규제 기관(NRC 등)의 표준 설계 인가 지연, 폐기물 처리 및 초기 1호기 건설 단가 경제성 검증.",
        "roadmap": "경수로형 SMR (2027~2028년 상용화) ➡️ 소듐냉각고속로/초고온가스로 4세대 SMR (2030년) ➡️ 해상 부유식 SMR"
      },
      "nodes": [
        {
          "id": "pwr_smr",
          "name": "경수로형 SMR (뉴스케일 VOYGR 등)",
          "tag": "최초 상용화 선두",
          "desc": "기존 대형 원전의 가압경수로(PWR) 기술을 소형화·일체화한 모델. 미국 NRC(원자력규제위원회)의 표준설계인가를 최초로 획득.",
          "tech_specs": "모듈당 77MWe, 12개 모듈 결합 시 924MWe 발전, 완전 피동형 안전계통",
          "company_strategy": "뉴스케일파워(NuScale Power) 주도 하에 두산에너빌리티가 핵심 원자로 주기기 제작 공급",
          "chain": {
            "developer": "뉴스케일파워 (NuScale - SMR), 홀텍 (Holtec)",
            "manufacturing": "두산에너빌리티 (원자로 주기기 단조/제작 독점)",
            "engineering": "삼성물산 (EPC 건설), 현대건설, 한전기술"
          }
        },
        {
          "id": "sfr_terrapower",
          "name": "소듐냉각고속로 (테라파워 Natrium SFR)",
          "tag": "4세대 첨단 원전",
          "desc": "빌 게이츠가 설립한 테라파워 주도. 물 대신 액체 나트륨(소듐)을 냉각재로 사용하여 고온·상압 운전이 가능하며 에너지 저장장치(용융염)를 결합.",
          "tech_specs": "345MWe 상시 발전, 용융염 저장장치 연계 시 피크 타임 500MWe 부스팅",
          "company_strategy": "테라파워가 미국 와이오밍주에 1호기 착공, HD현대/SK그룹이 지분 투자 및 기자재 협력",
          "chain": {
            "developer": "테라파워 (TerraPower)",
            "korea_partners": "HD현대일렉트릭, HD현대중공업, SK이노베이션",
            "power_equipment": "두산에너빌리티, 효성중공업, LS ELECTRIC"
          }
        },
        {
          "id": "ai_datacenter_grid",
          "name": "AI 데이터센터 전용 SMR 마이크로그리드",
          "tag": "빅테크 전력 직결",
          "desc": "공공 송전망 부족 문제를 해결하기 위해, 아마존(AWS), 마이크로소프트, 구글 등이 데이터센터 부지 바로 옆에 SMR을 짓고 24시간 전력을 직공급받는 PPA 모델.",
          "tech_specs": "송전선로 건설 불필요, 99.999% 무정전 기저전력 공급, 탄소배출 제로",
          "company_strategy": "AWS-탈렌에너지 원전 연계, 오클로(Oklo)와 샘 알트만의 AI 데이터센터 전력 계약",
          "chain": {
            "bigtech": "Amazon AWS, Microsoft, Google, Meta",
            "smr_innovator": "오클로 (Oklo - OKLO), 테라파워, 뉴스케일파워",
            "grid_infra": "일진전기, 제룡전기, 산일전기 (변압기/전력인프라)"
          }
        }
      ]
    }
  ]
};
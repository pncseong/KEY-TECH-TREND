window.deepTechData = {
  "last_updated": "2026-09-09",
  "tech_list": [
    {
      "id": "hbm",
      "name": "HBM (High Bandwidth Memory, 고대역폭 메모리)",
      "abbr": "HBM",
      "badge": "첨단 반도체 / AI 패키징",
      "summary": "TSV(실리콘 관통전극) 미세 공정을 통해 복수의 DRAM 다이를 수직 적층하여 데이터 전송 대역폭을 2.0TB/s 이상으로 극대화한 AI 가속기 필수 메모리",
      "image_url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
      "diagram": "graph TD\n    GPU[\"AI 가속기 GPU (NVIDIA B200)\"] --- INTERPOSER[\"2.5D 실리콘 인터포저\"]\n    HBM_STACK[\"HBM3E / HBM4 16단 스택\"] --- INTERPOSER\n    subgraph HBM_DETAIL [\"HBM 초정밀 수직 적층 구조\"]\n        D16[\"16단 박막 DRAM 다이\"] --> TSV[\"TSV 수직 관통전극 어레이\"]\n        D12[\"12단 박막 DRAM 다이\"] --> TSV\n        D8[\"8단 박막 DRAM 다이\"] --> TSV\n        D4[\"4단 박막 DRAM 다이\"] --> TSV\n        TSV --> BASE[\"로직 베이스 다이 (Base Die / TSMC 3nm)\"]\n    end\n    BASE --> SUBSTRATE[\"패키지 기판 (PCB)\"]",
      "framework": {
        "fundamentals": "기존 GDDR/DDR 메모리는 PCB 기판 평면의 구리 배선을 통해 통신하므로 전송 선로의 기생 커패시턴스(C)와 저항(R)에 의한 신호 감쇄(RC Delay) 및 극심한 전력 소모로 인해 '메모리 벽(Memory Wall)' 한계에 봉착함. HBM은 칩 두께를 30um 이하로 얇게 갈아내고 실리콘 내부에 수천 개의 미세 관통전극(TSV)을 뚫어 다이를 수직 적층함으로써 버스 폭을 1024-bit / 2048-bit로 극대화하여 저전압(1.1V)에서 초당 수 테라바이트를 병목 없이 전송함.",
        "process_tech": "1) 웨이퍼 후면 연마(Backside CMP: 750um ➡️ 30um 이하 박막화) ➡️ 2) DRIE 반응성 이온 식각 기반 TSV 비아 형성 및 Cu 전기도금 ➡️ 3) 마이크로 범프(Sn-Ag 솔더) 형성 ➡️ 4) Advanced MR-MUF(액상 에폭시 주입 후 일괄 열경화) 또는 12단 NCF(비전도성 필름 열압착) ➡️ 5) 차세대 무범프 하이브리드 본딩(Direct Cu-Cu 접합: 350℃ 원자 확산 열처리).",
        "bottlenecks": "1) 16단/20단 이상 적층 시 열팽창계수(CTE) 불일치로 인한 웨이퍼 휨(Warpage) 현상. 2) 상하 다이 간 고발열 집중에 따른 접합부 열저항(Thermal Resistance) 증가. 3) 하이브리드 본딩 도입 시 1nm 이하 표면 평탄도 요구 및 초미세 파티클 제어 난제.",
        "roadmap": "HBM3E 8단/12단 (1.18 TB/s, 양산) ➡️ HBM4 16단 (TSMC 3nm 베이스다이 연합, 2048-bit, 2.0 TB/s, 2026년 양산) ➡️ HBM4E (Cu-Cu 하이브리드 본딩 커스텀 메모리) ➡️ HBM5 / Z-HBM"
      },
      "nodes": [
        {
          "id": "hbm3e",
          "name": "HBM3E (현재 주력 양산 / MR-MUF vs NCF)",
          "tag": "현재 주력 양산",
          "image_url": "",
          "desc": "24GB/36GB 8단 및 12단 적층 양산 모델. SK하이닉스의 Advanced MR-MUF 공정이 방열 성능과 수율에서 압도적 우위를 점하며 NVIDIA H200 및 Blackwell B200에 독점/우선 공급 체계를 구축함.",
          "tech_specs": "대역폭: 1.18 TB/s 이상 | I/O 전송속도: 9.6 Gbps | DRAM 노드: 1b-nm (10나노급 5세대) | 인터페이스: 1024-bit Wide-IO",
          "company_strategy": "• SK하이닉스: MR-MUF 기술 기반 독점적 수율 확보로 글로벌 점유율 1위 수성.\n• 삼성전자: 12단 NCF 열압착 턴키 공정으로 고객사 퀄 테스트 통과 총력전.\n• 마이크론: 8단 1b 공정으로 소량 납품 중이나 12단 수율 안정화 과제.",
          "chain": {
            "chips": "SK하이닉스, 삼성전자, 마이크론",
            "equipment": "한미반도체 (듀얼 TC 본더 독점), 디아이티 (레이저 어닐링), 피에스케이홀딩스 (디스컴/리플로우)",
            "materials": "솔브레인 (고순도 식각액), 동진쎄미켐, 헨켈 (Liquid MUF 방열 수지)"
          }
        },
        {
          "id": "hbm4_foundry",
          "name": "HBM4 (SK하이닉스 & TSMC 연합 / 3nm 파운드리 베이스다이)",
          "tag": "2026년 양산 개시",
          "image_url": "",
          "desc": "메모리 산업 역사상 최초로 로직 베이스 다이(Base Die)를 자체 메모리 공정이 아닌 TSMC의 첨단 3nm/5nm 파운드리 공정으로 외주 위탁 생산. 인터페이스 버스를 기존 1024-bit에서 2048-bit로 2배 확장하여 속도와 전력 효율을 획기적으로 개선.",
          "tech_specs": "대역폭: 2.0 TB/s 돌파 | I/O 버스: 2048-bit (2배 확장) | 적층 단수: 16단 (48GB 용량) | 베이스다이 공정: TSMC 3nm FinFET / N3P",
          "company_strategy": "• SK하이닉스-TSMC: CoWoS-L 파운드리 연합 구축으로 NVIDIA 차세대 Rubin(루빈) GPU 아키텍처 수주 확정.\n• 삼성전자: 파운드리-메모리-패키징 원스톱 턴키(SAINT-D) 솔루션으로 3nm GAA 베이스다이 자체 조달 승부수.",
          "chain": {
            "foundry": "TSMC (N3E/N3P 첨단 파운드리 베이스 다이 제작)",
            "memory": "SK하이닉스 (1c-nm DRAM 16단 적층)",
            "equipment": "한미반도체 (HBM4 전용 마일드 TC 본더), 이오테크닉스 (레이저 그루빙/드릴링)",
            "customers": "NVIDIA (Rubin R100), AMD (Instinct MI400)"
          }
        },
        {
          "id": "hybrid_hbm_samsung",
          "name": "삼성 Hybrid HBM (Z-HBM / 무범프 Cu-Cu 직접 접합)",
          "tag": "차세대 게임체인저",
          "image_url": "",
          "desc": "마이크로 솔더 범프를 완전히 없애고, 다이 표면의 구리(Cu) 전극과 산화막(SiO2) 절연층을 원자 단위로 맞대어 직접 접합(Direct Bond)하는 궁극의 패키징 기술. 16단~20단 이상 적층 시에도 표준 칩 두께(720um)를 완벽하게 유지.",
          "tech_specs": "인터커넥트 피치: 1um 이하 (범프 대비 1/10) | 열저항 감소율: -35% 개선 | 범프 기생 저항: 0Ω (전력 손실 제로화) | 접합 온도: 350℃ 원자 확산",
          "company_strategy": "• 삼성전자: SAINT-D 하이브리드 본딩 선제 도입으로 HBM4E/HBM5 세대에서 역전 노림.\n• SK하이닉스: 16단까지는 Advanced MR-MUF 고도화로 대응 후 20단부터 하이브리드 전환 준비.",
          "chain": {
            "champion": "삼성전자 (SAINT-D 독자 턴키 솔루션)",
            "equipment": "베시 (Besi 하이브리드 다이본더), 파크시스템스 (원자현미경 표면 거칠기 3D 계측)",
            "materials": "케이씨텍 (Cu/산화막 원자레벨 초정밀 CMP 슬러리)"
          }
        },
        {
          "id": "hbf_flash",
          "name": "HBF (High Bandwidth Flash / 차세대 메모리 융합)",
          "tag": "선행 연구 혁신",
          "image_url": "",
          "desc": "고비용 DRAM 대신 3D V-NAND 플래시 다이를 HBM 아키텍처처럼 TSV 수직 적층하여 온패키지(On-Package) 테라바이트급 초거대 용량을 저비용으로 구현하는 차세대 AI 추론(Inference) 특화 메모리 기술.",
          "tech_specs": "저장 용량: 단일 스택 128GB~512GB (HBM의 5~10배) | 비트당 단가: DRAM 대비 1/5 이하 | 목표 응용처: 수천억 파라미터 LLM 온패키지 가중치 저장",
          "company_strategy": "• 삼성전자·SK하이닉스: 거대 언어 모델(LLM) 추론 시 메모리 용량 부족 문제를 해결하기 위해 선행 특허 포트폴리오 구축 중.",
          "chain": {
            "nand": "삼성전자 (V-NAND), SK하이닉스, 키옥시아",
            "controller_ip": "파두 (FADU), 네오와인, 오픈엣지테크놀로지 (고속 버퍼 PHY)",
            "target": "AI Data Center Inference Engine, On-Device AI Superchip"
          }
        }
      ]
    },
    {
      "id": "cpo",
      "name": "CPO (Co-Packaged Optics, 공동 패키지 광학 반도체)",
      "abbr": "CPO",
      "badge": "차세대 광통신 / 데이터센터",
      "summary": "데이터 전송 속도가 102.4Tbps 이상으로 급증함에 따라 구리 배선의 신호 감쇄 한계를 극복하기 위해, 스위치 ASIC과 실리콘 포토닉스(SiPh) 광엔진을 단일 인터포저 기판 위에 통합 패키징한 혁신 기술",
      "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "diagram": "graph TD\n    SWITCH[\"스위치 ASIC 반도체 (102.4T)\"] --- OE[\"실리콘 포토닉스 광엔진 (Optical Engine)\"]\n    OE --- FIBER[\"초정밀 광섬유 MPO 커넥터\"]\n    ELS[\"외장 레이저 광원 (External Laser Source)\"] --> OE\n    subgraph CPO_MODULE [\"단일 2.5D 인터포저 기판 패키지\"]\n        SWITCH\n        OE\n    end",
      "framework": {
        "fundamentals": "데이터센터 스위치 대역폭이 51.2Tbps ➡️ 102.4Tbps로 증가하면서, 스위치 칩에서 전면 패널(Pluggable 광모듈)까지 수십 cm에 달하는 PCB 구리 배선의 신호 손실(Insertion Loss > 20dB)과 발열이 전체 시스템 전력의 30%를 차지함. CPO는 광엔진을 스위치 칩 바로 옆 수 mm 거리로 집적하여 전기 신호 전송 거리를 1/100로 줄임으로써 통신 에너지를 50% 이상 절감함.",
        "process_tech": "1) 실리콘 도파로(Waveguide) 식각 및 게르마늄(Ge) 광검출기 집적 ➡️ 2) 마이크로 링 변조기(Micro-Ring Modulator) 형성 ➡️ 3) 광엔진-ASIC 간 2.5D 실리콘 인터포저 3D 본딩 ➡️ 4) 마이크론 단위 정밀 광섬유 자동 정렬(Fiber Alignment) ➡️ 5) 외장 레이저 광원(ELS) 분리 모듈 결합.",
        "bottlenecks": "1) 스위치 ASIC의 극심한 고열(100℃ 이상)이 온도에 민감한 레이저 다이오드의 발광 효율을 급격히 떨어뜨리는 열 간섭 문제. 2) 패키지 내 광엔진 1개만 고장 나도 스위치 전체를 폐기해야 하는 수율/수리성(Reworkability) 리스크. 3) 수천 채널 광섬유 접속의 공정 단가.",
        "roadmap": "전통 Pluggable 트랜시버 ➡️ LPO (2024~2025 과도기 선점) ➡️ NPO (기판 인접 광학) ➡️ 102.4T CPO (2026~2027년 글로벌 데이터센터 본격 표준화)"
      },
      "nodes": [
        {
          "id": "lpo_bridge",
          "name": "LPO (Linear Pluggable Optics / 중간 징검다리)",
          "tag": "현재 도입기",
          "image_url": "",
          "desc": "광트랜시버 내부에서 가장 많은 전력을 소모하는 DSP(디지털 신호 처리기) 칩을 과감히 제거하고, 스위치 ASIC의 강력한 SerDes 신호로 직접 구동하는 저전력 플러그형 징검다리 기술.",
          "tech_specs": "전력 소모: -50% 절감 (포트당 8W 이하) | 지연시간(Latency): 100ns 이하 극저지연 | 폼팩터: 기존 OSFP/QSFP-DD 유지",
          "company_strategy": "• 엔비디아(NVIDIA), 마벨(Marvell), 이노라이트(Innolight)가 800G/1.6T AI 클러스터 스위치에 우선 채택 중.",
          "chain": {
            "transceiver": "이노라이트 (Innolight), 코히런트 (Coherent), 루멘텀",
            "components": "옵티코어, 우리넷, 오이솔루션",
            "ic_driver": "마벨 (Marvell), 맥스리니어 (MaxLinear)"
          }
        },
        {
          "id": "cpo_main_node",
          "name": "CPO (공동 패키지 광학 / 궁극의 데이터센터 종착지)",
          "tag": "2026년 대규모 상용화",
          "image_url": "",
          "desc": "스위치 ASIC과 실리콘 포토닉스 광엔진을 단일 인터포저 위에 일체형으로 결합. 전기 신호 전송 거리를 제로에 가깝게 줄여 102.4Tbps 이상 AI 슈퍼컴퓨터 통신의 필수 인프라로 자리매김.",
          "tech_specs": "에너지 효율: 5 pJ/bit 이하 달성 | 대역폭 밀도: 기존 대비 10배 확장 | 적용 스위치: 102.4Tbps 차세대 AI 패브릭",
          "company_strategy": "• 브로드컴(Broadcom): Tomahawk 5/6 CPO 플랫폼으로 글로벌 표준 주도.\n• TSMC: COUPE(Compact Universal Photonic Engine) 첨단 3D 광학 패키징 기술 독점 제공.",
          "chain": {
            "switch_leader": "브로드컴 (Broadcom), 엔비디아 (Quantum-X)",
            "foundry_packaging": "TSMC (COUPE 실리콘 포토닉스 플랫폼)",
            "optics_equipment": "한미반도체, 제이앤티씨, 팸텍 (광정렬 장비)"
          }
        },
        {
          "id": "els_module",
          "name": "ELS (External Laser Source / 외장 레이저 광원)",
          "tag": "핵심 안전 부품",
          "image_url": "",
          "desc": "고열에 취약한 반도체 레이저 다이오드를 고온의 스위치 패키지 내부에서 분리하여 전면 패널에 꽂는 핫스왑(Hot-Swap) 교체형 분리 광원 아키텍처.",
          "tech_specs": "광원 규격: CW(연속파) 고출력 DFB/DBR 레이저 | 모듈 폼팩터: OIF ELSFP / QSFP-DD 표준 규격",
          "company_strategy": "• OIF(Optical Internetworking Forum) 표준화 주도 하에 루멘텀(Lumentum)과 코히런트(Coherent)가 핵심 광원 칩 독점 공급.",
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
      "abbr": "CXL",
      "badge": "서버 아키텍처 / D-RAM",
      "summary": "PCIe 5.0/6.0 물리 계층을 기반으로 CPU, GPU, 메모리 가속기를 초고속·저지연으로 연결하여 서버 간 메모리 풀(Pool)을 공유하고 용량을 무한대로 확장하는 개방형 표준 인터페이스",
      "image_url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
      "diagram": "graph TD\n    CPU_HOST[\"호스트 서버 CPU / GPU\"] --- CXL_SWITCH[\"CXL 지능형 스위치 (Astera Labs)\"]\n    CXL_SWITCH --- CXL_POOL[\"대규모 CXL 메모리 풀 (CMM-D)\"]\n    subgraph EXPANDABLE_MEMORY [\"테라바이트급 메모리 풀링\"]\n        CXL_POOL --> MOD1[\"CMM-D 128GB 모듈\"]\n        CXL_POOL --> MOD2[\"CMM-D 256GB 모듈\"]\n        CXL_POOL --> MOD3[\"CMM-D 512GB 고용량 모듈\"]\n    end",
      "framework": {
        "fundamentals": "서버 1대당 메인보드에 꽂을 수 있는 DDR5 슬롯(DIMM) 개수는 물리적 공간과 CPU 핀 수 제약으로 최대 16~32개에 불과하여 거대 AI 모델 구동 시 심각한 메모리 용량 부족(Memory Capacity Wall)이 발생함. CXL은 표준 PCIe 슬롯을 통해 메모리를 연결함으로써 서버 1대당 메모리 용량을 테라바이트 단위로 확장하고, 유휴 메모리를 여러 서버가 동적으로 공유(Pooling)하여 데이터센터 TCO를 30% 이상 절감함.",
        "process_tech": "1) CXL 2.0/3.0 컨트롤러 ASIC 설계 ➡️ 2) PCIe 6.0 PHY 및 고속 SerDes 회로 통합 ➡️ 3) DDR5 버퍼 브릿지 패키징 ➡️ 4) EDSFF E3.S/E1.S 폼팩터 모듈 조립 ➡️ 5) 캐시 코히런시(Cache Coherency) 하드웨어 로직 검증.",
        "bottlenecks": "1) 직접 연결 DDR5(약 60~80ns) 대비 CXL 컨트롤러 프로토콜 변환에 따른 지연시간(Latency 추가 +50~100ns) 오버헤드. 2) CXL 스위치 칩셋의 높은 단가. 3) 가상화 메모리 풀링을 완벽하게 지원하는 리눅스 커널 및 엔터프라이즈 OS 소프트웨어 생태계 성숙도.",
        "roadmap": "CXL 1.1 (포인트 투 포인트 메모리 확장) ➡️ CXL 2.0 (단일 스위치 메모리 풀링, 상용화) ➡️ CXL 3.0/3.1 (다중 스위치 패브릭, P2P 직접 공유, 2026~2027년)"
      },
      "nodes": [
        {
          "id": "cxl_expansion",
          "name": "CXL 2.0 메모리 확장 (CMM-D / EDSFF E3.S)",
          "tag": "현재 상용화 단계",
          "image_url": "",
          "desc": "서버의 PCIe 슬롯에 꽂아 기존 서버 DRAM 용량을 8배 이상 확장하는 CXL 메모리 모듈. 인텔 제온(Xeon) 및 AMD 에픽(EPYC) 서버 플랫폼과 완벽 호환.",
          "tech_specs": "인터페이스: PCIe 5.0 x8/x16 | 대역폭: 32GB/s ~ 64GB/s | 지원 용량: 모듈당 최대 512GB DDR5 지원",
          "company_strategy": "• 삼성전자: CMM-D(128GB/256GB) 양산 체제 구축 및 인텔 인증 완료.\n• SK하이닉스: CXL 2.0 96GB/128GB DDR5 모듈 공급망 확대.",
          "chain": {
            "memory": "삼성전자, SK하이닉스, 마이크론",
            "controller_ic": "아스테라랩스 (Astera Labs - ALAB), 파두 (FADU), 네오와인",
            "solution": "오픈엣지테크놀로지, 퀄리타스반도체 (인터페이스 IP)"
          }
        },
        {
          "id": "cxl_pooling_fab",
          "name": "CXL 3.0 메모리 풀링 & 스위치 (Memory Pooling Fabric)",
          "tag": "차세대 대규모 데이터센터",
          "image_url": "",
          "desc": "데이터센터 내 수십 대의 서버가 거대한 CXL 메모리 풀을 네트워크 스위치처럼 실시간으로 나누어 쓰는 메모리 가상화 기술. 버려지는 유휴 메모리(Stranded Memory)를 제로화.",
          "tech_specs": "물리 계층: PCIe 6.0 기반 64GT/s PAM4 | 코히런시: 다중 호스트 하드웨어 캐시 일관성 지원 | 대역폭: 128GB/s",
          "company_strategy": "• 아스테라랩스(Astera Labs): Leo 스위치 플랫폼으로 데이터센터 메모리 패브릭 시장 독점.\n• 국내 검사 장비사: CXL 3.0 전용 테스터 장비 국산화 공급.",
          "chain": {
            "switch_leader": "아스테라랩스 (Astera Labs), 브로드컴",
            "ip_design": "시놉시스 (Synopsys), 케이던스 (Cadence)",
            "korea_partners": "엑시콘 (CXL 양산 검사장비), 네오셈 (CXL 고속 테스터), 티엘비 (CXL 모듈 PCB 기판)"
          }
        }
      ]
    },
    {
      "id": "smr",
      "name": "SMR (Small Modular Reactor, 차세대 소형 모듈 원자로)",
      "badge": "원자력 에너지 / AI 전력망",
      "summary": "공장에서 주요 기기를 모듈 형태로 일괄 제작하여 건설 기간과 공사비를 대폭 단축하고, 전력 공급 없이 자연 대류 냉각으로 멜트다운을 원천 방지하는 300MWe 이하급 차세대 무탄소 분산형 원자력 발전소",
      "image_url": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      "diagram": "graph TD\n    SMR_CORE[\"소형 모듈 원자로 (SMR 일체형 압력용기)\"] ==> MICROGRID[\"AI 데이터센터 전용 독립 마이크로그리드\"]\n    MICROGRID ==> DC_AI1[\"빅테크 초거대 AI 슈퍼컴퓨터\"]\n    MICROGRID ==> DC_AI2[\"글로벌 클라우드 LLM 데이터센터\"]\n    SMR_CORE --> HYDROGEN[\"청정 핑크 수소 생산 플랜트\"]\n    subgraph PASSIVE_SAFETY [\"피동형 무전원 자연 대류 안전계통\"]\n        SMR_CORE --- WATER_POOL[\"대형 지하 비상냉각 수조\"]\n    end",
      "framework": {
        "fundamentals": "생성형 AI와 LLM 학습으로 인해 전 세계 데이터센터 전력 소비량이 기하급수적으로 폭증함에 따라, 날씨에 의존하는 태양광·풍력의 간헐성(Intermittency)을 극복하고 24시간 365일 무정전으로 대규모 기저전력(Base Load)을 공급할 수 있는 유일한 탄소 배출 제로 솔루션. 대형 원전 대비 1/100 크기로 송전망 건설 없이 데이터센터 부지 바로 옆에 직결 가능.",
        "process_tech": "1) 원자로 압력용기·증기발생기·가압기 일체형 대형 단조품 단일 주조 ➡️ 2) 공장 내 모듈 단위 정밀 조립(Modular Fabrication) ➡️ 3) 트럭/선박을 통한 현장 이송 ➡️ 4) 지하 격납 건물 내 단순 결합 ➡️ 5) 무전원 피동형 냉각 계통 가동.",
        "bottlenecks": "1) 고순도 저농축 우라늄(HALEU: 5~20% 농축) 연료 공급망의 서방 진영 자립화(러시아 의존 탈피). 2) 각국 규제기관(미국 NRC 등)의 표준설계인가(SDA) 승인 지연. 3) 최초 1호기 건설에 따른 초기 고비용(FOAK: First-of-a-Kind Cost) 극복.",
        "roadmap": "경수로형 SMR (2027~2028년 상용화) ➡️ 4세대 소듐냉각고속로(SFR) / 초고온가스로(HTGR) (2030년) ➡️ 해상 부유식 해양 원전"
      },
      "nodes": [
        {
          "id": "pwr_smr_nuscale",
          "name": "경수로형 SMR (뉴스케일파워 VOYGR 등)",
          "tag": "최초 인가 선두",
          "image_url": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
          "desc": "기존 검증된 가압경수로(PWR) 기술을 일체형으로 소형화한 모델. 미국 원자력규제위원회(NRC)로부터 표준설계인가를 세계 최초로 획득.",
          "tech_specs": "모듈 용량: 모듈당 77MWe (12기 결합 시 924MWe) | 안전성: 무전원 자연 순환으로 멜트다운 0% | 제작: 두산에너빌리티 단독 주기기 제작",
          "company_strategy": "• 뉴스케일파워(NuScale Power): 미국 및 동유럽(루마니아) 프로젝트 추진, 두산에너빌리티가 핵심 원자로 주기기 단조/제작 독점 공급.",
          "chain": {
            "developer": "뉴스케일파워 (NuScale - SMR), 홀텍 (Holtec)",
            "manufacturing": "두산에너빌리티 (원자로 압력용기/주기기 제작 독점)",
            "engineering": "삼성물산 (EPC 종합 건설), 현대건설, 한전기술"
          }
        },
        {
          "id": "sfr_terrapower_natrium",
          "name": "소듐냉각고속로 (테라파워 Natrium SFR)",
          "tag": "4세대 첨단 원전",
          "image_url": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
          "desc": "빌 게이츠가 설립한 테라파워 주도. 물 대신 액체 나트륨(소듐)을 냉각재로 사용하여 고온·상압 운전이 가능하며, 용융염 에너지 저장장치(Gigawatt-hour급)를 결합하여 피크 타임에 출력을 급증시킴.",
          "tech_specs": "상시 출력: 345MWe | 피크 부스팅: 용융염 저장장치 연계 시 500MWe 증폭 (5.5시간 이상) | 착공: 미국 와이오밍주 1호기 착공 완료",
          "company_strategy": "• 테라파워(TerraPower): 미국 에너지부(DOE) 지원 하에 2030년 상용화 목표, HD현대/SK그룹이 핵심 전략적 투자자로 참여.",
          "chain": {
            "developer": "테라파워 (TerraPower - 빌 게이츠 설립)",
            "korea_partners": "HD현대일렉트릭, HD현대중공업, SK이노베이션",
            "power_equipment": "두산에너빌리티, 효성중공업, LS ELECTRIC (초고압 변압기)"
          }
        },
        {
          "id": "ai_datacenter_grid_link",
          "name": "AI 데이터센터 직결 SMR 마이크로그리드",
          "tag": "빅테크 전력 계약(PPA)",
          "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
          "desc": "공공 송전망 부족 문제를 해결하기 위해, 아마존(AWS), 마이크로소프트, 구글 등이 데이터센터 부지 바로 옆에 SMR을 짓고 24시간 전력을 직공급받는 차세대 에너지 모델.",
          "tech_specs": "전력 가동률(CF): 95% 이상 (태양광 25%, 풍력 35% 대비 압도적) | 송전 손실: 0% (현장 직결 분산 전원)",
          "company_strategy": "• AWS: 탈렌에너지 원전 데이터센터 6.5억 달러 인수.\n• 오클로(Oklo): 샘 알트만(OpenAI) 의장 주도 하에 AI 데이터센터 전용 마이크로 원전 공급 계약 체결.",
          "chain": {
            "bigtech": "Amazon AWS, Microsoft, Google, OpenAI",
            "smr_innovator": "오클로 (Oklo - OKLO), 테라파워, 뉴스케일파워",
            "grid_infra": "일진전기, 제룡전기, 산일전기 (변압기/배전반)"
          }
        }
      ]
    }
  ]
};
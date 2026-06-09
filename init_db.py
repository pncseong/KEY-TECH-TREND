import sqlite3
import json
import os

# 스크립트 파일이 위치한 디렉토리 기준 절대 경로 설정
base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, 'tech_monitor.db')
schema_path = os.path.join(base_dir, 'db_schema.sql')

# 카테고리 초기 데이터 정의
initial_categories = [
    {
        "name": "반도체 (Semiconductors)",
        "keywords": ["HBM", "CoWoS", "Hybrid Bonding", "CXL", "GAA", "유리 기판", "Glass Substrate", "Semiconductor"],
        "priority": 1
    },
    {
        "name": "2차전지 (Secondary Batteries)",
        "keywords": ["전고체 배터리", "ASSB", "실리콘 음극재", "LFP", "하이니켈", "배터리 재활용", "Secondary Battery"],
        "priority": 2
    },
    {
        "name": "전력망 (Power Grid)",
        "keywords": ["SMR", "소형 모듈 원자로", "HVDC", "고압직류송전", "변압기", "가상 발전소", "VPP", "Power Grid"],
        "priority": 3
    },
    {
        "name": "광통신 (Optical Comm.)",
        "keywords": ["광모듈", "CPO", "Co-Packaged Optics", "실리콘 포토닉스", "Silicon Photonics", "DCI", "Optical Communication"],
        "priority": 4
    },
    {
        "name": "AI 로봇 (AI & Robotics)",
        "keywords": ["로봇", "Robot", "AI 로봇", "AI Robot", "휴머노이드", "Humanoid", "에지 컴퓨팅 AI", "Edge AI", "서보모터", "감속기", "Robotics"],
        "priority": 5
    },
    {
        "name": "데이터센터 냉각 (Thermal & Cooling)",
        "keywords": ["액침 냉각", "액체 냉각", "Immersion Cooling", "Liquid Cooling", "열 관리", "Thermal Management", "데이터센터 냉각", "서버 냉각"],
        "priority": 6
    },
    {
        "name": "온디바이스 AI (On-Device AI)",
        "keywords": ["온디바이스 AI", "On-Device AI", "NPU", "신경망처리장치", "에지 AI", "Edge AI", "AI 가속기", "Neural Processing"],
        "priority": 7
    },
        # 45~55번째 줄 모양새를 아래처럼 맞춰주세요
    {
        "name": "우주 통신 (Space & LEO Comm.)",
        "keywords": ["저궤도 위성", "LEO Satellite", "위성 통신", "우주 인터넷", "Space Internet", "6G 위성", "위성 안테나"],
        "priority": 8
    },
    {
        "name": "양자 컴퓨터 (Quantum Computing)",
        "keywords": ["양자 컴퓨터", "양자 컴퓨팅", "Quantum Computing", "큐비트", "Qubit", "양자 어닐링", "Quantum Annealing", "초전도 양자", "양자 정보", "Quantum Information"],
        "priority": 9
    }
]

def initialize_database():
    print("Database initialization started...")
    
    # 1. DB 연결 및 외래키 활성화
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON;")
    cursor = conn.cursor()
    
    # 2. 스키마 파일 실행
    if os.path.exists(schema_path):
        with open(schema_path, 'r', encoding='utf-8') as f:
            schema_sql = f.read()
            cursor.executescript(schema_sql)
            print("Schema loaded successfully.")
    else:
        print(f"Error: {schema_path} file not found.")
        conn.close()
        return

    # 3. 카테고리 초기 데이터 삽입
    for cat in initial_categories:
        try:
            cursor.execute(
                "INSERT INTO categories (name, keywords, priority) VALUES (?, ?, ?)",
                (cat["name"], json.dumps(cat["keywords"], ensure_ascii=False), cat["priority"])
            )
            print(f"Category added: {cat['name']}")
        except sqlite3.IntegrityError:
            # 이미 존재하는 경우 키워드 및 우선순위 업데이트
            cursor.execute(
                "UPDATE categories SET keywords = ?, priority = ? WHERE name = ?",
                (json.dumps(cat["keywords"], ensure_ascii=False), cat["priority"], cat["name"])
            )
            print(f"Category updated: {cat['name']}")
            
    conn.commit()
    conn.close()
    print("Database initialization completed successfully.")

if __name__ == "__main__":
    initialize_database()

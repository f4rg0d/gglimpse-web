# 파일 처리 및 데이터 다루기 예제

import os
import json
import csv
from datetime import datetime

# 1. 텍스트 파일 읽기/쓰기
def create_sample_text():
    """샘플 텍스트 파일 생성"""
    with open("sample.txt", "w", encoding="utf-8") as f:
        f.write("안녕하세요!\n")
        f.write("이것은 샘플 텍스트 파일입니다.\n")
        f.write("파이썬으로 파일을 다루는 방법을 배워봅시다.\n")
    print("sample.txt 파일이 생성되었습니다.")

def read_text_file():
    """텍스트 파일 읽기"""
    try:
        with open("sample.txt", "r", encoding="utf-8") as f:
            content = f.read()
            print("=== 텍스트 파일 내용 ===")
            print(content)
    except FileNotFoundError:
        print("파일을 찾을 수 없습니다.")

def append_to_file():
    """파일에 내용 추가"""
    with open("sample.txt", "a", encoding="utf-8") as f:
        f.write(f"\n추가된 내용: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("파일에 내용이 추가되었습니다.")

# 2. JSON 파일 다루기
def create_json_sample():
    """JSON 샘플 데이터 생성"""
    data = {
        "users": [
            {"name": "김철수", "age": 25, "city": "서울"},
            {"name": "이영희", "age": 30, "city": "부산"},
            {"name": "박민수", "age": 28, "city": "대구"}
        ],
        "settings": {
            "theme": "dark",
            "language": "ko",
            "notifications": True
        }
    }
    
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("data.json 파일이 생성되었습니다.")

def read_json_file():
    """JSON 파일 읽기"""
    try:
        with open("data.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            print("=== JSON 데이터 ===")
            print(f"사용자 수: {len(data['users'])}")
            for user in data['users']:
                print(f"- {user['name']} ({user['age']}세, {user['city']})")
            print(f"테마: {data['settings']['theme']}")
    except FileNotFoundError:
        print("JSON 파일을 찾을 수 없습니다.")

# 3. CSV 파일 다루기
def create_csv_sample():
    """CSV 샘플 데이터 생성"""
    data = [
        ["이름", "나이", "직업", "도시"],
        ["김철수", "25", "개발자", "서울"],
        ["이영희", "30", "디자이너", "부산"],
        ["박민수", "28", "마케터", "대구"],
        ["최지영", "32", "기획자", "인천"]
    ]
    
    with open("users.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(data)
    print("users.csv 파일이 생성되었습니다.")

def read_csv_file():
    """CSV 파일 읽기"""
    try:
        with open("users.csv", "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            print("=== CSV 데이터 ===")
            for row in reader:
                print(f"{' | '.join(row)}")
    except FileNotFoundError:
        print("CSV 파일을 찾을 수 없습니다.")

# 4. 파일 및 디렉토리 정보
def file_info():
    """파일 정보 출력"""
    files = ["sample.txt", "data.json", "users.csv"]
    
    print("=== 파일 정보 ===")
    for filename in files:
        if os.path.exists(filename):
            size = os.path.getsize(filename)
            modified = datetime.fromtimestamp(os.path.getmtime(filename))
            print(f"{filename}: {size} bytes, 수정: {modified}")
        else:
            print(f"{filename}: 파일이 존재하지 않습니다.")

# 5. 파일 검색 및 필터링
def search_files():
    """현재 디렉토리의 파일 검색"""
    print("=== 현재 디렉토리 파일 목록 ===")
    for item in os.listdir("."):
        if os.path.isfile(item):
            print(f"파일: {item}")
        elif os.path.isdir(item):
            print(f"폴더: {item}")

# 6. 파일 백업
def backup_file(filename):
    """파일 백업"""
    if os.path.exists(filename):
        backup_name = f"{filename}.backup"
        with open(filename, "r", encoding="utf-8") as source:
            with open(backup_name, "w", encoding="utf-8") as backup:
                backup.write(source.read())
        print(f"{filename}이(가) {backup_name}으로 백업되었습니다.")
    else:
        print(f"{filename} 파일이 존재하지 않습니다.")

# 7. 로그 파일 생성
def create_log():
    """로그 파일 생성"""
    log_entries = [
        "2024-01-15 10:30:15 - 시스템 시작",
        "2024-01-15 10:30:20 - 데이터베이스 연결 성공",
        "2024-01-15 10:30:25 - 사용자 로그인: user123",
        "2024-01-15 10:30:30 - 파일 업로드 완료: document.pdf",
        "2024-01-15 10:30:35 - 시스템 종료"
    ]
    
    with open("app.log", "w", encoding="utf-8") as f:
        for entry in log_entries:
            f.write(entry + "\n")
    print("app.log 파일이 생성되었습니다.")

# 실행 예제
if __name__ == "__main__":
    print("=== 파일 처리 예제 ===\n")
    
    # 1. 텍스트 파일
    create_sample_text()
    read_text_file()
    append_to_file()
    read_text_file()
    
    # 2. JSON 파일
    create_json_sample()
    read_json_file()
    
    # 3. CSV 파일
    create_csv_sample()
    read_csv_file()
    
    # 4. 파일 정보
    file_info()
    
    # 5. 파일 검색
    search_files()
    
    # 6. 백업
    backup_file("sample.txt")
    
    # 7. 로그 파일
    create_log()
    
    print("\n=== 모든 예제가 완료되었습니다 ===") 
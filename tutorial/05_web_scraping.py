# 웹 스크래핑 및 API 사용 예제

import requests
from bs4 import BeautifulSoup
import json
import time
from urllib.parse import urljoin, urlparse
import csv

# 1. 기본 HTTP 요청
def basic_requests():
    """기본 HTTP 요청 예제"""
    print("=== 기본 HTTP 요청 ===")
    
    # GET 요청
    response = requests.get("https://httpbin.org/get")
    print(f"상태 코드: {response.status_code}")
    print(f"응답 헤더: {dict(response.headers)}")
    print(f"응답 내용: {response.text[:200]}...")
    
    # POST 요청
    data = {"name": "홍길동", "age": 25}
    response = requests.post("https://httpbin.org/post", json=data)
    print(f"\nPOST 응답: {response.json()}")

# 2. 웹 스크래핑 - BeautifulSoup
def web_scraping_example():
    """웹 스크래핑 예제"""
    print("\n=== 웹 스크래핑 예제 ===")
    
    # 샘플 HTML (실제 웹사이트 대신)
    sample_html = """
    <html>
        <head>
            <title>샘플 웹페이지</title>
        </head>
        <body>
            <h1>제목</h1>
            <div class="content">
                <p>첫 번째 단락입니다.</p>
                <p>두 번째 단락입니다.</p>
            </div>
            <ul>
                <li>항목 1</li>
                <li>항목 2</li>
                <li>항목 3</li>
            </ul>
            <a href="https://example.com">링크</a>
        </body>
    </html>
    """
    
    # BeautifulSoup으로 파싱
    soup = BeautifulSoup(sample_html, 'html.parser')
    
    # 제목 추출
    title = soup.find('title').text
    print(f"페이지 제목: {title}")
    
    # 모든 단락 추출
    paragraphs = soup.find_all('p')
    print("단락들:")
    for i, p in enumerate(paragraphs, 1):
        print(f"  {i}. {p.text}")
    
    # 리스트 항목 추출
    list_items = soup.find_all('li')
    print("리스트 항목들:")
    for item in list_items:
        print(f"  - {item.text}")
    
    # 링크 추출
    links = soup.find_all('a')
    print("링크들:")
    for link in links:
        print(f"  - {link.text}: {link['href']}")

# 3. 공개 API 사용
def public_api_example():
    """공개 API 사용 예제"""
    print("\n=== 공개 API 예제 ===")
    
    # JSONPlaceholder API (무료 테스트 API)
    try:
        # 사용자 정보 가져오기
        response = requests.get("https://jsonplaceholder.typicode.com/users/1")
        if response.status_code == 200:
            user = response.json()
            print(f"사용자 정보:")
            print(f"  이름: {user['name']}")
            print(f"  이메일: {user['email']}")
            print(f"  도시: {user['address']['city']}")
        
        # 게시물 가져오기
        response = requests.get("https://jsonplaceholder.typicode.com/posts?_limit=3")
        if response.status_code == 200:
            posts = response.json()
            print(f"\n최근 게시물:")
            for post in posts:
                print(f"  제목: {post['title']}")
                print(f"  내용: {post['body'][:50]}...")
                print()
    
    except requests.RequestException as e:
        print(f"API 요청 오류: {e}")

# 4. 날씨 API 시뮬레이션
def weather_api_simulation():
    """날씨 API 시뮬레이션"""
    print("\n=== 날씨 API 시뮬레이션 ===")
    
    # 실제 날씨 API 대신 시뮬레이션
    weather_data = {
        "서울": {"temp": 22, "humidity": 65, "description": "맑음"},
        "부산": {"temp": 25, "humidity": 70, "description": "흐림"},
        "대구": {"temp": 28, "humidity": 55, "description": "맑음"},
        "인천": {"temp": 20, "humidity": 80, "description": "비"}
    }
    
    def get_weather(city):
        return weather_data.get(city, {"temp": 0, "humidity": 0, "description": "알 수 없음"})
    
    # 여러 도시의 날씨 정보
    cities = ["서울", "부산", "대구", "인천"]
    for city in cities:
        weather = get_weather(city)
        print(f"{city}: {weather['temp']}°C, 습도 {weather['humidity']}%, {weather['description']}")

# 5. 뉴스 스크래핑 시뮬레이션
def news_scraping_simulation():
    """뉴스 스크래핑 시뮬레이션"""
    print("\n=== 뉴스 스크래핑 시뮬레이션 ===")
    
    # 샘플 뉴스 데이터
    news_data = [
        {
            "title": "파이썬 프로그래밍 언어 인기 상승",
            "content": "최근 파이썬 프로그래밍 언어의 인기가 급상승하고 있습니다...",
            "date": "2024-01-15",
            "category": "기술"
        },
        {
            "title": "인공지능 기술 발전 현황",
            "content": "머신러닝과 딥러닝 기술이 다양한 분야에서 활용되고 있습니다...",
            "date": "2024-01-14",
            "category": "기술"
        },
        {
            "title": "웹 개발 트렌드 2024",
            "content": "2024년 웹 개발 분야의 주요 트렌드를 살펴보겠습니다...",
            "date": "2024-01-13",
            "category": "개발"
        }
    ]
    
    # 뉴스 데이터 처리
    for news in news_data:
        print(f"제목: {news['title']}")
        print(f"내용: {news['content'][:50]}...")
        print(f"날짜: {news['date']}")
        print(f"카테고리: {news['category']}")
        print("-" * 50)

# 6. 데이터 저장
def save_data():
    """스크래핑한 데이터 저장"""
    print("\n=== 데이터 저장 ===")
    
    # 샘플 데이터
    products = [
        {"name": "노트북", "price": 1200000, "category": "전자제품"},
        {"name": "마우스", "price": 50000, "category": "전자제품"},
        {"name": "키보드", "price": 150000, "category": "전자제품"},
        {"name": "책상", "price": 200000, "category": "가구"},
        {"name": "의자", "price": 300000, "category": "가구"}
    ]
    
    # JSON 파일로 저장
    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print("products.json 파일이 생성되었습니다.")
    
    # CSV 파일로 저장
    with open("products.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["name", "price", "category"])
        writer.writeheader()
        writer.writerows(products)
    print("products.csv 파일이 생성되었습니다.")

# 7. 웹 크롤러 클래스
class WebCrawler:
    def __init__(self, base_url):
        self.base_url = base_url
        self.visited = set()
        self.session = requests.Session()
    
    def crawl(self, url, max_pages=5):
        """웹 크롤링"""
        if len(self.visited) >= max_pages or url in self.visited:
            return
        
        self.visited.add(url)
        print(f"크롤링: {url}")
        
        try:
            response = self.session.get(url, timeout=5)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # 링크 추출
                links = soup.find_all('a', href=True)
                for link in links[:3]:  # 처음 3개 링크만
                    next_url = urljoin(url, link['href'])
                    if next_url.startswith(self.base_url):
                        self.crawl(next_url, max_pages)
        
        except Exception as e:
            print(f"크롤링 오류: {e}")

# 8. API 래퍼 클래스
class APIClient:
    def __init__(self, base_url, api_key=None):
        self.base_url = base_url
        self.api_key = api_key
        self.session = requests.Session()
        
        if api_key:
            self.session.headers.update({"Authorization": f"Bearer {api_key}"})
    
    def get(self, endpoint, params=None):
        """GET 요청"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.get(url, params=params)
        return response.json() if response.status_code == 200 else None
    
    def post(self, endpoint, data=None):
        """POST 요청"""
        url = f"{self.base_url}{endpoint}"
        response = self.session.post(url, json=data)
        return response.json() if response.status_code == 200 else None

# 9. 에러 처리 및 재시도
def robust_request(url, max_retries=3):
    """안정적인 HTTP 요청"""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            print(f"시도 {attempt + 1}/{max_retries} 실패: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # 지수 백오프
            else:
                raise
    return None

# 10. 데이터 파싱 유틸리티
def parse_table_data(html_content):
    """HTML 테이블 데이터 파싱"""
    soup = BeautifulSoup(html_content, 'html.parser')
    tables = soup.find_all('table')
    
    all_data = []
    for table in tables:
        rows = table.find_all('tr')
        table_data = []
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            row_data = [cell.get_text(strip=True) for cell in cells]
            if row_data:
                table_data.append(row_data)
        
        if table_data:
            all_data.append(table_data)
    
    return all_data

# 실행 예제
if __name__ == "__main__":
    print("=== 웹 스크래핑 및 API 사용 예제 ===\n")
    
    # 기본 HTTP 요청
    basic_requests()
    
    # 웹 스크래핑
    web_scraping_example()
    
    # 공개 API 사용
    public_api_example()
    
    # 날씨 API 시뮬레이션
    weather_api_simulation()
    
    # 뉴스 스크래핑 시뮬레이션
    news_scraping_simulation()
    
    # 데이터 저장
    save_data()
    
    # 웹 크롤러 예제
    print("\n=== 웹 크롤러 예제 ===")
    crawler = WebCrawler("https://example.com")
    # 실제 크롤링은 주석 처리 (예제용)
    # crawler.crawl("https://example.com")
    
    # API 클라이언트 예제
    print("\n=== API 클라이언트 예제 ===")
    api_client = APIClient("https://jsonplaceholder.typicode.com")
    user_data = api_client.get("/users/1")
    if user_data:
        print(f"API 응답: {user_data['name']}")
    
    print("\n=== 모든 예제가 완료되었습니다 ===") 
# 파이썬 기본 문법 예제
# 1. 변수와 데이터 타입

# 숫자형
age = 25
height = 175.5
print(f"나이: {age}, 키: {height}cm")

# 문자열
name = "홍길동"
message = "안녕하세요!"
print(f"{name}님, {message}")

# 불린형
is_student = True
is_working = False
print(f"학생인가요? {is_student}")
print(f"직장인인가요? {is_working}")

# 리스트 (가변)
fruits = ["사과", "바나나", "오렌지"]
fruits.append("포도")
print(f"과일 목록: {fruits}")

# 튜플 (불변)
coordinates = (10, 20)
print(f"좌표: {coordinates}")

# 딕셔너리
person = {
    "name": "김철수",
    "age": 30,
    "city": "서울"
}
print(f"사람 정보: {person}")

# 2. 조건문
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"
print(f"점수: {score}, 등급: {grade}")

# 3. 반복문
print("\n1부터 5까지 출력:")
for i in range(1, 6):
    print(i, end=" ")
print()

# while 반복문
print("\nwhile 반복문:")
count = 0
while count < 3:
    print(f"카운트: {count}")
    count += 1

# 4. 함수 정의
def greet(name):
    return f"안녕하세요, {name}님!"

def add_numbers(a, b):
    return a + b

# 함수 호출
print(f"\n{greet('영희')}")
result = add_numbers(10, 20)
print(f"10 + 20 = {result}")

# 5. 리스트 컴프리헨션
squares = [x**2 for x in range(1, 6)]
print(f"\n1부터 5까지의 제곱: {squares}")

# 6. 예외 처리
try:
    number = int(input("\n숫자를 입력하세요: "))
    result = 10 / number
    print(f"10 / {number} = {result}")
except ValueError:
    print("올바른 숫자를 입력하세요.")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다.")
except Exception as e:
    print(f"오류 발생: {e}") 
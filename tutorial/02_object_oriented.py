# 객체지향 프로그래밍 예제

# 1. 클래스와 객체
class Person:
    # 클래스 변수
    species = "인간"
    
    # 생성자 (__init__)
    def __init__(self, name, age):
        self.name = name  # 인스턴스 변수
        self.age = age
    
    # 인스턴스 메서드
    def introduce(self):
        return f"안녕하세요! 저는 {self.name}이고, {self.age}살입니다."
    
    def have_birthday(self):
        self.age += 1
        return f"{self.name}의 생일! 이제 {self.age}살이 되었습니다."
    
    # 클래스 메서드
    @classmethod
    def create_anonymous(cls):
        return cls("익명", 0)
    
    # 정적 메서드
    @staticmethod
    def is_adult(age):
        return age >= 20

# 객체 생성
person1 = Person("김철수", 25)
person2 = Person("이영희", 30)

print(person1.introduce())
print(person2.introduce())
print(person1.have_birthday())

# 클래스 메서드 사용
anonymous = Person.create_anonymous()
print(anonymous.introduce())

# 정적 메서드 사용
print(f"25살은 성인인가요? {Person.is_adult(25)}")

# 2. 상속
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # 부모 클래스 초기화
        self.student_id = student_id
    
    def study(self):
        return f"{self.name}이(가) 공부하고 있습니다."
    
    def introduce(self):  # 메서드 오버라이딩
        return f"안녕하세요! 저는 {self.name}이고, {self.age}살이며, 학번은 {self.student_id}입니다."

# 상속된 클래스 사용
student = Student("박민수", 20, "2024001")
print(student.introduce())
print(student.study())

# 3. 다형성
class Animal:
    def make_sound(self):
        pass

class Dog(Animal):
    def make_sound(self):
        return "멍멍!"

class Cat(Animal):
    def make_sound(self):
        return "야옹!"

class Bird(Animal):
    def make_sound(self):
        return "짹짹!"

# 다형성 예제
animals = [Dog(), Cat(), Bird()]
for animal in animals:
    print(animal.make_sound())

# 4. 캡슐화 (정보 은닉)
class BankAccount:
    def __init__(self, account_number, balance):
        self.__account_number = account_number  # private 변수
        self.__balance = balance
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return f"{amount}원이 입금되었습니다. 잔액: {self.__balance}원"
        else:
            return "올바른 금액을 입력하세요."
    
    def withdraw(self, amount):
        if amount > 0 and amount <= self.__balance:
            self.__balance -= amount
            return f"{amount}원이 출금되었습니다. 잔액: {self.__balance}원"
        else:
            return "잔액이 부족하거나 올바르지 않은 금액입니다."

# 캡슐화 예제
account = BankAccount("123-456-789", 10000)
print(account.deposit(5000))
print(account.withdraw(3000))
print(f"현재 잔액: {account.get_balance()}원")

# 5. 프로퍼티 데코레이터
class Temperature:
    def __init__(self):
        self._celsius = 0
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("절대 영도보다 낮을 수 없습니다.")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# 프로퍼티 사용
temp = Temperature()
temp.celsius = 25
print(f"섭씨: {temp.celsius}°C")
print(f"화씨: {temp.fahrenheit}°F")

temp.fahrenheit = 68
print(f"섭씨: {temp.celsius}°C")
print(f"화씨: {temp.fahrenheit}°F") 
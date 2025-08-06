# 데이터 구조 및 알고리즘 예제

from collections import defaultdict, Counter, deque
import heapq
from typing import List, Dict, Set

# 1. 리스트 (List) - 동적 배열
def list_operations():
    """리스트 기본 연산"""
    print("=== 리스트 연산 ===")
    
    # 리스트 생성
    numbers = [1, 2, 3, 4, 5]
    fruits = ["사과", "바나나", "오렌지"]
    
    # 추가
    numbers.append(6)
    numbers.insert(0, 0)
    print(f"추가 후: {numbers}")
    
    # 삭제
    removed = numbers.pop()  # 마지막 요소
    numbers.remove(2)  # 특정 값 삭제
    print(f"삭제 후: {numbers}")
    
    # 정렬
    mixed = [3, 1, 4, 1, 5, 9, 2, 6]
    mixed.sort()
    print(f"정렬 후: {mixed}")
    
    # 리스트 컴프리헨션
    squares = [x**2 for x in range(1, 6)]
    even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
    print(f"제곱수: {squares}")
    print(f"짝수 제곱수: {even_squares}")

# 2. 딕셔너리 (Dictionary) - 해시 테이블
def dict_operations():
    """딕셔너리 기본 연산"""
    print("\n=== 딕셔너리 연산 ===")
    
    # 딕셔너리 생성
    person = {"name": "김철수", "age": 25, "city": "서울"}
    
    # 추가/수정
    person["job"] = "개발자"
    person["age"] = 26
    print(f"사람 정보: {person}")
    
    # 조회
    name = person.get("name", "Unknown")
    phone = person.get("phone", "번호 없음")
    print(f"이름: {name}, 전화번호: {phone}")
    
    # 키, 값, 아이템
    print(f"키들: {list(person.keys())}")
    print(f"값들: {list(person.values())}")
    print(f"아이템들: {list(person.items())}")
    
    # 딕셔너리 컴프리헨션
    word_lengths = {word: len(word) for word in ["apple", "banana", "cherry"]}
    print(f"단어 길이: {word_lengths}")

# 3. 집합 (Set) - 중복 없는 컬렉션
def set_operations():
    """집합 기본 연산"""
    print("\n=== 집합 연산 ===")
    
    # 집합 생성
    set1 = {1, 2, 3, 4, 5}
    set2 = {4, 5, 6, 7, 8}
    
    # 집합 연산
    union = set1 | set2  # 합집합
    intersection = set1 & set2  # 교집합
    difference = set1 - set2  # 차집합
    symmetric_diff = set1 ^ set2  # 대칭차집합
    
    print(f"집합1: {set1}")
    print(f"집합2: {set2}")
    print(f"합집합: {union}")
    print(f"교집합: {intersection}")
    print(f"차집합: {difference}")
    print(f"대칭차집합: {symmetric_diff}")
    
    # 중복 제거
    numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
    unique_numbers = list(set(numbers))
    print(f"원본: {numbers}")
    print(f"중복 제거: {unique_numbers}")

# 4. 큐 (Queue) - FIFO
def queue_operations():
    """큐 연산"""
    print("\n=== 큐 연산 ===")
    
    from collections import deque
    
    queue = deque()
    
    # 추가
    queue.append("첫 번째")
    queue.append("두 번째")
    queue.append("세 번째")
    print(f"큐 상태: {list(queue)}")
    
    # 제거 (FIFO)
    first = queue.popleft()
    second = queue.popleft()
    print(f"제거된 항목: {first}, {second}")
    print(f"남은 큐: {list(queue)}")

# 5. 스택 (Stack) - LIFO
def stack_operations():
    """스택 연산"""
    print("\n=== 스택 연산 ===")
    
    stack = []
    
    # 추가
    stack.append("첫 번째")
    stack.append("두 번째")
    stack.append("세 번째")
    print(f"스택 상태: {stack}")
    
    # 제거 (LIFO)
    last = stack.pop()
    second_last = stack.pop()
    print(f"제거된 항목: {last}, {second_last}")
    print(f"남은 스택: {stack}")

# 6. 힙 (Heap) - 우선순위 큐
def heap_operations():
    """힙 연산"""
    print("\n=== 힙 연산 ===")
    
    # 최소 힙
    numbers = [3, 1, 4, 1, 5, 9, 2, 6]
    heapq.heapify(numbers)
    print(f"힙화된 배열: {numbers}")
    
    # 최소값 추출
    min_val = heapq.heappop(numbers)
    print(f"최소값: {min_val}")
    print(f"남은 힙: {numbers}")
    
    # 값 추가
    heapq.heappush(numbers, 0)
    print(f"0 추가 후: {numbers}")
    
    # 최대 힙 (음수 사용)
    max_heap = [-x for x in [3, 1, 4, 1, 5, 9, 2, 6]]
    heapq.heapify(max_heap)
    print(f"최대 힙: {[-x for x in max_heap]}")

# 7. 그래프 (Graph) - 인접 리스트
def graph_operations():
    """그래프 연산"""
    print("\n=== 그래프 연산 ===")
    
    # 인접 리스트로 그래프 표현
    graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    }
    
    print("그래프 구조:")
    for node, neighbors in graph.items():
        print(f"{node} -> {neighbors}")
    
    # DFS (깊이 우선 탐색)
    def dfs(graph, start, visited=None):
        if visited is None:
            visited = set()
        visited.add(start)
        print(f"방문: {start}")
        
        for neighbor in graph[start]:
            if neighbor not in visited:
                dfs(graph, neighbor, visited)
    
    print("\nDFS 순회:")
    dfs(graph, 'A')

# 8. 트리 (Tree) - 이진 트리
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def tree_operations():
    """트리 연산"""
    print("\n=== 트리 연산 ===")
    
    # 이진 트리 생성
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    
    # 중위 순회 (Inorder)
    def inorder(node):
        if node:
            inorder(node.left)
            print(node.value, end=" ")
            inorder(node.right)
    
    print("중위 순회:", end=" ")
    inorder(root)
    print()
    
    # 전위 순회 (Preorder)
    def preorder(node):
        if node:
            print(node.value, end=" ")
            preorder(node.left)
            preorder(node.right)
    
    print("전위 순회:", end=" ")
    preorder(root)
    print()
    
    # 후위 순회 (Postorder)
    def postorder(node):
        if node:
            postorder(node.left)
            postorder(node.right)
            print(node.value, end=" ")
    
    print("후위 순회:", end=" ")
    postorder(root)
    print()

# 9. 정렬 알고리즘
def sorting_algorithms():
    """정렬 알고리즘"""
    print("\n=== 정렬 알고리즘 ===")
    
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"원본 배열: {numbers}")
    
    # 버블 정렬
    def bubble_sort(arr):
        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr
    
    bubble_sorted = bubble_sort(numbers.copy())
    print(f"버블 정렬: {bubble_sorted}")
    
    # 선택 정렬
    def selection_sort(arr):
        n = len(arr)
        for i in range(n):
            min_idx = i
            for j in range(i + 1, n):
                if arr[j] < arr[min_idx]:
                    min_idx = j
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        return arr
    
    selection_sorted = selection_sort(numbers.copy())
    print(f"선택 정렬: {selection_sorted}")

# 10. 검색 알고리즘
def search_algorithms():
    """검색 알고리즘"""
    print("\n=== 검색 알고리즘 ===")
    
    sorted_numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    target = 7
    print(f"정렬된 배열: {sorted_numbers}")
    print(f"찾을 값: {target}")
    
    # 이진 검색
    def binary_search(arr, target):
        left, right = 0, len(arr) - 1
        
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
    
    result = binary_search(sorted_numbers, target)
    if result != -1:
        print(f"이진 검색 결과: 인덱스 {result}")
    else:
        print("값을 찾을 수 없습니다.")

# 실행
if __name__ == "__main__":
    list_operations()
    dict_operations()
    set_operations()
    queue_operations()
    stack_operations()
    heap_operations()
    graph_operations()
    tree_operations()
    sorting_algorithms()
    search_algorithms() 
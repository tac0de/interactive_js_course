# Event1 과제(?

# 기존 코드 vs 리팩토링 코드 변화 요약

## 1. 구조 개선 개요

| 항목           | 기존 (KidsDocent.js)                         | 리팩토링 (main.js)                         |
|----------------|----------------------------------------------|---------------------------------------------|
| 구조           | IIFE (즉시 실행 함수) 패턴                  | ES6 모듈 구조 (`export`, `import`)         |
| DOM 접근       | 전역 상수 내 중첩 구조                       | 직접 참조 또는 매개변수 주입 방식          |
| 공유 설정 방식 | `Map` 객체로 관리                            | 일반 객체 literal (`{}`) 사용              |
| 초기화 방식    | `prototype.init()` 호출                      | `DOMContentLoaded` 내 직접 실행            |
| 이벤트 핸들러  | 내부에서 직접 정의 및 바인딩                 | 명확히 분리된 함수로 외부 정의             |
| 상태 관리      | `isInApp`, `prevScroll` 등 전역 상태 직접 사용 | 명확히 분리 및 주석과 함께 설명 구조 도입 |

---

## 2. 주요 함수별 리팩토링 변화

### ✅ setScrollDirection() → `document.body.dataset.scroll` 단순화

```js
// 기존
BODY.dataset.scroll = prevScroll >= scrollTop ? 'up' : 'down';

// 개선
const scrollTop = document.documentElement.scrollTop;
document.body.dataset.scroll = prevScroll >= scrollTop || scrollTop <= 0 ? 'up' : 'down';
```

---

### ✅ openToast() - 가독성 향상

```js
// 기존
if (!toast) return;
if (typeof msg !== 'string') return;
if (msg.length === 0) return;

// 개선
if (!toast || typeof msg !== 'string' || !msg) return;
```

---

### ✅ share() 구조 개선

```js
// 기존: 불필요한 ID 부여
const dummy = document.createElement('input');
dummy.id = 'myInput';

// 개선: ID 제거, 값만 삽입
const dummy = document.createElement('input');
dummy.value = url;
```

---

### ✅ setTabs() 함수 내 구조 개선

```js
// 기존: 상위 요소 접근
const parent = target.parentElement;
const grand = parent.parentElement;

// 개선: closest()로 접근 간소화
const grand = target.closest('[role="tablist"]').parentElement;
```

```js
// 기존: 이벤트 내 전처리 혼합
const onChangeTab = (e) => { ... };

// 개선: 별도 함수 분리
const activateTab = (tab, container) => { ... };
```

---

### ✅ switchingNav() 간결화

```js
// 기존
if (navBar.offsetTop - 60 <= scrollY) {
  navBar.classList.add("active");
} else {
  navBar.classList.remove("active");
}

// 개선
navBar.classList.toggle("active", navBar.offsetTop - 60 <= scrollY);
```

---

## 3. 기타 개선 사항

### 3.1 상수 키코드 명확화

```js
// 기존
if (keyCode === 37) { ... }

// 개선
const KEY = { LEFT: 37, RIGHT: 39 };
if (keyCode === KEY.LEFT) { ... }
```

---

### 3.2 Arrow Function 통일

```js
// 기존
function setScrollDirection() {
  ...
}

// 개선
const setScrollDirection = () => {
  ...
};
```

---

### 3.3 Toggle 클래스 처리 개선

```js
// 기존
el.classList[!isActive ? 'add' : 'remove']('active');

// 개선
el.classList.toggle('active');
```

---

## 4. 리팩토링 목적 요약

- **가독성 향상**: 중첩 구조 제거, 조건문 간소화
- **유지보수성 향상**: 함수별 역할 분리, 로직 중복 제거
- **현대적 JS 패턴 적용**: `const`, `let`, arrow functions, `export` 모듈 구조
- **확장성 확보**: 테스트/자동화/모듈화 구조로 유연하게 확장 가능

---

> 이 문서는 GitHub `README.md`에 그대로 사용 가능합니다. 추가적으로 슬라이드용 요약본이 필요하시면 요청해주세요.

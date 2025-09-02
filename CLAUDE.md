# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 답변은 한국어로 작성

모든 응답과 코멘트는 한국어로 작성해야 합니다.

## 프로젝트 개요

이 프로젝트는 **Turborepo**로 구성된 모노레포로, React 기반의 웹 애플리케이션과 재사용 가능한 패키지들로 구성되어 있습니다.

### 모노레포 구조

```
claude_code/
├── apps/
│   └── web/              # 메인 웹 애플리케이션 (Vite + React)
└── packages/
    ├── ui/               # UI 컴포넌트 라이브러리
    ├── apis/             # API 관련 유틸리티 및 React Query 설정
    ├── eslint-config/    # 공유 ESLint 설정
    └── typescript-config/ # 공유 TypeScript 설정
```

## 개발 명령어

### 루트 레벨 명령어 (pnpm 사용)
```bash
pnpm dev          # 모든 패키지 개발 모드 실행
pnpm build        # 모든 패키지 빌드
pnpm lint         # 모든 패키지 린트 검사
pnpm type-check   # 모든 패키지 타입 검사
pnpm format       # Prettier로 코드 포매팅
```

### 웹 애플리케이션 (apps/web)
```bash
cd apps/web
pnpm dev          # 개발 서버 실행 (포트 3000)
pnpm build        # 프로덕션 빌드 (TypeScript 컴파일 + Vite 빌드)
pnpm preview      # 빌드된 애플리케이션 미리보기
pnpm lint         # ESLint 검사
pnpm type-check   # TypeScript 타입 검사
```

## 기술 스택

### 메인 애플리케이션
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Emotion (CSS-in-JS)
- **Routing**: React Router DOM v7
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios with interceptors
- **Animation**: Motion (Framer Motion)
- **Error Handling**: React Error Boundary

### 디자인 시스템
- **Theme 구조**: `palette`, `typography`, `breakpoints`로 구성
- **스타일링**: Emotion의 `styled`와 `Theme` 활용
- **타입 안전성**: Emotion Theme 타입 확장으로 TypeScript 지원

### API 레이어
- **HTTP 클라이언트**: Axios with interceptors
- **인증**: JWT 기반 (Access Token + Refresh Token)
- **자동 토큰 갱신**: 402 에러 시 자동으로 토큰 갱신 후 재요청
- **쿼리 관리**: TanStack Query 사용

## 코드 아키텍처

### 패키지 의존성
- `apps/web`은 `@cllaude99/ui`, `@cllaude99/apis` 패키지를 사용
- 모든 패키지는 `@cllaude99/eslint-config`, `@cllaude99/typescript-config` 공유

### UI 컴포넌트 구조
- **Design System**: `breakpoints`, `palette`, `typography`, `theme` 모듈로 구성
- **컴포넌트**: Emotion을 사용한 스타일 컴포넌트
- **타입 안전성**: Emotion Theme 인터페이스 확장

### API 구조
- **Instance**: Axios 인스턴스 with request/response interceptors
- **인증 처리**: 자동 토큰 갱신 및 에러 핸들링
- **Query/Mutation**: React Query 패턴 사용

### 라우팅 패턴
- **Route Components**: `PrivateRoute`, `PublicRoute`로 인증 기반 라우팅
- **Layout**: 공통 레이아웃 컴포넌트
- **Funnel Pattern**: `useFunnel` 훅으로 단계별 UI 구현

## 중요한 개발 규칙

### 패키지 관리
- **패키지 매니저**: pnpm 사용 (workspace 지원)
- **Workspace 참조**: `workspace:*`로 내부 패키지 참조
- **의존성**: 공통 의존성은 루트에서, 패키지별 의존성은 해당 패키지에서 관리

### 코드 스타일
- **ESLint**: `@cllaude99/eslint-config` 사용
- **TypeScript**: 엄격한 타입 검사 활성화
- **Import**: React는 JSX에서 자동 import (React 17+ 방식)

### 환경변수
- **백엔드 URL**: `VITE_BACKEND_URL` 환경변수 사용
- **인증 토큰**: localStorage에 `accessToken`, `refreshToken` 저장

### 에러 처리
- **API 에러**: 402 상태 코드로 토큰 만료 처리
- **React Error**: Error Boundary로 전역 에러 처리
- **토큰 만료**: 자동 로그아웃 및 홈페이지 리디렉션

## 디렉토리별 역할

### `packages/ui`
재사용 가능한 UI 컴포넌트와 디자인 시스템을 제공합니다.

### `packages/apis`
API 호출, React Query 설정, HTTP 인터셉터 등 백엔드 통신 관련 로직을 담당합니다.

### `apps/web`
메인 웹 애플리케이션으로 UI와 API 패키지를 조합하여 사용자 인터페이스를 구성합니다.

## 코드 작성 가이드라인

이 가이드라인은 **쉽게 수정 가능한 코드**를 작성하기 위한 4가지 핵심 원칙을 기반으로 합니다. 이 원칙들은 때로 서로 상충할 수 있으므로, 상황에 따라 균형을 맞춰 적용해야 합니다.

### 가독성 (Readability)

#### 명확한 네이밍
변수, 함수, 컴포넌트의 이름은 그 목적과 의도를 명확하게 드러내야 합니다.

```typescript
// ❌ 나쁜 예
const d = new Date();
const u = users.filter(x => x.active);
function calc(a, b) { return a * b * 0.1; }

// ✅ 좋은 예  
const currentDate = new Date();
const activeUsers = users.filter(user => user.isActive);
function calculateDiscount(price: number, quantity: number) {
  return price * quantity * DISCOUNT_RATE;
}
```

#### 컨텍스트 감소
코드를 이해하기 위해 필요한 배경 지식과 컨텍스트를 최소화합니다.

```typescript
// ❌ 나쁜 예 - 많은 컨텍스트가 필요
const handleClick = () => {
  if (status === 1 && type === 'premium' && credits > 100) {
    processPayment();
  }
};

// ✅ 좋은 예 - 의미가 명확함
const handlePurchaseClick = () => {
  const isEligibleForPurchase = isPremiumUser && hasEnoughCredits && isAccountActive;
  
  if (isEligibleForPurchase) {
    processPayment();
  }
};
```

#### 위에서 아래로 자연스러운 흐름
코드가 위에서 아래로 자연스럽게 읽히도록 구성합니다.

```typescript
// ✅ 좋은 예 - 자연스러운 흐름
function processOrder(order: Order) {
  // 1. 검증
  const isValidOrder = validateOrder(order);
  if (!isValidOrder) {
    throw new Error('잘못된 주문입니다');
  }
  
  // 2. 결제 처리
  const paymentResult = processPayment(order.payment);
  if (!paymentResult.success) {
    throw new Error('결제가 실패했습니다');
  }
  
  // 3. 주문 완료
  return completeOrder(order);
}
```

#### 매직 넘버 네이밍
매직 넘버를 명명된 상수로 대체하여 명확성을 개선합니다.

```typescript
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS); // 애니메이션 대기를 명확히 표시
  await refetchPostLike();
}
```

#### 구현 세부사항 추상화
복잡한 로직/상호작용을 전용 컴포넌트/HOC로 추상화합니다.

**인증 가드 패턴**:
```tsx
function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();
  useEffect(() => {
    if (status === "LOGGED_IN") {
      location.href = "/home";
    }
  }, [status]);

  return status !== "LOGGED_IN" ? children : null;
}
```

#### 복잡한 삼항 연산자 단순화
복잡하거나 중첩된 삼항 연산자를 `if`/`else` 또는 IIFE로 대체합니다.

```typescript
const status = (() => {
  if (ACondition && BCondition) return "BOTH";
  if (ACondition) return "A";
  if (BCondition) return "B";
  return "NONE";
})();
```

#### 복잡한 조건문 네이밍
복잡한 불린 조건을 명명된 변수에 할당합니다.

```typescript
const matchedProducts = products.filter((product) => {
  const isSameCategory = product.categories.some(
    (category) => category.id === targetCategory.id
  );

  const isPriceInRange = product.prices.some(
    (price) => price >= minPrice && price <= maxPrice
  );

  return isSameCategory && isPriceInRange;
});
```

### 예측 가능성 (Predictability)

#### 고유한 이름 관리
비슷한 기능의 컴포넌트/함수에 고유하고 구체적인 이름을 사용하여 혼동을 방지합니다.

```typescript
// ❌ 나쁜 예 - 모호한 이름
function getUser() { /* ... */ }
function fetchUser() { /* ... */ }
function loadUser() { /* ... */ }

// ✅ 좋은 예 - 구체적이고 고유한 이름
function getUserFromCache() { /* 캐시에서 사용자 가져오기 */ }
function fetchUserFromAPI() { /* API에서 사용자 가져오기 */ }
function loadUserWithPermissions() { /* 권한 정보와 함께 사용자 로드 */ }
```

#### 일관된 네이밍 컨벤션
프로젝트 전체에서 일관된 네이밍 패턴을 유지합니다.

```typescript
// ✅ 좋은 예 - 일관된 패턴
// 상태 관리
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// 이벤트 핸들러
const handleSubmit = () => { /* ... */ };
const handleCancel = () => { /* ... */ };
const handleDelete = () => { /* ... */ };

// 검증 함수
const isValidEmail = (email: string) => { /* ... */ };
const isValidPassword = (password: string) => { /* ... */ };
const isValidPhoneNumber = (phone: string) => { /* ... */ };
```

#### 반환 타입 표준화
유사한 함수/훅에 대해 일관된 반환 타입을 사용합니다.

**API 훅 패턴**:
```typescript
import { useQuery, UseQueryResult } from "@tanstack/react-query";

function useUser(): UseQueryResult<UserType, Error> {
  const query = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  return query;
}

function useServerTime(): UseQueryResult<Date, Error> {
  const query = useQuery({
    queryKey: ["serverTime"],
    queryFn: fetchServerTime,
  });
  return query;
}
```

**검증 함수 패턴**:
```typescript
type ValidationResult = { ok: true } | { ok: false; reason: string };

function checkIsNameValid(name: string): ValidationResult {
  if (name.length === 0) return { ok: false, reason: "이름을 입력해주세요." };
  if (name.length >= 20) return { ok: false, reason: "이름은 20자 미만이어야 합니다." };
  return { ok: true };
}
```

#### 숨겨진 로직 노출 (단일 책임)
함수는 시그니처에서 암시하는 작업만 수행해야 합니다.

```typescript
// 잔액만 가져오는 함수
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");
  return balance;
}

// 호출자가 필요한 곳에서 명시적으로 로깅 수행
async function handleUpdateClick() {
  const balance = await fetchBalance();
  logging.log("balance_fetched");
  await syncBalance(balance);
}
```

### 응집성 (Cohesion)

#### 관련 코드를 한 곳에 모으기
함께 변경되거나 함께 사용되는 코드를 가까이 위치시킵니다.

```typescript
// ✅ 좋은 예 - 관련 상수와 함수를 한 곳에
const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} as const;

const USER_STATUS_MESSAGES = {
  [USER_STATUS.ACTIVE]: '활성 상태',
  [USER_STATUS.INACTIVE]: '비활성 상태', 
  [USER_STATUS.PENDING]: '대기 상태'
} as const;

function getUserStatusMessage(status: keyof typeof USER_STATUS) {
  return USER_STATUS_MESSAGES[status] || '알 수 없는 상태';
}

function isActiveUser(status: keyof typeof USER_STATUS) {
  return status === USER_STATUS.ACTIVE;
}
```

#### 논리적 그룹핑
관련된 기능을 논리적으로 그룹화하여 응집성을 높입니다.

```tsx
// ✅ 좋은 예 - 사용자 관련 기능을 하나의 훅으로 그룹화
function useUserManagement() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (id: string) => {
    setIsLoading(true);
    try {
      const userData = await getUserFromAPI(id);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('사용자 정보를 가져올 수 없습니다');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await updateUserInAPI(user.id, updates);
      setUser(updatedUser);
    } catch (err) {
      setError('사용자 정보 업데이트에 실패했습니다');
    }
  };

  return { user, isLoading, error, fetchUser, updateUser };
}
```

#### 도메인별 코드 구성
코드 타입이 아닌 기능/도메인별로 디렉토리를 구성합니다.

```
src/
├── components/ # 공유/공통 컴포넌트
├── hooks/      # 공유/공통 훅
├── utils/      # 공유/공통 유틸리티
├── domains/
│   ├── user/
│   │   ├── components/
│   │   │   └── UserProfileCard.tsx
│   │   ├── hooks/
│   │   │   └── useUser.ts
│   │   └── index.ts
│   ├── product/
│   │   ├── components/
│   │   │   └── ProductList.tsx
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   └── ...
│   └── order/
│       ├── components/
│       │   └── OrderSummary.tsx
│       ├── hooks/
│       │   └── useOrder.ts
│       └── ...
└── App.tsx
```

### 결합도 (Coupling)

#### 책임의 개별 관리
각 컴포넌트와 함수가 단일 책임을 가지도록 하여 서로 간의 의존성을 줄입니다.

```tsx
// ❌ 나쁜 예 - 너무 많은 책임을 가진 컴포넌트
function UserProfileWithNotifications({ userId }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(null);
  
  // 사용자 정보, 알림, 설정을 모두 관리하는 복잡한 로직...
  
  return (
    <div>
      {/* 사용자 프로필, 알림 목록, 설정 UI 모두 포함 */}
    </div>
  );
}

// ✅ 좋은 예 - 책임을 분리한 컴포넌트들
function UserProfile({ userId }) {
  const { user } = useUser(userId);
  return <div>{/* 사용자 프로필 UI만 담당 */}</div>;
}

function NotificationList({ userId }) {
  const { notifications } = useNotifications(userId);
  return <div>{/* 알림 목록 UI만 담당 */}</div>;
}

function UserSettings({ userId }) {
  const { settings } = useUserSettings(userId);
  return <div>{/* 설정 UI만 담당 */}</div>;
}
```

#### 적절한 코드 중복 허용
무리한 추상화보다는 적절한 중복을 허용하여 결합도를 낮춥니다.

```typescript
// ✅ 좋은 예 - 비슷하지만 다른 목적의 함수들을 별도로 유지
function validateLoginForm(email: string, password: string) {
  const errors: string[] = [];
  
  if (!email) errors.push('이메일을 입력해주세요');
  if (!password) errors.push('비밀번호를 입력해주세요');
  if (password.length < 8) errors.push('비밀번호는 8자 이상이어야 합니다');
  
  return { isValid: errors.length === 0, errors };
}

function validateSignupForm(email: string, password: string, confirmPassword: string) {
  const errors: string[] = [];
  
  if (!email) errors.push('이메일을 입력해주세요');
  if (!email.includes('@')) errors.push('올바른 이메일 형식이 아닙니다');
  if (!password) errors.push('비밀번호를 입력해주세요');
  if (password.length < 8) errors.push('비밀번호는 8자 이상이어야 합니다');
  if (password !== confirmPassword) errors.push('비밀번호가 일치하지 않습니다');
  
  return { isValid: errors.length === 0, errors };
}

// 💡 각각의 검증 로직이 다르게 발전할 가능성이 있으므로 분리하여 유지
```

#### 상태 관리 범위화
넓은 상태 관리를 작고 집중된 훅/컨텍스트로 분해합니다.

```typescript
// cardId 쿼리 파라미터 전용 훅
import { useQueryParam, NumberParam } from "use-query-params";
import { useCallback } from "react";

export function useCardIdQueryParam() {
  const [cardIdParam, setCardIdParam] = useQueryParam("cardId", NumberParam);

  const setCardId = useCallback(
    (newCardId: number | undefined) => {
      setCardIdParam(newCardId, "replaceIn");
    },
    [setCardIdParam]
  );

  return [cardIdParam ?? undefined, setCardId] as const;
}
```

#### 컴포지션으로 Props Drilling 제거
Props Drilling 대신 컴포넌트 컴포지션을 사용합니다.

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="아이템 검색..."
        />
        <Button onClick={onClose}>닫기</Button>
      </div>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </Modal>
  );
}
```

## Import/Export 및 파일 구조 가이드라인

### Import 스타일 규칙

#### Import 순서
프로젝트에서 일관되게 사용하는 import 순서를 따릅니다:

```typescript
// 1. CSS import (최상단)
import 'the-new-css-reset/css/reset.css';
import './index.css';

// 2. React 관련 라이브러리
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// 3. 서드파티 라이브러리 (알파벳 순)
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

// 4. 내부 패키지 (@cllaude99/...)
import { Cllaude99UIProvider, Button } from '@cllaude99/ui';
import { QueryClientProvider } from '@cllaude99/apis';

// 5. 앱 내부 절대 경로 (@/...)
import { PATH } from '@/constants/path';
import SomethingWentWrong from '@/components/ErrorPage/SomethingWentWrong';

// 6. 상대 경로 (같은 디렉토리나 인접 디렉토리)
import { ButtonProps } from './Button.styles';
import PrivateRoute from './PrivateRoute';
```

#### 경로 사용 패턴
상황에 따라 적절한 경로 방식을 선택합니다:

```typescript
// ✅ 패키지 간 import - 패키지명 사용
import { Button } from '@cllaude99/ui';
import { useUser } from '@cllaude99/apis';

// ✅ 앱 내부 절대 경로 - @/ alias 사용  
import { PATH } from '@/constants/path';
import UserProfile from '@/components/User/UserProfile';

// ✅ 인접 파일 - 상대 경로 사용
import { StyledButton } from './Button.styles';
import { validateForm } from '../utils/validation';
```

#### Import 형식 패턴
항목의 성격에 따라 import 형식을 선택합니다:

```typescript
// ✅ Default import - 메인 컴포넌트, 주요 모듈
import App from './App';
import Button from '@cllaude99/ui/Button';
import ShareIcon from './ShareIcon';

// ✅ Named import - 유틸리티, 훅, 타입, 다중 항목
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ButtonProps, IconProps } from './types';

// ✅ Mixed import - 기본 + 네임드 조합
import { ThemeProvider as BaseThemeProvider } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
} from '@tanstack/react-query';
```

### Export 스타일 규칙

#### Default vs Named Export 선택
파일의 주요 목적에 따라 export 방식을 결정합니다:

```typescript
// ✅ Default export - 메인 컴포넌트
function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
export default Button;

// ✅ Named export - 여러 관련 항목들
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} as const;

export const getUserStatusMessage = (status: string) => { /* ... */ };
export const isActiveUser = (status: string) => { /* ... */ };
```

#### Barrel Export 패턴 (index.ts)
모든 디렉토리에서 일관되게 사용합니다:

```typescript
// packages/ui/src/index.ts - 패키지 최상위
export * from './components';
export * from './design-system';

// packages/ui/src/components/index.ts - 카테고리별
export { Cllaude99UIProvider, ThemeProvider, Button };

// domains/user/index.ts - 도메인별
export { default as UserProfile } from './components/UserProfile';
export { default as UserSettings } from './components/UserSettings';
export { useUser, useUserPermissions } from './hooks';
```

### 파일 구조 패턴

#### React 컴포넌트 구조
컴포넌트별로 디렉토리를 만들고 관심사를 분리합니다:

```
Button/
├── index.tsx          # 메인 컴포넌트 로직
├── Button.styles.ts   # 스타일 정의
└── Button.types.ts    # 타입 정의 (복잡한 경우)
```

**index.tsx 구조:**
```typescript
import { ButtonHTMLAttributes } from 'react';
import { StyledButton, ButtonVariant } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

function Button({ children, variant = 'primary', isLoading, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} disabled={isLoading} {...props}>
      {isLoading ? '로딩 중...' : children}
    </StyledButton>
  );
}

export default Button;
```

#### 커스텀 훅 구조
단일 파일로 구성하며 타입을 함께 정의합니다:

```typescript
// useFunnel.tsx
import { ReactElement, ReactNode, useState } from 'react';

interface FunnelProps<T> {
  children: Array<ReactElement<StepProps<T>>>;
}

interface StepProps<T> {
  step: T;
  children: ReactNode;
}

export function useFunnel<T>(defaultStep: T) {
  const [step, setStep] = useState<T>(defaultStep);
  
  function Step({ children }: StepProps<T>) {
    return <>{children}</>;
  }

  function Funnel({ children }: FunnelProps<T>) {
    const targetChild = children.find((child) => child.props.step === step);
    return targetChild;
  }

  Funnel.Step = Step;

  return { Funnel, step, setStep };
}
```

#### API 관련 파일 구조
쿼리와 뮤테이션을 개별 파일로 분리하고 관련 타입을 함께 정의합니다:

```typescript
// queries/useUserQuery.ts  
import { useQuery } from '@tanstack/react-query';
import { fetchApiData } from '../utils/fetchApiData';
import { QUERY_KEY } from './queryKey';

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface UseUserQueryParams {
  userId: string;
}

export const useUserQuery = ({ userId }: UseUserQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEY.user(userId),
    queryFn: () => fetchApiData<UserResponse>(`/users/${userId}`),
  });
};
```

#### 유틸리티 파일 구조
관련 기능들을 함께 모아서 named export로 제공합니다:

```typescript
// utils/validation.ts
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateLoginForm = (email: string, password: string) => {
  const errors: string[] = [];
  
  if (!isValidEmail(email)) errors.push('올바른 이메일을 입력해주세요');
  if (!isValidPassword(password)) errors.push('비밀번호는 8자 이상이어야 합니다');
  
  return { isValid: errors.length === 0, errors };
};
```

### 타입 정의 가이드라인

#### 파일 내부 타입 정의
컴포넌트나 훅에서만 사용되는 타입은 해당 파일에서 정의합니다:

```typescript
// UserProfile.tsx 내부
interface UserProfileProps {
  userId: string;
  showEmail?: boolean;
}

interface UserData {
  id: string;
  name: string;
  avatar?: string;
}
```

#### 공통 타입 분리
여러 곳에서 사용되는 타입만 별도 파일로 분리합니다:

```typescript
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canInvite: boolean;
}

// types/api.ts  
export interface APIResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface APIError {
  code: string;
  message: string;
  details?: any;
}
```

## ESLint Import 자동 정렬 설정

프로젝트에서는 `eslint-plugin-import`를 사용하여 import 문을 자동으로 정렬합니다.

### 자동 정렬 순서
ESLint가 다음 순서로 import를 자동 정렬합니다:

```typescript
// 1. CSS imports (최상단)
import 'the-new-css-reset/css/reset.css';
import './index.css';

// 2. React 라이브러리 (external 그룹 내 최우선)
import { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';

// 3. 기타 외부 라이브러리 (알파벳 순)
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 4. 내부 패키지 (@cllaude99/...)
import { Button } from '@cllaude99/ui';
import { useUser } from '@cllaude99/apis';

// 5. 앱 내부 절대 경로 (@/...)
import { PATH } from '@/constants/path';
import UserProfile from '@/components/User/UserProfile';

// 6. 상대 경로 (../, ./)
import { ButtonProps } from './Button.styles';
import PrivateRoute from './PrivateRoute';
```

### 자동 적용 규칙
- **그룹 간 빈 줄**: 각 import 그룹 사이에 빈 줄 자동 삽입
- **알파벳 순 정렬**: 각 그룹 내에서 알파벳 순으로 자동 정렬 (대소문자 무시)
- **중복 제거**: 동일한 모듈에서 여러 import가 있을 경우 자동으로 병합
- **import 후 빈 줄**: 모든 import 문 이후에 빈 줄 강제

### 명령어
```bash
# 전체 프로젝트 lint 검사
pnpm lint

# import 순서 자동 수정 (개별 패키지)
cd apps/web && pnpm lint --fix
cd packages/ui && pnpm lint --fix
cd packages/apis && pnpm lint --fix

# 전체 프로젝트 자동 수정
pnpm lint --fix
```

### IDE 설정 권장사항
VSCode를 사용하는 경우, 다음 설정을 권장합니다:

```json
// .vscode/settings.json
{
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

이렇게 설정하면 파일 저장 시 자동으로 import가 정렬됩니다.
# 🌴 Claude Code 명령어 가이드

Claude Code 사용을 위한 종합 가이드입니다.

## 📖 목차

1. [CLAUDE.md 파일이란?](#-claudemd-파일이란)
2. [CLI 명령어](#-cli-명령어)
3. [키보드 단축키](#-키보드-단축키)
4. [슬래시 명령어](#-슬래시-명령어)
5. [이미지 첨부 방법](#-이미지-첨부-방법)
6. [Hooks 설정](#-hooks-설정)

---

## 🌴 CLAUDE.md 파일이란?

CLAUDE.md는 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드 파일로 다음과 같은 정보가 포함됩니다.

- 프로젝트 빌드, 린트, 테스트 실행 등 자주 사용되는 명령어
- 코드 아키텍처와 구조에 대한 고수준 설명  
- 개발 시 알아야 할 프로젝트별 규칙과 패턴

Claude Code의 새로운 인스턴스가 이 저장소에서 작업할 때 더 빠르고 효율적으로 작업할 수 있도록 도와주는 역할을 합니다.

**💡 팁:** `/init` 명령어로 프로젝트에 CLAUDE.md 파일을 생성할 수 있습니다.

---

## 🌱 CLI 명령어

### 기본 실행

- `claude`: 대화형 REPL 시작
- `claude "쿼리"`: 초기 프롬프트와 함께 REPL 시작
- `claude -p "쿼리"`: SDK를 통해 쿼리하고 종료
- `claude update`: 최신 버전으로 업데이트

### 주요 플래그

- `--print` 또는 `-p`: 대화형 모드 없이 응답 출력
- `--model`: 현재 세션의 모델 설정
- `--continue` 또는 `-c`: 최근 대화 이어서 진행
- `--resume`: 이전 대화 목록을 확인
- `--verbose`: 상세 로깅 활성화
- `--output-format`: 응답 형식 지정 (text, json, stream-json)

---

## 🌱 키보드 단축키

### 일반 제어

- `Ctrl + C`: 현재 입력 또는 생성 취소
- `Ctrl + D`: Claude Code 세션 종료
- `Ctrl + L`: 터미널 화면 지우기
- `↑/↓` 화살표: 명령어 기록 탐색
- `Esc` + `Esc`: 이전 메시지 편집

### 멀티라인 입력

- `\` + `Enter`: 빠른 이스케이프 (모든 터미널에서 작동)
- `Option + Enter`: macOS 기본값
- `Shift + Enter`: `/terminal-setup` 후 사용 가능

### 빠른 명령어

- `#` (시작 부분): 메모리에 추가
- `/` (시작 부분): 슬래시 명령어
- `!` (시작 부분): Bash 모드

### 모드 전환

- `Shift + Tab`: 권한 모드 토글
  - Default mode: 변경할 때마다 물어봄
  - Auto-accept edits mode: 물어보지 않고 자동으로 변경

---

## 🌱 슬래시 명령어

### 내장 명령어

- `/add-dir`: 추가 작업 디렉토리 설정
- `/agents`: 특정 작업을 위한 커스텀 AI 서브 에이전트 관리
- `/clear`: 대화 기록 지우기
- `/config`: 설정 보기 또는 수정
- `/help`: 사용법 도움말 보기
- `/init`: CLAUDE.md 가이드로 프로젝트 초기화
- `/login`, `/logout`: Anthropic 계정 전환 또는 로그아웃
- `/model`: AI 모델 선택 또는 변경
- `/review`: 코드 리뷰 요청

### 사용자 정의 명령어

사용자 정의 슬래시 명령어는 자주 사용하는 프롬프트를 마크다운 파일로 정의하여 간단한 명령어로 실행할 수 있게 해줍니다.

#### 디렉토리 구조

- `.claude/commands/`: 프로젝트별 명령어 (팀과 공유 가능)
- `~/.claude/commands/`: 개인 명령어 (모든 프로젝트에서 사용)
- 하위 디렉토리로 네임스페이스 지원

#### 파일 구조

```markdown
---
description: 명령어 설명
argument-hint: [메시지]
model: claude-3-5-haiku-20241022
---

Git 커밋 생성: $ARGUMENTS
```

#### 인수 전달

- `$ARGUMENTS`: 모든 인수를 하나의 문자열로 받음
- `$1`, `$2`, `$3`: 개별 위치 인수
- `@파일경로`: 파일 참조
- `!명령어`: Bash 명령어 실행

#### 네임스페이스 지원

하위 디렉토리를 사용하여 명령어를 그룹화할 수 있습니다.

```
.claude/commands/
├── git/
│   ├── commit.md
│   └── push.md
└── docs/
    └── generate.md
```

사용 예시: `/git/commit`, `/docs/generate`

#### 사용 예시

```bash
# .claude/commands/optimize.md 생성
mkdir -p .claude/commands
echo "이 코드의 성능 문제를 분석해주세요: $ARGUMENTS" > .claude/commands/optimize.md

# 사용: /optimize @src/app.js
```

### MCP 슬래시 명령어

연결된 MCP 서버에서 자동으로 발견되는 명령어들입니다.

- 형식: `/mcp__<서버-이름>__<프롬프트-이름>`
- 인수 전달 가능
- 적절한 권한 필요

#### 사용 예시

```bash
# Context7 서버의 라이브러리 문서 조회
/mcp__context7__get-library-docs

# IDE 서버의 진단 정보 조회  
/mcp__ide__getDiagnostics
```

---

## 🌱 이미지 첨부 방법

### 드래그 앤 드롭

- 이미지 파일을 터미널에 직접 드래그 앤 드롭
- **중요:** `Shift` 키를 누른 상태로 드래그해야 파일이 새 탭에서 열리지 않고 프롬프트에 참조됨

### 클립보드에서 붙여넣기

- macOS: `Cmd + Shift + 4`로 스크린샷을 클립보드에 저장 후 `Cmd + V`로 붙여넣기

### 파일 경로 참조

- `@`를 사용하여 프로젝트 내 이미지 파일 경로를 참조

---

## 🌱 Hooks 설정

### 설정 파일 위치

- `~/.claude/settings.json` (사용자 설정)
- `.claude/settings.json` (프로젝트 설정)
- `.claude/settings.local.json` (로컬 프로젝트 설정)

### Hook 이벤트

- `PreToolUse`: 도구 실행 전
- `PostToolUse`: 도구 완료 후
- `UserPromptSubmit`: 사용자 프롬프트 제출 시
- `SessionStart`: 새 세션 시작 시
- `SessionEnd`: 세션 종료 시

### 기능

- Bash 명령어 실행
- 입력 검증
- 컨텍스트 추가
- 특정 액션 차단
- 로깅 및 모니터링

### ⚠️ 주의사항

Hooks는 임의의 셸 명령어를 실행하므로 파일을 수정하거나 삭제할 수 있습니다. 사용 시 주의하세요.
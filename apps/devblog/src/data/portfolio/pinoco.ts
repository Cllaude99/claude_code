import type { Project } from '@/types/portfolio';

export const pinoco: Project = {
  slug: 'pinoco',
  title: 'Pinoco',
  tagline: '실시간 화상 통화로 진행하는 라이어 게임 서비스',
  period: { start: '2024.11', end: '2024.12' },
  background:
    '"미디어 스트림"이라는 공통 주제 아래, 개발 과정에서 재미를 느끼고 싶다는 마음으로 모인 팀이었습니다. 단순히 기능을 구현하는 것을 넘어 흥미를 느낄 수 있는 프로젝트를 애착을 가지고 끝까지 완성도 있게 만들고 싶었고, 그렇게 시작된 것이 실시간 화상 라이어 게임이었습니다. 개발이 끝난 뒤에도 팀원 4명이 직접 게임을 플레이해보며 어떤 기능이 있으면 더 재미있을지, 무엇을 개선할지 계속 고민하며 게임 로직을 수정해 나갔습니다.',
  team: [
    { role: 'FE', count: 3 },
    { role: 'BE', count: 1 },
  ],
  stack: ['React', 'TypeScript', 'Socket.IO', 'WebRTC', 'Vite'],
  stackRationale: [
    {
      tech: 'Socket.IO',
      reason:
        '폴링, 롱폴링, 웹소켓 방식을 비교 분석한 뒤 선택했습니다. WebSocket을 지원하지 않는 브라우저에 대한 대응과, 게임 참가자 입장·퇴장 같은 세밀한 사용자 관리가 필요하다고 판단해 다양한 기능을 제공하는 Socket.IO를 도입했습니다.',
    },
  ],
  headlineMetrics: [
    { label: '팀 규모', value: '4명' },
    { label: '개발 기간', value: '6주' },
    { label: '초기 로딩', value: '515ms → 185ms' },
    { label: '리렌더링', value: '688회 → 338회' },
  ],
  image: '/images/portfolio/pinoco/cover.png',
  accent: 'sky',
  responsibilities: [
    '폴링, 롱폴링, 웹소켓 방식을 비교 분석해 Socket.IO 도입을 결정',
    'Socket.IO 기반 사용자 관리 및 실시간 통신 시스템 구현',
    'API 구현 이전 단계에서 MSW를 활용한 목업 기반 UI 개발 체계 구축',
    '게임 진행 흐름 제어를 위한 투표, 타이머, 제시어 출력 기능 구현',
    '채팅 인터페이스 개선을 위한 자동 스크롤, 새 메시지 알림, 이동 버튼 기능 구현',
    '디자이너가 없는 상황에서 페이지 전반의 디자인을 직접 담당하고 디자인 시스템 구축',
  ],
  caseStudies: [
    {
      slug: 'loading-performance',
      title: '웹 애플리케이션 초기 로딩 속도 개선 및 리렌더링 최적화',
      problem:
        '네트워크 탭을 분석한 결과 초기 페이지 로드 시 필요하지 않은 리소스까지 모두 로드되는 문제가 있었습니다. 또한 React Profiler로 확인한 결과, 발언자가 변경될 때마다 VideoFeed 컴포넌트가 불필요하게 리렌더링되어 한 라운드 진행 중 총 688회의 리렌더링이 발생했고 이는 게임 진행 중 체감되는 UI 반응성 저하로 이어졌습니다.',
      solution:
        'React.lazy와 Suspense로 코드 스플리팅을 적용해, 사용자의 실제 진입 경로(게임 페이지 중심)에 따라 필요한 컴포넌트만 동적으로 로딩되도록 했습니다. 폰트를 WOFF2 포맷으로 전환해 리소스 크기를 줄였습니다. React Profiler로 렌더링 병목을 분석한 뒤, props 변화가 없는데도 리렌더링되던 VideoFeed·VideoStream 등 주요 컴포넌트에 React.memo를 적용했습니다.',
      result:
        '코드 스플리팅과 폰트 최적화로 메인 페이지 기준 로드 시간이 515ms에서 185ms로 64% 단축되고, 리소스 다운로드 크기는 2.2MB에서 5.7KB로 크게 줄었습니다. Lighthouse 지표로도 First Contentful Paint가 3.7초에서 2.7초로, Largest Contentful Paint가 12.4초에서 10.2초로 개선된 것을 확인했고, Total Blocking Time은 최적화 전후 모두 0ms를 유지해 메인 스레드를 오래 막는 작업은 없었다는 것도 함께 확인했습니다. React Profiler로 측정한 결과, 게임 시작부터 1라운드 진행까지 VideoFeed 컴포넌트의 리렌더링 횟수가 688회에서 338회로 약 51% 감소했습니다.',
      metrics: [
        { label: '로드 시간', value: '515ms → 185ms', detail: '64% 단축' },
        { label: '리소스 크기', value: '2.2MB → 5.7KB' },
        { label: '리렌더링', value: '688회 → 338회', detail: '약 51% 감소' },
        { label: 'FCP', value: '3.7s → 2.7s' },
        { label: 'LCP', value: '12.4s → 10.2s' },
      ],
      decisionRationale:
        '번들 크기 자체를 줄이는 대신 "실제 사용자 진입 경로"를 기준으로 코드를 나눈 이유는, 실시간 화상 게임 서비스 특성상 사용자 대부분이 게임 페이지에 머무는 시간이 압도적으로 길다는 점에 주목했기 때문입니다. 첫 진입 경로에 불필요한 코드를 걷어내는 것이 전체 번들을 균등하게 줄이는 것보다 체감 성능에 더 크게 기여했습니다.',
      tradeoffs: [
        {
          chosen: 'React.lazy/Suspense 기반 라우트 단위 코드 스플리팅',
          alternative: '번들러 설정만으로 전체 번들 크기 축소',
          reason: '진입 경로가 명확한 서비스 구조상, 전체 최적화보다 게임 페이지 중심의 선택적 로딩이 체감 개선 폭이 컸습니다.',
        },
        {
          chosen: 'React.memo로 핵심 컴포넌트 리렌더링 방지',
          alternative: '가상화 라이브러리 도입',
          reason: '문제의 원인이 리스트 렌더링 비용이 아니라 "불필요한 리렌더링"이었기 때문에, 근본 원인에 맞는 메모이제이션을 우선 적용했습니다.',
        },
      ],
      images: [
        { src: '/images/portfolio/pinoco/perf-before.png', caption: '최적화 전 · 네트워크 515ms · 2.2MB' },
        { src: '/images/portfolio/pinoco/perf-after.png', caption: '최적화 후 · 네트워크 185ms · 5.7KB' },
        { src: '/images/portfolio/pinoco/perf-before-detail-1.png', caption: '최적화 전 · Lighthouse FCP 3.7s · LCP 12.4s' },
        { src: '/images/portfolio/pinoco/perf-after-detail-1.png', caption: '최적화 후 · Lighthouse FCP 2.7s · LCP 10.2s' },
        { src: '/images/portfolio/pinoco/perf-before-detail-2.png', caption: '최적화 전 · React Profiler 688회 렌더링' },
        { src: '/images/portfolio/pinoco/perf-after-detail-2.png', caption: '최적화 후 · React Profiler 338회 렌더링' },
      ],
    },
    {
      slug: 'raf-timer',
      title: 'requestAnimationFrame을 활용한 타이머 애니메이션 성능 및 정확도 개선',
      problem:
        '기존 타이머 컴포넌트는 setInterval을 사용해, 진행바가 완전히 소모되기 전에 타이머가 먼저 종료되는 불일치 현상이 있었습니다. 브라우저 렌더링 파이프라인 특성상 setInterval의 16ms 지연으로 인해 총 60개의 프레임을 렌더링해야 하는 상황에서 실제 프레임이 누락되거나 불규칙하게 처리되는 문제가 있었습니다.',
      solution:
        '브라우저의 리페인트 주기에 맞춰 동작하는 requestAnimationFrame API로 애니메이션 처리 방식을 전환했습니다. 고정 간격 대신 실제 경과 시간을 기준으로 진행 상태를 계산하도록 바꿔 정확한 타이밍 제어를 구현했고, width 속성 대신 transform 속성을 활용해 GPU 가속 기반 애니메이션으로 전환해 리플로우를 최소화했습니다.',
      result:
        '자바스크립트 실행과 화면 렌더링 사이의 지연 문제를 해소해 더 정확하고 반응성 높은 타이머 기능을 제공하게 되었습니다. 게임 진행 중 사용자 경험이 개선됐고, 핵심 게임플레이 요소인 시간 제한 기능의 신뢰성을 확보했습니다.',
      decisionRationale:
        'setInterval의 보정 로직을 추가하는 대신 requestAnimationFrame으로 아예 전환한 이유는, 문제의 원인이 "간격이 부정확해서"가 아니라 "브라우저 렌더링 주기와 타이머 갱신 주기가 어긋나 있어서"였기 때문입니다. 브라우저 리페인트에 맞춰 갱신되는 rAF를 쓰는 편이 근본적인 해결책이라고 판단했습니다.',
      tradeoffs: [
        {
          chosen: 'requestAnimationFrame + 경과 시간 계산',
          alternative: 'setInterval 보정 로직 추가',
          reason: 'setInterval 자체의 스케줄링 불안정성은 보정으로는 완전히 해소되지 않아, 애초에 렌더링 주기에 맞춰 도는 rAF로 전환하는 쪽을 택했습니다.',
        },
        {
          chosen: 'transform 기반 GPU 가속 애니메이션',
          alternative: 'width 속성 애니메이션 유지',
          reason: 'width 변경은 레이아웃 리플로우를 유발해 프레임 드랍의 원인이 될 수 있어, 컴포지팅 단계에서 처리되는 transform으로 전환했습니다.',
        },
      ],
    },
    {
      slug: 'chat-auto-scroll',
      title: 'useRef를 활용한 채팅 영역 자동 스크롤링 및 사용자 경험 개선',
      problem:
        '채팅 영역에서 새 메시지가 올라올 때, 사용자가 이전 채팅을 보고 있는 중에도 스크롤이 최하단으로 강제 이동해 대화 맥락을 놓치는 문제가 있었습니다. 메시지가 빠르게 쌓일수록 사용자가 이전 내용을 읽지 못하는 상황이 잦아졌고, 현재 위치와 최신 메시지 사이를 오가기 어려운 불편함이 있었습니다.',
      solution:
        'useRef로 채팅 컨테이너의 DOM 요소를 직접 참조해 스크롤 위치를 제어하는 메커니즘을 구현했습니다. 사용자의 스크롤 행동을 감지하는 isScrolledUp 상태를 도입해, 사용자가 의도적으로 스크롤을 올린 경우와 최신 메시지를 보고 있는 경우를 구분했습니다. IntersectionObserver로 마지막 채팅 메시지 요소가 뷰포트에 들어오는지 감지해, 스크롤이 하단 50px 이내일 때만 자동 스크롤을 유지하고 그렇지 않으면 사용자의 현재 위치를 보존하도록 설계했습니다. 사용자가 이전 메시지를 읽고 있을 때는 하단에 "최신 메시지로 이동" 버튼을 노출했습니다.',
      result:
        '중요한 대화를 놓치지 않으면서도 원활한 소통 환경을 만들어 채팅 기능의 사용자 경험이 개선됐습니다. 사용자가 스크롤 위치를 스스로 인식하며 읽고 있던 대화의 맥락을 유지할 수 있게 되었고, 이전 메시지를 확인 중일 때 화면 우측 하단에 나타나는 버튼으로 최신 대화에 빠르게 다시 접근할 수 있게 되었습니다.',
      decisionRationale:
        '스크롤 위치를 매번 계산해 조건 분기하는 방식 대신 IntersectionObserver를 택한 이유는, 스크롤 이벤트 기반 계산은 채팅처럼 메시지가 빈번하게 추가되는 화면에서 성능 비용이 크고 타이밍이 어긋나기 쉬웠기 때문입니다. 마지막 메시지 요소의 가시성만 관찰하는 방식이 더 가볍고 신뢰할 수 있었습니다.',
      tradeoffs: [
        {
          chosen: 'useRef + IntersectionObserver로 직접 구현',
          alternative: '가상 스크롤 기반 채팅 라이브러리 도입',
          reason: '게임 한 라운드 동안 오가는 메시지 수가 가상화가 필요할 정도로 많지 않아, 가벼운 자체 구현으로 충분하다고 판단했습니다.',
        },
      ],
      images: [
        { src: '/images/portfolio/pinoco/game-page-2.png', caption: '게임 페이지 채팅 영역' },
        { src: '/images/portfolio/pinoco/chat-demo.gif', caption: '자동 스크롤 동작' },
      ],
    },
  ],
  retrospective: [
    {
      title: '잘한 점',
      body: '디자이너가 없는 상황에서도 최소한의 디자인 시스템을 먼저 세우고 시작한 덕분에, 짧은 6주 안에서도 페이지마다 톤이 크게 어긋나지 않았습니다. API 구현 전에 MSW로 목업 체계를 먼저 갖춘 것도 프론트엔드와 백엔드 작업을 병렬로 진행하는 데 도움이 되었습니다.',
    },
    {
      title: '아쉬운 점',
      body: '리렌더링 최적화를 게임 페이지 위주로 집중했는데, 짧은 개발 기간 탓에 다른 페이지의 성능 특성은 상대적으로 깊이 들여다보지 못했습니다.',
    },
    {
      title: '다시 만든다면',
      body: 'Socket.IO 기반 통신 구조를 설계 초기 단계부터 게임 상태(투표, 타이머, 제시어)와 채팅 이벤트를 더 명확히 분리했다면, 이후 기능을 추가할 때 이벤트 흐름을 추적하기가 더 수월했을 것 같습니다.',
    },
  ],
  links: [{ label: 'GitHub', url: 'https://github.com/boostcampwm-2024/web23-Pinoco', icon: 'github' }],
};

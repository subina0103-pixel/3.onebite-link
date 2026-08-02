export type Folder = {
  id: number;
  name: string;
  created_at?: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
  thumbnail?: string;
};

export const links: LinkItem[] = [
  {
    id: "1",
    title: "GitHub",
    url: "github.com",
    description: "전 세계 개발자들의 코드 저장소 및 협업 플랫폼",
    folderId: "dev",
  },
  {
    id: "2",
    title: "Next.js",
    url: "nextjs.org",
    description: "React 기반 풀스택 웹 프레임워크",
    folderId: "dev",
  },
  {
    id: "3",
    title: "TypeScript",
    url: "typescriptlang.org",
    description: "JavaScript에 정적 타입을 추가한 언어",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Vercel",
    url: "vercel.com",
    description: "프론트엔드 앱을 위한 클라우드 배포 플랫폼",
    folderId: "dev",
  },
  {
    id: "5",
    title: "Tailwind CSS",
    url: "tailwindcss.com",
    description: "유틸리티 퍼스트 CSS 프레임워크",
    folderId: "dev",
  },
  {
    id: "6",
    title: "Figma",
    url: "figma.com",
    description: "팀을 위한 협업 UI/UX 디자인 툴",
    folderId: "design",
  },
  {
    id: "7",
    title: "Dribbble",
    url: "dribbble.com",
    description: "디자이너들의 포트폴리오 및 영감 플랫폼",
    folderId: "design",
  },
  {
    id: "8",
    title: "ChatGPT",
    url: "chat.openai.com",
    description: "OpenAI가 만든 대화형 AI 챗봇",
    folderId: "ai",
  },
  {
    id: "9",
    title: "Claude",
    url: "claude.ai",
    description: "Anthropic의 AI 어시스턴트",
    folderId: "ai",
  },
  {
    id: "10",
    title: "Perplexity",
    url: "perplexity.ai",
    description: "AI 기반 실시간 검색 엔진",
    folderId: "ai",
  },
  {
    id: "11",
    title: "Notion",
    url: "notion.so",
    description: "문서, 데이터베이스, 태스크를 하나로 묶는 협업 툴",
    folderId: "util",
  },
  {
    id: "12",
    title: "Linear",
    url: "linear.app",
    description: "개발팀을 위한 빠른 이슈 트래커",
    folderId: "util",
  },
];

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold text-[var(--text)] tracking-tight">
          한입 링크
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일"
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="input-base"
          />
          <button type="submit" className="btn-primary w-full justify-center">
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

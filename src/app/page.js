import Link from 'next/link';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-[#333A73] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to SMAPP</h1>
        <Link href="/sign-in">
          <button className="bg-[#FBA834] text-white px-6 py-3 rounded-md hover:bg-[#F9970E]">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

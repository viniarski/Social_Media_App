import Link from 'next/link';

export default function MainPage() {
  return (
    <div>
      <h1>Welcome to the Twitter-like App</h1>
      <Link href="/sign-in">
        <button>Sign In</button>
      </Link>
    </div>
  );
}

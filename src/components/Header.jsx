import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-[#387ADF] py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-white text-xl font-bold">SMAPP</span>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <span className="text-white hover:text-[#FBA834]">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <span className="text-white hover:text-[#FBA834]">Posts</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/projects">Manage Projects</Link>
          </li>
          <li>
            <Link href="/skills">Manage Skills</Link>
          </li>
          <li>
            <Link href="/messages">View Messages</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

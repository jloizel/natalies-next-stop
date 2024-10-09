import styles from "./navbar.module.css"
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/europe">Europe</Link>
        </li>
        <li>
          <Link href="/southamerica">South America</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

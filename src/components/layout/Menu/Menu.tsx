'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Menu.module.scss';
import { useState } from 'react';

const Menu = (): React.ReactElement => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname ();

  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.Menu}>
      <div className={`${styles.menuOverlay} ${menuOpen ? styles['menuOverlay--open'] : ''}`}>
        <div className={styles.close} onClick={toggleMenu}>&times;</div>
      </div>
      <span
        dangerouslySetInnerHTML={{ __html: '&#9776;' }}
        className={styles.burger}
        onClick={toggleMenu}
      />

      <nav className={`${styles.nav} ${menuOpen ? styles['nav--open'] : ''}`}>

        <div className={pathname === '/' ? styles.linkActive : ''}>
          <Link href="/" onClick={toggleMenu}>Главная</Link>
        </div>
        <div className={pathname === '/groups' ? styles.linkActive : ''}>
          <Link href="/groups" onClick={toggleMenu}>Группы</Link>
        </div>
        <div className={pathname.includes('/students') ? styles.linkActive : ''}>
          <Link href="/students" onClick={toggleMenu}>Студенты</Link>
        </div>
      </nav>
    </div>
  );
};

export default Menu;

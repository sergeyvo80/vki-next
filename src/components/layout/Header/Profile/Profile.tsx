'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LocalizedLink } from '@/components/commons/LocalizedLink';
import UserInterface from '@/types/UserInterface';
import { useAuth } from '@/hooks/useAuth';
import styles from './Profile.module.scss';

interface Props {
  login: string;
  logout: string;
  userFromServer?: UserInterface;
}

const Profile = ({
  login,
  logout,
  userFromServer,
}: Props): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser } = useAuth();

  const getUser = () => user === undefined ? userFromServer : user;

  const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const logout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
        });

        if (response.ok) {
          router.push('/login');
          setUser(null);
        } else {
          console.error('Logout failed');
        }

      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    logout();
  };

  return (
    <div className={styles.Profile}>

      {getUser() && (<>{getUser()?.email}{'   '}</>)}

      {!getUser() && (
        <LocalizedLink
          href="/login"
          className={pathname.includes('/login') ? styles.linkActive : ''}
        >
          {login}
        </LocalizedLink>
      )}

      {getUser() && <LocalizedLink href="/logout" onClick={logoutHandler}>{logout}</LocalizedLink>}
    </div>
  );
}
export default Profile;

"use client"
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/session';
import { SessionInterface } from '@/common.types';

// Navbar component
export const Navbar = () => {
  // State to store user session
  const [session, setSession] = useState<SessionInterface | null>(null);

  // Effect to fetch user session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getCurrentUser();
        return session;
      } catch (error) {
        console.error('Error fetching session:', error);
        // Handle errors if necessary
      }
    };

    fetchSession();
  }, []);

  // Return the JSX for the Navbar component
  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/public/logo.svg'
            width={115}
            height={43}
            alt='Flexibble'
          />
        </Link>
      </div>
      {/* Navigation links */}
      <ul className='xl:flex hidden text-small gap-7'>
        {NavLinks.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
      {/* User actions */}
      <div className='flexCenter gap-4'>
        {session?.user ? (
          // If user is logged in
          <>
            {session?.user?.image && (
              // Display user image if available
              <Image
                src={session.user.image}
                width={40}
                height={40}
                className='rounded-full'
                alt={session.user.name}
              />
            )}
            {/* Button to create a new project */}
            <Link href='/create-project'>
              <button title='Share Work'>Share Work</button>
            </Link>
          </>
        ) : (
          // If user is not logged in, display authentication providers
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;

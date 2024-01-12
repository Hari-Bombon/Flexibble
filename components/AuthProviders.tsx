"use client"
// Import necessary libraries and types
import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Button from './Button';

// Define types for Provider and ProviderList
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type ProviderList = Record<string, Provider>;

// Create AuthProviders component
const AuthProviders = () => {
  // State to hold authentication providers
  const [providers, setProviders] = useState<ProviderList | null>();

  // useEffect to fetch providers when the component mounts
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // Fetch authentication providers using getProviders
        const result = await getProviders();
        
        // Log the result for debugging
        console.log(result);
        setProviders(result as ProviderList);
      } catch (error) {
        // Log any errors that occur during fetching
        console.error("Error fetching providers:", error);
      }
    };

    // Invoke fetchProviders when the component mounts
    fetchProviders();
  }, []);

  // Render the component based on the fetched providers
  if (providers) {
    return (
      <div>
        {/* Map over providers and render a button for each */}
        {Object.values(providers).map((provider: Provider, i) => (
         <Button
            key={i}
            title="Sign In"
            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default AuthProviders;

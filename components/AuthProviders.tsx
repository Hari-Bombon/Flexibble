"use client"
// Import necessary libraries and types
import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';

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

        // Set the fetched providers to the state
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
          <button key={i} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }

  // If providers are not yet fetched, you can render a loading state or return null
  return null;
};

// Export the AuthProviders component
export default AuthProviders;

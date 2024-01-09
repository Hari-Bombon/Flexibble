"use client"
import { useState, useEffect } from 'react';
import { getProviders, signIn } from 'next-auth/react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackurl: string;
  signinUrlParams?: Record<string, string> | null;
};

type ProviderList = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<ProviderList | null>(null);
 
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const result = await getProviders();
        console.log(result);
  
        setProviders(result);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
  
    fetchProviders();
  }, []);
  
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button key={i} onClick={() => signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  

};

export default AuthProviders;

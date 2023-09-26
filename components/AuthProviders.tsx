"use client"
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from "react";
import Button from './Button';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        fetchProviders();
    }, []);

    const handleProviderClick = (providerId: string) => {
        // Set the button clicked state to true
        setIsButtonClicked(true);

        // Trigger the sign-in process for the selected provider
        signIn(providerId);
    };

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider) => (
                    <Button

                        key={provider.id}
                        title="Sign In"
                        clicked={isButtonClicked} // Use the common clicked state for all buttons
                        handleClick={() => handleProviderClick(provider.id)}
                    />

                ))}
            </div>
        );
    }

    return <div>Loading providers...</div>;
};

export default AuthProviders;

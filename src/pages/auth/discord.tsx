import {PageLoader} from "@/components/loading";
import {BaseLayout} from "@/layout";
import {useEffect} from "react";
import {useRouter} from "next/router";

const DiscordAuth = () => {
    const router = useRouter();

    useEffect(() => {
        if(typeof window === 'undefined')
            return;

        const query = window.location.hash.slice(1);
        router.push(`/.netlify/functions/discord-auth?${query}`).then();
    }, [router]);

    return (
        <PageLoader/>
    );
};

DiscordAuth.Layout = BaseLayout;

export default DiscordAuth;

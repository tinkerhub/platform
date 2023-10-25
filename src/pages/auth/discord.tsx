import {PageLoader} from "@/components/loading";
import {BaseLayout} from "@/layout";
import {useEffect} from "react";
import {useRouter} from "next/router";

const DiscordAuth = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined')
            return;

        const query = window.location.hash.slice(1);
        fetch(`/.netlify/functions/discord-auth?${query}`).then(async (res) => {
            if(res.status !== 200)
                return router.push(`/404?error=${await res.text()}`);

            const data = await res.json();

            if (!data.url)
                return router.push("/404?error=Unable to Create Invite");

            return router.push(data.url);
        })
    }, [router]);

    return (
        <PageLoader/>
    );
};

DiscordAuth.Layout = BaseLayout;

export default DiscordAuth;

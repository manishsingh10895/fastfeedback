export default async (url, token) => {
    console.log('[FETCHER]');
    console.log(url, token);
    //@ts-ignore
    const res = await fetch(url, {
        method: "GET",
        headers: new Headers({
            'Content-Type': "application/json",
            token: token
        }),
        credentials: "same-origin"
    });

    return res.json();
}
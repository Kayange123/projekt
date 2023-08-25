///ChatGPT 3.5 code snippet to check if the url is base64 encoded -> works well
export function isBase64DataURL(url: string): boolean {
    const base64DataRegEx = /^data:image\/[a-z]+;base64,/;
    return base64DataRegEx.test(url);
}
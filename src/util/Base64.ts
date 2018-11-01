// UTF-8 problems:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

// this is a quick solution

export class Base64 {
    public static encode(input: string): string {
        return btoa(unescape(encodeURIComponent(input)));
    }

    public static decode(input: string): string {
        return decodeURIComponent(escape(atob(input)));
    }
}

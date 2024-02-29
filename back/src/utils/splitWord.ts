export function splitWordToPrefixes(txt: string) {
    const prefixes: string[] = [];
    let prefix = '';

    for (const word of txt.toLowerCase().split(/[-\s]+/)) {
        prefix = '';
        for (const char of word) {
            prefix += char;
            if (prefix.length >= 2) {
                prefixes.push(prefix);
            }
        }
    }

    return prefixes;
}

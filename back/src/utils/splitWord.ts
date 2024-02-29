export function splitWordToPrefixes(word: string) {
    const prefixes: string[] = [];
    let prefix = '';

    for (const char of word.toLowerCase()) {
        prefix += char;
        if (prefix.length >= 2) {
            prefixes.push(prefix);
        }
    }

    return prefixes;
}

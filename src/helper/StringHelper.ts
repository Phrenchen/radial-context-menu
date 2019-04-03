export class StringHelper {
    /**
     * shortens string to a maximum length and adds suffix to the end.
     * f.e. abbreviate 'suuperlong-text' to length 10, suffix = '...'
     * -> 'suuperl...'
     * 
     * @param source long text
     * @param maxLength 200
     * @param endSuffix '...'
     */
    public static abbreviate(source: string, maxLength: number, endSuffix: string = ''): string {
        if (!source || source.length <= maxLength) {
            return source;
        }

        const endPosition = maxLength - endSuffix.length;
        const result = source.substr(0, endPosition).concat(endSuffix);
        return result;
    }


    /**
     * strips substrings out of source text
     */
    public static strip(source: string, replaceables: string[]): string {
        let result = source;

        replaceables.forEach(findStr => {
            while (result.indexOf(findStr) >= 0) {
                result = result.replace(findStr, '');
            }
        });

        console.log('stripped: ' + result);
        return result;
    }
}

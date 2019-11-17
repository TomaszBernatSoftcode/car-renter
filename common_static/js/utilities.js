/**
 * Template literal HTML parser
 * @return {String} - Escaped HTML
 */
var html = (function () {

    /**
     * Escape HTML
     * @param  {String} str - SOurce HTML
     * @return {String} - Escaped HTML
     */
    this.escapeHTML = function (str) {
        return str.replace(/&/g, '&amp;') // first!
                  .replace(/>/g, '&gt;')
                  .replace(/</g, '&lt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#39;')
                  .replace(/`/g, '&#96;')
    }

    /**
     * HTML string template parser
     * @see - http://2ality.com/2015/01/template-strings-html.html
     * @return {String}
     */
    this.parseHTMLTemplateLiteral = function () {
        // Apply {Array} capabilities to arguments
        // @see - https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Funkcje/arguments
        var args = Array.prototype.slice.call(arguments)

        // deconstruct arguments (polyfill)
        literalSections = args[0]
        substs = args.slice(1, args.length - 1)

        // Use raw literal sections: we don’t want
        // backslashes (\n etc.) to be interpreted
        var raw = literalSections.raw

        var result = ''

        substs.forEach(function (subst, i) {
            // Retrieve the literal section preceding
            // the current substitution
            var lit = raw[i]

            // In the example, map() returns an array:
            // If substitution is an array (and not a string),
            // we turn it into a string
            if (Array.isArray(subst)) {
                subst = subst.join('')
            }

            // If the substitution is preceded by a dollar sign,
            // we escape special characters in it
            if (lit.endsWith('$')) {
                subst = escapeHTML(subst)
                lit = lit.slice(0, -1)
            }
            result += lit
            result += subst
        })
        // Take care of last literal section
        // (Never fails, because an empty template string
        // produces one literal section, an empty string)
        result += raw[raw.length-1] // (A)

        return result
    }

    return parseHTMLTemplateLiteral
})();

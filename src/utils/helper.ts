export const formatNumberToCurrency = (number: number, digits: number = 2, currency: string = "€", locale: string = 'en-US') => {
    /**
     * Format number to currency with `digits` decimal places and currency symbol
     * Thousands separator is used
     * 
     * @param {number} number - Number to format
     * @param {number} digits - Number of decimal places
     * @param {string} currency - Currency symbol
     * @param {string} locale - Locale
     * @returns {string} - Formatted number
     */
    if (digits <= 0) throw new Error("Digits must be non-negative")
    return number.toLocaleString(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
        useGrouping: true
    }) + currency
}


export const getClientLocale = () => {
    /** 
     * Get locale from browser
     * https://stackoverflow.com/a/42070353/11609216
     * If the browser does not support Intl, return 'en-US'
     */
    if (typeof Intl !== 'undefined') {
        try {
            return Intl.NumberFormat().resolvedOptions().locale;
        } catch (err) {
            console.error("Cannot get locale from Intl")
            return 'en-US';
        }
    }
    console.error("Intl is not available")
    return 'en-US';
}
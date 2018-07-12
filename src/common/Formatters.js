export default {

    install(Vue, options) {

        /**
         * @usage:
         *
         * this.$appFormatters.formatByteToMB(200).toString()
         * Vue.prototype.$appFormatters.formatByteToMB(200).toString()
         * <td>{{ $appFormatters.formatByteToMB(props.item.size).toString() + ' MB' }}</td>
         */
        Vue.prototype.$appFormatters = {
            /**
             *
             * Formatos disponiveis https://momentjs.com
             *
             * @param dateString - 2018-06-15
             * @param format - Formatos mais usados - MMMM DD, YYYY | DD-MM-YYYY | DD/MM/YYYY
             * @returns {string}
             */
            formatDate: function(dateString, format) {
                if (Vue.prototype.isEmpty(dateString))
                    return '';

                return moment(dateString).format(format ? format : 'L');
            },
            formatByteToMB (sizeInBytes) {
                return (sizeInBytes / (1024*1024)).toFixed(2);
            },
            formatMbToBytes (mb) {
                return (mb * 1048576).toFixed(2);
            },

            /**
             * Formata numero para valor monetario
             *
             * ex: currency('1000', 'R$ ', '2', { thousandsSeparator: '.', decimalSeparator: ',' })
             * @param value
             * @param symbol
             * @param decimals
             * @param options {}
             * @returns {*}
             * @see https://github.com/freearhey/vue2-filters
             */
            /*formatCurrency(value, symbol, decimals, options) {
                var thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol;
                var digitsRE = /(\d{3})(?=\d)/g;
                options = options || {};
                value = parseFloat(value);
                if (!isFinite(value) || (!value && value !== 0)) return '';
                symbol = symbol != null ? symbol : '$';
                decimals = decimals != null ? decimals : 2;
                thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';
                symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true;
                spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false;
                var stringified = Math.abs(value).toFixed(decimals);
                stringified = options.decimalSeparator
                    ? stringified.replace('.', options.decimalSeparator)
                    : stringified;
                var _int = decimals
                    ? stringified.slice(0, -1 - decimals)
                    : stringified;
                var i = _int.length % 3;
                var head = i > 0
                    ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : ''))
                    : '';
                var _float = decimals
                    ? stringified.slice(-1 - decimals)
                    : '';
                symbol = spaceBetweenAmountAndSymbol
                    ? (symbolOnLeft ? symbol + ' ' : ' ' + symbol)
                    : symbol;
                symbol = symbolOnLeft
                    ? symbol + head +
                    _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float
                    : head +
                    _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float + symbol;
                var sign = value < 0 ? '-' : '';

                return sign + symbol
            }*/
        }
    }
}
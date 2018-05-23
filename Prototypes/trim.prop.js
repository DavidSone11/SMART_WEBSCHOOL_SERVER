String.prototype.trimFun = String.prototype.trimFun || function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

print(formatNumber(2665));      // 2,665
print(formatNumber(102665));    // 102,665
print(formatNumber(111102665)); // 111,102,665



Number.prototype.numberFormat = function(decimals, dec_point, thousands_sep) {
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = this.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}
var foo = 5000;
console.log(foo.numberFormat(2)); // us format: 5,000.00
console.log(foo.numberFormat(2, ',', '.')); // european format: 5.000,00
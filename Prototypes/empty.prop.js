function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

if(str.replace(/\s/g,"") == ""){
}
if (str && str.trim().length) {  
    //...
}

function empty(str){
    return !str || !/[^\s]+/.test(str);
}

empty(null); // true
empty(0); // true
empty(7); // false
empty(""); // true
empty("0"); // false
empty("  ");

if (typeof test === 'string' && test.length === 0){
}

function isBlank(pString){
    if (!pString || pString.length == 0) {
        return true;
    }
    // checks for a non-white space character 
    // which I think [citation needed] is faster 
    // than removing all the whitespace and checking 
    // against an empty string
    return !/[^\s]+/.test(pString);
}
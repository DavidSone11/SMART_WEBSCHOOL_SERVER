(function () {
    // reverse string without using method
    function getInitValues(S) {
        this.s = S;
    }
    getInitValues.prototype.beforeReverseString = function () {
        console.log("Before Reversing String : " + this.s);
    }
    getInitValues.prototype.afterReverseString = function () {
        var revString = "";
        if (this.s || !(this.s.length == 0)) {
            for (var n = this.s.length - 1; n >= 0; n--) {
                revString += this.s[n];
            }
        }
        console.log("After Reversing String : " + revString);

    }
    String.prototype.subReverseString = function () {

    }


    /**
     *  Reverse string using split and Join Method
     */
    String.prototype.reverseStringUsingSplit = function (ch) {
        var revStr = null;
        if (this || !(this.length == 0)) {
            switch (ch) {
                case 'm1':
                    revStr = this.split("").reverse().join("");
                    break;
                case 'm2':
                    var splitStr = this.split("");
                    var revStr = splitStr.reverse();
                    revStr = revStr.join("");
                    break;

            }
        }
        return revStr;
    }

    // swap a number without using third variable 
    function getValues(x, y) {
        this.X = x;
        this.Y = y;
    }

    getValues.prototype.beforeSwap = function () {
        console.log("Before Swapping: " + "X=" + this.X + " Y=" + this.Y);
    }
    getValues.prototype.swapNumber = function () {
        this.X = this.X + this.Y;
        this.Y = this.X - this.Y;
        this.X = this.X - this.Y;
        console.log("After Swapping: " + "X=" + this.X + " Y=" + this.Y);
    }

    getValues.prototype.swapBitWiseNumber = function swapBitWiseNumber() {
        this.X = this.X ^ this.Y;
        this.Y = this.X ^ this.Y;
        this.X = this.X ^ this.Y;
        console.log("After Swapping Using Bitwise : " + "X=" + this.X + " Y=" + this.Y);
    }




    // console.log("santosh".afterReverseString());

    var s0 = new getInitValues("Welcome");
    s0.beforeReverseString();
    s0.afterReverseString();
    "Welcome".subReverseString();
    // "Welcome".reverseStringUsingSplit("m1");
    var s = new getValues(20, 30);
    s.beforeSwap();
    s.swapNumber();
    s.swapBitWiseNumber();



}());


function reverseString(str) {
    if (str === "" || !str || (str.length == 0))
        return "";
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}
console.log("Before Reversing Element : Hello")
console.log("After Reversing Element : "+reverseString("Hello"));

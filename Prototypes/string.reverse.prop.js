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
        if (this.s) {
            for (var n = this.s.length - 1; n >= 0; n--) {
                revString += this.s[n];
            }
        }
        console.log("After Reversing String : " + revString);

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




    // console.log("santosh".afterReverseString());

    var s0 = new getInitValues("Welcome");
    s0.beforeReverseString();
    s0.afterReverseString();


    var s = new getValues(20, 30);
    s.beforeSwap();
    s.swapNumber();


}());


// String startsWith
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

// Random
var util_random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

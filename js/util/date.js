/***********
 *         *
 *  DATES  *
 *         *
 ***********/

var util__dateToString = function(date, dateFormat) {
    if(!date) {
        return "--";
    } else {
        return moment(date).format(dateFormat);
    }
};

var util__stringToDate = function(string, dateFormat) {
    if(!string) {
        return "";
    } else {
        return moment(string, dateFormat);
    }
};

var util_dateToString = function(date) {
    return util__dateToString(date, util_dateFormat);
};
var util_stringToDate = function(string) {
    return util__stringToDate(string, util_dateFormat);
};

var util_dateToStringMini = function(date) {
    return util__dateToString(date, util_dateFormatMini);
};
var util_stringToDateMini = function(string) {
    return util__stringToDate(string, util_dateFormatMini);
};

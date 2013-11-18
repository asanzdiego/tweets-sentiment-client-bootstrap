/************
 *          *
 * GRAPHICS *
 *          *
 ************/

var util_drawGraphic = function(canvasElement, labels, data) {

    var dataMock    = [];
    var dataMockMin = [];
    var dataMockMax = [];

    for (var i = 0; i < data.length; i++) {

        dataMock.push(0);
        dataMockMin.push(-100);
        dataMockMax.push(100);
    }

    var lineChartData = {
        labels : labels,
        datasets : [
            {
                fillColor        : "rgba(103,230,103,0.1)",
                strokeColor      : "33FF33",
                pointColor       : "33FF33",
                pointStrokeColor : "#fff",
                data             : dataMockMax
            },
            {
                fillColor        : "rgba(255,115,115,0.5)",
                strokeColor      : "FF3333",
                pointColor       : "FF3333",
                pointStrokeColor : "#fff",
                data             : dataMock
            },
            {
                fillColor        : "rgba(255,115,115,0.1)",
                strokeColor      : "FF3333",
                pointColor       : "FF3333",
                pointStrokeColor : "#fff",
                data             : dataMockMin
            },
            {
                fillColor        : "rgba(103,230,103,0.5)",
                strokeColor      : "33FF33",
                pointColor       : "33FF33",
                pointStrokeColor : "#fff",
                data             : data
            }
        ]
    }

    var options = {
        pointDot : false
    };

    var myLine = new Chart(document.getElementById(canvasElement)
        .getContext("2d")).Line(lineChartData, options);

};

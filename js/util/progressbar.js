var util_updateProgessBar = function(element, retries, maxRetries) {

    $(element).removeClass('hidden');
    $(element).show();

    var percentage = Math.floor((retries-1)*100/maxRetries);
    //console.log('percentage =', percentage);

    $('#progessbar').html(
      '<div class="progress progress-bar-primary">'+
        '<div id="progessbar-percentage"'+
          'class="progress-bar progress-bar-primary" role="progressbar"'+
          'aria-valuenow="'+percentage+'" style="width: '+percentage+'%"'+
          'aria-valuemin="0" aria-valuemax="100">'+
          '<span id="progessbar-text">'+percentage+'% Complete</span>'+
        '</div>'+
      '</div>');
}

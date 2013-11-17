// Searh
$('document').ready(function(){
    $('input[type=search]').on('keyup', function() {
        $('[data-action=search]').each(function() {
            toSearch = $('input[type=search]').val().toLowerCase();
            elementText = $(this).text().toLowerCase();
            if (elementText.match(toSearch)) {
                $(this).show();
            } else {
                $(this).hide();
            };
        });
    });
});

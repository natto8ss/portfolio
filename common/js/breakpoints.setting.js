$(function() {
    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 1, 541 ]
    });
    $(window).bind('enterBreakpoint541',function() {
        $('.sp-img').each(function() {
            $(this).attr('src', $(this).attr('src').replace('-sp', '-pc'));
        });
    });
    $(window).bind('enterBreakpoint1',function() {
        $('.sp-img').each(function() {
            $(this).attr('src', $(this).attr('src').replace('-pc', '-sp'));
        });
    });
});
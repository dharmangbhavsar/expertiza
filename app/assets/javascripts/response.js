/**
* Script for managing events in review form page
*
**/

var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var autoSavePost;

// triggers in every 90 seconds to save the draft version of the review
autoSavePost = function() {
    var dt, time;
    dt = new Date;
    time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

    //if it's was in the background, don't autosae to save bandwidth
    if(vis() && document.getElementById('autosave_cbx').checked) {
        if ($('.review_form').length > 0) {
            $('form').attr('data-remote', 'true');
            document.getElementById('save_review').click();
            if ($('input[name=saved]').value = "0")$('input[name=saved]').val("1");
            $('form').removeAttr('data-remote');
            $('#save_progress').html('<span id="tick"> &#10004; </span>' + 'Draft Autosaved at ' + time);
        }
    }
    setTimeout(autoSavePost, 90000);
};

// add star rating option to each dropdown box in review form
jQuery(document).ready(function($){
    $('.review-rating').each(function(index, el) {
        var $El;
        $El = $(el);
        $El.barrating({
            theme: 'fontawesome-stars',
            initialRating: $El.attr('data-current-rating'),
            showSelectedRating: true
        });
    });
});

jQuery(document).ready(function() {
    jQuery('#Submit').click(function(e){
        if(!confirm('Once a review has been submitted, you cannot edit it again')){
            e.preventDefault();
            e.stopPropagation();
            return;
        }else{
            jQuery('#isSubmit').val('Yes');
        }
    })
    $(function(){
        $("form").sisyphus({
            locationBased: true,
            autoRelease: true
        });
    });
})

setTimeout(autoSavePost, 10000);

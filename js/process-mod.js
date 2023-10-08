// Add class 'active-text' to the first child of '.process-mod-step-container'
jQuery('.step-container:first-child').addClass('active-text');

var i_step = 0;
var items = [
    {'processSVGSection': '#svg-section-1', 'processText': '#step-container-1'},
    {'processSVGSection': '#svg-section-2', 'processText': '#step-container-2'},
    {'processSVGSection': '#svg-section-3', 'processText': '#step-container-3'},
    {'processSVGSection': '#svg-section-4', 'processText': '#step-container-4'},
    {'processSVGSection': '#svg-section-5', 'processText': '#step-container-5'},
    {'processSVGSection': '#svg-section-6', 'processText': '#step-container-6'},
    {'processSVGSection': '#svg-section-7', 'processText': '#step-container-7'},
    {'processSVGSection': '#svg-section-8', 'processText': '#step-container-8'},
    {'processSVGSection': '#svg-section-9', 'processText': '#step-container-9'},
    {'processSVGSection': '#svg-section-10', 'processText': '#step-container-10'},
];

// Iterate through 'items' and add click event handlers
jQuery.each(items, function() {
    var that = this;
    jQuery(this.processSVGSection).on('click', function() {
        // changes section
        jQuery('.svg-section').removeClass('active-svg-section');
        jQuery(this).addClass('active-svg-section');

        // changes text
        jQuery('.step-container').removeClass('active-text');
        jQuery(that.processText).addClass('active-text');

        if (jQuery(this).is(":hover")) {
            i_step = jQuery(this).attr('id').slice(-1);
            //console.log('Clicked at ' + i_step);
        }
    });
});



// Check if an element is in the viewport
jQuery.fn.isInViewport = function() {
    var element = jQuery(this);

    // Check if the element exists and is visible
    if (element.length > 0 && element.is(':visible')) {
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.outerHeight();

        var viewportTop = jQuery(window).scrollTop();
        var viewportBottom = viewportTop + jQuery(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Return false if the element doesn't exist or is not visible
    return false;
};


if (jQuery('.process-mod-svg').length > 0) {
    i_step = 0;
    var pause_ = false;
    var at_least_once_in_viewport = false;

    setInterval(function() {
        if (jQuery('.process-mod-svg').isInViewport() && !jQuery('#contact-pop-out').isInViewport()) {
            if (false == pause_) {
                if (jQuery('.home').length > 0) {
                    jQuery('.process-mod-svg').children('g').eq(i_step).click();
                } else {
                    jQuery('.process-mod-svg').children('g').eq(i_step + 1).click();
                }
                i_step++;
                if (i_step == jQuery('.process-mod-svg').children('g').length - 1) {
                    i_step = 0;
                }
                if (i_step > jQuery('.process-mod-svg').children('g').length) {
                    i_step = 0;
                }
            }
            at_least_once_in_viewport = true;
        }

        if ((false == jQuery('.process-mod-svg').isInViewport()) && (true == at_least_once_in_viewport)) {
            pause_ = false;
            at_least_once_in_viewport = false;
        }

        if (false == at_least_once_in_viewport) {
            //jQuery('#statusofview').html('statusofview - false<br>pause - ' + pause_ );
        } else {
            //jQuery('#statusofview').html('statusofview - true<br>pause - ' +  pause_ );
        }
    }, 2000);

    jQuery('#process-mod-service-wheel, .step-container').on('touch mouseenter', function() {
        pause_ = true;
    });

    jQuery('.process-mod-svg, .step-container').on('mouseleave', function() {
        pause_ = false;
    });
}

// Toggle Step Content on Click of Step Title
jQuery('.step-title').on('click', function() {

    jQuery(this).toggleClass('step-title-open');
    
    jQuery(this).parent().find('.step-content').slideToggle('slow', function() {
        jQuery(this).toggleClass('step-content-open');
    });

    jQuery('.step-title').not(this).removeClass('step-title-open');
    jQuery('.step-content').not(jQuery(this).parent().find('.step-content')).slideUp('slow').removeClass('step-content-open');
});

jQuery('.process-mod-close').click(function() {
    jQuery('.process-mod-step').removeClass('active-mod-step');
});

jQuery('.process-mod-step').each(function(index) {
    jQuery(this).find('.step-title span').prepend('<span class="step-number">' + (index + 1) + '</span>');
});
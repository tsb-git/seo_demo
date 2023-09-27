// Add class 'active-text' to the first child of '.process-mod-step-container'
jQuery('.process-mod-step-container:first-child').addClass('active-text');

var i_step = 0;
var items = [
    {'processSVGSection': '#process-mod-svg-section-1', 'processText': '#process-mod-step-container-1'},
    {'processSVGSection': '#process-mod-svg-section-2', 'processText': '#process-mod-step-container-2'},
    {'processSVGSection': '#process-mod-svg-section-3', 'processText': '#process-mod-step-container-3'},
    {'processSVGSection': '#process-mod-svg-section-4', 'processText': '#process-mod-step-container-4'},
    {'processSVGSection': '#process-mod-svg-section-5', 'processText': '#process-mod-step-container-5'},
    {'processSVGSection': '#process-mod-svg-section-6', 'processText': '#process-mod-step-container-6'},
    {'processSVGSection': '#process-mod-svg-section-7', 'processText': '#process-mod-step-container-7'},
    {'processSVGSection': '#process-mod-svg-section-8', 'processText': '#process-mod-step-container-8'},
    {'processSVGSection': '#process-mod-svg-section-9', 'processText': '#process-mod-step-container-9'},
    {'processSVGSection': '#process-mod-svg-section-10', 'processText': '#process-mod-step-container-10'},
];

// Iterate through 'items' and add click event handlers
jQuery.each(items, function() {
    var that = this;
    jQuery(this.processSVGSection).on('click', function() {
        // changes section
        jQuery('.process-mod-svg-section').removeClass('active-svg-section');
        jQuery(this).addClass('active-svg-section');

        // changes text
        jQuery('.process-mod-step-container').removeClass('active-text');
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
    }, 2500);

    jQuery('#process-mod-service-wheel, .process-mod-step-container').on('touch mouseenter', function() {
        pause_ = true;
    });

    jQuery('.process-mod-svg, .process-mod-step-container').on('mouseleave', function() {
        pause_ = false;
    });
}

// PROCESS MOD - STEP TOGGLE
jQuery('.process-mod-step-caret').on('click', function() {
    jQuery('.process-mod-step-caret').not(this).each(function() {
        if (jQuery(this).parent('.process-mod-step-title').siblings('.process-mod-step-text-and-bttn').hasClass('process-mod-step-text-and-bttn-open')) {
            jQuery(this).parent('.process-mod-step-title').siblings('.process-mod-step-text-and-bttn').slideUp('slow').removeClass('process-mod-step-text-and-bttn-open');
            jQuery(this).toggleClass('process-mod-step-caret-open');
        }
    });

    jQuery(this).toggleClass('process-mod-step-caret-open');

    if (jQuery(this).parent('.process-mod-step-title').siblings('.process-mod-step-text-and-bttn').hasClass('process-mod-step-text-and-bttn-open')) {
        jQuery(this).parent('.process-mod-step-title').siblings('.process-mod-step-text-and-bttn').slideUp('slow').removeClass('process-mod-step-text-and-bttn-open');
    } else {
        jQuery(this).parent('.process-mod-step-title').siblings('.process-mod-step-text-and-bttn').slideDown('slow').addClass('process-mod-step-text-and-bttn-open');
    }
});

// PROCESS MOD - STEP CLOSER
jQuery('.process-mod-close').click(function() {
    jQuery('.process-mod-step').removeClass('active-mod-step');
});

// PROCESS MOD - STEP NUMBERER
jQuery('.process-mod-step').each(function() {
    jQuery(this).find('.process-mod-step-title').children('span').prepend('<span class="process-mod-step-number">' + (jQuery(this).index() + 1) + '</span>');
});

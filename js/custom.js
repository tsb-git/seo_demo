window.addEventListener('DOMContentLoaded', function() {

    jQuery(document).ready(function($) {
        var has_ran = 0;

        function isScrolledIntoView(elem) {
            var $elem = $(elem);
            var $window = $(window);

            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        jQuery(window).scroll(function() {
            if (isScrolledIntoView(jQuery('.circular-progress-group')) && (has_ran == 0)) {

                var counters = [
                    { 'progress_ID': 'progress-seo-one', 'progress_num': 5, 'progress_color': '#26d07c' },
                    { 'progress_ID': 'progress-seo-two', 'progress_num': 76, 'progress_color': '#26d07c' },
                    { 'progress_ID': 'progress-seo-three', 'progress_num': 41, 'progress_color': '#26d07c' }
                ];

                console.log(counters);

                function circle_anim(_target, circle_val, circle_fill) {
                    console.log(_target);
                    var numeric_percentage = circle_val / 100; // Convert to a numeric value and divide by 100
                    jQuery('#' + _target).circleProgress({
                        value: numeric_percentage, // Use the numeric value here
                        lineCap: 'round',
                        size: 200,
                        thickness: '20',
                        animation: {
                            duration: 3600,
                            easing: 'circleProgressEasing'
                        },
                        emptyFill: 'rgba(0, 0, 0, .125)',
                        fill: circle_fill,
                    }).on('circle-animation-progress', function(event, progress) {
                        // Update the progress number based on the correct calculation
                        var progressValue = Math.round(numeric_percentage * 100 * progress);
                        jQuery('#' + _target).find('.progress-number').html(progressValue);
                    });
                }

                for (let i = 0; i < counters.length; i++) {
                    console.log(counters[i]);
                    circle_anim(counters[i]['progress_ID'], counters[i]['progress_num'], counters[i]['progress_color']);
                }

                has_ran = 1;
            }
        });
    });

    });
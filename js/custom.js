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

        jQuery( window ).scroll(function() {
            if (isScrolledIntoView(jQuery('.circular-progress-group')) && (has_ran == 0)){

                var counters = [];
                                    var counter = [];
                    counter['progress_ID'] = 'progress-seo-one';
                    counter['progress_num'] = '93';
                    counter['progress_color'] = '#26d07c';

                    counters.push(counter);
                                    var counter = [];
                    counter['progress_ID'] = 'progress-seo-two';
                    counter['progress_num'] = '75';
                    counter['progress_color'] = '#26d07c';

                    counters.push(counter);
                                    var counter = [];
                    counter['progress_ID'] = 'progress-seo-three';
                    counter['progress_num'] = '61';
                    counter['progress_color'] = '#26d07c';

                    counters.push(counter);
                                
                console.log(counters);

                function circle_anim(_target, circle_val, circle_fill){
                    console.log(_target);
                    jQuery('#' + _target).circleProgress({
                    value: '0.' + circle_val,
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
                        jQuery('#' + _target).find('.progress-number').html(Math.round(circle_val * progress));
                    });
                }
                
                for(let i = 0; i < counters.length; i++){
                    console.log(counters[i]);
                    circle_anim(counters[i]['progress_ID'], counters[i]['progress_num'], counters[i]['progress_color']);
                }
                
                has_ran = 1;

            }

        });

    });

});
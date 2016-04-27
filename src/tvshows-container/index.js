import $ from 'jquery';

var $tvShowsContainer = $('#app-body').find('.tv-shows');

$tvShowsContainer.on('click', 'i.like', function(ev) {
    var $this = $(this);
    $this.closest('.tv-show').toggleClass('liked');
});

export default $tvShowsContainer;
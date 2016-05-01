import $ from 'jquery';
import socketio from 'socket.io-client';
import 'src/client/shows';

var $tvShowsContainer = $('#app-body').find('.tv-shows');

let socket = socketio();



$tvShowsContainer.on('click', 'i.like', function (ev) {
    var $this = $(this);
    var $show = $this.closest('.tv-show');
    var id = $show.data('id');

    socket.emit('vote', id);
    $show.toggleClass('liked');
});


socket.on('vote:done', vote => {
    let id = vote.showId;
    let $article = $tvShowsContainer.find('article[data-id=' + id + ']');
    let $votes = $article.find('.votes');
    $votes.html(vote.count);
})

export default $tvShowsContainer;
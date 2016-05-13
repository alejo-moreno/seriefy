import $ from 'jquery';
import page from 'page';
import $tvShowsContainer from 'src/client/tvshows-container';
import {getProfile} from 'src/client/api-client';
import xss from 'xss';
import socketio from 'socket.io-client';
import cookiejs from 'cookies-js';

let socket = socketio()

page('/chat/:showId', function(ctx, next) {
    $tvShowsContainer.find('.tv-show').remove();
    $('.search-form').toggle();
    renderChat(ctx.params.showId);
});

function renderChat(id) {
    if (localStorage.shows) {
        let shows = JSON.parse(localStorage.shows);
        let show = shows.filter((show) => show.id == id)[0];
        var $chat = $(drawChat(show));
        $tvShowsContainer.append($chat.fadeIn(1000))
    } else {
        $.ajax('/api/show/' + id, {
            success: function(show, textStatus, xhr) {
                var $chat = $(drawChat(show));
                $tvShowsContainer.append($chat.fadeIn(1000))
            }
        });
    }
}

function drawChat(show) {
    var article = `<article data-id=${show.id} class="chat-container">
          <div class="left img-container">
            <img src=${show.image ? show.image.medium : ''} alt=${show.name + ' Logo'}>
          </div>
          <div class="right chat-window">
            <h1>${show.name}</h1>
            <div class="chat-body"></div>`;

    if (cookiejs.get('username')) {
        article += `<input type="text" name="message" class="chat-input" />`;
    }
    return article += `</div>  </article>`;
}


$tvShowsContainer.on('click', 'i.chat', function(ev) {
    let $this = $(this)
    let $article = $this.closest('.tv-show')
    let id = $article.data('id')
    socket.emit('join', 'show-' + id);
    page('/chat/' + id);
})


$tvShowsContainer.on('keypress', '.chat-input', function(ev) {
    let $this = $(this);
    let username = cookiejs.get('username');

    if (ev.which === 13) {
        let message = $this.val();

        socket.emit('message', { username, message })
        addMessage(username, message);

        $this.val('');
    }
})


socket.on('message', function(msg) {
    let { username, message } = msg

    addMessage(username, message)
})

function addMessage(username, message) {
    let $chatBody = $('.chat-body')

    $chatBody.append(`<p><b>${xss(username)}: </b> ${xss(message)}</p>`)
    $chatBody.animate({ scrollTop: $chatBody.get(0).scrollHeight }, 1000)
}




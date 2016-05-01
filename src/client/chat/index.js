import $ from 'jquery';
import page from 'page';
import $tvShowsContainer from 'src/client/tvshows-container';
import xss from 'xss'
import socketio from 'socket.io-client'

let socket = socketio()

page('/chat/:showId', function (ctx, next) {
    $tvShowsContainer.find('.tv-show').remove();
    renderChat(ctx.params.showId);
});

function renderChat(id) {
    if (localStorage.shows) {
        let shows = JSON.parse(localStorage.shows);
        let show = shows.filter((show) => show.id == id)[0];
        var $chat = $(drawChat(id, show));
        $tvShowsContainer.append($chat.fadeIn(1000))
    } else {
        $.ajax('/api/show/' + id, {
            success: function (show, textStatus, xhr) {
                var $chat = $(drawChat(id, show));
                $tvShowsContainer.append($chat.fadeIn(1000))
            }
        })
    }
}

function drawChat(id, show) {
    return `<article data-id=${id} class="chat-container">
          <div class="left img-container">
            <img src=${show.image ? show.image.medium : ''} alt=${show.name + ' Logo'}>
          </div>
          <div class="right chat-window">
            <h1>${show.name}</h1>
            <div class="chat-body"></div>
             <input type="text" name="nickname" class="chat-nick" placeholder="Enter your nickname..." />
             <input type="text" name="message" class="chat-input" disabled />
          </div>
        </article>`;
}


$tvShowsContainer.on('click', 'i.chat', function (ev) {
    let $this = $(this)
    let $article = $this.closest('.tv-show')
    let id = $article.data('id')

    socket.emit('join', 'show-' + id)
    page('/chat/' + id)
})

$tvShowsContainer.on('keypress', '.chat-nick', function (ev) {
    let $this = $(this)
    let $chatInput = $('.chat-input')

    $chatInput.prop('disabled', $this.val().length === 0)
})

$tvShowsContainer.on('keypress', '.chat-input', function (ev) {
    let $this = $(this)
    let nick = $('.chat-nick').val()

    if (ev.which === 13) {
        let message = $this.val()

        socket.emit('message', { nick, message })
        addMessage(nick, message)

        $this.val('')
    }
})


socket.on('message', function (msg) {
    let { nick, message } = msg

    addMessage(nick, message)
})

function addMessage(nick, message) {
    let $chatBody = $('.chat-body')

    $chatBody.append(`<p><b>${xss(nick)}: </b> ${xss(message)}</p>`)
    $chatBody.animate({ scrollTop: $chatBody.get(0).scrollHeight }, 1000)
}




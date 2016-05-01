import $ from 'jquery';
import page from 'page';
import {getShows, searchShows} from 'src/client/api-client';
import $tvShowsContainer from 'src/client/tvshows-container';
import qs from 'qs';


page('/shows', function (ctx, next) {
    $tvShowsContainer.find('.tv-show').remove();
    $tvShowsContainer.find('.chat-container').remove();
    var $loader = $('<div class="loader">Loader</div>')
    $loader.appendTo($tvShowsContainer);

    $('#search-input').val('');

    getShows(function (shows) {
        $tvShowsContainer.find('.loader').remove();
        renderShows(shows);
    });

});

page('/search', function (ctx, next) {

    $tvShowsContainer.find('.tv-show').remove();
    var $loader = $('<div class="loader">Loader</div>')
    $loader.appendTo($tvShowsContainer);
    const busqueda = qs.parse(ctx.querystring)
    searchShows(busqueda, (shows) => {
        $loader.remove();
        renderShows(shows);
    })
})


function renderShows(shows) {
    $tvShowsContainer.find('.loader').remove();
    shows.forEach(function (show) {
        var $show = renderShow(show);
        $tvShowsContainer.append($show);
    });
}

function renderShow(show) {
    return `<article class="tv-show" data-id=${show.id}>
    <div class="left img-container"> 
    <img src=${show.image ? show.image.medium : ''} alt="${show.name} Logo"/>
    </div>
    <div class="info right">
    <h1>${show.name}</h1> 
    <p>${show.summary}</p>
    <i class="fa fa-thumbs-o-up like"></i>
    <span class="votes">${show.votes}</span>
    <i class="fa fa-weixin chat"></i>    
    </div>    
    </article>`;
}


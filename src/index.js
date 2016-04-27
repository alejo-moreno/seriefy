/**
 * Module dependencies 
 */

import $ from 'jquery';
import page from 'page';
import {getShows, searchShows} from 'src/api-client';
import renderShows from 'src/render';
import $tvShowsContainer from 'src/tvshows-container';
import 'src/search';
import qs from 'qs';

page('/', function(ctx, next) {
    $tvShowsContainer.find('.tv-show').remove();
    $('#search-input').val('');
    if (!localStorage.shows) {
        getShows(function(shows) {
            $tvShowsContainer.find('.loader').remove();
            localStorage.shows = JSON.stringify(shows);
            renderShows(shows);
        })
    } else {
        renderShows(JSON.parse(localStorage.shows));
    }
});

page('/search', function(ctx, next) {

    $tvShowsContainer.find('.tv-show').remove();
    var $loader = $('<div class="loader">Loader</div>')
    $loader.appendTo($tvShowsContainer);
    const busqueda = qs.parse(ctx.querystring)
    searchShows(busqueda, (res) => {
        $loader.remove()
        let shows = res.map(element => element.show)
        renderShows(shows);
    })
})

page();
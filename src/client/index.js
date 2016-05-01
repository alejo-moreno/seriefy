/**
 * Module dependencies 
 */

import $ from 'jquery';
import page from 'page';
import 'src/client/shows';
import 'src/client/chat';

page('/', function (ctx, next) {
    page('/shows');
});


$('#app-body').find('form')
    .on('submit', function (ev) {
        ev.preventDefault();
        let busqueda = $("#search-input").val()
        page(`/search?q=${busqueda}`)
    })

page();
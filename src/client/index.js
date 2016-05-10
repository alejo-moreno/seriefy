/**
 * Module dependencies 
 */

import $ from 'jquery';
import page from 'page';
import 'src/client/shows';
import 'src/client/chat';


$('#app-body').find('form')
    .on('submit', function (ev) {
        ev.preventDefault();
        let busqueda = $("#search-input").val()
        page(`/search?q=${busqueda}`)
    })

page("/", (ctx, next) => {
    page("/shows");
})

page();

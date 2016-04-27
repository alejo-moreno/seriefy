import $ from 'jquery';
import page from 'page';

$('#app-body').find('form')
    .on('submit', function(ev) {
        ev.preventDefault();
        let busqueda = $("#search-input").val()
        page(`/search?q=${busqueda}`)
    })
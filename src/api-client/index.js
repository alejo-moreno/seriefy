
import $ from 'jquery';


export function getShows(fn) {
    $.ajax({
        url: 'http://api.tvmaze.com/shows',
        success: function(data, textStatus, xhr) {
            fn(data);
        }
    })
}

export function searchShows(busqueda, fn) {
    $.ajax({
        url: 'http://api.tvmaze.com/search/shows',
        data: busqueda,
        success: function(res, textStatus, xhr) {
            fn(res);
        }
    })
}




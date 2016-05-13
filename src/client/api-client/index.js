
import $ from 'jquery';


export function getShows(fn) {
    $.ajax({
        url: '/api/shows',
        success: function(shows, textStatus, xhr) {
            fn(shows);
        }
    })
}

export function getProfile(fn) {
    $.ajax({
        url: '/api/profile',
        success: function(profile, textStatus, xhr) {
            fn(profile);
        }
    })
}

export function searchShows(busqueda, fn) {
    $.ajax({
        url: '/api/search',
        data: busqueda,
        success: function(shows, textStatus, xhr) {
            fn(shows);
        }
    })
}




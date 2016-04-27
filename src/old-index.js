/**     
 * Module Dependencies   
 */
var $ = require('jquery');


$(function() {

    var $tvShowsContainer = $('#app-body').find('.tv-shows');

   

  

    var template = '<article class="tv-show ">' +
        '<div class="left img-container">' +
        '<img src=":img:" alt=":img alt:"/>' +
        '</div>' +
        '<div class="info right">' +
        '<h1>:name:</h1>' +
        '<p>:summary:</p>' +
        '<i class="fa fa-thumbs-o-up like"></i>' +
        '</div>' +
        '</article >';


})
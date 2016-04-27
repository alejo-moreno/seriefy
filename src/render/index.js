import $ from 'jquery';
import $tvShowsContainer from 'src/tvshows-container';


const template = `<article class="tv-show ">
    <div class="left img-container"> 
    <img src=":img:" alt=":img alt:"/>
    </div>
    <div class="info right">
    <h1>:name:</h1> 
    <p>:summary:</p>
    <i class="fa fa-thumbs-o-up like"></i>
    </div> 
    </article >`;

export default function renderShows(shows) {
    $tvShowsContainer.find('.loader').remove()
    shows.forEach(function(show) {
        let article = template.replace(':name:', show.name)
            .replace(':img:', show.image ? show.image.medium : 'NotFound')
            .replace(':summary:', show.summary)
            .replace(':img alt:', show.name + " Logo");

        var $article = $(article);
        $tvShowsContainer.append($article);
    });
}
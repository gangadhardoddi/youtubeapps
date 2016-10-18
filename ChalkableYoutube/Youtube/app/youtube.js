import styles from "./sass/youtube.sass";

import Services from './services.js';
import RecommendedVideosView from './views/RecommendedVideosView.js';
import AllVideosView from './views/AllVideosView.js';

import YoutubeControls from './controls.js'

const GlobalVariables = {
    CHLK_API: window['CHLK_API'] || null,
    STANDARD_IDS: window['STANDARD_IDS'] || [],
    STANDARD_VIDEOS: window['STANDARD_VIDEOS'] || [],
    ANNOUNCEMENT_APPLICATION_ID: window['ANNOUNCEMENT_APPLICATION_ID'] || null
}

class VideosController{
    constructor(){
        this.view = null;
    }
    pushView_(viewClass, completer){
        this.view = new viewClass(this);
        this.view.show();
        this.view.refreshAsync(completer);
    }

    updateView_(completer, message){
        this.view.partialRefreshAsync(completer, message);
    }

    searchAction(searchQuery){
        var res = Services.VideoService.search(searchQuery).then( videos =>{
            return {
                videos: videos
            };
        });
        this.updateView_(res, 'load-videos');
    }

    recommendedVideosAction(){
        var model = {
            standardVideos: GlobalVariables.STANDARD_VIDEOS
        };
        var res = new Promise((resolve,reject)=> resolve(model));
        this.pushView_(RecommendedVideosView, res);
    }

    allVideosAction(){
        var res = Services.VideoService.search(null)
            .then(videos=>{
                return {
                    videos: videos
                };
            });
        this.pushView_(AllVideosView, res);
    }
}

$(() => {
    YoutubeControls.Create();

    new VideosController().recommendedVideosAction();
});
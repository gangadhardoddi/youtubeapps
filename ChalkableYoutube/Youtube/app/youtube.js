import styles from "./sass/youtube.sass";

import Services from './services.js';
import RecommendedVideosView from './views/RecommendedVideosView.js';
import AllVideosView from './views/AllVideosView.js';
import VideoView from './views/VideoView.js'
import {RoleEnum} from './enums/RoleEnum.js';
import {ModeEnum} from './enums/ModeEnum.js';

import YoutubeControls from './controls.js';

const GlobalVariables = {
    CHLK_API: window['CHLK_API'] || null,
    VIDEO_ID: window['VIDEO_ID'] || null,
    STANDARD_VIDEOS: window['STANDARD_VIDEOS'] || [],
    ANNOUNCEMENT_APPLICATION_ID: window['ANNOUNCEMENT_APPLICATION_ID'] || null,
    ROLE: window['ROLE'] || null,
    MODE: window['MODE'] || null
};

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
                videos: videos,
                role: GlobalVariables.ROLE,
                mode: GlobalVariables.MODE
            };
        });
        this.updateView_(res, 'load-videos');
    }

    recommendedVideosAction(){
        var model = {
            standardVideos: GlobalVariables.STANDARD_VIDEOS,
            role: GlobalVariables.ROLE,
            mode: GlobalVariables.MODE
        };
        var res = new Promise((resolve,reject)=> resolve(model));
        this.pushView_(RecommendedVideosView, res);
    }

    allVideosAction(){
        var res = Services.VideoService.search(null)
            .then(videos => {
                return {
                    videos: videos,
                    role: GlobalVariables.ROLE,
                    mode: GlobalVariables.MODE
                };
            });
        this.pushView_(AllVideosView, res);
    }

    viewVideoAction(id){
        var res = Services.VideoService.getVideoById(id).then(data => {
            return {
                video: data,
                role: GlobalVariables.ROLE,
                mode: GlobalVariables.MODE
            }
        });

        this.pushView_(VideoView, res);
    }
}

$(() => {
    YoutubeControls.Create();
    var videoController = new VideosController();

    function isAppReady(data, callback){
        if(videoController.view.viewName === 'VideoView') {
            Services.VideoService.attach(videoController.view.model.video.Id, GlobalVariables.ANNOUNCEMENT_APPLICATION_ID)
                .then( res => callback(!!res));
        }
        else callback(false);
    }

    GlobalVariables.CHLK_API.onBeforeClose(isAppReady);

    switch(GlobalVariables.MODE){
        case ModeEnum.EDIT:
            if(GlobalVariables.ROLE == RoleEnum.ADMIN)
                videoController.allVideosAction();
            else
                videoController.recommendedVideosAction();
            break;
        case ModeEnum.VIEW: case ModeEnum.GRADING_VIEW:
            videoController.viewVideoAction(GlobalVariables.VIDEO_ID);
            break;
        default:
            videoController.allVideosAction();
            break;
    }
});
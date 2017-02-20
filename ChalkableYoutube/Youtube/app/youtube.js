import styles from "./sass/youtube.sass";

import {GlobalVariables} from './GlobalVariables.js';
import Services from './services.js';
import YoutubeControls from './controls.js';

import RecommendedVideosView from './views/RecommendedVideosView.js';
import AllVideosView from './views/AllVideosView.js';
import VideoView from './views/VideoView.js';

import VideosController from './VideosController.js';

class YoutubeApp {
    constructor(){
        var vc = new VideosController();
        this.videosController = vc;
        this.controls = YoutubeControls.Create();
        GlobalVariables.CHLK_API.onBeforeClose((data, callback) => this.isAppReady(data, callback, vc));
    }

    isAppReady(data, callback, videosController){

        if(videosController.view instanceof VideoView) {
            Services.VideoService.attach(videosController.view.model.video.Id, GlobalVariables.ANNOUNCEMENT_APPLICATION_ID)
                .then( res => callback(!!res));
        }
        else callback(false);
    }

    resolveAndRunAction(){
        var splittedPath = window.location.pathname.split('/').filter(Boolean);
        var actionName = splittedPath[1]; // Action name in MVC in PascalCase
        var methodName = actionName[0].toLowerCase() + actionName.slice(1);//cammelCase
        this.videosController.invokeAction(methodName);
    }

    static run() {
        var app = new YoutubeApp();
        app.resolveAndRunAction();
    }
}

$(YoutubeApp.run);
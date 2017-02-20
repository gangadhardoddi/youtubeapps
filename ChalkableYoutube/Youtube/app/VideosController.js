import styles from "./sass/youtube.sass";

import {GlobalVariables} from './GlobalVariables.js';
import Services from './services.js';

import RecommendedVideosView from './views/RecommendedVideosView.js';
import AllVideosView from './views/AllVideosView.js';
import VideoView from './views/VideoView.js';

export default class VideosController {
    constructor(){
        this.view = null;
        this.registerActions_();
    }

    registerActions_() {

        this.actions = [{
            actionName: 'search',
            method: this.searchAction
        }]

        // this[['search']] = this.searchAction;
        // this[['recommendedVideos']] = this.recommendedVideosAction;
        // this[['allVideos']] = this.allVideosAction;
        // this[['viewVideo']] = this.viewVideoAction;
    }

    pushView_(viewClass, completer){
        this.view = new viewClass(this);
        this.view.show();
        this.view.refreshAsync(completer);
    }

    updateView_(completer, message){
        this.view.partialRefreshAsync(completer, message);
    }

    invokeAction(actionName) {
        var action  = this.actions.find(); //TODO: 
        if(action == undefined || action == null)
            throw new Error('No such action registered');
        action();
    }

    searchAction(searchQuery){
        var res = Services.VideoService.search(searchQuery).then(videos => {
            return {
                videos: videos,
                isRecommendedEnabled: GlobalVariables.IS_RECOMMENDED_ENABLED,
                isOnlyVideoView: GlobalVariables.ONLY_VIDEO_VIEW
            };
        });
        this.updateView_(res, 'load-videos');
    }

    recommendedVideosAction(){
        var model = {
            standardVideos: GlobalVariables.STANDARD_VIDEOS,
            isRecommendedEnabled: GlobalVariables.IS_RECOMMENDED_ENABLED,
            isOnlyVideoView: GlobalVariables.ONLY_VIDEO_VIEW
        };
        var res = new Promise((resolve,reject)=> resolve(model));
        this.pushView_(RecommendedVideosView, res);
    }

    allVideosAction(){
        var res = Services.VideoService.search(null)
            .then(videos => {
                return {
                    videos: videos,
                    isRecommendedEnabled: GlobalVariables.IS_RECOMMENDED_ENABLED,
                    isOnlyVideoView: GlobalVariables.ONLY_VIDEO_VIEW
                };
            });
        this.pushView_(AllVideosView, res);
    }

    viewVideoAction(id){
        if(!id){
            id = GlobalVariables.VIDEO_ID;
        }

        var res = Services.VideoService.getVideoById(id).then(data => {
            return {
                video: data,
                isRecommendedEnabled: GlobalVariables.IS_RECOMMENDED_ENABLED,
                isOnlyVideoView: GlobalVariables.ONLY_VIDEO_VIEW
            }
        });

        this.pushView_(VideoView, res);
    }
}
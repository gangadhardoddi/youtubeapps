import BaseView from '../views/BaseView.js'
import VideoViewTpl from '../templates/VideoViewTpl.js'

export default class VideoView extends BaseView{
    constructor(videosController){
        super(videosController);

        this.name = 'VideoView';
    }

    get cssClass_(){return 'video-view-page'; }
    get templateClass_(){ return VideoViewTpl; }

    bindEvents_(){
        super.bindEvents_();
        this.dom
            .on('click', '.cancel-button', event => { this.controller.recommendedVideosAction(); });
    }
}

import BaseVideosView from './BaseVideosView.js';
import StandardVideosTpl from './../templates/StandardVideosTpl.js';

export default class RecommendedVideosView extends BaseVideosView{
    constructor(videosController){
        super(videosController);
    }

    get cssClass_(){return 'standard-videos-page'; }
    get templateClass_(){ return StandardVideosTpl; }
    get loadResourcesFormSelector_(){return '.recommended-videos-form'; }
    get updateResourcesSelector_(){return  '.attachments-and-applications'; }


    bindEvents_(){
        super.bindEvents_();

        var keypressTimeOut;
        this.dom
            .on('click', '.action-bar a', event=>{ this.controller.allVideosAction()})
            .on('input', "[name=searchQuery]", event=> {
                clearTimeout(keypressTimeOut);
                keypressTimeOut = setTimeout(()=>{
                    $(this.loadVideosFormSelector_).trigger('submit');
                }, 700);
            });
    }
}

import BaseVideosView from './BaseVideosView.js';
import AllVideosTpl from './../templates/AllVideosTpl.js';

export default class AllVideosView extends BaseVideosView{
    constructor(videosController){
        super(videosController);
    }

    get cssClass_(){return 'all-videos-page'; }
    get templateClass_(){ return AllVideosTpl; }
    get loadVideosFormSelector_(){return '.search-videos-form'; }
    get updateVideosSelector_(){return '.attachments-and-applications'; }

    bindEvents_(){
        super.bindEvents_();
        var keypressTimeOut;
        this.dom
            .on("click", ".action-bar a", event=>{this.controller.recommendedVideosAction()})
            .on('input', "[name=searchQuery]", event=> {
                clearTimeout(keypressTimeOut);
                keypressTimeOut = setTimeout(()=>{
                    this.clearPaginationParamsAndSubmit($(event.target).parents(this.loadVideosFormSelector_))
                }, 700);
            });
    }

    clearPaginationParamsAndSubmit(formDom){
        formDom.trigger('submit');
    }
}

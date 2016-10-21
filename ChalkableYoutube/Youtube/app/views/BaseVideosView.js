import BaseView from './BaseView.js';
import VideosTpl from './../templates/VideosTpl.js';

export default class BaseVideosView extends BaseView{
    constructor(videosController){
        super(videosController);
    }

    get loadVideosFormSelector_(){}
    get updateVideosSelector_(){}

    getSearchQuery(){
        return $('.search-filters').find('[name="searchQuery"]').val();
    }

    bindEvents_(){
        super.bindEvents_();
        this.dom
            .on('submit', this.loadVideosFormSelector_, event=>{
                var target = $(event.target);
                setTimeout(()=>{
                    var params = this.getSearchQuery();

                    !target.hasClass('submit-process') && target.addClass('submit-process');
                    this.controller.searchAction(params);
                }, 0);
                return false;
            })
            .on('click', '.download-link', event => {
                var id = this.getVideoId(event.target);

                this.controller.viewVideoAction(id);

                return false;
            });
    }

    getVideoId(node) {
        var parent = $(node).parents('div.announcement-item.application');
        return parent.find('[name="id"]').val();
    }

    onRefresh_(model){
        super.onRefresh_(model);
    }

    onPartialRefresh_(model, message, append) {
        super.onPartialRefresh_(model, message, append);
        if(message == 'load-videos'){
            var dom = $(this.loadVideosFormSelector_ + '.submit-process');
            VideosTpl.renderTo(model, dom.find(this.updateVideosSelector_), append);
        }
    }
}

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

                    console.log('params when submit was trigged: ');
                    console.log(params);

                    !target.hasClass('submit-process') && target.addClass('submit-process');
                    this.controller.searchAction(params);
                }, 0);
                return false;
            })
    }

    onRefresh_(model){
        super.onRefresh_(model);
    }

    onPartialRefresh_(model, message, append){
        super.onPartialRefresh_(model, message, append);
        if(message == 'load-videos'){
            var dom = $(this.loadVideosFormSelector_ + '.submit-process');
            VideosTpl.renderTo(model, dom.find(this.updateVideosSelector_), append);
        }
    }
}

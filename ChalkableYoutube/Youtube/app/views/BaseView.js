
export default class BaseView{
    constructor(controller){
        this._parentDom = $('.videos-view');
        this.model = null;
        this.controller = controller;
    }

    get dom(){return this._parentDom.find(this.viewSelector_);}
    get viewSelector_(){return '.' + this.cssClass_;}
    get cssClass_(){} //abstract
    get templateClass_(){} // abstract
    get viewName(){ return this.name }

    bindEvents_(){}

    show(){
        $(this._parentDom).html('<div class="' + this.cssClass_ + '"></div>')
        this.bindEvents_();
    }

    refreshAsync(promise){
        this.showLoader();
        promise.then(model => {
            this.onRefresh_(model);
            this.hideLoader();
        });
    }

    partialRefreshAsync(promisse, message, append){
        this.showLoader();
        promisse.then(model=>{
            this.onPartialRefresh_(model, message, append);
            this.hideLoader();
        });
    }

    onRefresh_(model){
        (new this.templateClass_(model)).renderTo(this.dom);
        this.model = model;
    }

    onPartialRefresh_(model, message, append){ }

    showLoader(){
        if($('.loading-page').length == 0){
            var loader = '<div class="loading-page"></div>';
            this.dom.append(loader);
            $('.videos-container').css('opacity', '0.2');
        }
    }

    hideLoader(){
        var loader = this.dom.find('.loading-page');
        if(loader.length > 0){
            loader.remove();
            $('.videos-container').css('opacity', '1');
        }
    }

}

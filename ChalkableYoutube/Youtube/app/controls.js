
class BaseControl{
    constructor(){
        this.bindEvents_();
    }

    bindEvents_(){}

    get dom(){
        return $('body');
    }
}

const ENTER_KEY = 13;

export class SearchControl extends BaseControl{
    bindEvents_(){
        super.bindEvents_();
        this.dom
            .on('input', 'input', event=>{
                var target = $(event.target);
                if($(event.target).val().length == 0)
                    target.parent().find('.clear-filter').addClass('hidden');
                else
                    target.parent().find('.clear-filter').removeClass('hidden');
            })
            .on('keypress', 'input', event => {
                var keyCode = event.which || event.keyCode; //depends on browser
                if(keyCode == ENTER_KEY)
                    event.preventDefault();
            })
            .on('click', '.clear-filter', event => {
                var node = $(event.target).parent().find('input');
                node.val('');
                node.trigger('input');
            });
    }
}

export class CloseOpenControl extends BaseControl {
    bindEvents_(){
        super.bindEvents_();
        this.dom
            .on('click', '.co-open, .co-close', event=>{
                var timeout;
                var node = $(event.target).parents('.close-open-control');
                var closeOpenBlock = node.find('.close-open-block');
                timeout && clearTimeout(timeout);
                if(node.hasClass('co-opened')) {
                    closeOpenBlock.css('height', 0);
                    node.removeClass('co-opened');
                }
                else{
                    closeOpenBlock.css('height', 'auto');
                    node.addClass('co-opened');
                }
                timeout = setTimeout(()=> node.addClass('co-finished'), 200);
            })
    }
}

export default class YoutubeControls{
    static Create(){
        return {
            SearchControl: new SearchControl(),
            CloseOpenControl: new CloseOpenControl()
        }
    }
}
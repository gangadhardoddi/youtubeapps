export default class BaseTpl{
    constructor(data){
        this.isRecommEnabled = data.isRecommendedEnabled;
        this.onlyVideoView = data.isOnlyVideoView;
    }

    get jade(){
        throw new Error('Not implemented exception. jadeView method is not implemented.')
    }

    render(){
        return this.jade({data:this});
    }

    renderTo(dom, append){
        var content = this.render();
        if(!append){
            dom.html(content);
        }
        else {
            dom.append(content);
        }
    }

    isRecommendedEnabled() {
        return this.isRecommEnabled;
    }

    isVideoViewOnly() {
        return this.onlyVideoView;
    }
}
import standardVideosJade from "./../jade/standard-videos.jade"
import BaseTpl from "./BaseTpl.js"
import VideosTpl from "./VideosTpl.js"

export default class StandardVideosTpl extends BaseTpl{
    constructor(data){
        super(data);
        this.standardVideos = data.standardVideos;
    }

    get jade(){return standardVideosJade;}

    renderVideosTpl(videos){
        var tpl = new VideosTpl({videos: videos});
        var content = tpl.render();
        return content;
    }

    static renderTo(data, dom, append){
        var tpl = new StandardVideosTpl(data);
        tpl.renderTo(dom, append);
    }
}
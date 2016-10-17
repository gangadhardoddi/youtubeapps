import standardVideosJade from "./../jade/standard-videos.jade"
import BaseTpl from "./BaseTpl.js"
import VideosTpl from "./VideosTpl.js"

export default class StandardVideosTpl extends BaseTpl{
    constructor(data){
        super();
        this.standardVideos = data.standardVideos;
        this.announcementApplicationId = data.announcementApplicationId;
    }

    get jade(){return standardVideosJade;}

    renderVideosTpl(videos){
        var tpl = new VideosTpl({videos: videos, announcementApplicationId: this.announcementApplicationId});
        var content = tpl.render();
        return content;
    }

    static renderTo(data, dom, append){
        var tpl = new StandardVideosTpl(data);
        tpl.renderTo(dom, append);
    }
}
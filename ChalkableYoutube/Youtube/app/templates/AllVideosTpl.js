//import view file
import allVideosJade from "./../jade/all-videos.jade";

import BaseTpl from "./BaseTpl.js";
import VideosTpl from "./VideosTpl.js";

export default class AllVideosTpl extends BaseTpl{

    constructor(data){
        super();
        this.videos = data.videos;
    }

    get jade(){return allVideosJade; }

    static renderTo(data, dom, append){
        var tpl = new AllVideosTpl(data);
        tpl.renderTo(dom, append);
    }

    renderVideosTpl(videos){
        var tpl = new VideosTpl({videos: videos});
        var content = tpl.render();
        return content;
    }

}
import videosView from "./../jade/videos.jade";
import BaseTpl from "./BaseTpl.js";

export default class VideosTpl extends BaseTpl{
    constructor(data){
        super();
        this.videos = data.videos;
        this.announcementApplicationId = data.announcementApplicationId;
    }

    get jade(){return videosView;}

    static renderTo(data, dom, append){
        new VideosTpl(data).renderTo(dom, append);
    }
}
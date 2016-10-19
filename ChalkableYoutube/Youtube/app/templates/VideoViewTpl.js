import VideoViewJade from "./../jade/video-view.jade";
import BaseTpl from "./BaseTpl.js";

export default class VideoViewTpl extends BaseTpl{
    constructor(data){
        super();
        this.video = data;
    }

    get jade(){return VideoViewJade;}

    static renderTo(data, dom, append){
        new VideoViewTpl(data).renderTo(dom, append);
    }
}
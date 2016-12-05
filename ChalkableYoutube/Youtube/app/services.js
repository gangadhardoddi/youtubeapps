class VideoService {

    static get(url, params){
        return new Promise(function(resolve, reject){
            $.getJSON(url, params).done(response => {
                    resolve(VideoService.processResponse(response));
            }).fail(error => { reject(error); });

        }).then(data => {return data;}).catch(message=>{
            window['CHLK_API'].showAlertBox('Whoops. Something went wrong, please try again');
            return;
        })
    }

    static attach(videoId, announcementApplicationId){
        return VideoService.get("/Youtube/Attach", {
            id: videoId,
            announcementApplicationId: announcementApplicationId
        })
    }

    static search(searchQuery){
        return VideoService.get("/Youtube/SearchVideos", {
            searchQuery: searchQuery
        });
    }

    static getVideoById(id) {
        return VideoService.get("/Youtube/Video", { id: id });
    }

    static processResponse(response){
        if (!response.Success) {
            return response.Message;
        }

        return response.Data;
    }
}

export default {VideoService}
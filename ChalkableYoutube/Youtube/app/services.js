class VideoService {

    static get(url, params){
        return new Promise(function(resolve, reject){
            $.getJSON(url, params).done(response => {
                    resolve(VideoService.processResponse(response));
            }).fail(error => { reject(error); });

        }).then(data => {return data;}).catch(message=>{
            window['CHLK_API'].showAlertBox('Whoops. Something went wrong, please try again');
            console.error(message);
            return;
        })
    }

    static search(searchQuery){
        return VideoService.get("/Youtube/SearchVideos", {
            searchQuery: searchQuery
        });
    }

    static getRecommended(standardIds){
        return VideoService.get("/Youtube/RecommendedVideos",{
            standardIds: standardIds && standardIds.join(',')
        });
    }

    static processResponse(response){
        console.log('Process response started');
        console.log(response);
        if (!response.Success) {
            return response.Message;
        }
        console.log('Process response finished');
        return response.Data;
    }
}

export default {VideoService}
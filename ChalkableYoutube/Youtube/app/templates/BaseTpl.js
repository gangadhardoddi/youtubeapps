import {RoleEnum} from '../enums/RoleEnum.js';
import {ModeEnum} from '../enums/ModeEnum.js';

export default class BaseTpl{
    constructor(data){
        this.role = data.role;
        this.mode = data.mode;
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

    isTeacherOrAdmin(){
        if(!this.role)
            return false;

        return (this.role == RoleEnum.TEACHER || this.role == RoleEnum.ADMIN);
    }

    isStudent(){
        if(!this.role)
            return false;

        return (this.role == RoleEnum.STUDENT);
    }

    isAllViewOnly(){
        return this.mode == ModeEnum.MY_VIEW;
    }

    isViewMode(){
        return this.mode == ModeEnum.VIEW;
    }
}
// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { DisciplineApi } from "../../apis/discipline.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.setMyData({ xuanzhon:0 });
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new DisciplineApi();
    api.disciplinecat({ discipline_id:this.Base.options.id}, (disciplinecat) => {
      this.Base.setMyData({ disciplinecat });
     })
  }
  gotoCat(e) {
    var that=this;

    var id = e.currentTarget.id;
    this.Base.setMyData({ "xuanzhon": id });
   that.catcourse(e);
  }
  catcourse(e){

    var tab = e.currentTarget.id;
    var api = new DisciplineApi();
    api.catcourse({ disciplinecat_id: tab }, (catcourselist)=>{
      this.Base.setMyData({ catcourselist, courselist: [], catcourse_id: null, coursesctlist:[] });
      
     })
  }
  kechenxz(e){
    var tab = e.currentTarget.id;
    var api = new DisciplineApi();
    api.course({ catcourse_id: tab }, (courselist) => {
      this.Base.setMyData({ courselist, catcourselist: [], catcourse_id: tab });

    })  
    

  }
  kechenzj(e){
    var tab = e.currentTarget.id;
    var api = new DisciplineApi();
    api.coursesctlist({ course_id: tab }, (coursesctlist)=>{
      this.Base.setMyData({ coursesctlist });


    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoCat = content.gotoCat;
body.catcourse = content.catcourse;
body.kechenxz = content.kechenxz;
body.kechenzj = content.kechenzj;
Page(body)
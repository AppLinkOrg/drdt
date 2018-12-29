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
    
    super.onLoad(options);
    var api = new DisciplineApi();
    api.disciplinecat({ discipline_id: this.Base.options.id }, (disciplinecat) => {
      this.Base.setMyData({ disciplinecat, xuanzhon: disciplinecat[0].id,isf:false });
  
    api.catcourse({ disciplinecat_id: disciplinecat[0].id}, (catcourselist) => {
      this.Base.setMyData({ catcourselist, courselist: [], catcourse_id: null, coursesctlist: [] });

    })
    })
  }
  onMyShow() {
    var that = this;
    var id = this.Base.getMyData().course_id;
    var id1 = this.Base.getMyData().catcourse_id;
    if (id != undefined && id1 != undefined){
      var api = new DisciplineApi();
      api.course({ catcourse_id: id1 }, (courselist) => {
        this.Base.setMyData({ courselist, catcourselist: [], catcourse_id: id1, isf: true });

      })  
      api.coursesctlist({ course_id: id }, (coursesctlist) => {
        this.Base.setMyData({ coursesctlist, course_id: id, catcourselist: [], });


      })



    }
  }
  gotoCat(e) {
    var that=this;
 console.log(666666666);
    var id = e.currentTarget.id;
    console.log(that.Base.getMyData().isf);
    if (that.Base.getMyData().xuanzhon == id && that.Base.getMyData().isf==false)
    {
      var isf=this.Base.getMyData().isf;
      this.Base.setMyData({ catcourselist: [], isf: !isf});
      
    }
    else{
      var isf = this.Base.getMyData().isf;
      this.Base.setMyData({ "xuanzhon": id, isf: !isf});
      that.catcourse(e);
    }
  }
  catcourse(e){

    var tab = e.currentTarget.id;
    var api = new DisciplineApi();
   
    api.catcourse({ disciplinecat_id: this.Base.getMyData().xuanzhon }, (catcourselist)=>{
      this.Base.setMyData({ catcourselist, coursesctlist: [], });
      
     })
  }
  kechenxz(e){
    var tab = e.currentTarget.id;
    var api = new DisciplineApi();
    api.course({ catcourse_id: tab }, (courselist) => {
      this.Base.setMyData({ courselist, catcourselist: [], catcourse_id: tab, isf: true });

    })  
    

  }
  kechenzj(e){
  var that=this;
   
    var tab = e.currentTarget.id;
   
    console.log(that.Base.getMyData().course_id);
    if (tab == that.Base.getMyData().course_id){

      this.Base.setMyData({ coursesctlist: [], course_id: null, catcourselist: [], });
    }
    else{
    var api = new DisciplineApi();
    api.coursesctlist({ course_id: tab }, (coursesctlist)=>{
      this.Base.setMyData({ coursesctlist, course_id: tab, catcourselist: [], });


    })
  }

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
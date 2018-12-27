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
  }
  onMyShow() {
    var that = this;
    var api = new DisciplineApi();
    api.disciplinetm({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

      this.Base.setMyData({ disciplinetm, tmid: this.Base.options.id - 1 });

    })
  }
  radioChange(e) {
    console.log(e);
    this.Base.setMyData({ xz: e.currentTarget.id });
  }
  tjdn(e) {
    let xz = this.Base.getMyData().xz;
    if (xz == undefined || xz == "") {
      this.Base.info("请选择一个选项");
    }
    else {
      console.log(e);
      var api = new DisciplineApi();
      api.addquestionjl({
        question_id: e.currentTarget.dataset.id, coursesct_id: this.Base.getMyData().disciplinetm[0].coursesct_id,
        member_id: this.Base.getMyData().memberinfo.id, anwser: xz
      }, (hd) => {
        if (xz!=e.currentTarget.dataset.daan){

          api.addwrongquestion({ member_id: this.Base.getMyData().memberinfo.id, question_id: e.currentTarget.dataset.id},()=>{

  

          })
        }

              
        api.disciplinetm({ coursesct_id: this.Base.options.coursesct_id, }, (disciplinetm) => {

          this.Base.setMyData({ disciplinetm,xz:null });

        })



      })

    }

  }
  xuanti(){

    wx.navigateBack({
      
    })
  }
  shouye(){

    wx.navigateTo({
  url: '/pages/home/home',
})

  }
  huadon(){

    this.Base.setMyData({  xz: null });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.radioChange = content.radioChange;
body.tjdn = content.tjdn;
body.xuanti = content.xuanti;
body.shouye = content.shouye;
body.huadon = content.huadon;
Page(body)
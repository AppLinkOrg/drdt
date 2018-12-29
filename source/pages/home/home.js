// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

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
    var api = new InstApi();
    var shitu=[];
    api.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    })
    api.disciplinelist({}, (disciplinelist)=>{

      api.statistics({ member_id: this.Base.getMyData().memberinfo.id}, (statistics) => {
        this.Base.setMyData({ statistics });

     
      for (var i = 0; i < disciplinelist.length;i++){
        shitu[i]="";
        for (var j = 0; j < statistics.length;j++){
          if (disciplinelist[i].id == statistics[j].discipline_id ){

            shitu[i] = statistics[j];
            shitu[i].datilv = (shitu[i].rightanwsercoun / shitu[i].anwsercount * 100).toFixed(2);

          }


        }
         
      }
        this.Base.setMyData({ shitu, disciplinelist });
      })
    })
   

  }
  gotoCat(e){
    var id = e.currentTarget.id;
    this.Base.setMyData({ "xuanzhon": id });


  }
  
  dati(e){
    var id = e.currentTarget.id;
   wx.navigateTo({
     url: '/pages/answer/answer?id='+id,
   })

  }
  cuoti(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/error/error?id=' + id,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoCat = content.gotoCat;
body.dati = content.dati;
body.cuoti = content.cuoti;
Page(body)
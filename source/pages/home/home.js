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
    api.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    })
    api.disciplinelist({}, (disciplinelist)=>{
      this.Base.setMyData({ disciplinelist });


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
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoCat = content.gotoCat;
body.dati = content.dati;
Page(body)
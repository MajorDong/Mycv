// var model = Model({resourceName:'Message'})
// model 办事我放心
// model就是一个模版
// 阻塞 这个事情不做完是没有办法做下一见事情的

/*
var model = Model({
  resourceName: '表名'
})
*/
window.Model = function(options){
  let resourceName = options.resourceName
  return {
    init: function () {
      var APP_ID = 'TsDnap9SEXjSvGSowP7gXXJC-gzGzoHsz'
      var APP_KEY = 'rGye31p12mM3wFpNRn9RADu9'
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
    },
    //获取数据
    fetch: function(){
      var query = new AV.Query(resourceName)
      return query.find()// promise对象
    },
    //创建数据
    save: function(object){
      var x = AV.Object.extend(resourceName)
      var x = new x()
      return x.save(object)
    } 
  }
}
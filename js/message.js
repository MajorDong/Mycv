!function () {
  var view = View('section.message')

  var model = Model({ resourceName: 'Message' })

  var controller = Contorller({
    init: function (view, controller) {
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.loadMessages()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => { // 箭头函数内外this不改变
          // console.log(messages)一个都是对象的数组
          // console.log(messages[0].attributes)
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        },
        function (error) {
          alert('提交失败，请改天来留言')
        }
      )
    },
    bindEvents: function () {
      //这里监听表单提交事件 提交有多种方式在最后一步监听 点击鼠标+回车
      let myForm = this.form
      myForm.addEventListener('submit', function (e) {
        e.preventDefault() //阻止表单提交的默认刷新页面
        this.saveMessage()
      }.bind(this))
    },
    saveMessage: function () {
      let myForm = this.form
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value
      this.model.save({
        'name': name,
        'content': content
      }).then(
        function (object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}: ${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = ''
          console.log(object)
        })
    }

  })

  controller.init(view, model)
  // var controller = {
  //   view: null,
  //   model: null,
  //   messageList: null,
  //   init: function (view, model) {
  //     this.view = view
  //     this.model = model
  //     this.model.init()
  //     this.messageList = view.querySelector('#messageList')
  //     this.form = view.querySelector('form')
  //     this.loadMessages()
  //     this.bindEvents()
  //     this.saveMessage()
  //   },
  //   loadMessages: function () {
  //     this.model.fetch().then(
  //       (messages) => { // 箭头函数内外this不改变
  //         // console.log(messages)一个都是对象的数组
  //         // console.log(messages[0].attributes)
  //         let array = messages.map((item) => item.attributes)
  //         array.forEach((item) => {
  //           let li = document.createElement('li')
  //           li.innerText = `${item.name}: ${item.content}`
  //           this.messageList.appendChild(li)
  //         })
  //       },
  //       function (error) {
  //         alert('提交失败，请改天来留言')
  //       }
  //     )
  //   },
  //   bindEvents: function () {
  //     //这里监听表单提交事件 提交有多种方式在最后一步监听 点击鼠标+回车
  //     let myForm = this.form
  //     myForm.addEventListener('submit', function (e) {
  //       e.preventDefault() //阻止表单提交的默认刷新页面
  //       this.saveMessage()
  //     }.bind(this))
  //   },
  //   saveMessage: function () {
  //     let myForm = this.form
  //     let name = myForm.querySelector('input[name=name]').value
  //     let content = myForm.querySelector('input[name=content]').value
  //     this.model.save({
  //       'name': name,
  //       'content': content
  //     }).then(
  //       function (object) {
  //         let li = document.createElement('li')
  //         li.innerText = `${object.attributes.name}: ${object.attributes.content}`
  //         let messageList = document.querySelector('#messageList')
  //         messageList.appendChild(li)
  //         myForm.querySelector('input[name=content]').value = ''
  //         console.log(object)
  //       })
  //   }
  // }

 

}.call()




// //CRM 创建TestObject 表
// var TestObject = AV.Object.extend('TestObject')// 表的名字 生成一个构造函数名字
// //在表中创建一行数据
// var testObjecrt = new TestObject() //生成对象
// //数据内容是 words：'hello world'
// //如果保存成功，则运行alert
// testObjecrt.save({
//   words: 'Hello World!'
// }).then(function(Object){ //.call(null,object)
//   //这个函数在调用的时候会传递绑定的参数e object arguments[0]
//   alert('LeanCloud Rocks!')
// })

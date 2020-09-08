Component({
    properties: {
      iconClass: {
        type: String,
        value: '',
      },
      styles: String,
      iconStyle:String,
      to: String,
      title: String,
    },
    data: {
    },
    methods: {
      // 这里是一个自定义方法
      hangClick: function(e) {
          console.log(this.properties.to);
      }
    }
  })
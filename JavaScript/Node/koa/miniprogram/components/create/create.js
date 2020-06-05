Component({
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },
  data: {
    picName: ''
  },
  methods: {
    eventInput(e) {
      this.setData({
        picName: e.detail.value
      })
    },
    create(e) {
      const name = (this.data.picName || "").trim()
      if (name == '') return
      this.triggerEvent('addPics', {name})
    },
    goBack(){
      this.triggerEvent('goBack')
    }
  }
})
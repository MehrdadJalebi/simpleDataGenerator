export default {
  methods: {
    getJsonData(file, returnData) {
      var rawFile = new XMLHttpRequest()
      rawFile.open("GET", file, true)
      rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
          returnData(JSON.parse(rawFile.responseText))
        }
      }
      rawFile.send()
    }
  }
}

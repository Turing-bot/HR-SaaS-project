<template>
  <div>
    <el-upload
      :limit="1"
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog :visible.sync="showDialog" title="图片">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

var cos = new COS({
  SecretId: 'AKIDXtHpKez73jDVZR3xlU1UnvteBbt20wnV',
  SecretKey: 'jGdnIbhaIuIUVO9j8Qcll1DGOVYVIwPn'
})

export default {
  name: 'ImageUpload',
  data () {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: '',
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview (file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove (file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile (file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload (file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('图片格式只能为jpeg、gif、bmp、png')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片最大体积不得超过5m')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload (parmas) {
      if (parmas.file) {
        cos.putObject({
          Bucket: 'turing-1311295875',
          Region: 'ap-nanjing',
          Key: parmas.file.name,
          Body: parmas.file,
          StorageClass: 'STANDARD',
          onProgress: (parmas) => {
            this.percent = parmas.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>

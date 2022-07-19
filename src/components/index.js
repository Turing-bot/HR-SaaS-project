import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'

export default {
  install (Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 上传图片组件
    Vue.component('ScreenFull', ScreenFull) // 全屏组件
  }
}

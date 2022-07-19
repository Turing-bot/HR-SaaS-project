import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import SelectLang from './lang'
import TagsView from './TagsView'

export default {
  install (Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 上传图片组件
    Vue.component('ScreenFull', ScreenFull) // 全屏组件
    Vue.component('ThemePicker', ThemePicker) // 动态切换主题
    Vue.component('SelectLang', SelectLang) // 切换语言
    Vue.component('TagsView', TagsView) // 多页签组件
  }
}

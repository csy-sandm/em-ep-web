<template>
    <div class="module_container">
        <div class="title-content">
            <div class="title-img">
                <img :src="picUrl" class="img-content">
            </div>
            <div class="title-content">
                {{ title }}
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 公共小模块头部组件
 */
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    // 主题图片路径
    picUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.module_container{
    .title-content{
        width: 180px;
        height: 40px;
        background-color: rgba(4,36,79,0.7);
        border-radius: 20px;
        color: white;
        .title-img{
            width: 30%;
            height: 40px;
            display:flex;
            align-items:center;/*垂直居中*/
            justify-content: center;/*水平居中*/
            float: left;
            .img-content{
                width: 30px;
                height: 30px;
                background-size:100% 100%;
            }
        }
        .title-content{
            height: 40px;
            line-height: 40px;
            text-align: left;
        }
    }
}
</style>

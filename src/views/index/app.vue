<template>
    <div class="index-container">
123123
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.index-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .map {
        width: 100%;
        height: 100%;
        ::v-deep .gaia-toolbar {
            display: none;
        }
        ::v-deep .cesium-performanceDisplay {
            display: none;
        }
    }
}
</style>

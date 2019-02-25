<template>
    <div class=" banner">
        <img src="../img/banner.png" class="hidden-xs">
        <img src="../img/m_banner.png" class="visible-xs-block">
    </div>
</template>

<script>
    export default {
        name: 'banner',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'//数据的接收格式
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .banner {
        width: 100%;
        display: block;
        height: 100%;
        overflow: hidden;
    }

    .banner img {
        display: block;
        width: 100%;
        overflow: hidden;
    }

</style>

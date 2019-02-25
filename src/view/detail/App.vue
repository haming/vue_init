<template>
    <div id="app">
        <banner/>
        <tabChoose/>
        <!--<footer/>-->
        <tabfooter/>
    </div>
</template>

<script>
    import banner from './banner/banner'
    import tabChoose from './tabChoose/tabChoose'
    import tabfooter from '../../components/footer/footer'

    export default {
        name: 'App',
        components: {
            banner,
            tabChoose,
            tabfooter
        }
    }
</script>

<style>
</style>

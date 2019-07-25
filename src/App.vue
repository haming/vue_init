<template>
    <div id="app">
        <img src="./assets/logo.png">

        <HelloWorld/>
        <inputNew/>


    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import inputNew from './components/inputNew'

    export default {
        name: 'App',
        components: {
            HelloWorld,
            inputNew
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

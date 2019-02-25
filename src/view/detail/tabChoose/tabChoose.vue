<template>
    <div class="tabChoose" id="fixed">
        <div class="tabs">
            <div class="tabs_center">
                <div class="fl tab" v-model="tabView">
                    <div class="tab_text1" v-for="(tab ,index) in tabs"
                         :class="{tab_text:iscur==index}"
                         @click="iscur=index,tabChange('tab' + (index + 1))">
                        <div class="text_center"> {{tab.name}}</div>
                        <div class="tab_footer"
                             :class="{tab_footer_all:iscur==index}"></div>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
            <keep-alive>
                <component v-bind:is="tabView"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import tab1 from '../tabOne/tabOne'
    import tab2 from '../tabTwo/tabTwo'
    import tab3 from '../tabThree/tabThree'

    export default {
        name: 'tabChoose',
        data() {
            return {
                tabView: 'tab1',
                iscur: 0,
                tabs: [{name: "产品概览"}, {name: "投保须知"}, {name: "客服指南"}]
            }
        },

        components: {
            tab1,
            tab2,
            tab3,
        },
        methods: {
            tabChange: function (tab) {
                this.tabView = tab;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "./tabChoose";

</style>

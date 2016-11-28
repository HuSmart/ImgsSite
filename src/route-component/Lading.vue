<template>
    <div id="landing">
        <search-bar :router="$route.router"></search-bar>
        <landing-view :config="config"></landing-view>
        <!--这边有个坑!-->
        <!--之前将template写成 <content>怎么样都解析不了会报错、估计是2.0是保留字-->
        <LandingContent :categories="categories"></LandingContent>
        <Footer></Footer>
    </div>
</template>
<script>
    import LandingView from '../component/LandingView.vue'
    import LandingContent from '../component/Content.vue'
    import Footer from '../component/Footer.vue'
    import SearchBar from '../component/SearchBar.vue'

    import Config from '../model/Config.js'
    import Category from '../model/Categories.js'

    export default {
        name: 'LandingPage',
        data(){ 
            return { 
                config: {},
                categories: []
            } 
        },
        components: {
            LandingView,
            LandingContent,
            Footer,
            SearchBar
        },
        mounted() {
            this.$nextTick(function () {
            // 保证 this.$el 已经插入文档
                Promise.all([
                    Config.load(),
                    Category.load()
                ])
                .then(([ config, category ]) => {
                    this.config = config
                    this.categories = category
                })
            })
        }
    }
</script>
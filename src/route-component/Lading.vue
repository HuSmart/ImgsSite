<template>
    <div id="landing">
        <!--<search-bar :router="$route.router"></search-bar>-->
        <landing-view :config="config"></landing-view>
        <!--这边有个坑!-->
        <!--之前将template写成 <content>怎么样都解析不了会报错、估计是2.0是保留字-->
        <LandingContent :categories="categories"></LandingContent>
    </div>
</template>
<script>
    import LandingView from '../component/LandingView.vue'
    import LandingContent from '../component/Content.vue'

    export default {
        name: 'LandingPage',
        data(){ 
            return { 
                config: {
                    description: 'description',
                    title: 'title',
                    background: '../../assets/img/loading-bg.jpg'
                },
                categories: [
                    {
                        title: 'categoryTitle',
                        cover: '',
                        subtitle: 'subtitle'
                    },
                    {
                        title: 'categoryTitle1',
                        cover: '',
                        subtitle: 'subtitle2'
                    }
                ]
            } 
        },
        components: {
            LandingView,
            LandingContent
        }
    }
</script>
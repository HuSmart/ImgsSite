<template>
    <div id="search-result">
        <search-bar :query="decodeURIComponent($route.params.query)" static="true"></search-bar>
        <div class="margin-space"></div>

        <b class="title" v-if="!$route.query.category">分类</b>
        <Content :categories="categories" v-if="!$route.query.category"></Content>
        <span v-if="categories.length == 0 && !$route.query.category" id="empty">暂无分类</span>
        <b class="title">相册</b>
        <album-list :albums="albums"></album-list>
    </div>
</template>
<script>
    import SearchBar from '../component/SearchBar.vue'
    import Category from '../model/Categories.js'
    import Album from '../model/Album.js'

    import Content from '../component/Content.vue'
    import AlbumList from '../component/AlbumList.vue'

    export default {
        name: 'SearchPage',
        data(){
            return {
                categories:[],
                albums: []
            }
        },
        components: {
            SearchBar,
            Content,
            AlbumList
        },
        methods: {
            search(query){
                // debugger
                let promises = []
                if(!this.$route.query.categories){
                    promises = [
                        Promise.all([
                            Category.search('title',query),
                            Category.search('name', query)
                        ])
                        .then(([a, b]) => a.concat(b))
                        .catch(([a, b]) => a.concat(b)),
                        Promise.all([
                            Album.search('title', query),
                            Album.search('category', query)
                        ])
                        .then(([a, b]) => a.concat(b))
                        .catch(([a, b]) => a.concat(b))
                    ]
                }

                Promise.all(promises)
                    .then(([categories, albums]) => {
                        if(albums){
                            this.categories = categories
                            this.albums = albums.map(n => n.getCacheData())
                        }else{
                            this.categories = categories
                        }
                    })
            }
        },
        mounted(){
            this.$nextTick(function(){
                const query = decodeURIComponent(this.$route.params.query)
                this.search(query)
            })
        },
        watch: {
            '$route' (to, from) {
                this.search(decodeURIComponent(this.$route.params.query))
            }
        }
    }
</script>
<style scoped>
    .margin-space {
        display: block;
        width: 100%;
        height: 65px;
    }
    
    b.title {
        margin: 5px 10px;
        display: block;
    }
    
    #empty {
        width: 100%;
        display: block;
        color: #999;
        text-align: center;
        font-family: "Lantinghei SC", "Lantinghei TC", Arial, serif;
        clear: both;
    }
</style>
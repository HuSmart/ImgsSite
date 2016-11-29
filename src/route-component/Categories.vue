<template>
    <div id="category">
        <ol class="breadcrumb">
            <li class="active"><router-link to="/" class="back back-white"><span class="icon-arrow-left"></span> <span>HOME</span></router-link></li>
        </ol>
        <search-bar :router="$route.router" :options="{ category: $route.params.name }"></search-bar>
        <category-item :category="category" :asTitle="true"></category-item>
        <albums-list :albums="albums"></albums-list>
    </div>

</template>

<script>
    import CategoryItem from '../component/Category.vue'
    import Category from '../model/Categories.js'
    import Album from '../model/Album.js'
    import AlbumsList from '../component/AlbumList.vue'
    import SearchBar from '../component/SearchBar.vue'

    export default {
        name: 'CategoryPage',
        data(){
            return {
                // 分类信息
                category: {},
                // 相册信息
                albums: []
            }
        },
        components: {
            CategoryItem,
            AlbumsList,
            SearchBar
        },
        mounted() {
            this.$nextTick(function () {
            // 保证 this.$el 已经插入文档
                // this.category.title = this.$route.params.category
                Promise.all([
                    Category.loadIfNotInit()
                    .then( () => Category.search('name' ,this.$route.params.name))
                    .then(result => result[0]),
                    Album.fetchByCategory(this.$route.params.name)
                ])
                .then( ([category, album]) => {
                    this.category = category.getCacheData()
                    this.albums = album.map(n => n.getCacheData())
                })
            })
        }
    }
</script>
<style>
    .categoryFooter{
        overflow: auto 
    }
</style>
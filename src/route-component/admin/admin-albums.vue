<template>
    <div id="albums">
        <div class="page-header"></div>
        <div class="row">
            <ul class="nav nav-pills category-label" role="tablist">
                <li role="presentation" @click="showCategory()"><a>所有分类</a></li>
                <li role="presentation" v-for="category in categories" @click="showCategory(category)"><a>{{category.title}}</a></li>
            </ul>
            <form action="" class="form-inline pull-right">
                <div class="form-group">
                    <router-link class="btn btn-primary" to="/album/new">新增</router-link>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model.lazy="query" placeholder="输入相册名称">
                    <button class="btn"  @click="searchAlbum">搜索</button>
                </div>
            </form>
        </div>
        <div class="row">
            <router-link v-for="album of albums" class="img-rounded album" :to="{ path: `/album/${album._key}` }" teg="div">
                <h1 class="album-title">{{album.title}}(照片数量){{album.count}}</h1>
                <img :src="album.photos[0]" alt="album.title">
            </router-link>
        </div>
    </div>
</template>
<script>
    import Albums from '../../model/Album.js'
    import filmyBucket from '../../model/qiniu-bucket.js'
    import Categories from '../../model/Categories.js'

    export default {
        name: 'admin-albums-page',
        data(){
            return {
                albums:[],
                allAlbums: [],
                categories: [],
                choosCategory: true,
                query: ''
            }
        },
        mounted(){
            Promise.all([
                    Albums.loadIfNotInit().then(() => Albums.dump()),
                    Categories.loadIfNotInit().then(() => Categories.dump())
                ])
                .then(([albums, categories]) => {
                    this.albums = albums
                    this.allAlbums = albums
                    this.categories = categories
                    for (let album of albums){
                        album.count = album.photos.length
                    }
                })
            
        },
        methods:{
            showCategory(category){
                if (!category) return this.albums = this.allAlbums
                this.albums = this.allAlbums.filter(n => n.category === category.name)
            },
            searchAlbum(){
                if (!this.query) return this.albums = this.allAlbums
                this.albums = this.allAlbums.filter(album => {
                    let albumTitle = album.title, albumContent = album.content
                    let reg = new RegExp(`^\\S*${this.query}\\S*$`)
                    return reg.test(albumTitle) || reg.test(albumContent)
                })
            }
        }
    }
</script>
<style scoped>
    .category-label {
        cursor: pointer;
    }
    
    .album {
        width: 287.5px;
        height: 287.5px;
        overflow: hidden;
        display: inline-block;
        margin: 2.5px;
        position: relative;
        cursor: pointer;
    }
    
    .album-title {
        position: absolute;
        color: #FFF;
        bottom: 0;
        margin-left: 20px;
        text-shadow: 0 0 2px #666;
        font-size: 24px;
        line-height: 24px;
    }
    
    .album-title .category {
        font-size: 12px;
        line-height: 24px;
    }
    
    .album img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .row {
        margin-right: 0px;
        margin-left: 0px;
    }
</style>
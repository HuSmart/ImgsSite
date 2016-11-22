<template>
    <div id="categories">
        <div class="page-header"></div>
        <div class="row">
            <form action="" class="form-inline pull-right">
                <div class="form-group">
                    <router-link tag="button" class="btn btn-primary" to="/category/new">新建</router-link>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control">
                    <button class="btn">搜索</button>
                </div>
            </form>
        </div>
        <div class="row">
            <router-link class="category img-rounded" v-for="category of categories" tag="div" :to="'/category/' + category.name">
                <h1 class="category-title">{{category.title}}(相册数:{{category.count}})</h1>
                <img :data-src="category.cover" :alt="category.title" class="lazyload">
            </router-link>
        </div>
    </div>
</template>
<script>
    import 'lazysizes/lazysizes.min'
    import Category from '../../model/Categories.js'
    import Album from '../../model/Album.js'

    export default {
        name: 'admin-category',
        data(){
            return {
                categories:[]
            }
        },
        mounted(){
            Promise.all([
                Category.loadIfNotInit().then(() => Category.dump()),
                Album.loadIfNotInit().then(() => Album.dump())
            ]).then(([categories, albums]) => {
                for (let category of categories){
                    category.count = albums.filter(album => category.name === album.category).length
                }
                this.categories= categories
            })
        }
    }
</script>
<style>
    .row {
        margin-right: 0px
    }
    
    .category {
        width: 49%;
        margin: 10px 0.5%;
        height: 200px;
        overflow: hidden;
        display: inline-block;
        position: relative;
        cursor: pointer;
    }
    
    .category-title {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 200px;
        text-align: center;
        color: #FFF;
        text-shadow: 0 0 2px #666;
        margin: 0;
    }
    
    .category img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
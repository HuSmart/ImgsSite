<template>
    <div id="categories">
        <div class="page-header"></div>
        <div class="row">
            <form action="" class="form-inline pull-right">
                <div class="form-group">
                    <router-link  class="btn btn-primary" to="/category/new">新建</router-link>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model.lazy="query" >
                    <button class="btn" @click="search">搜索</button>
                </div>
            </form>
        </div>
        <div class="row">
            <router-link class="category img-rounded" v-for="category of categories" tag="div" :to="'/category/' + category.name">
                <h1 class="category-title">{{category.title}}(相册数:{{category.count}})</h1>
                <img :src="category.cover" :alt="category.title" >
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
                originalCategories: [],
                categories:[],
                query: ''
            }
        },
        mounted(){
            this.$nextTick(function(){
                Promise.all([
                    Category.loadIfNotInit().then(() => Category.dump()),
                    Album.loadIfNotInit().then(() => Album.dump())
                ]).then(([categories, albums]) => {
                    for (let category of categories){
                        category.count = albums.filter(album => category.name === album.category).length
                    }
                    this.categories= categories
                    this.originalCategories = categories
                })
            })
        },
        methods: {
            search(){
                if(!this.query){
                    this.categories = this.originalCategories
                    return
                }
                this.categories = this.originalCategories.filter(category => {
                    let categoryName = category.name, 
                        categoryTitle = category.title
                    let reg = new RegExp(`^\\S*${this.query}\\S*$`)
                    return reg.test(categoryName) || reg.test(categoryTitle)
                })
            }
        }
    }
</script>
<style>
    
    
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
    .row {
        margin-right: 0px;
        margin-left: 0px;
    }
</style>
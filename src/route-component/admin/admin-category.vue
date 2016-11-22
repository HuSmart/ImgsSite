<template>
    <div id="category">
        <div class="page-header">
            <h3 v-if="category.title">{{category.title}}</h3>
            <h3 v-else>创建一个新的分类</h3>
        </div>
        <form action="">
            <div class="form-group">
                <label for="title">分类名称</label>
                <input type="text" class="form-control" v-model="category.title">
            </div>
            <div class="form-group">
                <label for="subtitle">分类描述</label>
                <input type="text" class="form-control" v-model="category.subtitle">
            </div>
            <div class="form-group">
                <label for="cover">分类封面</label>
                <div class="img-rounded" :class="{'category-cover' : isdisplay}">
                    <img :src="category.cover" :alt="category.title" v-if="category.cover">
                    <!--<img src="https://placeholdit.imgix.net/~text?txtsize=47&txt=NO%20COVER&w=500&h=213" v-else>-->
                </div>
                <input type="file" ref="cover" @change="proview" accept="image/png,image/gif,image/jpeg" class="file">
            </div>
        </form>
        <div class="form-group">
            <button class="btn btn-primary" ref="submit" @click="">完成</button>
            <button class="btn" v-if="category._key" @click="">删除</button>
        </div>
    </div>
</template>
<script>
    import Category from '../../model/Categories.js'

    export default {
        name: 'admin-category',
        data(){
            return {
                category: {
                    title:'',
                    cover: '',
                    subtitle: ''
                },
                newCategory: false,
                isdisplay: true
            }
        },
        mounted(){
            this.$nextTick(function(){
                let key = this.$route.params.name
                if(key === 'new'){
                    this.newCategory = true
                    this.isdisplay = false
                    return
                }
                Category.loadIfNotInit().then(() => Category.search('name', key))
                    .then(([category]) => {
                        this.category = category.getCacheData()
                    })
            })
        },
        methods:{
            proview(){
                console.log(this.$refs.cover.files[0])
            }
        }
    }
</script>
<style scoped>
#category{
    width: 900px;
    margin: 0 auto;
}
    .category-cover {
        width: 500px;
        height: 213px;
        margin: 5px;
        overflow: hidden;
        position: relative;
    }
    
    .category-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
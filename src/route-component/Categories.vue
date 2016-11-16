<template>
    <div id="category">
        <category-item :category="category" :asTitle="true"></category-item>
        <!--<albums-list :albums="albums"></albums-list>-->
    </div>
  </div>

</template>

<script>
    import CategoryItem from '../component/Category.vue'
    import Category from '../model/Categories.js'
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
            CategoryItem
        },
        mounted() {
            this.$nextTick(function () {
            // 保证 this.$el 已经插入文档
                // this.category.title = this.$route.params.category
                Promise.all([
                    Category.loadIfNotInit()
                    .then( () => Category.search('name' ,this.$route.params.category))
                    .then(result => result[0])
                ])
                .then( ([category]) => {
                    this.category = category.getCacheData()
                })
            })
        }
    }
</script>
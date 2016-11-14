<template>
    <div id="category">
        <category-item :category="category" :asTitle="true"></category-item>
    </div>

</template>

<script>
    import CategoryItem from '../component/Category.vue'
    
    export default {
        name: 'CategoryPage',
        data(){
            return {
                // 分类信息
                category: {
                    title: '',
                    cover: '',
                    subtitle: 'subtitle'
                },
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
                this.category.title = this.$route.params.category
            })
        }
    }
</script>
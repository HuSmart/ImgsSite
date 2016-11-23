<template>
    <div id="category">
        <div class="page-header">
            <h3 v-if="category.title">{{category.title}}</h3>
            <h3 v-else>创建一个新的分类</h3>
        </div>
        <form action="">
            <div class="form-group">
                <label for="name">分类名称</label>
                <input type="text" class="form-control" v-model="category.name" required>
            </div>
            <div class="form-group">
                <label for="title">分类标题</label>
                <input type="text" class="form-control" v-model="category.title" required>
            </div>
            <div class="form-group">
                <label for="subtitle">分类描述</label>
                <input type="text" class="form-control" v-model="category.subtitle">
            </div>
            <div class="form-group">
                <label for="cover">分类封面</label>
                <div class="img-rounded category-cover">
                    <img :src="category.cover" :alt="category.title" id="proviewImg">
                </div>
                <input type="file" ref="cover" @change="proview" accept="image/*" id="coverImsg">
            </div>
        </form>
        <div class="form-group">
            <button class="btn btn-primary" ref="submit" @click="submit">完成</button>
            <button class="btn" v-if="category._key" @click="">删除</button>
        </div>
    </div>
</template>
<script>
    import Category from '../../model/Categories.js'
    import SimpleModel from '../../lib/simple-model'
    import 'sweetalert'
    import filmyBucket from '../../model/qiniu-bucket.js'
    import Album from '../../model/Album.js'

    const swalp = (...args) => { 
        return new Promise(resolve => { 
            swal(...args, (...argv) => {
                resolve(...argv)
            }) 
        }) 
    }

    export default {
        name: 'admin-category',
        data(){
            return {
                category: {
                    title:'',
                    cover: 'https://placeholdit.imgix.net/~text?txtsize=47&txt=NO%20COVER&w=500&h=213',
                    subtitle: '',
                    name: 'default'
                },
                newCategory: false,
                model: null
            }
        },
        mounted(){
            this.$nextTick(function(){
                let key = this.$route.params.name
                if(key === 'new'){
                    this.newCategory = true
                    return
                }
                Category.loadIfNotInit().then(() => Category.search('name', key))
                    .then(([category]) => {
                        this.model = category
                        this.category = category.getCacheData()
                    })
            })
        },
        methods:{
            proview(){
                let coverFile = this.$refs.cover.files[0]

                if(!coverFile.type.match('image.*')){
                    swal("选择文件类型错误", "分类的封面需要是图片")
                    document.querySelector('#coverImsg').value=''
                    return
                }
                if(window.File && window.FileList && window.FileReader && window.Blob){
                    if(coverFile){
                        let reader = new FileReader()
                        reader.readAsDataURL(coverFile)
                        reader.onload = (arg) => document.querySelector('#proviewImg').src = arg.target.result
                    }
                }else{
                    swal("该浏览器暂不支持图片预览")
                }
            },
            submit(){
                swalp({ 
                    title: '请输入管理员密码', 
                    type: 'input', inputType: 'password', 
                    showCancelButton: true, 
                    closeOnConfirm: false,
                    animation: "slide-from-top", 
                    showLoaderOnConfirm: true 
                })
                // =======处理cover=========
                .then(password => {
                    return new Promise((resolve,reject) => {
                        if(this.$refs.cover.files.length === 0){
                            return resolve([this.category.cover, password])
                        }
                        filmyBucket.fetchPutToken(password)
                            .then(putToken => {
                                let key = `asset/category-${this.category.name}-${Math.random().toString(32).substr(2)}`
                                return filmyBucket.putFile(key,this.$refs.cover.files[0],{putToken})
                                    .then(() => key)
                            })
                            .then(key => {
                                return resolve([filmyBucket.key(key).url(), password])})
                            .catch(() => reject(console.log('Admin Password Error')))
                    })
                })
                // ===========结束处理cover================
                .then(([coverUrl, password]) => {
                    if(this.newCategory){
                        return new Promise(resolve => {
                            this.model = new Category(this.category)
                            this.model.once('ready', () => resolve(password))
                        })
                    } else if (this.$route.params.name !== this.category.name){
                        debugger
                        return Album.search('category', this.$route.params.name)
                            .then(albums => {
                                return Promise.all(albums.map(album => album.set('category', this.category.name)))
                                    .then(() => Album.saveToCloud(password))
                                    .then(() => password)
                            })
                    } else 
                        return resolve(password)
                })
                .then(password => {
                    return Promise.all(['title', 'name', 'cover', 'subtitle'].map(key => this.model.set(key,this.category[key])))
                        .then(() => password)
                })
                .then(password => Category.saveToCloud(password))
                .then(() => {
                    swal({title: '编辑成功', type: 'success'})
                })
                .catch(() => {
                    swal({title: '保存出现错误', type:'error'})
                })
            }
        }
    }
</script>
<style scoped>
    #category {
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
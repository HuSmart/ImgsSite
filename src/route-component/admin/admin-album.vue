<template>
    <div id="albumPage">
        <div class="page-header">
            <h3 v-if="album.title">{{album.title}}</h3>
            <h3 v-else>创建一个新的相册</h3>
        </div>
        <form>
            <div class="form-group">
                <label for="name">相册名称</label>
                <input type="text" class="form-control" v-model="album.title" required>
            </div>
            <div class="form-group">
                <label for="name">相册分类</label>
                <select class="form-control" v-model="album.category">
                    <option v-for="category in categories"  :selected="category.selected" :value="category.name">
                        {{category.title}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="content">相册描述</label>
                <textarea class="form-control" id="content" rows="7" v-model="album.content"></textarea>
            </div>
            <div class="photos" ref="photos">
                <div class="photo img-rounded" v-for="(photo, index) of album.photos">
                    <span @click="removePhoto(index)" class="remove-btn glyphicon glyphicon-remove" aria-hidden="true"></span>
                    <img :src="photo" alt="">
                </div>
                <div class="photo">
                    <span class="add-btn glyphicon glyphicon-plus" aria-hidden="true" ref="add"></span>
                </div>
            </div>
        </form>
        <div class="form-group">
            <button class="btn btn-primary" refs="submit" @click="submitAlbum">保存</button>
            <button class="btn" v-if="!newAlbum" @click="deleteAlbum">删除</button>
        </div>
    </div>
</template>
<script>
    import Album from '../../model/Album.js'
    import Categories from '../../model/Categories.js'
    import filmyBucket from '../../model/qiniu-bucket.js'

    import qiniu from 'qiniu.js'

    const swalp = (...args) => { 
        return new Promise(resolve => { 
            swal(...args, (...argv) => {
                resolve(...argv)
            }) 
        }) 
    }


    export default {
        name: 'admin-albumPage',
        data(){
            return {
                album: {
                    photos: []
                },
                categories: [],
                model: null,
                newAlbum: false,
                photosToUpload: new Map(),
                over: false
            }
        },
        mounted(){
            this.$nextTick(function(){
                // 绑定 添加图片
                qiniu.bind(this.$refs.add)
                    .on('file', this.addPhoto)
                //绑定 区域拖拽上传
                if (qiniu.supportDnd) {
                    qiniu.bind.dnd(this.$refs.photos, {})
                    .on('over', () => this.over = true)
                    .on('out', () => this.over = false)
                }
                Promise.all([
                    Categories.dump().then(category => this.categories = category),
                    Album.fetch(this.$route.params.albumKey)
                ]).then(([, albums]) => {
                    this.model = albums
                    this.album = albums.getCacheData()
                }).catch(() => this.model = new Album({}))
            })
        },
        methods:{
            addPhoto(file) {
                // this.over = false

                file.imageView({
                    mode: 1,
                    width: 125,
                    height: 125
                }, (err, image) => {
                    if (err) return

                    image.toBlob(blob => {
                        const blobUrl = URL.createObjectURL(blob)
                        this.album.photos.push(blobUrl)
                        this.photosToUpload.set(blobUrl, file)
                    })
                })
            },
            removePhoto(index){
                this.photosToUpload.delete(this.album.photos[index])
                this.album.photos.splice(index,1)
            },
            submitAlbum(){
                swalp({ 
                    title: '请输入管理员密码', 
                    type: 'input', inputType: 'password', 
                    showCancelButton: true, 
                    closeOnConfirm: false,
                    animation: "slide-from-top", 
                    showLoaderOnConfirm: true 
                })
                .then(password => {
                    return filmyBucket.fetchPutToken(password).then(putToken => [putToken, password])
                })
                .then(([putToken, password]) => {
                    if(this.photosToUpload.size === 0)
                        return [this.album.photos, password]
                    let files = []
                    for ( const [, file] of this.photosToUpload.entries())
                        files.push(file)
                    return Promise.all(
                        files.map( file => {
                            const key = `asset/photos/${Math.random().toString(32).substr(2)}`
                            return filmyBucket.putFile(key,file,{putToken})
                                .then(() => filmyBucket.key(key).url())
                        })
                    )
                    .then(urls => {
                        return this.album.photos.filter(url => url[0] === 'h').concat(urls)
                    })
                    .then(urls => [urls, password])
                })
                .then(([photos,password]) => {
                    if(this.newAlbum)    
                        this.model = new Album({})
                    return Promise.all(
                        ['title','content','category'].map(key => {
                            return this.model.set(key, this.album[key])
                        })
                    )
                    .then(() => this.model.set('photos', photos))
                    .then(() => password)
                })
                .then(password =>  Album.saveToCloud(password))
                .then(() => {
                    swal({
                        title:'保存成功',
                        type: 'success'
                    })
                })
                .catch(err => {
                    swal({
                        title:err.message,
                        type:'error'
                    })
                })
            },
            deleteAlbum(){
                swalp({
                    title: '是否确定要删除该相册',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    closeOnConfirm: false
                })
                .then(() => swalp({
                        title: '请输入管理员密码', 
                        type: 'input', 
                        inputType: 'password', 
                        animation: "slide-from-top", 
                        showCancelButton: true, 
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true 
                    }))
                .then( password => this.model.remove().then(() => password))
                .then(password => Album.saveToCloud(password))
                .then(() => {
                    swal({
                        title:'删除成功',
                        type: 'success'
                    })
                    this.$router.push('/album/')
                })
                .cath(err => swal({
                    title:err.message,
                    type: 'error'
                }))
            }
        }
    }
</script>
<style scoped>
    #albumPage {
        width: 900px;
        margin: 0 auto;
    }
    
    .photos {
        width: 100%;
        min-height: 400px;
        border: 5px dashed #CCC;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
    }
    
    .photos.over {
        border-color: #888;
    }
    
    .photo {
        width: 125px;
        height: 125px;
        margin: 2.5px;
        float: left;
        position: relative;
    }
    
    .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .photo .remove-btn {
        display: none;
        position: absolute;
        font-size: 10px;
        width: 16px;
        height: 16px;
        padding-left: 1px;
        line-height: 16px;
        text-align: center;
        background: #d9534f;
        color: #FFF;
        border-radius: 7px;
        top: -7px;
        right: -7px;
        cursor: pointer;
        z-index: 999;
    }
    
    .photo:hover .remove-btn {
        display: block;
    }
    
    .photo .add-btn {
        font-size: 25px;
        border: 2px dashed #999;
        cursor: pointer;
        color: #999;
        width: 125px;
        height: 125px;
        line-height: 125px;
        text-align: center;
    }
</style>
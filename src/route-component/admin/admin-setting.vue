<template>
    <div id="config">
        <div class="page-header">
            <h3 class="modal-title">配置应用的基本信息</h3>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="title">名称</label>
                    <input type="text" class="form-control" id="title" placeholder="Filmy" v-model="config.title" />
                </div>

                <div class="form-group">
                    <label for="subtitle">网站描述</label>
                    <textarea class="form-control" id="subtitle" rows="7" v-model="config.description"></textarea>
                </div>

                <label for="background">背景图片</label>
                <div class="form-group" style="overflow: hidden">
                    <div class="img-rounded category-cover">
                        <img :src="proViewURL">
                    </div>
                    <label class="col-sm-2 control-label"><input type="radio" value="url" name="background" checked> URL</label>
                    <div class="col-sm-10">
                        <input type="url" class="form-control" v-model="config.background" @change="proView">
                    </div>

                    <label class="col-sm-2 control-label"><input type="radio" value="file"  name="background" >上传背景图片</label>

                    <div class="col-sm-10">
                        <input type="file" ref="cover" @change="proView">
                    </div>
                </div>
            </form>
            <div class="form-group">
                <button class="btn btn-primary" @click="update">完成</button>
                <button class="btn" @click="">取消</button>
            </div>
        </div>
    </div>
</template>
<script>   
    import Config from '../../model/Config.js'
    import filmyBucket from '../../model/qiniu-bucket.js'

    const swalp = (...args) => { 
        return new Promise(resolve => { 
            swal(...args, (...argv) => {
                resolve(...argv)
            }) 
        }) 
    }

    export default {
        name: 'SettingPage',
        data(){
            return {
                config: {},
                proViewURL: ''             
            }
        },
        mounted(){
            this.$nextTick(function (){
                Config.load(true).then(config => {
                    this.proViewURL = config.background
                    this.config = config
                })

                
            })
        },
        methods: {
            proView(){
                const coverFile = this.$refs.cover.files[0]
                if(!coverFile) {
                    this.proViewURL = this.config.background
                    return 
                }
                if(window.File && window.FileList && window.FileReader && window.Blob){
                    if(coverFile){
                        let reader = new FileReader()
                        reader.readAsDataURL(coverFile)
                        reader.onload = arg => this.proViewURL = arg.target.result
                    }
                }else{
                    swal("该浏览器暂不支持图片预览")
                }
            },
            update(){
                swalp({ 
                    title: '请输入管理员密码', 
                    type: 'input', inputType: 'password', 
                    showCancelButton: true, 
                    closeOnConfirm: false,
                    animation: "slide-from-top", 
                    showLoaderOnConfirm: true 
                })
                .then(password => {
                    return new Promise((resolve,reject) => {
                        debugger
                        if(this.$refs.cover.files.length === 0 ){
                            return resolve([this.config.background, password])
                        }
                        filmyBucket.fetchPutToken(password)
                            .then(putToken => {
                                let key = `asssets/gb-${Math.random().toString(32).substr(2)}`
                                return filmyBucket.putFile(key, this.$refs.cover.files[0], {putToken})
                            })
                            .then(key => {
                                return resolve([filmyBucket.key(key).url(), password])
                            })
                            .catch(() => reject(console.log('Admin Password Error')))
                    })
                })
                .then(([bgUrl, password]) => {
                    this.config.background = bgUrl
                    return new Promise(resolve => {
                        console.log(this.config)
                        Config.setConfig(this.config)
                        return resolve(password)
                    })
                })
                .then(password => Config.update(password))
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
<style>
    #config {
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
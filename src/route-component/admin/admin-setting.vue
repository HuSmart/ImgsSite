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
                    <textarea class="form-control" id="subtitle" rows="7" v-model="config.subtitle"></textarea>
                </div>

                <label for="background">背景图片</label>
                <div class="form-group" style="overflow: hidden">
                    <label class="col-sm-2 control-label"><input type="radio" value="url" name="background" v-model="config.background"> URL</label>
                    <div class="col-sm-10">
                        <input type="url" class="form-control" v-model="config.background_url">
                    </div>

                    <label class="col-sm-2 control-label"><input type="radio" value="file"  name="background" v-model="config.background">上传背景图片</label>

                    <div class="col-sm-10">
                        <input type="file" ref="backgroundfile">
                    </div>
                    <!--增加一个预览的窗口好了-->
                </div>
            </form>
        </div>
    </div>
</template>
<script>   
    export default {
        name: 'SettingPage',
        data(){
            return {
                config: {}                
            }
        }
    }
</script>
<style>
    #config {
        width: 900px;
        margin: 0 auto;
    }
</style>
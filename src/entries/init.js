import Vue from 'vue'

import filmyBucket from '../model/qiniu-bucket'
import Config from '../model/Config'
import SimpleModel from '../lib/simple-model'

new Vue({
    el: '#init',
    data: {
        ak: '',
        sk: '',
        password: '',

        title: '',
        subtitle: '',
        background: 'url',
        background_url: ''
    },
    mounted() {
        Config.load(true)
            .then(config => {
                // 如果没有初始化就return
                if (!config) {
                    return
                }
                const url = `${location.protocol}//${location.host}`
                SimpleModel(
                    '提示',
                    '应用已经初始化，确定后跳转到主页面.',
                    `<a href="${url}/index.html" class="btn btn-primary" role="button">确定</a>`
                )
                this.$el.remove()
            })
    },
    methods: {
        reset() {
            this.ak = ''
            this.sk = ''
            this.password = ''
            this.title = ''
            this.subtitle = ''
            this.background = 'url'
            this.background_url = ''
        },
        submit(evt) {
            new Button(evt.target, 'loading')
            const ak = this.ak
            const sk = this.sk
            filmyBucket.fetchPutToken(this.password, null, { ak, sk })
                // 上传双key配置文件
                .then(putToken => {
                    const fileData = new Blob([JSON.stringify({ ak, sk })], { type: 'application/json' })
                    fileData.name = `secret-${this.password}.json`
                    return filmyBucket.putFile(fileData.name, fileData, { putToken })
                        .then(() => putToken)
                })
                .then(putToken => {
                    switch (this.background) {
                        case 'url':
                            return this.background_url
                        case 'file':
                            const file = this.$refs.backgroundfile.files[0]
                            if (!file) {
                                throw new Error('请选择图片！ ')
                            }
                            const key = `assets/gb-${Math.random().toString(32).substr(2)}`
                            // 上传用户选择的文件到七牛
                            return filmyBucket.putFile(key, file, { putToken })
                                .then(() => {
                                    const asset = filmyBucket.key(key)
                                    return asset.url()
                                })
                    }
                })
                .then(backgroundUrl => {
                    const config = {
                        title: this.title,
                        description: this.subtitle,
                        background: backgroundUrl
                    }
                    return Config.update(this.password, config, true)
                })
                .then(() => {
                    const url = `${location.protocol}//${location.host}`
                    const adminUrl = url + '/admin/index.html'

                    SimpleModel(
                        '初始化完成',
                        '你的应用已经可以使用',
                        `
                            <a href=${url}/index.html class="btn btn-primary" role="button">前往首页</a>
                            <a href=${adminUrl} class="btn" role="button">前往管理员工具</a>
                        `
                    )
                })
                .catch(err => {
                    new Button(evt.target, 'reset')
                    SimpleModel(
                        '错误',
                        err.message,
                        `
                            <button class="btn btn-primary" role="button">确定</button>
                        `
                    )
                })
        }
    }
})
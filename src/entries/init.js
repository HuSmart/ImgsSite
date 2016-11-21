import Vue from 'vue'

import filmyBucket from '../model/qiniu-bucket'
import Config from '../model/Config'

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
    }
})
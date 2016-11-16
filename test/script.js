import filmyBucket from '../src/model/qiniu-bucket'

const Config = {
    load() {
        //  getFile成功可以从七牛云上获取文件
        return filmyBucket.getFile('config.json')
    }
}

export default Config
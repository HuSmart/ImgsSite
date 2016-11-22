import qiniu from 'qiniu.js'
import crypto from 'crypto'

var qiniuBucketUrl = 'http://ogmecb8k1.bkt.clouddn.com';

/**
 * location.protocol  获取Hppt Or Hppts
 * location.host    获取域名，如www.baidu.com
 */
const filmyBucket = qiniu.bucket('filmydemo', {
    url: (qiniuBucketUrl ? qiniuBucketUrl : `${location.protocol}//${location.host}`)
})

/**
 * 从本地获取双key
 * 
 * @param {any} pswd
 * @returns
 */
function getKeys(pswd) {
    const key = filmyBucket.getFile(`secret-${pswd}.json`).then(body => JSON.parse(body))
    return key
}

/**
 * 生成qiniu的上传凭证
 * 
 * @param {any} password
 * @param {any} [keys=null]
 * @param {any} [returnBody=null]
 * @returns
 */
filmyBucket.fetchPutToken = function (password, key = null, keys = null, returnBody = null) {
    return (keys ? Promise.resolve(keys) : getKeys(password))
        .then(keys => {
            const options = {
                scope: 'filmydemo' + (key ? `:${key}` : ''),
                deadline: Math.floor(Date.now() / 1000) + 3600,
            }
            if (returnBody) {
                options.returnBody = returnBody
            }

            const singture = safeEncode(JSON.stringify(options))

            const encodeDigest = encodeSign(singture, keys.sk)

            const token = `${keys.ak}:${encodeDigest}:${singture}`

            return token
        })
}

/**
 * 进行BASE64位安全编码
 * 
 * @param {any} str
 * @returns
 */
function safeEncode(str) {
    return btoa(str).replace(/\//g, '_').replace(/\+/g, '-')
}

/**
 * HMAC-SHA1签名
 * 
 * @param {any} str
 * @param {any} key
 * @returns
 */
function encodeSign(str, key) {
    return crypto
        .createHmac('sha1', key)
        .update(str)
        .digest('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
}

export default filmyBucket
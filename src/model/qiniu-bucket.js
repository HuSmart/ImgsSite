import qiniu from 'qiniu.js'
import crypto from 'crypto'

var qiniuBucketUrl=null;

/**
 * location.protocol  获取Hppt Or Hppts
 * location.host    获取域名，如www.baidu.com
 */
const filmyBucket = qiniu.bucket('filmybucket',{
    url:(qiniuBucketUrl ? qiniuBucketUrl : `${location.protocol}//${location.host}`)
})

function getKeys(pswd){
    return filmyBucket.getFile(`secret-${pswd}.json`).then(body => JSON.parse(body))
}

filmyBucket.fetchPutToken=function(password,keys=null, returnBody = null){
    return (keys ? Promise.resolve(keys) : getKeys(password))
        .then(keys => {
            const options = {
                scope: 'filmy',
                deadline: Math.floor(Date.now() / 1000) +3600 ,
                insertOnly: 1
            }

            if (returnBody){
                options.returnBody=returnBody
            }

            const singture = safeEncode(JSON.stringify(options))

            const encodeDigest = encodeSign(singture,keys.sk)

            const token =`${keys.ak}:${encodeDigest}:${singture}`

            return token
        })
}

function safeEncode(str){
    return btoa(str).replace(/\//g,'_').replace(/\+/g,'-')
}

function encodeSign(str,key){
    return crypto.createHmac('sha1',key).update(str)
                .digest('base64').replace(/\//g,'_').replace(/\+/g,'-')
}

export default filmyBucket
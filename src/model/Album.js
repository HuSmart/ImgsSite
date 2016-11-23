/**
 * 相册数据Model
 */

import filmyBucket from './qiniu-bucket'
import Model from 'min-model'
import min from 'min'

Model.use(min)

const Album = Model.extend('album', {
    title: String,
    content: String,
    category: String,
    created_at: Number,
    photos: Array
})
let ready = false

export default Album

/**
 * 对数据进行载入
 * 
 * @returns 相册信息
 */
Album.load = function () {
    return Album.allInstances()
        .then(albums => {
            if (albums.length > 0) {
                ready = true
                return albums
            } else {
                return filmyBucket.getFile('fig/albums.json?v=0004')
                    .then(albums => JSON.parse(albums))
            }
        })
        .then(albums => {
            return Promise.all(
                albums.map(album => {
                    if (!ready) {
                        return new Promise(resolve => {
                            const _album = new Album(album._key, album)
                            _album.once('ready', () => resolve(_album))
                        })
                    } else {
                        return album
                    }
                })
            )
        })
}

Album.loadIfNotInit = function () {
    if (!ready) {
        return Album.load()
    } else {
        return Promise.resolve()
    }
}

/**
 * 检索出指定分类下的相册信息
 * 
 * @param {any} categoryName
 * @returns
 */
Album.fetchByCategory = function (categoryName) {
    return Album.loadIfNotInit()
        .then(() => Album.search('category', categoryName))
        .then(albums => albums.sort((a, b) => {
            return a.getCacheData().created_at < b.getCacheData().created_at
        }))
}

Album.saveToCloud = (password) => {
    if (typeof password !== 'string') {
        throw new TypeError('Password must type of string ')
    }
    debugger
    filmyBucket.fetchPutToken(password, 'fig/albums.json')
        .then(putToken => {
            return Album.dump().then(data => [data, putToken])
        })
        .then(([albums, putToken]) => {
            let fileData = new Blob([JSON.stringify(albums)], { type: 'application/json' })
            fileData.name = 'fig/albums.json'
            return filmyBucket.putFile(fileData.name, fileData, { putToken })
        })
}
import filmyBucket from './qiniu-bucket'
import min from 'min'
import store from './store'

const STORE_KEY = 'filmh:config'

const Config = {
    load(silent = false) {
        return store.exists(STORE_KEY)
            .then(exists => {
                if (exists) {
                    return store.hgetall(STORE_KEY)
                } else {
                    return filmyBucket.getFile('fig/config.json?v=0002')
                        .then(body => JSON.parse(body))
                        .then(data => {
                            try {
                                store.saves(STORE_KEY, data)
                            } catch (err) {
                                console.log(err)
                            }
                            return data
                        })
                }
            })
            .catch(error => {
                if (!silent)
                    alert('You must init Filmy with the administrator tools.')
            })

    },
    /**
     * 
     * 
     * @param {any} passward
     * @param {any} [update={}]
     * @param {boolean} [slient=false]
     */
    update(passward, update = {}, slient = false) {
        if (typeof passward !== 'string') {
            throw new TypeError('密码必须为字符串')
        }
        return filmyBucket.fetchPutToken(passward, 'fig/config.json')
            .then(potToken => {
                return Config.load(slient)
                    .then(oldConfig => [oldConfig, potToken])
            })
            .then(([config, potToken]) => {
                config = config || {}
                for (let key of Object.keys(update)) {
                    config[key] = update[key]
                }
                const fileData = new Blob([JSON.stringify(config)], { type: 'application/json' })
                fileData.name = 'fig/config.json'
                return filmyBucket.putFile(
                    fileData.name,
                    fileData,
                    { putToken: potToken }
                )
            })
    }
}

export default Config
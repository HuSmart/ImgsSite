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

    }
}


export default Config
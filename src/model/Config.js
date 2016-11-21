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
    update(passward, update = {}, slient = false) {
        let ak = "KC-NO2QCvQDlC3FIDI4MjZtCVNC-b8IjNSJnPAQ0"
        let sk = "e9znBE9nZhPMlKjS0Ted0LZOt9d01GsNNYUtxVyK"
        filmyBucket.fetchPutToken("password", null, { ak, sk })
            .then(putToken => {
                const fileData = new Blob([JSON.stringify({ ak, sk })], { type: 'application/json' })
                fileData.name = 'secret-demo.json'
                fileData['bb'] = "no bb"
                return filmyBucket.putFile(fileData.name, fileData, { putToken })
                    .then(() => {
                        console.log('success')
                    })
                    .catch(() => {
                        console.log('fail')
                    })
            })
    }
}

export default Config
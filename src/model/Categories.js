import filmyBucket from './qiniu-bucket'
import Model from 'min-model'
import min from 'min'

Model.use(min)

const Category = Model.extend('category', {
    title: String,
    name: String,
    subtitle: String,
    cover: String
})

let ready = false

Category.load = function () {
    return Category.allInstances()
        .then(categories => {
            if (categories.length > 0) {
                ready = true
                return categories
            } else {
                return filmyBucket.getFile('fig/categories.json')
                    .then(body => JSON.parse(body))
            }
        })
        .then(categories => {
            return Promise.all(
                categories.map(category => {
                    if (!ready) {
                        return new Promise(resolve => {
                            const _category = new Category(category._key, category)
                            _category.once('ready', () => resolve(_category))
                        })
                    } else {
                        return category
                    }
                })
            )
        })
        .then(categories => categories.sort((a, b) =>
            a.getCacheData().created_at < b.getCacheData().created_at
        ))
        .catch(error => [])

}

Category.loadIfNotInit = function () {
    if (!ready) {
        return Category.load()
    } else {
        return Promise.resolve()
    }
}

Category.saveToCloud = (password) => {
    if (typeof password !== 'string'){
        throw new TypeError('Password must type of String ')
    }
    return filmyBucket.fetchPutToken(password,'fig/categories.json')
        .then(putToken => {
            return Category.dump().then(data => [data, putToken])
        })
        .then(([data, putToken]) => {
            let file = new Blob([JSON.stringify(data)], {type:'application/json'})
            file.name='fig/categories.json'
            return filmyBucket.putFile(file.name,file,{putToken})
        })
}

export default Category
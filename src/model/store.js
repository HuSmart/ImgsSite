// 自己封装一个工具方法把

const store = {}
export default store
/**
 * 判定key在localstore中是否存在
 * 
 * @param {String} key
 * @returns {Promise}
 */
store.exists = function (key) {
    const promise = new Promise((resolve, reject) => {
        if (!localStorage.getItem(key)) {
            resolve(false)
        } else {
            // 应该还要判断服务器上的内容是否有更新，加个标志好了
            resolve(true)
        }
    })
    return promise
}

/**
 * 保存数据到localstore
 * 
 * @param {String} key
 * @param {JSON} data
 */
store.saves = function (key, data) {
    localStorage.removeItem(key)

    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 从localstore获取数据
 * 
 * @param {any} key
 * @returns
 */
store.hgetall = function (key) {
    return JSON.parse(localStorage.getItem(key))
}

store.search = function (key) {

}


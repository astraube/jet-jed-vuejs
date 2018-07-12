/**
 * Mocking client-server processing
 */
const _jedis = [
    {"id": 1, "name": "Jheni", "planet": 1, "status":0, "master":"Andre", "created_at": "2018-07-11", "updated_at": "2018-07-11"},
    {"id": 2, "name": "Andre", "planet": 2, "status":0, "master":"Straube", "created_at": "2018-07-11", "updated_at": "2018-07-11"},
    {"id": 3, "name": "Lucas", "planet": 0, "status":1, "master":"Andre Straube", "created_at": "2018-07-11", "updated_at": "2018-07-11"}
]

export default {
    getJedis(cb) {
        setTimeout(() => cb(_jedis), 1000)
    },

    addJedi(jediItem, cb) {
        setTimeout(() => {
            // TODO - o ID deve vir do servidor
            let index = _jedis.length
            jediItem.id = index + 1

            _jedis.push(jediItem)

            cb()

        }, 1000)
    },

    removeJedi(jediItem, cb) {
        setTimeout(() => {
            // TODO -
            _jedis.splice(_jedis.indexOf(jediItem), 1)

            cb()

        }, 1000)
    },

    updateJedi(jediItem, cb) {
        setTimeout(() => {
            // TODO - logica deve estar no back
            _jedis.map(function(jedi) {
                if (jedi.id == jediItem.id) {
                    jedi.name = jediItem.name
                    jedi.planet = jediItem.planet
                    jedi.status = jediItem.status
                    jedi.master = jediItem.master
                }
            });

            cb()

        }, 1000)
    }
}
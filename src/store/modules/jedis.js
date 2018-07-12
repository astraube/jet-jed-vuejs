import jedi from "@/api/jedi";

export default {
    namespaced: true,

    state: {
        items: [],
        planets: ['Coruscant', 'Tatooine', 'Jakku', 'Dagobah', 'Kamino', 'Mustafar', 'Yavin 4', 'Naboo', 'Endor', 'Alderaan'],
        jedisStatus: ['Youngling', 'Padawan', 'Cavaleiro Jedi', 'Mestre Jedi','Grande Mestre Jedi']
    },

    getters: {
        countJedis (state, getters) {
            return state.items.length
        },
        getPadawans (state, getters) {
            return state.items.filter(jedi => jedi.status == 0)
        },
        getMestres (state, getters) {
            return state.items.filter(jedi => jedi.status == 1)
        },
    },

    mutations: {
        pushJedi (state, params) {
            jedi.addJedi(
                params.jedi,
                params.resolve
            )
        },

        editJedi(state, params) {
            jedi.updateJedi(
                params.jedi,
                params.resolve
            )
        },

        removeJedi(state, params) {
            jedi.removeJedi(
                params.jedi,
                params.resolve
            )
        },

        setJedis (state, jedis) {
            // update jedis
            state.items = jedis
        },
    },

    actions: {
        storeJedi({commit}, jedi) {
            return new Promise((resolve, reject) => {
                let id = jedi.id
                let isNewEntry = (typeof(id) != 'undefined' && id != '' && id != null) ? false : true;

                if (isNewEntry)
                    commit('pushJedi', {"resolve" : resolve, "reject" : reject, "jedi" : jedi})
                else
                    commit('editJedi', {"resolve" : resolve, "reject" : reject, "jedi" : jedi})

            })
        },
        editJedi({commit}, jedi) {
            return new Promise((resolve, reject) => {
                commit('editJedi', {"resolve" : resolve, "reject" : reject, "jedi" : jedi})
            })
        },
        removeJedi({state, getters, commit}, jedi) {
            return new Promise((resolve, reject) => {
                commit('removeJedi', {"resolve" : resolve, "reject" : reject, "jedi" : jedi})
            })
        },

        fetchJedis({commit}) {
            return new Promise((resolve, reject) => {
                // make the call
                // call setJedis mutation
                jedi.getJedis(jedis => {
                    commit('setJedis', jedis)
                    commit('dashboard/setJedis', jedis, {root: true})
                    resolve()
                })
            })
        }
    }
}
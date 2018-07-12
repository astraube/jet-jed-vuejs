import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import dashboard from './modules/dashboard'
import jedis from './modules/jedis'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dashboard,
        jedis
    },

    state: { // = data

    },

    getters: { // = computed properties

    },

    actions,

    mutations: {

    }
})
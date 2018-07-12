import jedi from "@/api/jedi";

export default {
    namespaced: true,

    state: {
        jediItems: [],
    },

    getters: {
        getJedisStatus(state, getters, rootState) {
            return rootState.jedis.jedisStatus
        },
        getPlanets(state, getters, rootState) {
            return rootState.jedis.planets
        },
        totalByStatus(state, getters) {
            /* exemplo
             let d= [
             {"name":"Padawan","value":1,"color":"rgba(42, 178, 123, 0.32)"},
             {"name":"Mestre Jedi","value":1,"color":"rgba(0, 0, 0, 0.32)"}
             ];
             */

            let jedisStatus = getters.getJedisStatus
            let newStatus = {}

            state.jediItems.forEach(function(entry) {
                let val = entry.status
                let s = jedisStatus[val]

                let value = (newStatus[val]) ? newStatus[val].value : 0;
                newStatus[val] = {
                    name: s,
                    value: ++value,
                    color: ""
                };
            });
            return newStatus;
        },
        totalByPlanets(state, getters) {
            let planets = getters.getPlanets
            let newStatus = {}

            state.jediItems.forEach(function(entry) {
                let val = entry.planet
                let s = planets[val]

                let value = (newStatus[val]) ? newStatus[val].value : 0;
                newStatus[val] = {
                    name: s,
                    value: ++value,
                    color: ""
                };
            });
            return newStatus;
        }
    },

    mutations: {
        setJedis (state, jedis) {
            // update jediItems
            state.jediItems = jedis
        },
    },

    actions: {

    }
}
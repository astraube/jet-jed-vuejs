<template>
    <div>
        <el-row :gutter="20">

            <el-col :span="12">
                <portlet-pie-chart
                        title="Jedis por Planetas"
                        :chart-data="chartDataPlanet">
                </portlet-pie-chart>
            </el-col>

            <el-col :span="12">
                <portlet-pie-chart
                        title="Jedis por Status"
                        :chart-data="chartDataStatus">
                </portlet-pie-chart>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    import Vue from 'vue'

    import PortletPieChart from './portlets/PortletPieChart.vue'
    Vue.component('portlet-pie-chart', PortletPieChart)

    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                errors: [],

                chartDataPlanet: [],
                chartDataStatus: []
            }
        },
        computed: {
            ...mapState('dashboard', {

            }),
            ...mapGetters('dashboard', {
                totalByStatus: 'totalByStatus',
                totalByPlanets: 'totalByPlanets',
                getJedis: 'getJedis',
            }),
        },
        created () {
            let _this = this

            _this.fetchJedis()
                .then(() => {
                    // metodos para executar depois que os dados foram carregados
                    this.chartDataPlanet = this.totalByPlanets
                    this.chartDataStatus = this.totalByStatus
                })
        },
        methods: {
            //...mapActions('dashboard', ['checkout']),
            ...mapActions({
                fetchJedis: 'jedis/fetchJedis'
            }),

        }
    }
</script>

<style scoped>

</style>
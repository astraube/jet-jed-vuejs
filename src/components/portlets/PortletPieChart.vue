<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px;" v-loading="loading">
            <div slot="header" class="clearfix">
                <span>{{ title }}</span>
            </div>
            <div style="margin-bottom: 10px; text-align: left;">
                <pie-chart  v-if="showChart" :chart-data="loadData"></pie-chart>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Vue from 'vue'

    import PieChart from '../charts/PieChart.vue'
    Vue.component('pie-chart', PieChart)

    export default {
        props: {
            title: '',
            chartData: null
        },
        data() {
            return {
                loading: true,
                showChart: true,
            }
        },
        computed: {
            loadData() {
                let _this = this;
                let cData = [];

                _this.loading = true

                try {
                    let data = _this.chartData;

                    Object.entries(data).forEach(([key, val]) => {
                        cData.push(val);
                    });

                    if (!_this.isEmpty(cData)) {
                        _this.loading = false
                    }
                    _this.showChart = true

                } catch(ex) {}

                return cData;
            },
        }
    }
</script>

<style scoped>

</style>
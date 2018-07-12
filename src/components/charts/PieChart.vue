<template>
    <div>
        <figure>
            <chart
                    :options="options"
                    :init-options="initOptions"
                    theme="macarons"
                    auto-resize />
        </figure>
    </div>
</template>

<script>
    import Vue from 'vue'

    /**
     * echarts
     */
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/title'
    Vue.component('chart', ECharts)
    import 'echarts/theme/macarons'

    export default {
        props: {
            chartData: null
        },
        data() {
            return {
                errors: [],

                colors: {
                    normal: '#cccccc',
                    contrast: '#bbbbbb',
                    loading: '#ffffff',
                    loadingMask: '#323b444f',
                },
                type: 'pie',
                initOptions: {
                    renderer: 'svg'
                },
            }
        },
        computed: {
            options() {
                let _this = this;

                return {
                    title: {
                        text: '',
                        x: 'center',
                        textStyle: {
                            color: _this.colors.normal
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: _this.chartData.map(({name}) => name),
                        textStyle: {
                            color: _this.colors.contrast
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)',
                    },
                    series: [
                        {
                            name: '',
                            type: _this.type,
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: _this.chartData.map(({name, value}) => {
                                return {name, value}
                            }),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
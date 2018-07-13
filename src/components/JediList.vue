<template>
    <div>
        <el-card class="box-card" style="margin-top: 10px;">
            <div style="margin-bottom: 10px; text-align: left;">
                <div class="row">
                    <div class="col-sm-6">
                        <el-button @click="dialogJediVisible = true" type="info">Novo Jedi</el-button>
                        <el-button @click="bulkDelete" type="danger" v-if="multipleSelection.length > 0">Remover Selecionados</el-button>
                    </div>

                    <div class="col-sm-2">
                        <el-select v-model="filteredData[1].value" placeholder="Status" multiple="multiple">
                            <el-option v-for="(item, index) in jedisStatus" :label="item" :key="index" :value="index"></el-option>
                        </el-select>
                    </div>
                    <div class="col-sm-2">
                        <el-select v-model="filteredData[2].value" placeholder="Planetas" multiple="multiple">
                            <el-option v-for="(item, index) in planets" :label="item" :key="index" :value="index"></el-option>
                        </el-select>
                    </div>
                    <div class="col-sm-2">
                        <el-input placeholder="Buscar" v-model="filteredData[0].value"></el-input>
                    </div>
                </div>
            </div>

            <data-tables
                    ref="singleTable"
                    :data="jedis"
                    :action-col="actionCol"
                    :filters="filteredData"

                    :total="total"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    :pagination-props="{ background: true, pageSizes: [10, 20, 50, 100] }"

                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"
                                 width="55"
                                 align="center">
                </el-table-column>

                <el-table-column v-for="col in columns"
                                 :prop="col.prop"
                                 :key="col.prop"
                                 :label="col.label"
                                 :width="col.width"
                                 sortable="custom"
                                 align="center">
                </el-table-column>

                <el-table-column
                        prop="status"
                        key="status"
                        label="Status"
                        sortable="custom"
                        align="center">
                    <template slot-scope="scope">
                        {{ scope.row.status | filterStatus }}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="master"
                        key="master"
                        label="Mestre"
                        sortable="custom"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="planet"
                        key="planet"
                        label="Planeta"
                        sortable="custom"
                        align="center">
                    <template slot-scope="scope">
                        {{ scope.row.planet | filterPlanet }}
                    </template>
                </el-table-column>

            </data-tables>
        </el-card>


        <!-- Form -->
        <el-dialog title="Registro de Jedi" :visible.sync="dialogJediVisible" >

            <el-form ref="entryJediForm" :model="formJedi" :rules="formJediRules" style="text-align: left" label-width="100px" >

                <el-form-item label="Nome" prop="name" >
                    <el-input v-model="formJedi.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="Status" prop="status" >
                            <el-select v-model="formJedi.status" placeholder="Selecione o status">
                                <el-option v-for="(item, index) in jedisStatus" :label="item" :key="index" :value="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Planeta" prop="planet" >
                            <el-select v-model="formJedi.planet" placeholder="Selecione o planeta">
                                <el-option v-for="(item, index) in planets" :label="item" :key="index" :value="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="Mestre" prop="master" >
                    <el-input v-model="formJedi.master" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item >
                    <el-button type="primary" @click="onSubmitForm('entryJediForm')">Submit</el-button>
                    <el-button @click="onResetForm('entryJediForm')">Reset</el-button>
                </el-form-item>

            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'

    import DataTables from 'vue-data-tables'
    Vue.use(DataTables)

    var validateForm = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Esse campo é obrigatorio'));
        } else {
            callback();
        }
    };

    import Jedi from '../models/jedi'
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        data () {
            return {
                errors: [],

                dialogJediVisible: false,
                formJedi: {
                    name: '',
                    status: '',
                    planet: '',
                    master: '',
                },
                formJediRules: {
                    name: [
                        { validator: validateForm, trigger: ['blur', 'change'] }
                    ],
                    status: [
                        { validator: validateForm, trigger: ['blur', 'change'] }
                    ],
                    planet: [
                        { validator: validateForm, trigger: ['blur', 'change'] }
                    ],
                    master: [
                        { validator: validateForm, trigger: ['blur', 'change'] }
                    ]
                },

                total: 0,
                currentPage: 1,
                pageSize: 20,

                columns: [],
                columnsId: [],
                columnsNames: [],

                filteredData: [
                    {
                        value: '',
                        prop: ['id', 'name', 'master'],
                    },
                    {
                        value: '',
                        prop: 'status',
                    },
                    {
                        value: '',
                        prop: 'planet',
                    }
                ],

                actionCol: {
                    props: {
                        label: 'Ações',
                        align: 'center'
                    },
                    buttons: [
                        /*{
                            props: {
                                type: 'info',
                                icon: 'el-icon-search',
                                size: 'mini'
                            },
                            label: '',
                            handler: row => {
                                this.rowOpen(row)
                            }
                        },*/
                        {
                            props: {
                                type: 'primary',
                                icon: 'el-icon-edit',
                                size: 'mini'
                            },
                            label: '',
                            handler: row => {
                                this.rowEdit(row)
                            }
                        },
                        {
                            props: {
                                type: 'danger',
                                icon: 'el-icon-delete',
                                size: 'mini'
                            },
                            label: '',
                            handler: row => {
                                this.rowDelete(row)
                            },
                        }
                    ]
                },
                multipleSelection: []
            }
        },
        filters: {
            filterStatus(value) {
                // TODO - deve vir de jedis.js
                let jedisStatus = ['Youngling', 'Padawan', 'Cavaleiro Jedi', 'Mestre Jedi','Grande Mestre Jedi']
                let label = jedisStatus[value];
                return label;
            },
            filterPlanet(value) {
                // TODO - deve vir de jedis.js
                let planets = ['Coruscant', 'Tatooine', 'Jakku', 'Dagobah', 'Kamino', 'Mustafar', 'Yavin 4', 'Naboo', 'Endor', 'Alderaan']
                let label = planets[value];
                return label;
            },
            filterDate(value) {
                return Vue.prototype.$appFormatters.formatDate(value);
            },
        },
        computed: {
            ...mapState({
                jedis: state => state.jedis.items,
                jedisStatus: state => state.jedis.jedisStatus,
                planets: state => state.jedis.planets,
            }),
            ...mapGetters('jedis', {
                countJedis: 'countJedis',
                getPadawans: 'getPadawans',
                getMestres: 'getMestres',
            })
        },
        created () {
            let _this = this

            _this.dialogVisible = true

            _this.onShowLoading(true)

            _this.fetchColumns()

            _this.fetchJedis()
                .then(() => _this.onShowLoading( false ) )
        },
        methods: {
            // Metodo 1 para declarar as Actions
            ...mapActions('jedis', ['fetchJedis', 'storeJedi', 'editJedi', 'removeJedi']),
            /*
            /*
            // Metodo 2 para declarar as Actions
            ...mapActions({
                fetchJedis: 'jedis/fetchJedis',
                storeJedi: 'jedis/storeJedi',
                editJedi: 'jedis/editJedi',
                dashTest: 'dashboard/test'
            }),
            */

            handleClose(done) {
                this.$confirm('Are you sure to close this dialog?')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            fetchColumns() {
                this.columns = [
                    {
                        prop: 'id',
                        label: '#',
                        width: '80',
                    },
                    {
                        prop: 'name',
                        label: 'Nome',
                        width: '',
                    }
                ];
                var i = [];
                var n = [];
                this.columns.forEach(function (col) {
                    i.push(col.prop)
                    n.push(col.label)
                });
                this.columnsNames = n;
                this.columnsId = i;
            },

            onSubmitForm(formName) {
                let _this = this;

                _this.$refs[formName].validate((valid) => {
                    if (valid) {

                        _this.onShowLoading( true )

                        let model = new Jedi({
                            id: (_this.formJedi.id) ? _this.formJedi.id : '',
                            name: _this.formJedi.name,
                            planet: _this.formJedi.planet,
                            status: _this.formJedi.status,
                            master: _this.formJedi.master,
                        })
                        _this.storeJedi(model)
                            .then(() => {
                                _this.onShowLoading( false )
                                _this.$message.success('Registro Salvo!')
                            })

                        _this.dialogJediVisible = false

                        _this.onResetForm(formName)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onResetForm(formName) {
                this.$refs[formName].resetFields();
                this.formJedi = {
                    name: '',
                    status: '',
                    planet: '',
                    master: '',
                }
            },

            rowOpen(row) {

            },
            rowEdit(row) {
                this.formJedi.id = row.id
                this.formJedi.name = row.name
                this.formJedi.planet = row.planet
                this.formJedi.status = row.status
                this.formJedi.master = row.master

                this.dialogJediVisible = true
            },
            onDeleteRow(row) {
                let _this = this;

                _this.removeJedi(row)
                    .then(() => {
                        _this.onShowLoading( false )
                        _this.$message.success('Registro removido!')
                    })
            },
            rowDelete(row) {
                let _this = this;

                _this.onShowLoading( true )

                _this.$alert('Deseja realmente <strong>remover</strong> esse registro?', 'Remover Jedi', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    type: 'warning'
                }).then(() => {
                    _this.onDeleteRow(row)

                }).catch(() => {

                });
            },
            bulkDelete() {
                let _this = this;

                _this.onShowLoading( true )

                _this.$alert('Deseja realmente <strong>remover</strong> todos esses registros?', 'Remover Jedi', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    type: 'warning'
                }).then(() => {
                    _this.multipleSelection.map(row => {
                        _this.onDeleteRow(row)
                    })

                }).catch(() => {

                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style scoped>

</style>
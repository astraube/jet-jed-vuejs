import Vue from 'vue'

import './helper';


/*******************************************************************
 * ElementUI
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
locale.use(lang)
/*******************************************************************/

Vue.config.productionTip = false

import formatters from './common/Formatters';
Vue.use(formatters);

/**
 * Global Loading
 */
Vue.prototype.elLoading = null;
Vue.prototype.onShowLoading = function (display, text = 'Aguarde...') {
    if (!display && !Vue.prototype.isEmpty(Vue.prototype.elLoading)) {
        this.$nextTick(() => {
            Vue.prototype.elLoading.close();
        });
    } else {
        Vue.prototype.elLoading = Vue.prototype.$loading({
            lock: display,
            text: text,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
};

/**
 * axios
 */
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * moment
 */
import moment from 'moment';
window.moment = moment;
/**
 * Config file for rollup.js.
 */

import legacy from '@rollup/plugin-legacy';

export default {
        input: 'assets/js/rd-pagination.js',
        output: {
        file: 'assets/js/rd-pagination.umd.js',
        name: 'RdPagination',
        format: 'umd',
    },
    plugins: [
        legacy({'assets/js/rd-pagination.js': 'RdPagination'})
    ],
};
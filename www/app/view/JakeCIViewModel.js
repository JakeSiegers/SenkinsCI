/*
 * File: app/view/JakeCIViewModel.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('JakeCI.view.JakeCIViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jakeci',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Field'
    ],

    stores: {
        JobStore: {
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'description'
                },
                {
                    name: 'exec'
                },
                {
                    name: 'lastRun'
                },
                {
                    name: 'lastRunError'
                }
            ]
        },
        QueueStore: {
            fields: [
                {
                    name: 'job'
                },
                {
                    name: 'active'
                }
            ]
        }
    }

});
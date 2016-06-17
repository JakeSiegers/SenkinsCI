/*
 * File: app/view/JobHistory.js
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

Ext.define('JakeCI.view.JobHistory', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jobhistory',

    requires: [
        'JakeCI.view.JobHistoryViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'jobhistory'
    },
    height: 614,
    width: 953,
    title: 'Build History',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'gridpanel',
            flex: 1,
            title: '',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: 'String'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'number',
                    text: 'Number'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    text: 'Date'
                },
                {
                    xtype: 'booleancolumn',
                    dataIndex: 'bool',
                    text: 'Boolean'
                }
            ]
        },
        {
            xtype: 'form',
            flex: 1,
            height: 1122,
            width: 819,
            layout: 'fit',
            bodyPadding: 10,
            title: 'Build #',
            items: [
                {
                    xtype: 'textareafield',
                    fieldLabel: '',
                    readOnly: true
                }
            ]
        }
    ],

    getAllHistory: function(job) {
        AERP.Ajax.request({
            url:'/History/getAllHistoryForJob',
            params:{job:job},
            success:function(reply){
                console.log(reply);
            },
            failure:function(){

            },
            scope:this
        });
    }

});
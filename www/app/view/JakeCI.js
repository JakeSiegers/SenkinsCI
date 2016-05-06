/*
 * File: app/view/JakeCI.js
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

Ext.define('JakeCI.view.JakeCI', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.jakeci',

    requires: [
        'JakeCI.view.JakeCIViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'jakeci'
    },
    height: 407,
    width: 692,
    title: 'JakeCI',
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'gridpanel',
            flex: 1,
            height: 214,
            itemId: 'jobGrid',
            width: 400,
            title: '',
            bind: {
                store: '{JobStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 193,
                    dataIndex: 'name',
                    text: 'Job Name'
                },
                {
                    xtype: 'datecolumn',
                    width: 198,
                    dataIndex: 'lastRun',
                    text: 'Last Run'
                },
                {
                    xtype: 'datecolumn',
                    width: 249,
                    dataIndex: 'lastRunError',
                    text: 'Last Error'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: '<i class="fa fa-plus-circle"></i> Add New Job',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            text: '<i class="fa fa-wrench"></i> Settings',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                rowdblclick: 'onJobGridRowDblClick'
            }
        }
    ],
    listeners: {
        render: 'onViewportRender'
    },

    onButtonClick1: function(button, e, eOpts) {
        this.showJobWindow();
    },

    onButtonClick3: function(button, e, eOpts) {
        this.changeState('settings');
    },

    onJobGridRowDblClick: function(tableview, record, tr, rowIndex, e, eOpts) {
        this.showJobWindow();
        this.jobWindow.jobForm.loadJob(record.get('name'));
    },

    onViewportRender: function(component, eOpts) {
        this.getAllJobs();
    },

    getAllJobs: function() {
        this.mask("Loading Jobs...");

        AERP.Ajax.request({
            url:'getAllJobs',
            success:function(result){
                this.unmask();
                this.lookupViewModel().getStore('JobStore').loadData(result.jobs);
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    showJobWindow: function() {
        if(!this.jobWindow){
            var form = Ext.create('widget.jobform',{
                listeners:{
                    scope:this,
                    savejob:function(){
                        this.getAllJobs();
                    }
                }
            });
            var history = Ext.create('widget.jobhistory',{});

            this.jobWindow = Ext.create('Ext.window.Window', {
                resizable: true,
                layout: 'fit',
                closeAction: 'hide',
                title: 'Job Editor',
                liveDrag:true,
                items: Ext.create('Ext.tab.Panel',{
                    items: [form,history]
                })
            });
            this.jobWindow.jobForm = form;
            this.jobWindow.jobHistory = history;
        }
        this.jobWindow.show();
    }

});
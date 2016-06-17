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
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Spacer'
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
            cls: 'jobQueue',
            resizable: true,
            resizeHandles: 'e',
            width: 246,
            collapseDirection: 'right',
            collapsible: true,
            headerPosition: 'right',
            title: 'Job Queue',
            hideHeaders: true,
            bind: {
                store: '{QueueStore}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'job',
                    text: 'Job',
                    flex: 1
                }
            ],
            viewConfig: {
                width: 346
            }
        },
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
                    xtype: 'gridcolumn',
                    width: 198,
                    dataIndex: 'lastRun',
                    text: 'Last Run'
                },
                {
                    xtype: 'gridcolumn',
                    width: 249,
                    dataIndex: 'lastRunError',
                    text: 'Last Error'
                }
            ],
            listeners: {
                rowdblclick: 'onJobGridRowDblClick'
            },
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
                            xtype: 'tbspacer',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            text: '<i class="fa fa-wrench"></i> Jake CI Settings',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        render: 'onViewportRender'
    },

    onJobGridRowDblClick: function(tableview, record, tr, rowIndex, e, eOpts) {
        this.showJobWindow();
        this.jobWindow.jobForm.loadJob(record.get('name'));
        this.jobWindow.jobHistory.getAllHistory(record.get('name'))
    },

    onButtonClick1: function(button, e, eOpts) {
        this.showJobWindow();
        this.jobWindow.jobForm.setState('new');
    },

    onButtonClick3: function(button, e, eOpts) {
        this.showSettingsWindow();
    },

    onViewportRender: function(component, eOpts) {
        this.getAllJobs();



        var sThis = this;
        this.resetIdleTimer();
        this.updateJobQueue();
        setInterval(function(){
            if(!sThis.idle){
                sThis.updateJobQueue();
            }
        },5000);
    },

    getAllJobs: function() {
        this.mask("Loading Jobs...");

        AERP.Ajax.request({
            url:'/Job/getAllJobs',
            success:function(result){
                this.unmask();
                this.lookupViewModel().getStore('JobStore').loadData(result.data);
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
                    addjob:function(){
                        this.getAllJobs();
                    },
                    savejob:function(){
                        this.getAllJobs();
                    },
                    showcredwindow:function(){
                        this.showCredWindow();
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
    },

    showCredWindow: function() {
        if(!this.credWindow){
            var grid = Ext.create('widget.credseditor',{
                listeners:{
                    scope:this,
                }
            });


            this.credWindow = Ext.create('Ext.window.Window', {
                resizable: true,
                layout: 'fit',
                closeAction: 'hide',
                title: 'Saved Credentials',
                liveDrag:true,
                items: grid
            });
            this.credWindow.credGrid = grid;
        }
        this.credWindow.show();
    },

    showSettingsWindow: function() {
        if(!this.settingsWindow){
            var panel = Ext.create('widget.settings',{
                listeners:{
                    scope:this,
                    showcredwindow:function(){
                        this.showCredWindow();
                    }
                }
            });


            this.settingsWindow = Ext.create('Ext.window.Window', {
                resizable: true,
                layout: 'fit',
                closeAction: 'hide',
                title: 'Settings',
                liveDrag:true,
                items: panel
            });
            this.settingsWindow.settingsPanel = panel;
        }
        this.settingsWindow.show();
    },

    resetIdleTimer: function() {
        var sThis = this;
        this.idle = false;
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(function(){
            sThis.idle = true;
        },30000); //If you don't do anything for 30 seconds, stop updating the screen.
    },

    updateJobQueue: function() {
        AERP.Ajax.request({
            url:'/Job/getJobQueue',
            success:function(reply){
                this.lookupViewModel().getStore('QueueStore').loadData(reply.data);
            },
            scope:this
        })
    }

});
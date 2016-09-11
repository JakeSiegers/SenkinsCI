/*
 * File: app/view/JakeCI.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.2.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.2.x Classic. For more
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
        'JakeCI.view.JobGrid',
        'JakeCI.view.JobForm',
        'JakeCI.view.JobHistory',
        'Ext.grid.Panel',
        'Ext.form.Panel'
    ],

    viewModel: {
        type: 'jakeci'
    },
    title: '',
    defaultListenerScope: true,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'jobgrid',
            flex: 1
        },
        {
            xtype: 'jobform',
            disabled: true,
            flex: 1
        },
        {
            xtype: 'jobhistory',
            disabled: true,
            flex: 1
        }
    ],
    listeners: {
        render: 'onViewportRender'
    },

    onViewportRender: function(component, eOpts) {
        this.queryById('jobGrid').getAllJobs();


        var sThis = this;
        this.resetIdleTimer();
        this.updateJobQueue();
        setInterval(function(){
            if(!sThis.idle){
                sThis.updateJobQueue();
            }
        },5000);
    },

    showJobWindow: function(firstFunction) {
        if(!firstFunction){
            firstFunction = function(){};
        }

        if(!this.jobWindow){
            var form = Ext.create('widget.jobform',{
                listeners:{
                    scope:this,
                    docforminitcomplete:function(docForm){
                        firstFunction(docForm);
                    },
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
                resizable: false,
                layout: 'fit',
                closeAction: 'hide',
                title: 'Job Editor',
                items:  Ext.create('Ext.tab.Panel',{
                    items: [form,history]
                }),
                liveDrag:true,
                listeners:{
                    beforeclose: form.docFormWindowBeforeClose
                }
            });
            this.jobWindow.docForm = form;
        }else{
            firstFunction(this.jobWindow.docForm);
        }
        this.jobWindow.show();
        this.jobWindow.focus();
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
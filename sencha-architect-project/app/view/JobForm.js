/*
 * File: app/view/JobForm.js
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

Ext.define('JakeCI.view.JobForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.jobform',

    requires: [
        'JakeCI.view.JobFormViewModel',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'jobform'
    },
    itemId: 'jobPanel',
    width: 629,
    bodyPadding: 10,
    title: 'Job Details',
    trackResetOnLoad: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            margin: '10 0 10 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'button',
                    itemId: 'executeJobBtn',
                    scale: 'large',
                    text: 'Execute Job Now',
                    listeners: {
                        click: 'onExecuteJobBtnClick'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Description',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    labelAlign: 'right',
                    name: 'name'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    labelAlign: 'right',
                    name: 'description'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Source Control',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combobox',
                    flex: 1,
                    maxWidth: 200,
                    fieldLabel: 'Repo Type',
                    labelAlign: 'right',
                    name: 'repoType',
                    editable: false,
                    displayField: 'repoType',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'repoType',
                    bind: {
                        store: '{RepoTypeStore}'
                    }
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    fieldLabel: 'Repo Url',
                    labelAlign: 'right',
                    name: 'repoUrl'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            flex: 1,
                            fieldLabel: 'Credentials',
                            labelAlign: 'right',
                            name: 'repoCredentials',
                            editable: false,
                            displayField: 'cred',
                            forceSelection: true,
                            queryMode: 'local',
                            valueField: 'cred',
                            bind: {
                                store: '{CredStore}'
                            }
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 5',
                            text: 'Edit Creds',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Actions',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Exec',
                    labelAlign: 'right',
                    name: 'exec'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Cron',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Cron Schedule',
                    labelAlign: 'right',
                    name: 'cron'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Email',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    labelAlign: 'right',
                    name: 'email'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'saveJobBtn',
                    text: '<i class="fa fa-floppy-o"></i> Save Job',
                    listeners: {
                        click: 'onButtonClick4'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'newJobBtn',
                    text: '<i class="fa fa-plus"></i> Add New Job',
                    listeners: {
                        click: 'onButtonClick41'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                }
            ]
        }
    ],
    listeners: {
        render: 'onJobPanelRender'
    },

    onExecuteJobBtnClick: function(button, e, eOpts) {
        this.runLoadedJob();
    },

    onButtonClick4: function(button, e, eOpts) {
        this.saveJob();
    },

    onButtonClick41: function(button, e, eOpts) {
        this.addNewJob();
    },

    onButtonClick: function(button, e, eOpts) {
        this.fireEvent('showcredwindow');
    },

    onJobPanelRender: function(component, eOpts) {
        this.loadCreds();
    },

    loadJob: function(jobName) {

        this.mask('Loading Job...');

        AERP.Ajax.request({
            url:'/Job/getJob',
            params:{jobName:jobName},
            success:function(reply){
                this.unmask();
                this.setState('edit');
                this.getForm().setValues(reply.data);
                this.currentJob = reply.data.name;
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    addNewJob: function() {
        this.mask("Adding New Job...");

        AERP.Ajax.request({
            url:'/Job/newJob',
            params:this.getValues(false,false,true,true), //[asString], [dirtyOnly], [includeEmptyText], [useDataValues]
            success:function(reply){
                this.unmask();
                this.loadJob(reply.data.jobName);
                this.fireEvent('addjob');
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    saveJob: function() {
        this.mask('Saving...');
        AERP.Ajax.request({
            url:'/Job/saveJob',
            params:{
                jobName:this.currentJob,
                jobData:Ext.encode(this.getValues(false,false,true,true)) //[asString], [dirtyOnly], [includeEmptyText], [useDataValues
            },
            success:function(reply){
                this.unmask();
                this.getForm().setValues(reply.data);
                this.currentJob = reply.data.name;
                this.fireEvent('savejob');
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    runLoadedJob: function() {
        this.mask('Starting Job...');
        AERP.Ajax.request({
            url:'/Job/runJob',
            params:{
                jobName:this.currentJob,
            },
            success:function(reply){
                this.unmask();
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    setState: function(newState) {
        this.currentState = newState;

        this.currentJob = null;
        this.getForm().getFields().each(function(field){
            field.setValue('');
            field.resetOriginalValue();
        });

        var executeJobBtn = this.queryById('executeJobBtn');
        var newJobBtn = this.queryById('newJobBtn');
        var saveJobBtn = this.queryById('saveJobBtn');

        executeJobBtn.disable();
        newJobBtn.hide();
        saveJobBtn.hide();

        switch(newState){
            case 'new':
                newJobBtn.show();
                break;
            case 'edit':
                executeJobBtn.enable();
                saveJobBtn.show();
                break;
        }
    },

    loadCreds: function() {
        AERP.Ajax.request({
            url:'/Creds/getAllCreds',
            success:function(reply){
                this.lookupViewModel().getStore('CredStore').setData(reply.data);
            },
            failure:function(){

            },
            scope:this
        });
    }

});
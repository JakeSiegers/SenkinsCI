/*
 * File: app/view/Settings.js
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

Ext.define('JakeCI.view.Settings', {
    extend: 'Ext.form.Panel',
    alias: 'widget.settings',

    requires: [
        'JakeCI.view.SettingsViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.form.field.Text'
    ],

    viewModel: {
        type: 'settings'
    },
    height: 369,
    itemId: 'settingsPanel',
    width: 626,
    bodyPadding: 10,
    title: '',
    trackResetOnLoad: true,
    defaultListenerScope: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: '<i class="fa fa-floppy-o"></i> Save',
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
                    text: 'Edit Creds',
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'textfield',
            anchor: '100%',
            fieldLabel: 'Default Email',
            name: 'defaultEmail'
        }
    ],
    listeners: {
        render: 'onSettingsPanelRender'
    },

    onButtonClick1: function(button, e, eOpts) {
        this.saveSettings();
    },

    onButtonClick: function(button, e, eOpts) {
        this.fireEvent('showcredwindow');
    },

    onSettingsPanelRender: function(component, eOpts) {
        this.loadSettings();
    },

    loadSettings: function() {
        this.mask('Loading Settings...');
        AERP.Ajax.request({
            url:'/Settings/getAllSettings',
            success:function(reply){
                this.getForm().setValues(reply.data);
                this.unmask();
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    },

    saveSettings: function() {
        this.mask('Saving...');
        AERP.Ajax.request({
            url:'/Settings/saveSettings',
            params:this.getForm().getValues(false,false,true,false),
            success:function(reply){
                this.getForm().setValues(reply.data);
                this.unmask();
            },
            failure:function(){
                this.unmask();
            },
            scope:this
        });
    }

});
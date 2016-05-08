/*
 * File: app/view/CredsEditor.js
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

Ext.define('JakeCI.view.CredsEditor', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.credseditor',

    requires: [
        'JakeCI.view.CredsEditorViewModel',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Spacer',
        'Ext.grid.plugin.RowEditing'
    ],

    viewModel: {
        type: 'credseditor'
    },
    height: 329,
    width: 657,
    title: '',
    defaultListenerScope: true,

    bind: {
        store: '{CredStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            width: 80,
            dataIndex: 'credId',
            text: 'ID'
        },
        {
            xtype: 'gridcolumn',
            width: 160,
            dataIndex: 'credName',
            text: 'Cred Name',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 183,
            dataIndex: 'username',
            text: 'Username',
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            editRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return "[Hidden]";
            },
            width: 212,
            dataIndex: 'password',
            text: 'Password',
            editor: {
                xtype: 'textfield'
            }
        }
    ],
    viewConfig: {
        width: 590
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add New',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'tbspacer',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'Delete Selected',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'credRowEditing',
            autoCancel: false,
            listeners: {
                edit: 'onRowEditingEdit',
                canceledit: 'onRowEditingCanceledit',
                beforeedit: 'onRowEditingBeforeEdit'
            }
        }
    ],

    onButtonClick: function(button, e, eOpts) {
        if(this.getPlugin('credRowEditing').editing){
            return false;
        }
        this.lookupViewModel().getStore('CredStore').insert(0,{credName:'',userame:'',password:''});
        this.getPlugin('credRowEditing').startEdit(0);
        this.currentState = 'new';
    },

    onButtonClick1: function(button, e, eOpts) {
        console.log('Program Delete Cred');
    },

    onRowEditingEdit: function(editor, context, eOpts) {
        this.currentState = 'edit';
    },

    onRowEditingCanceledit: function(editor, context, eOpts) {
        var record = context.record;
        var rowIdx = context.rowIdx;

        if(this.currentState === "new"){
            this.lookupViewModel().getStore('CredStore').removeAt(rowIdx);
        }
    },

    onRowEditingBeforeEdit: function(editor, context, eOpts) {
        //Don't try and edit anything else if we're already editing something!
        if(this.getPlugin('credRowEditing').editing){
            return false;
        }
    },

    addCred: function() {

    }

});
/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

Ext.onReady(function(){

    var dummyData = [
        [1, '3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
        [2, 'Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
        [3, 'Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
        [4, 'American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
        [5, 'American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
        [6, 'AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
        [7, 'Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
        [8, 'Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services'],
        [9, 'Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance'],
        [10, 'E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am', 'Manufacturing'],
        [11, 'Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing'],
        [12, 'General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing'],
        [13, 'General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive'],
        [14, 'Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer'],
        [15, 'Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing'],
        [16, 'Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer'],
        [17, 'International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer'],
        [18, 'Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical'],
        [19, 'JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance'],
        [20, 'McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food'],
        [21, 'Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical'],
        [22, 'Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer'],
        [23, 'Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am', 'Services', 'Medical'],
        [24, 'The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am', 'Food'],
        [25, 'The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am', 'Retail'],
        [26, 'The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am', 'Manufacturing'],
        [27, 'United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am', 'Computer'],
        [28, 'Verizon Communications',35.57,0.39,1.11,'9/1 12:00am', 'Services'],
        [29, 'Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am', 'Retail'],
        [30, 'Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am', 'Services']
    ];

    // add in some dummy descriptions
    for (var i = 0; i < dummyData.length; i++) {
        dummyData[i].push(
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, ' +
          'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, ' +
          'sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero ' +
          'lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non ' +
          'sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam ' +
          'commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, ' +
          'consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare ' +
          'sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.'
        );
    }

    var reader = new Ext.data.ArrayReader({idIndex: 0}, [
       {name: 'id'},
       {name: 'company'},
       {name: 'price', type: 'float'},
       {name: 'change', type: 'float'},
       {name: 'pctChange', type: 'float'},
       {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},
       {name: 'industry'},
       {name: 'desc'}
    ]);

    var expander = new Ext.ux.grid.RowExpander({
        tpl: new Ext.Template(
            '<p><b>Company:</b> {company}</p><br>',
            '<p><b>Summary:</b> {desc}</p>'
        ),
        enableCaching: false
    });

    var grid = new Ext.grid.GridPanel({
        store: new Ext.data.Store({
            reader: reader,
            data: dummyData
        }),
        cm: new Ext.grid.ColumnModel({
            defaults: {
                width: 20,
                sortable: true
            },
            columns: [
                expander,
                {id: 'company', header: "Company", width: 40, dataIndex: 'company'},
                {header: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                {header: "Change", dataIndex: 'change'},
                {header: "% Change", dataIndex: 'pctChange'},
                {header: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
            ]
        }),
        viewConfig: {
            forceFit: true
        },
        tbar: [{
            text: "Reload",
            handler: function() {
                grid.getStore().loadData(dummyData);
            }
        }],
        width: 600,
        height: 300,
        plugins: expander,
        title: 'RowExpander plugin',
        renderTo: document.body
    });

});




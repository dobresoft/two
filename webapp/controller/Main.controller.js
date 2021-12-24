sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
], function (Controller, FilterOperator, Filter) {
    "use strict";

    return Controller.extend("sap.ui.dobresoft.Main", {
        onInit: function (evt) {
               
        },
        onSearch: function(oEvent) {

            var oModel = new sap.ui.model.json.JSONModel();
            var loThis = this;
            var sInputValue = oEvent.getSource().getValue();
            var sURL = "http://sapr3:8000/sap/bc/autumn/vendors?sap-client=001&BUKRS=1000" 

            oModel.loadData(sURL, null);
            oModel.attachRequestCompleted(function(data) {              
                
                //loThis.inputId = data.getSource();
                var oTableStdListTemplate;
                var oFilterTableNo;
                loThis.oDialog = sap.ui.xmlfragment("sap.ui.dobresoft.view.ValueHelpTable", loThis);

                oTableStdListTemplate = new sap.m.StandardListItem({title: "{lifnr}",description: "{name1}"}); // //create a filter for the binding
                oFilterTableNo = new sap.ui.model.Filter("lifnr", sap.ui.model.FilterOperator.Contains, sInputValue);
                loThis.oDialog.setModel(this); 
                loThis.oDialog.unbindAggregation("items");
                loThis.oDialog.bindAggregation("items", {
                    path: "/vendors",
                    template: oTableStdListTemplate,
                    filters: [oFilterTableNo]
                });               
                loThis.oDialog.open(sInputValue);                
            });
            this.getView().setModel(oModel);           
        },            
        handleTableValueHelpConfirm: function(oEvent) {
            var lSelected = oEvent.getParameter("selectedItem");
            if (lSelected) 
            {
                this.byId("input0").setValue(lSelected.getBindingContext().getObject().lifnr);
            }    
            //this.oDialog.destroy();
        },
        handleTableValueHelpSearch: function(oEvent) {
            var sQuery = oEvent.getParameter('value');
			var aFilter = [];
            aFilter.push(new Filter("name1", FilterOperator.Contains, sQuery));
            aFilter.push(new Filter("lifnr", FilterOperator.Contains, sQuery));
			var oBinding = oEvent.getParameter("itemsBinding");
			//oBinding.filter(aFilter);    
            oBinding.filter(new Filter({filters: aFilter, and: false}));
        },
        onPress: function(oEvent){

            var data = {};
            $.ajax({
                type: "POST",
                url: "/loginx",
                data: data,
                success: null,
                dataType: "json"
              });
        }
    });        
});
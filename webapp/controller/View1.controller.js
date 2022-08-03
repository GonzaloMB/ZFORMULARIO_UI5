sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";
	return Controller.extend("ZFORMULARIO_UI5.ZFORMULARIO_UI5.controller.View1", {
		//Create Function
		onCrear: function () {
			//Save model into var
			var oModel = this.getOwnerComponent().getModel();
			var that = this;
			//Save mail value and character to check mail
			var email = this.getView().byId("Mail").getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			//Save values required fields 
			var nombreField = this.getView().byId("Nombre").getValue();
			var apellidoField = this.getView().byId("Apellido").getValue();
			var dniField = this.getView().byId("DNI").getValue();
			//Validations
			if (!mailregex.test(email) && email !== "") {
				MessageBox.error(email + " is not a valid email address");
				document.getElementById("container-ZFORMULARIO_UI5---View1--Mail-content").style.backgroundColor = '#ff6c6c';
				document.getElementById("container-ZFORMULARIO_UI5---View1--Mail-inner").style.color = "white";
			} else if (nombreField === "" || apellidoField === "" ||
				dniField === "") {
				MessageBox.error("Fill in the required fields");
				if (nombreField === "") {
					document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-content").style.backgroundColor = '#ff6c6c';
					document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-inner").style.color = "white";
				}
				if (apellidoField === "") {
					document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-content").style.backgroundColor = '#ff6c6c';
					document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-inner").style.color = "white";
				}
				if (dniField === "") {
					document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-content").style.backgroundColor = '#ff6c6c';
					document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-inner").style.color = "white";
				}
			} else if (oModel.aBindings[0].aKeys.toString().includes(nombreField) && oModel.aBindings[0].aKeys.toString().includes(
					apellidoField) && oModel.aBindings[0].aKeys.toString().includes(dniField)) {
				MessageBox.error("The record is duplicate");
				document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-content").style.backgroundColor = '#ff6c6c';
				document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-inner").style.color = "white";
				document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-content").style.backgroundColor = '#ff6c6c';
				document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-inner").style.color = "white";
				document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-content").style.backgroundColor = '#ff6c6c';
				document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-inner").style.color = "white";
			} else {
				//Create array with the new form register
				var oEntry = {
					"nombre": that.getView().byId("Nombre").getValue(),
					"apellido": that.getView().byId("Apellido").getValue(),
					"dni": that.getView().byId("DNI").getValue(),
					"movil": that.getView().byId("Movil").getValue(),
					"direccion": that.getView().byId("Mail").getValue()
				};
				//Push the new register into the table
				oModel.create("/ZC_FORMULARIO", oEntry, {
					success: function (oData) {
						//After create the new register clean the form and set the correct css colors
						that.getView().byId("Nombre").setValue("");
						that.getView().byId("Apellido").setValue("");
						that.getView().byId("DNI").setValue("");
						that.getView().byId("Movil").setValue("");
						that.getView().byId("Mail").setValue("");
						document.getElementById("container-ZFORMULARIO_UI5---View1--Mail-content").style.backgroundColor = '#c3c6d5';
						document.getElementById("container-ZFORMULARIO_UI5---View1--Mail-inner").style.color = '#22223b';
						document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-content").style.backgroundColor = '#c3c6d5';
						document.getElementById("container-ZFORMULARIO_UI5---View1--Nombre-inner").style.color = "22223b";
						document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-content").style.backgroundColor = '#c3c6d5';
						document.getElementById("container-ZFORMULARIO_UI5---View1--Apellido-inner").style.color = "22223b";
						document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-content").style.backgroundColor = '#c3c6d5';
						document.getElementById("container-ZFORMULARIO_UI5---View1--DNI-inner").style.color = "22223b";
						//Show message Success
						var msgSuccess = "Record created";
						MessageToast.show(msgSuccess);
					},
					error: function (oData) {
						//Show message Error
						var msgError = "Error creating record";
						MessageToast.show(msgError);
					}
				});
			}
		},
		//Delete Function
		eliminarRegistro: function () {
			//Save model into var
			var oModel = this.getOwnerComponent().getModel();
			var that = this;
			//Array with the selected register
			var indiceDelete = that.getView().byId("container-ZFORMULARIO_UI5---View1--LineItemsSmartTable-ui5table")._oLegacySelectionPlugin.oSelectionModel
				.aSelectedIndices;
			//Loop when is selected more then one register
			for (let n of indiceDelete) {
				//Create Path of the register to delete
				var sPath = "/" + oModel.aBindings[0].aKeys[n];
				//Delete from table
				oModel.remove(sPath, {
					success: function (oData) {
						//Show message Success
						var msgSuccess = "Record deleted";
						MessageToast.show(msgSuccess);
					},
					error: function (oData) {
						//Show message Error
						var msgError = "Error deleting record";
						MessageToast.show(msgError);
					}
				});
			}
		}
	});
});
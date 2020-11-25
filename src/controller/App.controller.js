sap.ui.define(
	[
		"yelcho/SAUG2020/base/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/m/Dialog",
		"sap/m/Button",
		"sap/m/List",
		"sap/m/CustomListItem",
		"sap/m/HBox",
		"sap/ui/core/Icon",
		"sap/m/Link",
		"sap/ui/core/Fragment",
	],
	function (
		Controller,
		JSONModel,
		Dialog,
		Button,
		List,
		CustomListItem,
		HBox,
		Icon,
		Link,
		Fragment
	) {
		return Controller.extend("yelcho.SAUG2020.controller.App", {
			onInit: function () {
				this.getView().setModel(
					new JSONModel(sap.ui.getVersionInfo()),
					"versionModel"
				)

				const oTitlesModel = new JSONModel({
					title: "SAUG Component Based Navigation Demo",
				})
				this.getView().setModel(oTitlesModel, "titleModel")

				this.getOwnerComponent()
					.getRouter()
					.attachTitleChanged(function (oEvent) {
						oTitlesModel.setData(oEvent.getParameters())
						document.title = oEvent.getParameter("title")
					})

				this.getOwnerComponent()
					.getRouter()
					.attachRouteMatched(this._onRouteMatched, this)
			},

			_onRouteMatched: function (oEvent) {
				// select the corresponding item in the left menu
				this._setSelectedMenuItem(oEvent.getParameter("config").name)
			},

			_setSelectedMenuItem: function (sKey) {
				this.byId("navigationList").setSelectedKey(sKey)
			},

			onItemSelect: function (oEvent) {
				const sKey = oEvent.getParameter("item").getKey()

				switch (sKey) {
					case "references":
						this._openRefDialog()
						break
					default:
						this.getOwnerComponent().getRouter().navTo(sKey)
				}
			},
			_openRefDialog: function () {
				Fragment.load({
					name: "yelcho.SAUG2020.fragment.ReferenceDialog",
					controller: this,
				}).then((oRefDialog) => {
					this.getView().addDependent(oRefDialog)
					oRefDialog.open()
				})
			},
			onRefDialogClose: function (oEvent) {
				oEvent.getSource().getParent().close().destroy()
			},
		})
	}
)

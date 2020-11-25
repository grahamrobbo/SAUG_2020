sap.ui.define(
	[
		"yelcho/SAUG2020/base/BaseController",
		"sap/m/ColumnListItem",
		"sap/m/Text",
		"sap/ui/model/type/Currency",
	],
	function (BaseController, ColumnListItem, Text, Currency) {
		return BaseController.extend(
			"yelcho.SAUG2020.reuse.products.controller.List",
			{
				onInit: function () {
					BaseController.prototype.onInit.apply(this, arguments)
					this.getOwnerComponent()
						.getRouter()
						.getRoute("list")
						.attachMatched(this._onMatched, this)
				},

				_onMatched: function (oEvent) {
					const oTable = this.getView().byId("table")
					const that = this

					oTable.bindItems({
						path: "/Products",
						parameters: {
							expand: "Supplier",
						},
						template: new ColumnListItem({
							type: "Navigation",
							press: that.onPressListItem.bind(that),
							cells: [
								new Text({ text: "{ProductID}" }),
								new Text({ text: "{ProductName}" }),
								new Text({ text: "{Supplier/CompanyName}" }),
								new Text({
									text: {
										parts: [
											{
												path: "UnitPrice",
											},
											{
												value: "$",
											},
										],
										type: new Currency({
											currencyCode: false,
										}),
									},
								}),
							],
						}),
					})
				},

				onPressListItem: function (oEvent) {
					const sProductID = oEvent
						.getSource()
						.getBindingContext()
						.getProperty("ProductID")

					this.getOwnerComponent().getRouter().navTo("detail", {
						id: sProductID,
					})
				},
			}
		)
	}
)

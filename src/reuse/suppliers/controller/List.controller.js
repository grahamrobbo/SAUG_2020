sap.ui.define(["yelcho/SAUG2020/base/BaseController"], function (Controller) {
	return Controller.extend("yelcho.SAUG2020.reuse.suppliers.controller.List", {
		onPressListItem: function (oEvent) {
			this.getOwnerComponent()
				.getRouter()
				.navTo(
					"detail",
					{
						id: oEvent
							.getSource()
							.getBindingContext()
							.getProperty("SupplierID"),
					},
					{
						products: {
							route: "list",
							parameters: {
								// encode the path because it could contain "/" which
								// isn't allowed to use as pattern parameter directly
								basepath: encodeURIComponent(
									oEvent.getSource().getBindingContext().getPath()
								),
							},
						},
					}
				)
		},
	})
})

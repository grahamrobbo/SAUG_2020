sap.ui.define(["yelcho/SAUG2020/base/BaseController"], function (Controller) {
	return Controller.extend("yelcho.SAUG2020.reuse.categories.controller.List", {
		onPressListItem: function (oEvent) {
			const oBindingContext = oEvent.getSource().getBindingContext()

			this.getOwnerComponent()
				.getRouter()
				.navTo(
					"detail",
					{
						id: oBindingContext.getProperty("CategoryID"),
					},
					{
						products: {
							route: "list",
							parameters: {
								// encode the path because it could contain "/" which
								// isn't allowed to use as pattern parameter directly
								basepath: encodeURIComponent(oBindingContext.getPath()),
							},
						},
					}
				)
		},
	})
})

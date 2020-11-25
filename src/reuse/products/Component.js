sap.ui.define(
	["yelcho/SAUG2020/base/BaseComponent", "sap/ui/core/Component"],
	function (BaseComponent, Component) {
		return BaseComponent.extend("yelcho.SAUG2020.reuse.products.Component", {
			metadata: {
				manifest: "json",
			},
			init: function () {
				BaseComponent.prototype.init.apply(this, arguments)

				const oParentComponent = Component.getOwnerComponentFor(this)

				// if this component runs standalone instead of embedded to another component,
				// it should handle the navigation to detail page by itself. It attaches to
				// its own "toProduct" event and navigates to the detail page
				if (!oParentComponent)
					this.attachEvent(
						"toProduct",
						function (oEvent) {
							this.getRouter().navTo("detail", {
								id: oEvent.getParameter("productID"),
							})
						},
						this
					)
			},
		})
	}
)

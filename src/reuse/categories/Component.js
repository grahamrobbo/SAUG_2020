sap.ui.define(["yelcho/SAUG2020/base/BaseComponent"], function (BaseComponent) {
	return BaseComponent.extend("yelcho.SAUG2020.reuse.categories.Component", {
		metadata: {
			manifest: "json",
		},
		eventMappings: {
			productsComponent: [
				{
					name: "toProduct",
					forward: "toProduct",
				},
			],
		},
		init: function () {
			BaseComponent.prototype.init.apply(this, arguments)
		},
	})
})

sap.ui.define(["yelcho/SAUG2020/base/BaseComponent"], function (BaseComponent) {
	return BaseComponent.extend("yelcho.SAUG2020.Component", {
		metadata: {
			manifest: "json",
		},
		// define the events which are fired from the reuse components
		//
		// this component registers handler to those events and navigates
		// to the other reuse components
		//
		// see the implementation in BaseComponent for processing the event
		// mapping
		eventMappings: {
			productsComponent: [
				{
					name: "toSupplier",
					route: "suppliers",
					componentTargetInfo: {
						suppliers: {
							route: "detail",
							parameters: {
								id: "supplierID",
							},
						},
					},
				},
				{
					name: "toCategory",
					route: "categories",
					componentTargetInfo: {
						categories: {
							route: "detail",
							parameters: {
								id: "categoryID",
							},
						},
					},
				},
			],
		},
		init: function () {
			// call the init function of the parent
			BaseComponent.prototype.init.apply(this, arguments)
		},
	})
})

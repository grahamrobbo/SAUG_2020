sap.ui.define(["yelcho/SAUG2020/base/BaseComponent"], function (BaseComponent) {
	return BaseComponent.extend("yelcho.SAUG2020.Component", {
		metadata: {
			manifest: "json",
		},
		init: function () {
			// call the init function of the parent
			BaseComponent.prototype.init.apply(this, arguments)
		},
	})
})

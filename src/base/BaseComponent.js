sap.ui.define(
	["sap/ui/core/UIComponent", "sap/base/util/deepClone"],
	function (UIComponent, deepClone) {
		return UIComponent.extend("yelcho.SAUG2020.base.BaseComponent", {
			init: function () {
				UIComponent.prototype.init.apply(this, arguments)

				this.getRouter().initialize()
			},
		})
	}
)

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
	return Controller.extend(
		"yelcho.SAUG2020.reuse.suppliers.controller.Detail",
		{
			onInit: function () {
				this.getOwnerComponent()
					.getRouter()
					.getRoute("detail")
					.attachMatched(this._onMatched, this)
			},

			_onMatched: function (oEvent) {
				this.getOwnerComponent()
					.getModel()
					.metadataLoaded()
					.then(this._bindData.bind(this, oEvent.getParameter("arguments").id))
			},

			_bindData: function (id) {
				const sObjectPath = this.getOwnerComponent()
					.getModel()
					.createKey("Suppliers", { SupplierID: id })

				this.getView().bindElement({
					path: "/" + sObjectPath,
					events: {
						change: function () {
							this.getView().setBusy(false)
						}.bind(this),
						dataRequested: function () {
							this.getView().setBusy(true)
						}.bind(this),
						dataReceived: function () {
							this.getView().setBusy(false)
							if (this.getView().getBindingContext() === null)
								this.getOwnerComponent()
									.getRouter()
									.getTargets()
									.display("notFound")
						}.bind(this),
					},
				})
			},
		}
	)
})

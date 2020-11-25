sap.ui.define(
	["yelcho/SAUG2020/base/BaseController"],
	function (BaseController) {
		return BaseController.extend(
			"yelcho.SAUG2020.reuse.categories.controller.Detail",
			{
				onInit: function () {
					BaseController.prototype.onInit.apply(this, arguments)
					this.getOwnerComponent()
						.getRouter()
						.getRoute("detail")
						.attachMatched(this._onMatched, this)
				},

				_onMatched: function (oEvent) {
					const oArgs = oEvent.getParameter("arguments")
					this.getOwnerComponent()
						.getModel()
						.metadataLoaded()
						.then(this._bindData.bind(this, oArgs.id))
				},

				_bindData: function (id) {
					const sObjectPath = this.getOwnerComponent()
						.getModel()
						.createKey("Categories", { CategoryID: id })
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
	}
)

sap.ui.define(
	["yelcho/SAUG2020/base/BaseController"],
	function (BaseController) {
		return BaseController.extend(
			"yelcho.SAUG2020.reuse.products.controller.Detail",
			{
				onInit: function () {
					BaseController.prototype.onInit.apply(this, arguments)
					this.getOwnerComponent()
						.getRouter()
						.getRoute("detail")
						.attachPatternMatched(this._onMatched, this)
				},

				_onMatched: function (oEvent) {
					this.getOwnerComponent()
						.getModel()
						.metadataLoaded()
						.then(
							this._bindData.bind(this, oEvent.getParameter("arguments").id)
						)
				},

				_bindData: function (id) {
					const sObjectPath = this.getOwnerComponent()
						.getModel()
						.createKey("Products", { ProductID: id })

					this.getView().bindElement({
						path: "/" + sObjectPath,
						parameters: {
							expand: "Supplier,Category",
						},
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
				onPressSupplier: function (oEvent) {
					const oOwnerComponent = this.getOwnerComponent()
					const oModel = oOwnerComponent.getModel()
					const sSupplierID = oEvent
						.getSource()
						.getBindingContext()
						.getProperty("SupplierID")

					oOwnerComponent.fireEvent("toSupplier", {
						supplierID: sSupplierID,
						supplierKey: encodeURIComponent(
							"/" +
								oModel.createKey("Suppliers", {
									SupplierID: sSupplierID,
								})
						),
					})
				},

				onPressCategory: function (oEvent) {
					const oOwnerComponent = this.getOwnerComponent()
					const oModel = oOwnerComponent.getModel()
					const sCategoryID = oEvent
						.getSource()
						.getBindingContext()
						.getProperty("CategoryID")

					oOwnerComponent.fireEvent("toCategory", {
						categoryID: sCategoryID,
						categoryKey: encodeURIComponent(
							"/" +
								oModel.createKey("Categories", {
									CategoryID: sCategoryID,
								})
						),
					})
				},
			}
		)
	}
)

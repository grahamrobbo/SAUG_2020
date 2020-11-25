# SAUG 2020 Sample Code

## Section 3 - Embedding Components in Components

Show what we are trying to achieve

Note each detail view has contents wrapped in a `<VBox id="box">` control.

In `manifest.js` we define the componentUsage for the products component.

```json
		"componentUsages": {
			"productsComponent": {
				"name": "yelcho.SAUG2020.reuse.products",
				"settings": {},
				"componentData": {},
				"lazy": true
			}
		},
```

We define a new route target with the existing `detail` target as its parent. Parent targets are displayed before the child target.

```json
"targets": {
	"detail": {
		"type": "View",
		"id": "detail",
		"name": "Detail",
		"title": "{CompanyName}"
	},
	"products": {
		"type": "Component",
		"usage": "productsComponent",
		"parent": "detail",
		"controlId": "box",
		"controlAggregation": "items",
		"id": "productInSupplier"
	},
}
```

The detail route is adjusted to render the new target also passing an alias.

```json
{
	"name": "detail",
	"pattern": "detail/{id}",
	"target": {
		"name": "products",
		"prefix": "p"
	}
}
```

The Product List will now render but it will show all products - not the subset we want for this context.

The route configuration for the product list needs to be enhanced so we can optionally pass the `basepath` of the context. e.g. `/Suppliers(3)`

```json
{
	"name": "list",
	"pattern": ":basepath:",
	"target": "list"
},
```

The data binding in the products list controller needs to be adjusted to apply the `baseline` context when it is passed.

```javascript
_onMatched: function (oEvent) {
	const oArgs = oEvent.getParameter("arguments")
	const sPath = decodeURIComponent(oArgs.basepath || "") + "/Products"
	const oTable = this.getView().byId("table")
	const that = this

	oTable.bindItems({
		path: sPath,
		parameters: {
			expand: "Supplier",
		},
		...

```

The `oComponentTargetInfo` parameter has to be passed when we navigate from the categories list to the detail. This parameter contains route pattern and parameters for the nested products component.

```javascript
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
					basepath: encodeURIComponent(oBindingContext.getPath()),
				},
			},
		}
	)
```

Now we need to enhance the `eventMappings` configuration we saw earlier to support the navigation from embedded products component inside categories and suppliers components to the product details.

We also need to add details for the new product list optional parameter `basepath`.

These changes mean the event handlers will all pass forward the correct navigation parameters to the root component router.

```json
eventMappings: {
	suppliersComponent: [
		{
			name: "toProduct",
			route: "products",
			componentTargetInfo: {
				products: {
					route: "detail",
					parameters: {
						id: "productID",
					},
				},
			},
		},
	],
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
					componentTargetInfo: {
						products: {
							route: "list",
							parameters: {
								basepath: "supplierKey",
							},
						},
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
					componentTargetInfo: {
						products: {
							route: "list",
							parameters: {
								basepath: "categoryKey",
							},
						},
					},
				},
			},
		},
		{
			name: "toProduct",
			route: "products",
			componentTargetInfo: {
				products: {
					route: "detail",
					parameters: {
						id: "productID",
					},
				},
			},
		},
	],
	categoriesComponent: [
		{
			name: "toProduct",
			route: "products",
			componentTargetInfo: {
				products: {
					route: "detail",
					parameters: {
						id: "productID",
					},
				},
			},
		},
	],
},
```

To navigate to the product detail view fire the `toProduct` event.

```javascript
this.getOwnerComponent().fireEvent("toProduct", {
	productID: sProductID,
})
```

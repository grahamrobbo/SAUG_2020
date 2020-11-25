# SAUG 2020 Sample Code

## Section 2 - Navigating between Nested Components

### Reuse Root Component Router

We want to navigate from the detail view of one component to the associated detail view of another component.

The `sap.ui.core.routing.Router` method `navTo` supports passing route details and parameters for nested components via the `oComponentTargetInfo` parameter.

We would need to configure all possible route details for all possible navigations in each nested component for all other components.

It makes more sense to reuse the routing we already have working via the root component. Each nested component has its own router but it needs to trigger the root component router and have it perform the navigation. We can do this by firing an event to signal a handler that can direct the root component router.

These event handlers need to be running as part of the root component.

We will define the appropriate event handlers using a generic function that reads configuration data to build the event handlers.

```json
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
```

We can fire the event like this.

```javascript
this.getOwnerComponent().fireEvent("toCategory", {
	categoryID: sCategoryID,
})
```

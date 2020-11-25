# SAUG 2020 Sample Code

## Section 1 - Introduction

### Introduce Demo Components

- 3 very similar copmponents
- All can be run standalone
- All use same names for views, controllers, routes, etc.
- All have a List and a Detail view
- Each component has a different background color defined in its `./css/style.css`.

```css
.productsPage {
	background-color: lightblue;
}
```

### Introduce Root component

Simple component with standard routing configuration to load App & Home views.

```json
{
	"sap.ui5": {
		"rootView": {
			"viewName": "yelcho.SAUG2020.view.App",
			"type": "XML",
			"async": true,
			"id": "app"
		},
		"routing": {
			"routes": [
				{
					"name": "home",
					"pattern": "",
					"target": "home"
				}
			],
			"targets": {
				"home": {
					"type": "View",
					"id": "home",
					"name": "Home",
					"title": "SAUG SUMMIT 2020 DEMO"
				},
				"notFound": {
					"type": "View",
					"id": "notFound",
					"name": "NotFound",
					"transition": "show"
				}
			}
		}
	}
}
```

### Enabling Routing in Nested Components

Configuire a Component as Routing Target

```json
{
	"sap.ui5": {
		"componentUsages": {
			"suppliersComponent": {
				"name": "yelcho.SAUG2020.reuse.suppliers",
				"settings": {},
				"componentData": {},
				"lazy": true
			}
		},
		"routing": {
			"routes": [
				{
					"name": "suppliers",
					"pattern": "suppliers",
					"target": {
						"name": "suppliers",
						"prefix": "s",
						"propagateTitle": true
					}
				}
			],
			"targets": {
				"suppliers": {
					"type": "Component",
					"usage": "suppliersComponent",
					"title": "Suppliers Component"
				}
			}
		}
	}
}
```

Show nested component navigation working

- Hash string prefix
- Show code to select menu item from route pattern
- Refresh propagates hash to nested components via prefix
- Propagation of titleChanged event

```javascript
this.getOwnerComponent()
	.getRouter()
	.attachTitleChanged(function (oEvent) {
		oTitlesModel.setData(oEvent.getParameters())
		document.title = oEvent.getParameter("title")
	})
```

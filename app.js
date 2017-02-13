/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
System.register(['@angular/core', "@angular/platform-browser", "@angular/platform-browser-dynamic"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, platform_browser_1, platform_browser_dynamic_1;
    var Product, ProductImage, ProductDepartment, PriceDisplay, ProductRow, ProductsList, InventoryApp, InventoryAppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            }],
        execute: function() {
            /**
             * Provides a `Product` object
             */
            Product = (function () {
                function Product(sku, name, imageUrl, department, price) {
                    this.sku = sku;
                    this.name = name;
                    this.imageUrl = imageUrl;
                    this.department = department;
                    this.price = price;
                }
                return Product;
            }());
            /**
             * @ProductImage: A component to show a single Product's image
             */
            ProductImage = (function () {
                function ProductImage() {
                }
                ProductImage = __decorate([
                    core_1.Component({
                        selector: 'product-image',
                        host: { class: 'ui small image' },
                        inputs: ['product'],
                        template: "\n  <img class=\"product-image\" [src]=\"product.imageUrl\">\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductImage);
                return ProductImage;
            }());
            /**
             * @ProductDepartment: A component to show the breadcrumbs to a
             * Product's department
             */
            ProductDepartment = (function () {
                function ProductDepartment() {
                }
                ProductDepartment = __decorate([
                    core_1.Component({
                        selector: 'product-department',
                        inputs: ['product'],
                        template: "\n  <div class=\"product-department\">\n    <span *ngFor=\"let name of product.department; let i=index\">\n      <a href=\"#\">{{ name }}</a>\n      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>\n    </span>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductDepartment);
                return ProductDepartment;
            }());
            /**
             * @PriceDisplay: A component to show the price of a
             * Product
             */
            PriceDisplay = (function () {
                function PriceDisplay() {
                }
                PriceDisplay = __decorate([
                    core_1.Component({
                        selector: 'price-display',
                        inputs: ['price'],
                        template: "\n  <div class=\"price-display\">${{ price }}</div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], PriceDisplay);
                return PriceDisplay;
            }());
            /**
             * @ProductRow: A component for the view of single Product
             */
            ProductRow = (function () {
                function ProductRow() {
                }
                ProductRow = __decorate([
                    core_1.Component({
                        selector: 'product-row',
                        inputs: ['product'],
                        host: { 'class': 'item' },
                        template: "\n  <product-image [product]=\"product\"></product-image>\n  <div class=\"content\">\n    <div class=\"header\">{{ product.name }}</div>\n    <div class=\"meta\">\n      <div class=\"product-sku\">SKU #{{ product.sku }}</div>\n    </div>\n    <div class=\"description\">\n      <product-department [product]=\"product\"></product-department>\n    </div>\n  </div>\n  <price-display [price]=\"product.price\"></price-display>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductRow);
                return ProductRow;
            }());
            /**
             * @ProductsList: A component for rendering all ProductRows and
             * storing the currently selected Product
             */
            ProductsList = (function () {
                function ProductsList() {
                    this.onProductSelected = new core_1.EventEmitter();
                }
                ProductsList.prototype.clicked = function (product) {
                    this.currentProduct = product;
                    this.onProductSelected.emit(product);
                };
                ProductsList.prototype.isSelected = function (product) {
                    if (!product || !this.currentProduct) {
                        return false;
                    }
                    return product.sku === this.currentProduct.sku;
                };
                ProductsList = __decorate([
                    core_1.Component({
                        selector: 'products-list',
                        inputs: ['productList'],
                        outputs: ['onProductSelected'],
                        template: "\n  <div class=\"ui items\">\n    <product-row \n      *ngFor=\"let myProduct of productList\" \n      [product]=\"myProduct\" \n      (click)='clicked(myProduct)'\n      [class.selected]=\"isSelected(myProduct)\">\n    </product-row>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProductsList);
                return ProductsList;
            }());
            /**
             * @InventoryApp: the top-level component for our application
             */
            InventoryApp = (function () {
                function InventoryApp() {
                    this.products = [
                        new Product('MYSHOES', 'Black Running Shoes', '/resources/images/products/black-shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 109.99),
                        new Product('NEATOJACKET', 'Blue Jacket', '/resources/images/products/blue-jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 238.99),
                        new Product('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99)
                    ];
                }
                InventoryApp.prototype.productWasSelected = function (product) {
                    console.log('Product clicked: ', product);
                };
                InventoryApp = __decorate([
                    core_1.Component({
                        selector: 'inventory-app',
                        template: "\n  <div class=\"inventory-app\">\n    <products-list \n      [productList]=\"products\" \n      (onProductSelected)=\"productWasSelected($event)\">\n    </products-list>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], InventoryApp);
                return InventoryApp;
            }());
            InventoryAppModule = (function () {
                function InventoryAppModule() {
                }
                InventoryAppModule = __decorate([
                    core_2.NgModule({
                        declarations: [
                            InventoryApp,
                            ProductImage,
                            ProductDepartment,
                            PriceDisplay,
                            ProductRow,
                            ProductsList
                        ],
                        imports: [platform_browser_1.BrowserModule],
                        bootstrap: [InventoryApp]
                    }), 
                    __metadata('design:paramtypes', [])
                ], InventoryAppModule);
                return InventoryAppModule;
            }());
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(InventoryAppModule);
        }
    }
});
//# sourceMappingURL=app.js.map
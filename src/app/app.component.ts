import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';


@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
categories;
currentCategorie;

constructor(public catService:CatalogueService,
              private  router:Router,
              ){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource(this.catService.host+"/categories")
      .subscribe(data=>{
        this.categories=data;
      },err=>{
        console.log(err);
      })
  }

  getProductsByCat(c) {
    this.currentCategorie=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategorie=undefined;
    console.log('this.router.navigateByUrl-------------------');
    this.router.navigateByUrl('/product');
  }

  onProductsPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

}

import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
selector: 'app-product',
templateUrl: './product.component.html',
styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products;
editPhoto: boolean;
currentProduct: any;
selectedFiles;
progress: number;
currentFileUpload: any;
title:string = 'bonjour';
currentRequest:string;
private currentTime: number=0;

constructor(
    public catService:CatalogueService,
    private route:ActivatedRoute,private router:Router
    ) {
       // console.log('--------------------------'+this.currentRequest);
      this.currentRequest='/products';
      this.getProducts(this.currentRequest);
      //console.log('--------------------------'+this.currentRequest);
     }

  ngOnInit() {
      this.currentRequest='/products';
      this.getProducts(this.currentRequest);
  }

  private getProducts(url) {
    console.log('getProduct--------------------'+this.catService.host+url);
    this.catService.http.get(this.catService.host+url).subscribe(data=>{
        this.products = data;
        console.log('data ok' + data);
      },err=>{
        console.log(err);
      })
  }
  private refreshUpdatedProduct() {
    this.catService.getResource(this.currentProduct._links.self.href)
      .subscribe(data=>{
        console.log(data);
        this.currentProduct.photoName=data['photoName'];
      },err=>{
        console.log(err);
      })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }



  getTS() {
    return this.currentTime;
  }

  onProductDetails(p) {
    //this.router.navigateByUrl("/product/"+p.id);
  }
}

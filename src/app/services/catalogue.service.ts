import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
providedIn: 'root'
})

export class CatalogueService {
public host:string="http://10.0.4.97:8080";

constructor(public http:HttpClient) {
  }

  public getResource(url){
      console.log('getRessouce---------');
      console.log('url = '+url);
      return this.http.get(url);
  }
  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


}

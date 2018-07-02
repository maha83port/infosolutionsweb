import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class FileUploadService {

    //baseUrl = 'http://localhost/api/v1/'; 
    private baseUrl: string = environment.apiUrl;
    constructor(private _http: HttpClient) { }

    upload(formData, session_id, service_id, service_name) {
       console.log(formData);
        const url = `${this.baseUrl}fileupload?session_id=`+session_id+`&service_id=`+service_id+`&service_name=`+service_name;
        return this._http.post(url, formData);
            
    }
}
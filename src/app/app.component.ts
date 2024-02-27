import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cron Task Runner';
  baseService = 'http://localhost:9099/rockwell/api/v1/headers?url=https://';

  responseData: any;
  info: any;
  url: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    setInterval(() => {

      var address = '';
      address = address.concat(this.baseService).concat(this.url);
      console.log('URL: ', address);
      
      this.http.get(address).subscribe((data) => {
      this.responseData = data;
      console.log(this.responseData);

      console.log('Headers info:');
      
      this.info = this.responseData.info;

      console.log(this.info);
    }, error => {
      console.log('ERROR CODE: ', error.status);

      this.info = error.error.errorMessage;
      console.log('ERROR MESSAGE: ', this.info);
    });
    }, 10000)
    
  }
}

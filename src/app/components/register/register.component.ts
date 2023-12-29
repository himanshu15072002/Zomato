import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loggedUserData: any;
  registerObj: any = {
    "userId": 0,
    "userName": "",
    "role": "Customer",
    "password": "",
    "mobileNo": "",
    "emailId": "",
    "restaurantId": 0
  };

  constructor(private router :Router,private foodService: FoodService){

  }

  onSave() {
    this.foodService.onRegister(this.registerObj).subscribe((res:any)=>{
      if(res.result) {
        // this.closeRegister();
        // alert('Registration Success');

        localStorage.setItem('zomato_user', JSON.stringify(res.data));
        this.router.navigateByUrl('/login');
        this.loggedUserData = res.data;
      } else {
        alert(res.message);
      }
    })
  }
  closeRegister() {
    const model = document.getElementById('registerModal');
    if(model != null) {
      model.style.display = 'none'
    }
  }
}

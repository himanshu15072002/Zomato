import { Component } from '@angular/core';
import { FoodService } from 'src/app/service/food.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginObj : any = {
    "userName": "",
    "password": ""
  }
 loggedUserData: any;


constructor(private foodService: FoodService,private router :Router){
  const isLocalData = localStorage.getItem('zomato_user');
  if(isLocalData != null) {
    this.loggedUserData =  JSON.parse(isLocalData);
  }
}




onLogin() {
  const model = document.getElementById('loginModal');
  if(model != null) {
    model.style.display = 'block'
  }
}
  login() {
    this.foodService.onLogin(this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        this.closeLogin();
        alert('Login Success');
        localStorage.setItem('zomato_user', JSON.stringify(res.data));
        this.router.navigateByUrl('/foods');
        this.loggedUserData = res.data;
      } else {
        alert(res.message);
      }
    })
  }

  closeLogin() {
    const model = document.getElementById('loginModal');
    if(model != null) {
      model.style.display = 'none'
    }
  }

}

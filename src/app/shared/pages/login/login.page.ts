import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth:AuthService,
    private router:Router
    
    ) { }

  ngOnInit() {
  }
   async LoginGoogle()
  {
    let error = await this.auth.googleLogin();
    if(error == undefined)
    {
      this.router.navigate(['lista-empleos']);
    }else
    {
      alert(JSON.stringify(error))
    }
  }

}

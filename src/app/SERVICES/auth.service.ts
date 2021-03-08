import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData: any;
  constructor(private fbAuth:AngularFireAuth,private ngZone:NgZone,private router:Router) {

    this.fbAuth.authState.subscribe(user=>{
      if(user){
        console.log('user logged in ', user);
        this.userData = user.email;
        localStorage.setItem('user', this.userData);
      }
    })
   }


  singIn(email: any, password: any){
    return this.fbAuth.signInWithEmailAndPassword(email, password)
    .then((result: any)=>{
      this.ngZone.run(()=>{
        this.router.navigate(['/'])

      })

    }).catch((error: { message: any; })=>{
      window.alert(error.message)
    })
  }
  SignUp(email: any, password: any){
    return this.fbAuth.createUserWithEmailAndPassword(email, password)
    .then((result: any)=>{
      this.router.navigate(['/'])
    }).catch((error: { message: any; })=>{
      window.alert(error.message)
    })
  }
    logOut(){
  console.log('log out')
  return this.fbAuth.signOut().then(()=>{
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  })
}


isLoggedIn(){
  const user  = localStorage.getItem('user')
  return user? true:false
}
getUser(){
  const user = localStorage.getItem('user');
  return user? user:null;

}

}



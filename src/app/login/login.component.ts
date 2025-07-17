// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   isLoading = false;
//   error: string = '';

//   constructor(private fb: FormBuilder) {
//     this.loginForm = this.fb.group({
//       email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
//       password: ['cityslicka', Validators.required],
//     });
//   }

//   ngOnInit(): void {}
//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.isLoading = true;
//       this.error = '';

//       this.authService.login(this.loginForm.value).subscribe({
//         next: (response) => {
//           this.authService.saveToken(response.token);
//           this.router.navigate(['/users']);
//         },
//         error: (error) => {
//           this.error = 'Invalid credentials';
//           this.isLoading = false;
//         },
//       });
//     }
//   }

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('password');
//   }
// }

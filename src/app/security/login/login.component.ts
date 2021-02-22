import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service'
import { Login } from './models/login';
import { GlobalUrlService } from './../../global/service/global-url.service';
import { LocalService } from './../../global/encriptacion/local.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  login: Login;
  usuario: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  });

  constructor(private _local: LocalService,private _login: LoginService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private _url: GlobalUrlService
  ) { }

  ngOnInit(): void {
    this.login = new Login('', '');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });//Validacion
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';//Retorna al login
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this._login.loginuser(this.login)
      .subscribe((login: any) => {
        if (login.code == '400') {//Si existe la base de datos
          this.Toast.fire({
            icon: 'error',
            title: 'Llamar al Tecnico para más Detalles del Problema'
          });
          this.router.navigate(['/offline']);
        } else {
          if (login.data.length != '0') {//Acceso y colocacion de informacion el local
            this._local.clearToken();
            this._local.setJsonValue('user', login.data);
            this.router.navigate(['/home']);
          } else {
            this.Toast.fire({//Error de usuario contraseña
              icon: 'error',
              title: 'Favor de Verificar el Usuario o Contraseña'
            });
          }
        }
      }, (error: any) => {//No esta cargado el servidor
        this.Toast.fire({
          icon: 'error',
          title: 'Llamar al Tecnico para más Detalles del Problema'
        });
        this.router.navigate(['/offline']);
      });

    this.loading = false;
  }
}

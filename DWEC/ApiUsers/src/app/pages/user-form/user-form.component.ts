import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  router = inject(Router);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  userForm: FormGroup;
  tipo: string;

  constructor() {
    this.tipo = "Nuevo";

    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          last_name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          email: new FormControl('', [Validators.required,Validators.email]),
          username: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^[a-zA-Z0-9_.-]+$/)]), 
          password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)]),
          image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)])
        }, []);
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.tipo = "Actualizar"
        const userResponse : User = await this.userService.getById(params._id);

        this.userForm = new FormGroup({
          _id: new FormControl(userResponse._id, []),
          first_name: new FormControl(userResponse.first_name, [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          last_name: new FormControl(userResponse.last_name, [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          email: new FormControl(userResponse.email, [Validators.required, Validators.email]),
          username: new FormControl(userResponse.username, [Validators.required,Validators.minLength(4),Validators.pattern(/^[a-zA-Z0-9_.-]+$/)]), 
          password: new FormControl(userResponse.password, [Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)]),
          image: new FormControl(userResponse.image, [Validators.required, Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)])
        }, []);
      }

    });
  }

    getDataForm() {
      if (this.userForm.invalid) return;
    
      const datosUser: User = this.userForm.value;
    
      if (datosUser._id) {
        this.userService.update(datosUser._id, datosUser)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: `${datosUser.username} actualizado correctamente`,
              showConfirmButton: true,
              timer: 3000
            });
            this.router.navigate(['/users']);
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: `Error al actualizar ${datosUser.username}`,
              showConfirmButton: true
            });
          });
      } else {
        this.userService.insert(datosUser)
          .then((userCreado) => {
            Swal.fire({
              icon: 'success',
              title: `${userCreado.username} creado correctamente`,
              showConfirmButton: true,
              timer: 3000
            });
            this.router.navigate(['/users']);
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error al crear usuario',
              showConfirmButton: true
            });
          });
      }
    }
    
}


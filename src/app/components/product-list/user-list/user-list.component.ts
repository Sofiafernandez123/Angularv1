import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../services/user'; // Ajusta la ruta según la ubicación de tu modelo User
import { UserService } from '../../../services/user.service'; // Ajusta la ruta según la ubicación de tu servicio UserService

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  // Propiedades del componente
  users: User[] = [];
  searchTerm: string = '';
  selectedUser: User | null = null;
  userForm: FormGroup;
  private subscription!: Subscription;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Inicializa el formulario reactivo en el constructor
    this.userForm = this.fb.group({
      id: [''],  // Agrega el campo id al formulario (puede ser un campo oculto)
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Suscripción para obtener la lista de usuarios al inicializar el componente
    this.subscription = this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar pérdidas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Método para filtrar usuarios según el término de búsqueda
  filteredUsers(): User[] {
    return this.users.filter(user =>
      `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm) ||
      `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.userForm.patchValue({
      id: user.id,
      firstname: user.name.firstname,
      lastname: user.name.lastname,
      email: user.email,
      phone: user.phone,
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode
    });
  }
  

  // Método para guardar los cambios realizados en un usuario
  saveUser(): void {
    if (this.userForm.valid) {
      // Crear un objeto con los datos actualizados del usuario
      const updatedUser = {
        id: this.userForm.value.id,
        name: {
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname
        },
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
        address: {
          street: this.userForm.value.street,
          city: this.userForm.value.city,
          zipcode: this.userForm.value.zipcode
        }
      } as User;

      // Llamar al servicio para actualizar el usuario
      this.userService.updateUser(updatedUser).subscribe(user => {
        // Actualizar el usuario en la lista local
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
        this.selectedUser = null; // Limpiar la selección después de guardar
        this.userForm.reset(); // Reiniciar el formulario
      });
    }
  }
 
}

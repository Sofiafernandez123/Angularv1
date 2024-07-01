import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
  @Input() user: any;

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    this.activeModal.close(this.user);
  }
}

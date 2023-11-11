import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
 
  instructions:boolean =false

  constructor(private userService:UserService){
    this.instructions=this.userService.userInstructions
  }
  closeModal(){
    this.userService.userInstructions = false
    this.instructions = false
  }
}

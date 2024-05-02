import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-status',
  templateUrl: './label-status.component.html',
  styleUrls: ['./label-status.component.scss']
})
export class LabelStatusComponent {

  @Input() status : string = "";

  @Input() message: string = ""

}

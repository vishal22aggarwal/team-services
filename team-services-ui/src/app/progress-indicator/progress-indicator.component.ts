import { Component, OnInit } from '@angular/core';
import { ProgressIndicatorService } from '../service/progress-indicator.service';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.css']
})
export class ProgressIndicatorComponent implements OnInit {
  loading$ = this.progressIndicatorService.loading$;

  constructor(private progressIndicatorService:ProgressIndicatorService) {}

  ngOnInit() {}
}

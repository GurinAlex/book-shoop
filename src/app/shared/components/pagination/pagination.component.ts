import { Component, OnInit } from '@angular/core';
import {PaginatorService} from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(public paginationService: PaginatorService) { }

  ngOnInit(): void {
  }

}

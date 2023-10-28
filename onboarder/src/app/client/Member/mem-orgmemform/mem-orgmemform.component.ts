import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

interface MemForm {
  fullName: boolean;
  sex: boolean;
}

@Component({
  selector: 'app-mem-orgmemform',
  templateUrl: './mem-orgmemform.component.html',
  styleUrls: ['./mem-orgmemform.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemOrgmemformComponent implements OnInit {
  memForm$: Observable<MemForm> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.memForm$ = this.http.get<MemForm[]>('http://localhost:5000/api/myMemForm').pipe(
      map(data => data[0])
    );
  
    this.memForm$.subscribe(data => {
      console.log('API Response:', data);
    });
  }
  
  
}

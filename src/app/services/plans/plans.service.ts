import { Plan } from '@/core/models/plan';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

interface FetchPlansResponse {
  data: Plan[];
}

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private httpClient = inject(HttpClient);

  fetchPlans() {
    return this.httpClient
      .get<FetchPlansResponse>(`${environment.url}/plans`)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
}

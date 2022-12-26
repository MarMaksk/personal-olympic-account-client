import {Observable} from "rxjs";

export interface ICRUD<F> {

  API: string;

  create(entity: F, any?: any): Observable<F>;

  update(entity: F): Observable<F>;

  delete(uniqueId: any, any?: any): Observable<void>;

  find(uniqueId: any, any?: any, any2?: any): Observable<F>;

}

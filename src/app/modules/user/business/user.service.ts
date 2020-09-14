import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityRole, SiteUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor() {
    super();
  }

  getRoles(): Observable<SecurityRole[]> {
    return this.get<SecurityRole[]>('/Base/Admin/RoleSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getUsers(roleId?: string): Observable<SiteUser[]> {
    return this.get<SiteUser[]>(
      '/Base/Admin/UserSelectWithRoleId/?roleId=' + roleId,
      'json'
    ).pipe(map((res: any) => res.data));
  }
}

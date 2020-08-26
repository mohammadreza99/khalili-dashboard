import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng';
import { DataService } from '@app/services/data.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  items: MenuItem[] = this.dataService.sideMenuItems;

  ngOnInit() {}

  login() {
    this.authService
      .login({
        MobileNo: '09361253973',
        OTPcode: '000000',
      })
      .subscribe((res: any) => {
        this.authService.saveToken(
          'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.OAVd5ypnODq_oQ6Wb8k0iv3VVzSbReEL_L6PqB0oplF4m6LskRzAGOKdpQpo_JP42ekyQBnrVOb4nZO3cppe3s9ghhxWHLF2DpQRmub821o6bijb2NJqJTly6kLyJAnOpiczILpx3wlZdjqpq9PQUoaVtCmyTGME8phiNiluKOaFqjkq9rznSb1U_AtAOtiKABDaso0RAMKv8BIkhzIRpNA5XWWlsKxAIKhGbURnzTefXq2PmovAjDzLccMN8ZNk_ZTy5nAQHBcZP9KMBVttN8nuQFYwVRXdyYLOwuwT-rpc60XPS--meT2GAOY-iHnsHkKUy1jVF5XqKRhQrLZmNA.ZeHl3p5ayu0W8cpg.TNocIhLjRrw1w8V9WNtSkvg3J9VU6EJ4qDUmN4a-02MmB6DdA-r_sG8G_GjlefqixhoBfXvSTWXU_SGupnJoOHL4UbWT2i_GETRWapeNcJDMj76anMAsP1PpAZp59RRtTKnXVrNIsV3zqPtpiwAoQ8h3rCL04T7LLw.D4JDRCdZYvI5E6ic9jS2sQ'
        );
        localStorage.setItem(
          'token',
          'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.OAVd5ypnODq_oQ6Wb8k0iv3VVzSbReEL_L6PqB0oplF4m6LskRzAGOKdpQpo_JP42ekyQBnrVOb4nZO3cppe3s9ghhxWHLF2DpQRmub821o6bijb2NJqJTly6kLyJAnOpiczILpx3wlZdjqpq9PQUoaVtCmyTGME8phiNiluKOaFqjkq9rznSb1U_AtAOtiKABDaso0RAMKv8BIkhzIRpNA5XWWlsKxAIKhGbURnzTefXq2PmovAjDzLccMN8ZNk_ZTy5nAQHBcZP9KMBVttN8nuQFYwVRXdyYLOwuwT-rpc60XPS--meT2GAOY-iHnsHkKUy1jVF5XqKRhQrLZmNA.ZeHl3p5ayu0W8cpg.TNocIhLjRrw1w8V9WNtSkvg3J9VU6EJ4qDUmN4a-02MmB6DdA-r_sG8G_GjlefqixhoBfXvSTWXU_SGupnJoOHL4UbWT2i_GETRWapeNcJDMj76anMAsP1PpAZp59RRtTKnXVrNIsV3zqPtpiwAoQ8h3rCL04T7LLw.D4JDRCdZYvI5E6ic9jS2sQ'
        );
        console.log(
          'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.OAVd5ypnODq_oQ6Wb8k0iv3VVzSbReEL_L6PqB0oplF4m6LskRzAGOKdpQpo_JP42ekyQBnrVOb4nZO3cppe3s9ghhxWHLF2DpQRmub821o6bijb2NJqJTly6kLyJAnOpiczILpx3wlZdjqpq9PQUoaVtCmyTGME8phiNiluKOaFqjkq9rznSb1U_AtAOtiKABDaso0RAMKv8BIkhzIRpNA5XWWlsKxAIKhGbURnzTefXq2PmovAjDzLccMN8ZNk_ZTy5nAQHBcZP9KMBVttN8nuQFYwVRXdyYLOwuwT-rpc60XPS--meT2GAOY-iHnsHkKUy1jVF5XqKRhQrLZmNA.ZeHl3p5ayu0W8cpg.TNocIhLjRrw1w8V9WNtSkvg3J9VU6EJ4qDUmN4a-02MmB6DdA-r_sG8G_GjlefqixhoBfXvSTWXU_SGupnJoOHL4UbWT2i_GETRWapeNcJDMj76anMAsP1PpAZp59RRtTKnXVrNIsV3zqPtpiwAoQ8h3rCL04T7LLw.D4JDRCdZYvI5E6ic9jS2sQ'
        );
      });
  }
}

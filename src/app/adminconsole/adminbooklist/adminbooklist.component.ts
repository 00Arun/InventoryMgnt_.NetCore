import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService, SessionService, HttpService, AlertService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from 'src/app/_services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationCommon } from 'src/app/_helper/pagination';

@Component({
  selector: 'app-adminbooklist',
  templateUrl: './adminbooklist.component.html',
  styleUrls: ['./adminbooklist.component.scss'],
  providers: [PaginationCommon, DatePipe]
})
export class AdminbooklistComponent implements OnInit {
  currentUser: User;
  public adminbooksListViewModell: any;
  public searchText = '';
  public configPagination: any;
  public resultText: any;
  @ViewChild('Search') SearchParam: ElementRef;
  loading = true;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public sessionService: SessionService,
    public httpService: HttpService,
    public alertService: AlertService,
    public route: ActivatedRoute,
    public datePipe: DatePipe,
    public dialogService: DialogService,
    public authenticationService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.configOnInit();
    this.sessionService.moduleLoadedEvent.emit();
    this.adminbooksListViewModell = new Array;
    this.adminbooksListViewModell.dataArray = new Array<any>();
  }
  public configOnInit() {
    this.configPagination = {
      currentPage: 1,
      itemsPerPage: '10',
      id: 'adminBookPagination',
      totalItems: 0,
      searchText: '',
      statusText: ''
    }
  }
  ngOnInit(): void {
    this.executeSearch();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  public executeSearch() {
    this.loading = true;
    const fipso = {
      'CurrentPage': this.configPagination.currentPage,
      'PageSize': this.configPagination.itemsPerPage,
      'SearchText': this.configPagination.searchText,
      'SortDirection': 'Desc',
      'SortExpression': '',
      'CreatorUserId': '',
    };
    this.adminbooksListViewModell.totalData = this.configPagination.itemsPerPage;
    this.adminbooksListViewModell.dataArray = new Array<any>();
    const url = this.sessionService.appSettings.baseApiUrl + 'Admin/GetAllBookRequest';
    this.httpService.HttpGet<any>(url, fipso).
      subscribe((response: any) => {
        this.onSuccess(response);
      }, response => this.onFailed(response));
  }
  public onSuccess(response: any) {
    if (response.totalRows > 1) {
      this.resultText = "results";
    } else {
      this.resultText = "result";
    }
    this.adminbooksListViewModell.dataArray = response.entity;
    this.adminbooksListViewModell.totalData = response.totalRows;
    this.adminbooksListViewModell.totalPages = response.totalPages;
    this.configPagination.totalItems = response.totalRows;
    this.loading = false;
  }
  public onFailed(error: HttpErrorResponse) {
    this.loading = false;
    const errorResponse: any = error.error;
    if (error.status > 0) {
      this.alertService.showWarning("Error", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showWarning("Error", error.message);
    }
  }
  public onPaginateChange(newPage: number) {
    this.configPagination.currentPage = newPage;
    this.executeSearch();
  }
  // public getBookById(bookId: string) {
  //   this.router.navigate(['/adminconsole/update/' + bookId]);
  // }
  // public deletebookById(bookId: string) {
  //   this.dialogService.openConfirmDialog("Are you sure to delete this record?")
  //   .afterClosed()
  //   .subscribe(res => {
  //     if (res) {
  //       this.deleteBook(bookId);
  //     }
  //   });
  // }
  // public deleteBook(Id: string) {
  //   const url = this.sessionService.appSettings.baseApiUrl + 'InventoryBook';
  //   this.httpService.HttpDelete<any>(url, Id).
  //     subscribe((response: any) => {
  //       this.onDeleteSucess(response);
  //     }, response => this.onFailed(response));
  // }
  // public onDeleteSucess(response: any) {
  //   this.alertService.showSuccess("Error", response.returnMessage[0]);
  //   this.executeSearch();
  // }
  public onKeySearch(event: any) {
    if (event.keyCode !== 13) {
      this.configPagination.searchText = event.target.value != null ? event.target.value : '';
      this.executeSearch();
    }
  }
  public resetSearch() {
    if (this.SearchParam.nativeElement.value != null) {
      this.searchText = '';
      this.SearchParam.nativeElement.value = '';
      this.executeSearch();
    }
  }
  public approveDisApprove(UserServicesId, userId, bookId, status) {
    const requestParam = {
      Id: UserServicesId,
      UserId: userId,
      BookId: bookId,
      Status: status
    }
    const url = this.sessionService.appSettings.baseApiUrl + 'Admin/ApproveDisApprovedUserRequest';
    this.httpService.HttpPost<any>(url, requestParam).subscribe((response: any) => {
      this.onRequestSuccess(response);
    }, response => this.onFailed(response));
  }
  public onRequestSuccess(response: any) {
    this.alertService.showSuccess("", response.returnMessage[0]);
    this.executeSearch();
    this.router.navigate(['/adminconsole/list']);
  }
}

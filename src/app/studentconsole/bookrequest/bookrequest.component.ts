import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService, SessionService, HttpService, AlertService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from 'src/app/_services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationCommon } from 'src/app/_helper/pagination';

@Component({
  selector: 'app-bookrequest',
  templateUrl: './bookrequest.component.html',
  styleUrls: ['./bookrequest.component.scss'],
  providers: [PaginationCommon, DatePipe]
})
export class BookrequestComponent implements OnInit {
  currentUser: User;
  public stubooksListViewModel: any;
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
    this.stubooksListViewModel = new Array;
    this.stubooksListViewModel.dataArray = new Array<any>();
  }
  public configOnInit() {
    this.configPagination = {
      currentPage: 1,
      itemsPerPage: '10',
      id: 'StuBookPagination',
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
      'SortExpression': ''     
    };
    this.stubooksListViewModel.totalData = this.configPagination.itemsPerPage;
    this.stubooksListViewModel.dataArray = new Array<any>();
    const url = this.sessionService.appSettings.baseApiUrl + 'UserServices/GetAllBookList';
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
    this.stubooksListViewModel.dataArray = response.entity;
    this.stubooksListViewModel.totalData = response.totalRows;
    this.stubooksListViewModel.totalPages = response.totalPages;
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
  public requestBook(bookId: string) {
    const requestParam = {
      UserId: this.currentUser.id,
      BookId: bookId
    }
    const url = this.sessionService.appSettings.baseApiUrl + 'UserServices/BookRequest';
    this.httpService.HttpPost<any>(url, requestParam).subscribe((response: any) => {
      this.onRequestSuccess(response);
    }, response => this.onFailed(response));
  }
  public onRequestSuccess(response: any) {    
    this.alertService.showSuccess("", response.returnMessage[0]);
    this.router.navigate(['/studentconsole/list']);
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/_models';
import { AuthenticationService, SessionService, HttpService, AlertService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from 'src/app/_services/dialog.service';
import { PaginationCommon } from 'src/app/_helper/pagination';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [PaginationCommon, DatePipe]
})
export class HistoryComponent implements OnInit {
  currentUser: User;
  public LibbooksListViewModel: any;
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
    this.LibbooksListViewModel = new Array;
    this.LibbooksListViewModel.dataArray = new Array<any>();
  }
  public configOnInit() {
    this.configPagination = {
      currentPage: 1,
      itemsPerPage: '10',
      id: 'libBookPagination',
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
    this.LibbooksListViewModel.totalData = this.configPagination.itemsPerPage;
    this.LibbooksListViewModel.dataArray = new Array<any>();
    const url = this.sessionService.appSettings.baseApiUrl + 'InventoryBook/GetHistoryLog';
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
    this.LibbooksListViewModel.dataArray = response.entity;
    this.LibbooksListViewModel.totalData = response.totalRows;
    this.LibbooksListViewModel.totalPages = response.totalPages;
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
}

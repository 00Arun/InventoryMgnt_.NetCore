import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/_models';
import { SessionService, AlertService, HttpService, AuthenticationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { BookDetails } from '../viewModel/book-requestviewmodel';
@Component({
  selector: 'app-inventoryaddupdate',
  templateUrl: './inventoryaddupdate.component.html',
  styleUrls: ['./inventoryaddupdate.component.scss']
})
export class InventoryaddupdateComponent implements OnInit {
  formData: FormGroup;

  BookViewModel: any;
  containerTitle = "Add";
  submitButtonValue = "Publish";
  bookId: string = null;
  routerSubscription: Subscription;
  currentUser: User;
  urlbookId: any;
  constructor(public sessionService: SessionService,
    public router: Router,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public httpService: HttpService,
    // public dialogService: DialogService,
    public authService: AuthenticationService
  ) {
    this.BookViewModel = new Array();
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }
  ngOnInit() {
    this.resetForm();
    this.routerSubscription = this.route.queryParams.subscribe(params => {
      this.urlbookId = this.route.snapshot.params['id'] != null ? (this.route.snapshot.params['id']) : null;
      if (this.urlbookId != null) {
        this.containerTitle = "Edit";
        this.getBookById(this.urlbookId);
      }
    });
  }
  public resetForm() {
    this.bookId = null;
    this.formData = new FormGroup({
      BookName: new FormControl('', Validators.required),
      BookAuthor: new FormControl('', Validators.required),
      BookPublication: new FormControl('', Validators.required),
      BookType: new FormControl('', Validators.required),
      BookPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9.,]+$")]),
      BookDescription: new FormControl('', Validators.required),
      Stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9.,]+$")]),
    });
  }
  public getBookById(bookId: string) {
    const url = this.sessionService.appSettings.baseApiUrl + 'InventoryBook';
    this.httpService.HttpGetById<any>(url, bookId).subscribe((response: any) => {
      this.bindFormData(response.entity);
    }, response => this.addOrUpdateBookFailed(response));
  }
  public bindFormData(response: any) {
    this.submitButtonValue = "Publish";
    this.bookId = response.id;
    this.formData.patchValue({
      BookName: response.bookName,
      BookAuthor: response.bookAuthor,
      BookPublication: response.bookPublication,
      BookType: response.bookType,
      BookPrice: response.bookPrice,
      BookDescription: response.bookDescription,
      Stock: response.stock,
    });
  }
  public getBookSuccess(response: any) {
    const BookViewModel: any = response.entity;
    this.BookViewModel = BookViewModel;
  }
  public getBookFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    if (error.status > 0) {
      this.alertService.showError("Error", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("Error", error.message);
    }
  }
  public addOrUpdateBook(status: string) {
    if (this.formData.valid) {
      let book = new BookDetails();
      book = this.formData.value;
      book.BookPrice = Number(this.formData.controls["BookPrice"].value);
      book.Stock = Number(this.formData.controls["Stock"].value);
      book.BookStatus = status;
      let url = '';
      if (this.bookId == null) {
        url = this.sessionService.appSettings.baseApiUrl + 'InventoryBook';
        this.httpService.HttpPost<any>(url, book).subscribe((response: any) => {
          this.addOrUpdateBookSuccess(response);
        }, response => this.addOrUpdateBookFailed(response));
      } else {
        url = this.sessionService.appSettings.baseApiUrl + 'InventoryBook/' + this.bookId;
        this.httpService.HttpPut<any>(url, book).subscribe((response: any) => {
          this.addOrUpdateBookSuccess(response);
        }, response => this.addOrUpdateBookFailed(response));
      }
    } else {
      this.alertService.showWarning("", "Invalid form");
    }
  }
  public addOrUpdateBookSuccess(response: any) {
    this.alertService.showSuccess("", response.returnMessage[0]);
    this.router.navigate(['/librarianconsole/list']);

  }
  public addOrUpdateBookFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    console.log(error);
    if (error.status > 0) {
      this.alertService.showError("Error", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("Error", error.message);
    }

  }
  public closeModal() {
    this.router.navigate(["/librarianconsole/list"]);
  }
}
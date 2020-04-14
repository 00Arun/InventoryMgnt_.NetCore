export class ResponseModel {
    public status: Boolean;
    public returnMessage: string[];
    public errors: any[];
    public totalPages: number;
    public totalRows: number;
    public pageSize: number;
    public isAuthenticated: Boolean;
    public sortExpression: string;
    public sortDirection: string;
    public currentPageNumber: number;
  }
  
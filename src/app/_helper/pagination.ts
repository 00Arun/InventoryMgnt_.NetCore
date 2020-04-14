export class PaginationCommon {

    setPagination(configPagination: any) {
      localStorage.setItem('pagination', JSON.stringify(configPagination));
    }
  
    getPagination(): any {
      return JSON.parse((localStorage.getItem('pagination')));
    }
  
    clearPagination() {
      localStorage.removeItem('pagination');
    }
  }
  
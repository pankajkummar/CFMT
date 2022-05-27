import { HttpClient } from '@angular/common/http';
import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CdkTableExporterModule } from 'cdk-table-exporter';



export class Company {
  constructor(
    public id: string,
    public permalink: string,
    public company: string,
    public numEmps: string,
    public category: string,
    public city: string,
    public state: string,
    public fundedDate: string,
    public raisedAmt: string,
    public raisedCurrency: string,
    public round:string

  ) 
 {

 }
}

@Component({
  selector: 'table-cfmt',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit{
  closeResult: string | any;
  
  companies:Company[] | any;
  filterData: Company[] | any;

  company: Company | undefined;
  editForm: FormGroup;
  deleteId: string
  rounds: any;
  round: any;
  newdata: any;
  selected: any;
  selectround: FormGroup
  ELEMENT_DATA: Company[];
  displayedColumns: string[] = ['permalink', 'company', 'numEmps', 'category','city','state','fundedDate','raisedAmt','raisedCurrency','round','action'];
  


 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Company>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    ) {
    
   }

  ngOnInit(): void {
    this.getFriends();
    this.getRound();
    
    


    this.editForm = this.fb.group({
      id: [''],
      permalink: [''],
      company: [''],
      numEmps: [''],
      category: [''],
      city: [''],
      state: [''],
      fundedDate: [''],
      raisedAmt: [''],
      raisedCurrency:[''],
      round: ['']
    });
    this.selectround = this.fb.group({
      roundsdata: [""]
    })

  }


  getFriends(){
    this.http.get<any>('http://localhost:4000/api/').subscribe(
      response => {
        console.log(response);
        this.companies = response;
        this.dataSource = new MatTableDataSource<Company>(response);
        console.log("datasource",this.dataSource)
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:4000/api/create';
    console.log("create data",f.value)
    this.http.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openEdit(targetModal: any , company: Company) {
    console.log("editform data",company);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: company.id, 
      permalink: company.permalink,
      company: company.company,
      numEmps: company.numEmps,
      category: company.category,
      city: company.city,
      state: company.state,
      fundedDate: company.fundedDate,
      raisedAmt: company.raisedAmt,
      raisedCurrency: company.raisedCurrency,
      round: company.round
      

    });
  }

  onSave(){
    const editUrl = 'http://localhost:4000/api/update';
    this.http.post(editUrl, this.editForm.value)
      .subscribe((results)=>{
        this.ngOnInit();
        this.modalService.dismissAll();
      });

  }

  openDelete(contentDelete: any, company:Company) {
    this.deleteId=company.id;
    this.modalService.open(contentDelete, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onDelete(){
    const deleteUrl = 'http://localhost:4000/api/delete';
    this.http.post(deleteUrl, { "id": this.deleteId})
      .subscribe((results)=>{
        this.ngOnInit();
        this.modalService.dismissAll();
      });

  }
  getRound(){
    const roundUrl = 'http://localhost:4000/api/round';
    this.http.get(roundUrl).subscribe((results)=>{
      this.rounds=results
    })
  }

  getSelected(value:any){
  
    console.log("value selected",value)
    console.log("selected",this.selected)
    this.http.post('http://localhost:4000/api/roundwise',{"round":value}).subscribe(
      response => {
        console.log(response);
        this.companies=response;
        this.dataSource = new MatTableDataSource<Company>(this.companies);
        console.log("datasource",this.dataSource)
        this.dataSource.paginator = this.paginator;
      
     
    })

  }
  downloadCsv(){
    console.log(this.companies)
    let Header = ["permalink","company","numEmps","category","city","state","fundedDate","raisedAmt","raisedCurrency","round"]
    Object.keys(this.companies).forEach((name:any,index)=> {
    let Row = []
    for(let i=0; i<Header.length;i++)
    {
     Row.push(this.companies[name][Header[i]]);
    }
    console.log("Row",Row.join(", "));
    
    })
   
    
  }
 
}

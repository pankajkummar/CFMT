import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeResult: string | undefined;
  
  companies:Company[] | undefined;

  company: Company | undefined;
  editForm: FormGroup;
  deleteId: string


  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    ) {
    
   }

  ngOnInit(): void {
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


}

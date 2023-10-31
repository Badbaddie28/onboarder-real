import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

interface MemForm {
orgID: string;
  personalInfo: boolean;
  fullName: boolean;
  sex: boolean;
  birthDate: boolean,
  placceOfBirth : boolean,
  civilStatus: boolean,
  religion: boolean,
  address: boolean,
  zip: boolean,
  email: boolean,
  contactNum: boolean,
  employmentDetails: boolean,
  employer: boolean,
  jobTitle: boolean,
  employerAdd: boolean,
}

@Component({
  selector: 'app-org-memforms',
  templateUrl: './org-memforms.component.html',
  styleUrls: ['./org-memforms.component.css']
})
export class OrgMemformsComponent implements OnInit {

  // MemFormArray : any[] =[];
  // personalInfo= "";
  // fullName= "";
  // sex= "";
  // birthDate = "";
  // placceOfBirth  = "";
  // civilStatus = "";
  // religion = "";
  // address = "";
  // zip = "";
  // email = "";
  // contactNum = "";
  // employmentDetails = "";
  // employer = "";
  // jobTitle = "";
  // employerAdd = "";
  // orgID = "";

  memForm: MemForm | null = null;




  selectedChapter: any;
  newChapterName: string | undefined;
  chapterService: any;

  chapters: any[] = [
    { id: 1, name: 'Chapter 1' },
    { id: 2, name: 'Chapter 2' },
    { id: 3, name: 'Chapter 3' }
  ];
  
  addChapter() {
    // Save the new chapter to the database
    this.chapterService.addChapter(this.newChapterName).subscribe((chapter: any) => {
      // Add the new chapter to the chapters array in the component
      this.chapters.push(chapter);

      // Clear the newChapterName input field
      this.newChapterName = '';
    });
  }

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}


  

  ngOnInit(): void {
    this.getMemForm();
    this.form = this.formBuilder.group({
      fullName: new FormControl(false),
      sex: new FormControl(false),
      personalInfo: new FormControl(false),
      birthDate: new FormControl(false),
      placceOfBirth : new FormControl(false),
      civilStatus: new FormControl(false),
      religion: new FormControl(false),
      address: new FormControl(false),
      zip: new FormControl(false),
      email: new FormControl(false),
      contactNum: new FormControl(false),
      employmentDetails: new FormControl(false),
      employer: new FormControl(false),
      jobTitle: new FormControl(false),
      employerAdd: new FormControl(false),
  
    });
  }

  getMemForm(): void {
    this.http.get<MemForm>('http://localhost:5000/api/memForm', { withCredentials: true })
      .subscribe((resultData: MemForm) => {
        console.log(resultData);
        this.memForm = resultData;

        // Populate the form controls with the received data
        this.form.patchValue(resultData);
      });
  }

 
  submit()  {
     const formData = {
      ...this.form.value,
      orgID: this.memForm?.orgID 
    };

    console.log('orgID:', this.memForm?.orgID);

    this.http.patch(`http://localhost:5000/api/customizeForm/${this.memForm?.orgID}`, formData, { withCredentials: true })
    .subscribe(
      (response: any) => {
        
        console.log(response);
     
        this.router.navigate(['/org-profile']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

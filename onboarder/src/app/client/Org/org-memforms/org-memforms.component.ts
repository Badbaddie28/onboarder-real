import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-memforms',
  templateUrl: './org-memforms.component.html',
  styleUrls: ['./org-memforms.component.css']
})
export class OrgMemformsComponent implements OnInit {
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
    this.form = this.formBuilder.group({
      fullName: new FormControl(false), // Initialize with false for unchecked
      sex: new FormControl(false),
      // Add more form controls for other checkboxes as needed
    });
  }
  // Function to handle form submission
  submit()  {
    const formData = this.form.value;

    // Send the form data to the backend API endpoint
    this.http.post('http://localhost:5000/api/submitForm', formData).subscribe(
      (response: any) => {
        // Handle successful form submission response if needed
        console.log(response);
        // Redirect to a success page or perform other actions
        this.router.navigate(['/org-profile']);
      },
      (error) => {
        // Handle error response if needed
        console.error(error);
      }
    );
  }
}

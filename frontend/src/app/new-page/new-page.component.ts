import { Component } from "@angular/core";

@Component({
  selector: "app-new-page",
  standalone: true,
  imports: [],
  templateUrl: "./new-page.component.html",
  styleUrl: "./new-page.component.scss",
})
export class NewPageComponent {
  constructor() {
    console.log("new page");
  }
}

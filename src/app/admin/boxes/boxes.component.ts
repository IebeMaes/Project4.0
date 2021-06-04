import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronDown, faChevronUp, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box.model';
import { BoxService } from 'src/app/services/box.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  reload: any = this.route.snapshot.paramMap.get("reload");
  boxes: Observable<Box[]>;
  boxesArray: Box[] = [];
  customClass: string = 'customClass';
  term: string = "";
  constructor(private _boxService: BoxService, private router: Router, private spinner: NgxSpinnerService, private _userService: UserService, private route: ActivatedRoute) {
    //console.log(this.reload)
    if(this.reload == "true"){
      this.reload = null
      //console.log("seems to work")
      this.ngOnInit();
      //location.reload()

    }
   }

  ngOnInit(): void {
    this.spinner.show();
    this.boxes = this._boxService.getBoxes();
    this.boxes.subscribe(result => {
      this.boxesArray = result;

      //console.log(result);

      var bar = new Promise<void>((resolve, reject) => {
        this.boxesArray.forEach(item => {
          item["owner"] = item.boxUsers.find(x => x.endDate == null)
          resolve();
        })
      });

      bar.then(() => {
        this.spinner.hide();
      })
    })
  }



  goBoxForm(boxID) {
    this.router.navigate(["/admin/boxes/boxform", { id: boxID }]);
  }

  goBoxEditForm(boxID) {
    this.router.navigate(["/admin/boxes/boxeditform", { id: boxID }]);
  }
  setInactive(box: Box) {
    box.active = false;
    this._boxService.updateBox(box.boxID, box).subscribe(result => {
      this.ngOnInit();
    })
  }

  setActive(box: Box) {
    box.active = true;
    this._boxService.updateBox(box.boxID, box).subscribe(result => {
      this.ngOnInit();
    })
  }

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faPlus = faPlus;
  faPlusSquare = faPlusSquare;


}

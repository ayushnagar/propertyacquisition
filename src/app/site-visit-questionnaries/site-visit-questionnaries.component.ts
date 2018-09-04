import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-visit-questionnaries',
  templateUrl: './site-visit-questionnaries.component.html',
  styleUrls: ['./site-visit-questionnaries.component.css']
})
export class SiteVisitQuestionnariesComponent implements OnInit {

  questions = [
    { question : "Site Visibility from Main Road",
      options : [{ opt : "Select" , color : "white" },
                 { opt : "Fully Visibile" , color : "green" },
                 { opt : "Partial Visibile" , color : "amber"},
                 { opt : "Not Visible", color : "Red"}]
    },
    { question : "Access Road Type",
      options : [{ opt : "Select" , color : "white" },
                 { opt : "Major City/Ring Road" , color : "green" },
                 { opt : "Busy Local/Link Road" , color : "amber"},
                 { opt : "Residential Road", color : "Red"}]
    }
    ,
    { question : "Local Infrastructure/ Traffic Flow",
      options : [{ opt : "Select" , color : "white" },
                 { opt : "Free flowing(beyond 3km)" , color : "green" },
                 { opt : "Free flowing in core catchment" , color : "amber"},
                 { opt : "Poor road infrastructure", color : "Red"}]
    }
  ]
  constructor() {
    console.log(this.questions);
   }

  ngOnInit() {
  }

}


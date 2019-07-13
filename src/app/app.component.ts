interface Location {
	id             : number,
	name           : string,
	status         : any,
	countryFullName: any,
	city           : any,
	mainPhotoUrl   : any,
	ratePerHour    : any,
	currency       : any,
	lat            : any,
	lon            : any,
	maxParticipants: any,
	ratingAvg      : any,
	distance       : any
}

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { Component , OnInit , OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy {
	title = 'map-marker';
	zoom: number = 10;

	location  : Location[] = [] ;
	location$ : Observable<Location[]>  ;

	selectedId : number = 0;

	constructor(private http:HttpClient) {
	}

	ngOnInit(){
		this.location$ = this.getLocations();
		console.log(this.location$);
	}

	getLocations() : Observable<Location[]>{
        return this.http.get<Location[]>('http://team-scale.com/TestData/ng_text_v15/api');
    }

	mapClicked($event: MouseEvent) {
		console.log($event);
		// this.markers.push({
		// 	lat: $event.coords.lat,
		// 	lng: $event.coords.lng,
		// 	draggable: true
		// });
	}

	toggleMarker(id){
		console.log(id);
		this.selectedId = (this.selectedId == id ) ? null : id ;
	}

	getIconUrl(id){
		if(this.selectedId == id){
			return "http://team-scale.com/TestData/ng_text_v15/orange_marker.png";
		}
		return "http://team-scale.com/TestData/ng_text_v15/blue_marker.png";
	}

	onImgError(event){
		event.target.src = 'https://via.placeholder.com/400';
	}
  

	ngOnDestroy() {
		// this.location$.unsubscribe();
	}
}

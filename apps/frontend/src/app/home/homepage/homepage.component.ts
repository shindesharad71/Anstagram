import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service';

@Component({
	selector: 'ia-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	feedItems = [];

	constructor(
		private router: Router,
		private titleService: Title,
		private httpService: HttpService
	) {
		this.titleService.setTitle('Home');
	}

	ngOnInit(): void {
		this.getFeed();
	}

	getFeed(): void {
		this.httpService.get(`feed/${this.feedItems.length}`).subscribe(
			(res: []) => {
				const newItems = [...res];
				this.feedItems = [...this.feedItems, ...newItems];
			},
			err => {
				console.error(err);
			}
		);
	}
}

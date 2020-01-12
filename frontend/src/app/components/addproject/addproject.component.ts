import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
	selector: 'app-addproject',
	templateUrl: './addproject.component.html',
	styleUrls: [ './addproject.component.css' ],
})
export class AddprojectComponent implements OnInit {
	project = {
		title: '',
		description: '',
	};

	constructor(private projectService: ProjectService, private router: Router) {}

	ngOnInit() {}

	addProject() {
		if (this.validator()) {
			this.projectService.saveProject(this.project).subscribe(
				res => {
					swal({
						icon: 'success',
						title: 'Success',
						text: res.message,
						timer: 1000,
					});
					this.router.navigate([ '/index' ]);
				},
				err => {
					swal({
						icon: 'error',
						title: 'Error',
						text: err.error.message,
						timer: 2000,
					});
				}
			);
		}
	}

	validator() {
		if (this.project.title == '') {
			swal({
				icon: 'error',
				title: 'Error',
				text: 'Title is empty',
				timer: 2000,
			});
			return false;
		}
		else if (this.project.description == '') {
			swal({
				icon: 'error',
				title: 'Error',
				text: 'Description is empty',
				timer: 2000,
			});
			return false;
		}
		return true;
	}

	return() {
		swal({
			icon: 'warning',
			title: 'He wants to return?',
			text: 'The data has not been saved',
			buttons: {
				cancel: {
					text: 'Cancel',
					value: false,
					visible: true,
					closeModal: true,
				},
				confirm: {
					text: 'Return',
					value: true,
					visible: true,
				},
			},
		}).then(value => {
			if (value) {
				this.router.navigate([ '/index' ]);
			}
		});
	}
}

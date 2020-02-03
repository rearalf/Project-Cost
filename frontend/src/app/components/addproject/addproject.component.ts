import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

	Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		onOpen: toast => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});

	constructor(private projectService: ProjectService, private router: Router) {}

	ngOnInit() {}

	addProject() {
		if (this.validator()) {
			this.projectService.saveProject(this.project).subscribe(
				res => {
					this.Toast.fire({
						icon: 'success',
						title: res.message,
					});
					this.router.navigate([ '/index' ]);
				},
				err => {
					Swal.fire({
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
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Title is empty',
				timer: 2000,
			});
			return false;
		}
		else if (this.project.description == '') {
			Swal.fire({
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
		this.router.navigate([ '/index' ]);
	}
}

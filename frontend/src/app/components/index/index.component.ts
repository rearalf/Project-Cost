import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: [ './index.component.css' ],
})
export class IndexComponent implements OnInit {
	projects = [];

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

	constructor(private projectService: ProjectService) {}

	ngOnInit() {
		this.GetProjects();
	}

	delete(idProject) {
		this.projectService.deleteProject(idProject).subscribe(
			res => {
				this.Toast.fire({
					icon: 'success',
					title: res.message,
				});
				this.GetProjects();
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

	GetProjects() {
		this.projectService.getProjects().subscribe(
			res => {
				this.projects = res;
			},
			err => {
				console.log(err);
			}
		);
	}
}

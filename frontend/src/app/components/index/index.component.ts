import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import swal from 'sweetalert';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: [ './index.component.css' ],
})
export class IndexComponent implements OnInit {
	projects = [];

	constructor(private projectService: ProjectService) {}

	ngOnInit() {
		this.GetProjects();
	}

	delete(idProject) {
		this.projectService.deleteProject(idProject).subscribe(
			res => {
				swal({
					icon: 'success',
					title: 'Success',
					text: res.message,
					timer: 1000,
				});
				this.GetProjects();
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

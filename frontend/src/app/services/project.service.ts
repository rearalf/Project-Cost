import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private http: HttpClient, private router: Router) {}

	getProjects() {
		return this.http.get<any>(environment.URL + '/project');
	}

	saveProject(project) {
		return this.http.post<any>(environment.URL + '/project', project);
	}

	deleteProject(idProject) {
		return this.http.delete<any>(environment.URL + '/project/' + idProject);
	}
}

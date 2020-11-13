import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
	faEnvelope,
	faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'ia-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	// Icons
	exclamationTriangle = faExclamationTriangle;
	envelope = faEnvelope;

	forgotPasswordForm: FormGroup;
	isEmailInvalid = false;
	isError = false;
	errorMessage = '';

	constructor(private titleService: Title) {
		this.titleService.setTitle('Anstagram - Forgot Password');
	}

	ngOnInit() {
		this.forgotPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email])
		});
	}

	forgotPassword() {
		console.log('forgot password');
	}

	onInputBlur() {
		this.isEmailInvalid =
			this.forgotPasswordForm.controls.email.value &&
			!this.forgotPasswordForm.controls.email.valid;
	}

	removeErrorMessage() {
		if (document.readyState === 'complete') {
			const allNotifications = document.querySelectorAll('.notification');
			allNotifications.forEach((notificationToDelete: any) => {
				notificationToDelete.remove();
			});
		}
	}
}

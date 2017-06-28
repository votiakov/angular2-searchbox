import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe {
	constructor(private sanitizer: DomSanitizer) {}

	public transform(input): any {
		// return this.sanitizer.bypassSecurityTrustStyle(input);
		return this.sanitizer.bypassSecurityTrustHtml(input);
		// return this.sanitizer.bypassSecurityTrustXxx(input); - see docs
	}
}

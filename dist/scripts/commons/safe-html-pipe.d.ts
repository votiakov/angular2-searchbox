import { DomSanitizer } from '@angular/platform-browser';
export declare class SafeHtmlPipe {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(input: any): any;
}

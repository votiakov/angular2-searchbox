"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafeHtmlPipe.prototype.transform = function (input) {
        // return this.sanitizer.bypassSecurityTrustStyle(input);
        return this.sanitizer.bypassSecurityTrustHtml(input);
        // return this.sanitizer.bypassSecurityTrustXxx(input); - see docs
    };
    return SafeHtmlPipe;
}());
SafeHtmlPipe = __decorate([
    core_1.Pipe({ name: 'safeHtml' }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SafeHtmlPipe);
exports.SafeHtmlPipe = SafeHtmlPipe;

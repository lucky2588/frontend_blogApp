import { Directive, DoCheck, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService, getData } from "src/app/auth/serivce/auth.service";


@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit , DoCheck{
  @Input('hasPermission') roles: string[] = [];
  private permissions = [];
  listRole:any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}
  ngDoCheck(): void {
    console.log(this.roles)
    if (!this.roles || !this.roles.length) {
      console.error('RoleCheckDirective: No roles provided.');
      return;
    }
    // Hàm này lấy danh sách roles từ local storage
    if (!this.authService.getUserInfo().isAuthenticated) {
      console.error('RoleCheckDirective: User roles not found in local storage.');
      return;
    }
    const checkRoles =  this.roles.every(item =>  getData('roles').includes(item))
    if (!checkRoles) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }



  ngOnInit() {
    console.log(this.roles)
    if (!this.roles || !this.roles.length) {
      console.error('RoleCheckDirective: No roles provided.');
      return;
    }
    // Hàm này lấy danh sách roles từ local storage
    if (!this.authService.getUserInfo().isAuthenticated) {
      console.error('RoleCheckDirective: User roles not found in local storage.');
      return;
    }
    const checkRoles =  this.roles.every(item =>  getData('roles').includes(item))
    if (!checkRoles) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }

}

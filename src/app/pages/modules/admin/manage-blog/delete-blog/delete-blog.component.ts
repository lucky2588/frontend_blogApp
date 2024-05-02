import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.scss']
})
export class DeleteBlogComponent implements OnInit {
  @Input() id: number = 0;
  @Input() title: string = '';


  isLoading = false;
  subscriptions: Subscription[] = [];
  constructor(
    private service: BlogService,
    private toastrService: ToastrService,
    public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  delete() {
    const sb = this.service.deteleBlog(this.id).pipe(
      tap(() => {
        this.toastrService.success("Delete Blog Seccess !! ");
        setInterval(()=>{
          this.modal.close();
        }
          , 500
        )
      }),
      catchError((err) => {
        this.toastrService.error('Delete Fail !! ');
        return of(undefined);
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe()); // Cancle Sub
  }

}

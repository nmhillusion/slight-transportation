import {
  Component,
  inject,
  Inject,
  OnDestroy,
  OnInit
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertDialog } from "@app/widget/dialog/alert-dialog/alert.dialog";
import { Subscription } from "rxjs";

@Component({
  selector: "",
  template: "",
})
export class BasePage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  protected $router: Router = inject(Router);
  protected $activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected $dialog = inject(MatDialog);

  constructor(@Inject("_NONE_") pageTitle: string) {
    document.title = pageTitle;
  }

  ngOnInit() {
    this.__ngOnInit__();
  }

  protected __ngOnInit__(): any {
    // default: do nothing
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub_) => sub_.unsubscribe());
  }

  registerSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  dialogHandler = {
    alert: (message: string) => {
      this.$dialog.open<AlertDialog>(AlertDialog, {
        data: {
          message,
        }
      });
    },
  };
}

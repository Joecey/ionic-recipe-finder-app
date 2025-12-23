import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-global-menu',
    templateUrl: './global-menu.component.html',
    styleUrls: ['./global-menu.component.scss'],
    standalone: true,
    imports: [RouterLink],
})
export class GlobalMenuComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

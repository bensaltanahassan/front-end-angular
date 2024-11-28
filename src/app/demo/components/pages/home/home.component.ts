import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/_core/services/store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    username: string;
    role: string;
    balance:number;
    ID:number;
    email:string;

    constructor(private storeService: StoreService) {}

    ngOnInit(): void {
        this.username = this.storeService.get_DataSession('name');
        this.role = this.storeService.get_DataSession('role');
        this.email = this.storeService.get_DataSession('email');
        this.balance=this.storeService.get_DataSession('balance');
        this.ID=this.storeService.get_DataSession('user_id');
    }
}

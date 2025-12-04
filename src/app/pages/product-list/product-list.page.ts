import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss']   // <- garante carregar o SCSS
})
export class ProductListPage implements OnInit {

  products: any[] = [];

  constructor(
    private api: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.api.list().subscribe((res: any) => this.products = res);
  }

  edit(id?: string) {
    this.router.navigate(['/product-form', id ?? 'new']);
  }

  remove(id: string) {
    if (confirm("Excluir produto?"))
      this.api.delete(id).subscribe(() => this.load());
  }
}

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

  get totalProducts() {
    return this.products.length;
  }

  get totalStock() {
    return this.products.reduce((total, product) => {
      return total + this.toNumber(product?.stock);
    }, 0);
  }

  get inventoryWorth() {
    return this.products.reduce((total, product) => {
      const price = this.toNumber(product?.price);
      const stock = this.toNumber(product?.stock) || 1;
      return total + price * stock;
    }, 0);
  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number') {
      return isNaN(value) ? 0 : value;
    }
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }
}

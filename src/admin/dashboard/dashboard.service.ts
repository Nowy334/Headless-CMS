import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class DashboardService {
  constructor(private orderService: OrdersService) {}
  async findAll() {
    const orders = await this.orderService.findAll();
    const numberOfAllOrders = orders.length;
    const RevenueOrders =
      numberOfAllOrders > 0
        ? orders.reduce(
            (initialValue, curr) => initialValue + curr.totalPrice,
            0,
          )
        : 0;
    const averageOrderPrice = RevenueOrders / numberOfAllOrders;

    const dates =
      numberOfAllOrders > 0
        ? orders.map((order) => new Date(order.date).toLocaleDateString())
        : [];

    const NumberOfOrdersOnGivenDay = [];

    dates.length > 0
      ? dates.forEach((item) => {
          let found = false;
          NumberOfOrdersOnGivenDay.forEach((res) => {
            if (res.date === item) {
              res.quantity++;
              found = true;
            }
          });
          if (!found) {
            NumberOfOrdersOnGivenDay.push({ date: item, quantity: 1 });
          }
        })
      : [];

    const quantities =
      NumberOfOrdersOnGivenDay.length > 0
        ? NumberOfOrdersOnGivenDay.map((item) => item.quantity)
        : [];
    const maxQuantity = quantities.length > 0 ? Math.max(...quantities) : 100;

    return {
      numberOfAllOrders,
      RevenueOrders,
      averageOrderPrice,
      NumberOfOrdersOnGivenDay: NumberOfOrdersOnGivenDay.sort(this.sortItems),
      maxQuantity,
    };
  }

  sortItems(a, b) {
    const dateA = a.date.split('.');
    const dateB = b.date.split('.');
    const dayA = parseInt(dateA[0]);
    const monthA = parseInt(dateA[1]);
    const yearA = parseInt(dateA[2]);
    const dayB = parseInt(dateB[0]);
    const monthB = parseInt(dateB[1]);
    const yearB = parseInt(dateB[2]);

    if (yearA < yearB) {
      return -1;
    }
    if (yearA > yearB) {
      return 1;
    }

    if (monthA < monthB) {
      return -1;
    }
    if (monthA > monthB) {
      return 1;
    }

    if (dayA < dayB) {
      return -1;
    }
    if (dayA > dayB) {
      return 1;
    }

    return 0;
  }
}

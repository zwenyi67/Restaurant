<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table= 'orders';
    protected $guarded = [];

    public function menuType()
    {
        return $this->belongsTo(MenuType::class);
    }

    public function table()
    {
        return $this->belongsTo(RestaurantTable::class);
    }

    public function waiter()
    {
        return $this->belongsTo(User::class);
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_orders', 'order_id', 'menu_id')->withPivot('quantity');
    }
}

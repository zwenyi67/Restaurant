<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table= 'menus';
    protected $guarded = [];
    
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn ($query, $search) =>
        $query->where(fn($query) =>
        $query
            ->where('name', 'like', '%' . $search . '%')
        ));

        $query->when($filters['type'] ?? false, fn ($query, $type) =>
        $query->whereHas('menuType', fn ($query) =>
        $query->where('id', $type)));
    }

    public function menuType()
    {
        return $this->belongsTo(MenuType::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'menu_orders', 'menu_id', 'order_id')->withPivot('quantity');
    }


}

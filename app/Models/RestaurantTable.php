<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantTable extends Model
{
    use HasFactory;

    protected $table= 'restaurant_tables';
    protected $guarded = [];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn ($query, $search) =>
        $query->where(fn($query) =>
        $query
            ->where('name', 'like', '%' . $search . '%')
        ));

        // $query->when($filters['category'] ?? false, fn ($query, $category) =>
        // $query->whereHas('category', fn ($query) =>
        // $query->where('id', $category)));
    }
}

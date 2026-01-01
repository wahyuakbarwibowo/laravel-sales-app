<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'image',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function saleItems()
    {
        return $this->hasMany(SaleItems::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    protected $fillable = [
        'sale_code',
        'sale_date',
        'total_qty',
        'total_price',
        'status'
    ];

    public function items()
    {
        return $this->hasMany(SaleItems::class);
    }

    public function payments()
    {
        return $this->hasMany(Payments::class);
    }

    public static function generateCode()
    {
        return 'SL-' . now()->format('Ymd') . '-' . str_pad(
            Self::count() + 1, 5, '0', STR_PAD_LEFT
        );
    }
}

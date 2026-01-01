<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $fillable = [
        'payment_code',
        'payment_date',
        'amount',
    ];

    public function sales()
    {
        return $this->belongsTo(Sales::class);
    }

    public static function generateCode()
    {
        return 'PY-' . now()->format('Ymd') . '-' . str_pad(
            Self::count() + 1, 5, '0', STR_PAD_LEFT
        );
    }
}

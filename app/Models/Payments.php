<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'sale_id',
        'payment_date',
        'amount',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function sales()
    {
        return $this->belongsTo(Sales::class, 'sale_id');
    }

    public static function generateCode()
    {
        $last = self::whereDate('created_at', today())
            ->orderByDesc('id')
            ->first();

        $number = $last ? intval(substr($last->code, -4)) + 1 : 1;

        return 'PB-' . now()->format('Ymd') . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}

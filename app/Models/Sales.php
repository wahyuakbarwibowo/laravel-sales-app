<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'sale_date',
        'total_qty',
        'total_amount',
        'status'
    ];

    protected $casts = [
        'sale_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(SaleItems::class);
    }

    public function payments()
    {
        return $this->hasMany(Payments::class);
    }

    public function getTotalPaidAttribute()
    {
        return $this->payments()->sum('amount');
    }

    public function refershStatus()
    {
        $totalPaid = $this->total_paid;

        if ($totalPaid == 0) {
            $this->status = 'BELUM_DIBAYAR';
        } elseif ($totalPaid < $this->total_amount) {
            $this->status = 'BELUM_DIBAYAR_SEPENUHNYA';
        } else {
            $this->status = 'SUDAH_DIBAYAR';
        }

        $this->save();
    }

    public static function generateCode()
    {
        $last = self::whereDate('created_at', today())
            ->orderByDesc('id')
            ->first();
        $number = $last ? intval(substr($last->code, -4)) + 1 : 1;

        return 'SL-' . now()->format('Ymd') . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}

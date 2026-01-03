<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use App\Models\Sales;
use App\SaleStatus;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payment = Payments::with('sale')
            ->when($request->from && $request->to, function ($q) use ($request) {
                $q->whereBetween('payment_date', [$request->from, $request->to]);
            })
            ->orderByDesc('payment_date')
            ->paginate(10);

        return Inertia::render('payments/index', [
            'payments' => $payment,
            'filters' => $request->only('from', 'to'),
        ]);
    }

    public function create()
    {
        return Inertia::render('payments/create', [
            'sales' => Sales::whereIn('status', [
                SaleStatus::BELUM_DIBAYAR,
                SaleStatus::BELUM_DIBAYAR_SEPENUHNYA,
            ])->get(),
            'code' => Payments::generateCode(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sale_id' => 'required|exists:sales,id',
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $sale = Sales::findOrFail($request->sale_id);

            $totalPaid = $sale->payment()->sum('amount');

            if ($totalPaid + $request->amount > $sale->total_amount) {
                abort(422, 'Pembayaran melebihi total penjualan');
            }

            Payments::create([
                'code' => Payments::generateCode(),
                'sale_id' => $sale->id,
                'payment_date' => $request->payment_date,
                'amount' => $request->amount,
            ]);

            $this->updateSaleStatus($sale);
        });

        return redirect()->route('payment.index')->with('success', 'Pembayaran berhasil');
    }

    public function show(Payments $payment)
    {
        $payment->load('sale');

        return Inertia::render('payments/show', [
            'payment' => $payment
        ]);
    }

    public function edit(Payments $payment)
    {
        return Inertia::render('payments/edit', [
            'payment' => $payment,
        ]);
    }

    public function update(Request $request, Payments $payment)
    {
        $request->validate([
            'payment_date' => 'required|date',
            'amount' => 'required|numeric|min:1',
        ]);

        DB::transaction(function () use ($request, $payment) {
            $sale = $payment->sale;

            $otherPayment = $sale->payment()
            ->where('id', '!=', $payment->id)
            ->sum('amount');

            if ($otherPayment + $request->amount > $sale->total_amount) {
                abort(422, 'Pembayaran melebihi total penjualan');
            }

            $payment->update([
                'payment_date' => $request->payment_date,
                'amount' => $request->amount,
            ]);

            $this->updateSaleStatus($sale);
        });

        return redirect()->route('payment.index')->with('success', 'Pembayaran berhasil di-update');
    }

    public function destroy(Payments $payment)
    {
        DB::transaction(function () use ($payment) {
            $sale = $payment->sale;
            $payment->delete();

            $this->updateSaleStatus($sale);
        });

        return back()->with('success', 'Pembayaran berhasil dihapus');
    }

    private function updateSaleStatus(Sales $sale)
    {
        $totalPaid = $sale->payments()->sum('amount');

        if ($totalPaid == 0) {
            $sale->status = SaleStatus::BELUM_DIBAYAR;
        } elseif ($totalPaid < $sale->total_amount) {
            $sale->status = SaleStatus::BELUM_DIBAYAR_SEPENUHNYA;
        } else {
            $sale->status = SaleStatus::SUDAH_DIBAYAR;
        }

        $sale->save();
    }
}

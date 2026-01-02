<?php

namespace App\Http\Controllers;

use App\Models\Items;
use App\Models\SaleItems;
use App\Models\Sales;
use App\SaleStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $sales = Sales::with('user')
            ->when($request->from && $request->to, function ($q) use ($request) {
                $q->whereBetween('sale_date', [$request->from, $request->to]);
            })
            ->orderByDesc('sale_date')
            ->paginate(10);

        return Inertia::render('sales/index', [
            'sales' => $sales,
            'filters' => $request->only('from', 'to'),
        ]);
    }

    public function create()
    {
        return Inertia::render('sales/create', [
            'items' => Items::all(),
            'sale_code' => Sales::generateCode(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        DB::transaction(function () use ($request) {
            $totalAmount = 0;
            $totalQty = 0;

            foreach ($request->items as $item) {
                $totalAmount += $item['qty'] * $item['price'];
                $totalQty += $item['qty'];
            }

            $sale = Sales::create([
                'sale_code' => Sales::generateCode(),
                'user_id' => auth()->id(),
                'sale_date' => $request->sale_date,
                'total_amount' => $totalAmount,
                'total_qty' => $totalQty,
                'status' => 'BELUM_DIBAYAR',
            ]);

            foreach ($request->items as $item) {
                SaleItems::create([
                    'sale_id' => $sale->id,
                    'item_id' => $item['item_id'],
                    'qty' => $item['qty'],
                    'price' => $item['price'],
                    'total_price' => $item['qty'] * $item['price']
                ]);
            }
        });

        return redirect()->route('sales.index')->with('success', 'Penjualan berhasil dibuat');
    }

    public function show(Sales $sale)
    {
        $sale->load('items.item', 'payments');

        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }

    public function edit(Sales $sale)
    {
        if ($sale->status === SaleStatus::SUDAH_DIBAYAR) {
            abort(403, 'Penjualan sudah dibayar tidak bisa di-edit');
        }

        $sale->load('items');

        return Inertia::render('sales/edit', [
            'sale' => $sale,
            'items' => Items::all(),
        ]);
    }

    public function update(Request $request, Sales $sale)
    {
        if ($sale->status === SaleStatus::SUDAH_DIBAYAR) {
            abort(403);
        }

        $request->validate([
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.item_id' => 'required|exists:items,id',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($request, $sale) {
            $sale->items()->delete();

            $totalAmount = 0;
            $totalQty = 0;

            foreach ($request->items as $item) {
                $totalAmount += $item['qty'] * $item['price'];
                $totalQty += $item['qty'];

                SaleItems::create([
                    'sale_id' => $sale->id,
                    'item_id' => $item['item_id'],
                    'qty' => $item['qty'],
                    'price' => $item['price'],
                    'total_price' => $item['qty'] * $item['price'],
                ]);
            }

            $sale->update([
                'sale_date' => $request->sale_date,
                'total_amount' => $totalAmount,
                'total_qty' => $totalQty,
            ]);
        });

        return redirect()->route('sales.index')->with('success', 'Penjualan berhasil di-update');
    }

    public function destroy(Sales $sale)
    {
        if ($sale->status === SaleStatus::SUDAH_DIBAYAR) {
            abort(403);
        }

        $sale->delete();

        return back()->with('success', 'Penjualan berhasil dihapus');
    }
}

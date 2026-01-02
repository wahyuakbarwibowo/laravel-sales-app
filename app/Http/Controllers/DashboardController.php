<?php

namespace App\Http\Controllers;

use App\Models\SaleItems;
use App\Models\Sales;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $from = $request->from ?? now()->startOfMonth()->toDateString();
        $to = $request->to ?? now()->endOfMonth()->toDateString();

        $totalTransactions = Sales::whereBetween('sale_date', [$from, $to])->count();

        $totalSales = Sales::whereBetween('sale_date', [$from, $to])->sum('total_amount');

        $totalQty = SaleItems::whereHas('sale', function ($q) use ($from, $to) {
            $q->whereBetween('sale_date', [$from, $to]);
        })->sum('qty');

        $salesPerMonth = Sales::selectRaw("
            EXTRACT(MONTH FROM sale_date) as month,
            SUM(total_amount) as total
        ")
            ->whereYear('sale_date', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $qtyPerItem = SaleItems::selectRaw("
            items.name as item,
            SUM(qty) as total_qty
        ")
            ->join('items', 'items.id', '=', 'sale_items.item_id')
            ->groupBy('items.name')
            ->orderByDesc('total_qty')
            ->get();

        return Inertia::render('dashboard/index', [
            'filters' => compact('from', 'to'),
            'widgets' => [
                'transactions' => $totalTransactions,
                'sales' => $totalSales,
                'qty' => $totalQty,
            ],
            'charts' => [
                'salesPerMonth' => $salesPerMonth,
                'qtyPerItem' => $qtyPerItem
            ],
        ]);
    }
}

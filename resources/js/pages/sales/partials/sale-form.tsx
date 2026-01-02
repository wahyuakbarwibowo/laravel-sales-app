import { Item, Sale, SaleItemForm } from "@/types";
import { useForm } from "@inertiajs/react";

interface Props {
  items: Item[]
  sale?: Sale
  submitUrl: string
  method?: 'post' | 'put'
}

export default function SaleForm({ items, sale, submitUrl, method = 'post' }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    sale_date: sale?.sale_date ?? '',
    items: sale?.items?.map((i: any) => ({
      item_id: i.item_id,
      qty: i.qty,
      price: i.price,
      total_price: i.total_price
    })) ?? [
        { item_id: '', qty: 1, price: 0, total_price: 0 }
      ],
  })

  const submit = () => {
    method === 'post' ? post(submitUrl) : put(submitUrl)
  }

  const updateRow = (index: number, key: keyof SaleItemForm, value: any) => {
    const rows = [...data.items]
    rows[index][key] = value

    if (key === 'item_id') {
      const item = items.find((i) => i.id === Number(value))
      rows[index].price = item?.price ?? 0
      rows[index].qty = 1
    }

    rows[index].total_price = rows[index].qty * rows[index].price
    setData('items', rows)
  }

  const addRow = () => {
    setData('items', [...data.items, { item_id: '', qty: 1, price: 0, total_price: 0 }])
  }

  const removeRow = (index: number) => {
    setData('items', data.items.filter((_: any, i: number) => i !== index))
  }

  const grandTotal = data.items.reduce((t, i) => t + i.total_price, 0)

  return (
    <div className="space-y-6">
      <div>
        <label>Tanggal Penjualan</label>
        <input
          type="date"
          className="input"
          value={data.sale_date}
          onChange={e => setData('sale_date', e.target.value)}
        />
        {errors.sale_date && <p className="text-red-500">{errors.sale_date}</p>}
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  className="input"
                  value={row.item_id}
                  onChange={e => updateRow(index, 'item_id', e.target.value)}>
                  <option value="">Pilih Item</option>
                  {items.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  type="number"
                  min={1}
                  className="input"
                  value={row.qty}
                  onChange={e => updateRow(index, 'qty', Number(e.target.value))}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="input"
                  value={row.price}
                  readOnly
                />
              </td>

              <td>
                <input
                  type="number"
                  className="input"
                  value={row.total_price}
                  readOnly
                />
              </td>

              <td>
                {data.items.length > 1 && (
                  <button type="button" onClick={() => removeRow(index)}>
                    ❌
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button>
        + Tambah Item
      </button>

      <div className="text-right font-bold">
        Grand Total: Rp {grandTotal.toLocaleString()}
      </div>

      <button
        onClick={submit}
        disabled={processing}
        className="btn-primary"
      >
        Simpan
      </button>
    </div>


  )
}
// pages/api/update-stock.js
import { decreaseProductStock } from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({ error: 'Missing productId or quantity' });
      }

      // 商品の在庫数を減少させる
      await decreaseProductStock(productId, quantity);
      res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

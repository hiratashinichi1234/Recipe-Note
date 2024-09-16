import { updateProductStock } from '../../app/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { products } = req.body;

      // 各商品の在庫を更新
      await Promise.all(products.map(({ productId, quantity }) =>
        updateProductStock(productId, quantity)
      ));

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

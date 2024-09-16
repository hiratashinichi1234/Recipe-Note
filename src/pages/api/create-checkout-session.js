import Stripe from 'stripe';
import { getProductById } from '../../app/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { recipeId, quantity, price } = req.body;
      
      // 商品情報の取得
      const product = await getProductById(recipeId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Stripe セッションの作成
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: {
                name: product.name,
              },
              unit_amount: product.price, // 表示価格と同じ価格を使用
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/content?page=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/content?page=cancel`,
        metadata: {
          productId: recipeId,
          quantity: quantity.toString(),
        },
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error in checkout session creation:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

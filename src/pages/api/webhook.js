// /pages/api/webhook.js
import { buffer } from 'micro';
import Stripe from 'stripe';
import { decreaseProductStock } from '../../app/lib/db'; // 在庫を更新する関数をインポート

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout Session completed:', session);

      // メタデータから商品IDと数量を取得
      const productId = session.metadata.productId;
      const quantity = parseInt(session.metadata.quantity, 10);

      // 在庫数を減少させる
      try {
        await decreaseProductStock(productId, quantity);
        console.log(`Stock decreased for product ${productId}. Quantity: ${quantity}`);
      } catch (error) {
        console.error('Failed to decrease stock:', error.message);
        return res.status(500).json({ error: 'Failed to update stock' });
      }
      break;

    // その他のイベントタイプに対する処理
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

export default handler;

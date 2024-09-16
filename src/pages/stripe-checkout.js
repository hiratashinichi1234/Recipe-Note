'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

// 環境変数名の修正
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeCheckout = () => {
  useEffect(() => {
    const handleCheckout = async () => {
      const stripe = await stripePromise;

      try {
        // API エンドポイントを呼び出してセッション ID を取得
        const response = await fetch('/api/create-checkout-session', { method: 'POST' });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { id: sessionId } = await response.json();

        if (!sessionId) {
          throw new Error('No session ID returned from the server.');
        }

        // Stripe Checkout にリダイレクト
        const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

        if (stripeError) {
          console.error('Stripe Checkout Error:', stripeError);
        }
      } catch (error) {
        console.error('Error handling checkout:', error);
        // ユーザーにエラーメッセージを表示する処理を追加することも検討
      }
    };

    handleCheckout();
  }, []);

  return <p>Redirecting to checkout...</p>;
};

export default StripeCheckout;

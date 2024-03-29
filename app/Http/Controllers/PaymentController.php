<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Omnipay\Omnipay;
use App\Models\Payment;
use Inertia\Inertia;
use App\Models\Post;

class PaymentController extends Controller
{
    private $gateway;

    public function __construct() {
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId(env('PAYPAL_CLIENT_ID'));
        $this->gateway->setSecret(env('PAYPAL_CLIENT_SECRET'));
        $this->gateway->setTestMode(true);
    }

    public function pay(Request $request)
    {
        $payer_id = $request->buyer_id;
        $post_id = $request->post_id;
        $seller_id = $request->seller_id;
    
        session(['payer_id' => $payer_id]);
        session(['post_id' => $post_id]);
        session(['seller_id' => $seller_id]);

        try {

            $response = $this->gateway->purchase([
                'amount' => $request->amount,
                'currency' => env('PAYPAL_CURRENCY'),
                'returnUrl' => url('success'),
                'cancelUrl' => url('error')
            ])
            ->send();



            if ($response->isRedirect()) {
                $redirectUrl = $response->getRedirectUrl();
                return Inertia::location($redirectUrl);
            }
            
            else{
                return $response->getMessage();
            }

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function success(Request $request)
    {
        if ($request->input('paymentId') && $request->input('PayerID')) {
            $transaction = $this->gateway->completePurchase(array(
                'payer_id' => $request->input('PayerID'),
                'transactionReference' => $request->input('paymentId')
            ));

            $response = $transaction->send();

            if ($response->isSuccessful()) {

                $arr = $response->getData();


                $payer_id = session('payer_id');
                $post_id = session('post_id');
                $seller_id = session('seller_id');

                $payment = new Payment();
                $payment->payment_id = $arr['id'];
                $payment->payer_id = $arr['payer']['payer_info']['payer_id'];
                $payment->payer_email = $arr['payer']['payer_info']['email'];
                $payment->amount = $arr['transactions'][0]['amount']['total'];
                $payment->currency = env('PAYPAL_CURRENCY');
                $payment->payment_status = $arr['state'];
                $payment->buyer_id = $payer_id;
                $payment->post_id = $post_id;
                $payment->seller_id = $seller_id;

                $payment->save();

                NotificationsController::createPurchaseNotification($payer_id, $post_id);

                // Post::find($post_id)->update(array('user_id' => $payer_id));
                $post = Post::find($post_id);
                $post->user_id = $payer_id;
                $post->price = -1;
                $post->save();

                return Inertia::render('Posts/PaymentSuccess')->with(['pId' => $arr['id']]);

            }
            else{
                return Inertia::render('Posts/PaymentFailure')->with(['message'=> $response->getMessage()]);
            }
        }
        else{
            return Inertia::render('Posts/PaymentFailure')->with(['message'=> 'Payment declined.']);
        }
    }

    public function error()
    {
        return Inertia::render('Posts/PaymentFailure')->with(['message'=> 'There was an error with your payment.']);
    }
}

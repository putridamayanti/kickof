exports.CreateStripePayment = async (params) => {
    const { secret, order } = params;

    const stripe = require("stripe")(secret);
    const items = [];

    order.items.forEach(item => {
        items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.subtotal * 100
            },
            quantity: item.qty
        });
    });

    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}?status=complete&order_id=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}?status=cancel&order_id=${order.id}`
    });
}
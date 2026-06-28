import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getUserToken } from "@/lib/core/session";

export async function POST(request) {
  try {
    const { taskId, proposalId, taskTitle, budget } = await request.json();
    const origin = process.env.BETTER_AUTH_URL;
    const token = await getUserToken(); 

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: taskTitle,
              description: `SkillSwap payment for: ${taskTitle}`,
            },
            unit_amount: Math.round(budget * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { taskId, proposalId },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&proposalId=${proposalId}&taskId=${taskId}&token=${encodeURIComponent(token || "")}`, 
      cancel_url: `${origin}/dashboard/client/proposals`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
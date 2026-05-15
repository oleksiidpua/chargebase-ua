type OrderNotification = {
  id: number | string;
  customer_name: string;
  phone: string;
  email?: string | null;
  city: string;
  np_branch: string;
  comment?: string | null;
};

type ContactNotification = {
  name: string;
  contact: string;
  question: string;
};

type SendOptions = {
  text: string;
  reply_markup?: unknown;
};

async function sendTelegram({ text, reply_markup }: SendOptions): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_IDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_IDS not set — skipping');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = {
    text,
    parse_mode: 'HTML' as const,
    disable_web_page_preview: true,
    ...(reply_markup ? { reply_markup } : {}),
  };

  const results = await Promise.allSettled(
    chatIds.map((chat_id) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, ...body }),
      }).then(async (res) => {
        if (!res.ok) {
          const errText = await res.text().catch(() => '');
          throw new Error(`telegram ${res.status}: ${errText}`);
        }
      })
    )
  );

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[telegram] failed for chat_id=${chatIds[i]}:`, r.reason);
    }
  });
}

export async function sendOrderNotification(order: OrderNotification): Promise<void> {
  const adminUrl = `https://chargebase-ua.vercel.app/admin/orders/${order.id}`;

  const text = [
    '🛒 <b>Новый заказ — ChargeBase UA</b>',
    '',
    `<b>Имя:</b> ${esc(order.customer_name)}`,
    `<b>Телефон:</b> <code>${esc(order.phone)}</code>`,
    order.email ? `<b>Email:</b> ${esc(order.email)}` : null,
    `<b>Город:</b> ${esc(order.city)}`,
    `<b>Отделение НП:</b> ${esc(order.np_branch)}`,
    order.comment ? `<b>Комментарий:</b> ${esc(order.comment)}` : null,
  ]
    .filter((l): l is string => l !== null)
    .join('\n');

  await sendTelegram({
    text,
    reply_markup: {
      inline_keyboard: [[{ text: '👤 Открыть в админке', url: adminUrl }]],
    },
  });
}

export async function sendContactNotification(data: ContactNotification): Promise<void> {
  const text = [
    '❓ <b>Вопрос с сайта — ChargeBase UA</b>',
    '',
    `<b>Имя:</b> ${esc(data.name)}`,
    `<b>Контакт:</b> <code>${esc(data.contact)}</code>`,
    '',
    `<b>Вопрос:</b>`,
    esc(data.question),
  ].join('\n');

  await sendTelegram({ text });
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

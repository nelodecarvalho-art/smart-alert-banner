import { authenticate } from "../shopify.server";
import db from "../db.server";

// GET — carrega as configurações do banner do banco
export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const settings = await db.bannerSetting.findFirst({
    where: { shop },
  });

  if (!settings) {
    // Retorna valores padrão se ainda não configurou
    return Response.json({
      bannerText: "🎉 Free shipping for customers in your state!",
      targetState: "CA",
      showState: true,
      backgroundColor: "#ff6b00",
      textColor: "#ffffff",
      isActive: true,
      deadline: "",
    });
  }

  return Response.json(settings);
}

// POST — salva ou atualiza as configurações no banco
export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { bannerText, targetState, showState, backgroundColor, textColor, isActive, deadline } = body;

  if (!bannerText || bannerText.trim() === "") {
    return Response.json({ error: "Texto do banner é obrigatório" }, { status: 400 });
  }
  if (!targetState || targetState.trim() === "") {
    return Response.json({ error: "Estado alvo é obrigatório" }, { status: 400 });
  }

  const existing = await db.bannerSetting.findFirst({ where: { shop } });

  let saved;
  if (existing) {
    saved = await db.bannerSetting.update({
      where: { id: existing.id },
      data: {
        bannerText: bannerText.trim(),
        targetState: targetState.trim().toUpperCase(),
        showState: showState ?? true,
        backgroundColor: backgroundColor || "#ff6b00",
        textColor: textColor || "#ffffff",
        isActive: isActive ?? true,
        deadline: deadline || null,
      },
    });
  } else {
    saved = await db.bannerSetting.create({
      data: {
        shop,
        bannerText: bannerText.trim(),
        targetState: targetState.trim().toUpperCase(),
        showState: showState ?? true,
        backgroundColor: backgroundColor || "#ff6b00",
        textColor: textColor || "#ffffff",
        isActive: isActive ?? true,
        deadline: deadline || null,
      },
    });
  }

  return Response.json({ success: true, settings: saved });
}

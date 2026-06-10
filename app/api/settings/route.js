export async function GET() {
  // Buscar do banco de dados/sessão/arquivo
  const settings = {
    bannerText: "Frete grátis para clientes da Califórnia!",
    targetState: "CA",
    showStateOnBanner: false,
  };
  return Response.json(settings);
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Validar dados
    if (!body.bannerText || !body.targetState) {
      return Response.json({ error: "Campos obrigatórios" }, { status: 400 });
    }
    // Salvar no banco...
    console.log("Salvo:", body);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
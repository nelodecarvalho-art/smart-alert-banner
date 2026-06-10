export async function loader() {
  const script = `
    (function() {
      console.log("🚀 Banner script carregado!");
      var banner = document.createElement('div');
      banner.innerHTML = '<div style="background:#ff6b00;color:#fff;padding:15px;text-align:center;font-weight:bold;">🎉 TESTE: Banner do Smart Alert Banner funcionando!</div>';
      document.body.insertBefore(banner, document.body.firstChild);
    })();
  `;

  return new Response(script, {
    headers: { "Content-Type": "application/javascript" }
  });
}
import { useEffect, useState } from "react";

export default function StoreBanner() {
  const [settings, setSettings] = useState(null);
  const [customerState, setCustomerState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        // Buscar configurações do banner
        const response = await fetch("/api/settings");
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error("Erro ao carregar banner:", error);
      }
    }
    
    async function detectCustomerState() {
      try {
        // Detectar estado do cliente via IP
        // Usando ipapi.co (gratuito, sem necessidade de API key)
        const response = await fetch("https://ipapi.co/region_code/");
        const state = await response.text();
        setCustomerState(state.trim());
      } catch (error) {
        console.error("Erro ao detectar localização:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSettings();
    detectCustomerState();
  }, []);

  if (loading) return null;
  if (!settings || !customerState) return null;
  if (settings.targetState !== customerState) return null;

  return (
    <div style={{
      background: settings.backgroundColor || "#ff6b00",
      color: settings.textColor || "#ffffff",
      padding: "15px 20px",
      textAlign: "center",
      position: "sticky",
      top: 0,
      zIndex: 999,
      fontWeight: "bold",
      fontSize: "16px",
      fontFamily: "inherit",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      {settings.bannerText || "🎉 Promoção especial!"}
      {settings.showState && (
        <span style={{ 
          display: "block", 
          fontSize: "12px", 
          opacity: 0.9,
          marginTop: "5px"
        }}>
          📍 Oferta válida apenas para clientes de {settings.targetState}
        </span>
      )}
    </div>
  );
}
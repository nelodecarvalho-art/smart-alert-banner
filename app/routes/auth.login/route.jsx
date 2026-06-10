import { useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";

export const loader = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return { errors };
};

export const action = async ({ request }) => {
  const errors = loginErrorMessage(await login(request));
  return { errors };
};

export default function Auth() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f6f6f7",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: "40px 32px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        width: "100%",
        maxWidth: 400
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#222" }}>
          Smart Alert Banner — Log in
        </h1>
        <Form method="post">
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#444" }}>
              Shop domain
            </label>
            <input
              name="shop"
              type="text"
              placeholder="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              autoComplete="on"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1.5px solid #e0e0e0",
                borderRadius: 8,
                fontSize: 15,
                boxSizing: "border-box"
              }}
            />
            {errors?.shop && (
              <p style={{ color: "#c0392b", fontSize: 13, marginTop: 4 }}>{errors.shop}</p>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px 0",
              background: "#ff6b00",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
}

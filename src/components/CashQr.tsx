import QRCode from "qrcode";
import { giving } from "@/lib/site";

/**
 * A scannable QR code for the church's Cash App link, drawn at build time
 * from `giving.url` in site.ts. Change the link there and the code follows.
 */
export default async function CashQr({ className = "" }: { className?: string }) {
  if (!giving.url) return null;
  const svg = await QRCode.toString(giving.url, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#07140e", light: "#ffffff" } });
  return <div className={className} role="img" aria-label={`QR code that opens Cash App to give to ${giving.tag}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}

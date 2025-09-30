import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    // Example HTML template for the PDF
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>AI Signal Pro — Visibility Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #2E7D32; font-size: 24px; }
          h2 { color: #1565C0; font-size: 20px; margin-top: 20px; }
          p  { font-size: 14px; margin: 5px 0; }
          .section { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>AI Signal Pro — Website Visibility Report</h1>
        <div class="section">
          <h2>Summary</h2>
          <p>Website: example.com</p>
          <p>Visibility Score: 75%</p>
        </div>
        <div class="section">
          <h2>Recommendations</h2>
          <p>1. Ensure robots.txt is accessible.</p>
          <p>2. Provide a valid sitemap.xml.</p>
          <p>3. Add proper X-Robots-Tag headers.</p>
        </div>
      </body>
      </html>
    `;

    // Launch Puppeteer and create PDF
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf",
      },
    });
  } catch (error: any) {
    return new NextResponse(`Error generating PDF: ${error.message}`, {
      status: 500,
    });
  }
}

import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

export async function generateReports(url: string, date: string, analysis: any) {
  const ownerBuffer = await renderToBuffer(
    <ReportPDF_Owner url={url} date={date} {...analysis} />
  );

  const developerBuffer = await renderToBuffer(
    <ReportPDF_Developer url={url} date={date} {...analysis} />
  );

  return { ownerBuffer, developerBuffer };
}

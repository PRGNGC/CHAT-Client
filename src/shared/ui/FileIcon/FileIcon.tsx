import { AccdbSvg } from "../AccdbSvg";
import { CssSvg } from "../CssSvg";
import { DocxSvg } from "../DocxSvg";
import { FileSvg } from "../FileSvg";
import { JpgSvg } from "../JpgSvg";
import { JsSvg } from "../JsSvg";
import { JsonSvg } from "../JsonSvg";
import { Mp3Svg } from "../Mp3Svg";
import { MpgSvg } from "../MpgSvg";
import { PdfSvg } from "../PdfSvg";
import { PngSvg } from "../PngSvg";
import { PptxSvg } from "../PptxSvg";
import { ReactSvg } from "../ReactSvg";
import { SassSvg } from "../SassSvg";
import { SqlSvg } from "../SqlSvg";
import { SvgSvg } from "../SvgSvg";
import { TsSvg } from "../TsSvg";
import { TxtSvg } from "../TxtSvg";
import { VueSvg } from "../VueSvg";
import { XlsxSvg } from "../XlsxSvg";
import { ZipSvg } from "../ZipSvg";

interface IFileIcon {
	fileExtension: string;
}

export function FileIcon({ fileExtension }: IFileIcon) {
	switch (fileExtension.toLowerCase()) {
		case "pptx":
			return <PptxSvg />;
		case "docx":
			return <DocxSvg />;
		case "doc":
			return <DocxSvg />;
		case "xlsx":
			return <XlsxSvg />;
		case "json":
			return <JsonSvg />;
		case "js":
			return <JsSvg />;
		case "ts":
			return <TsSvg />;
		case "tsx":
			return <ReactSvg />;
		case "jsx":
			return <ReactSvg />;
		case "vue":
			return <VueSvg />;
		case "txt":
			return <TxtSvg />;
		case "accdb":
			return <AccdbSvg />;
		case "scss":
			return <SassSvg />;
		case "css":
			return <CssSvg />;
		case "png":
			return <PngSvg />;
		case "svg":
			return <SvgSvg />;
		case "jpg":
			return <JpgSvg />;
		case "sql":
			return <SqlSvg />;
		case "mp3":
			return <Mp3Svg />;
		case "pdf":
			return <PdfSvg />;
		case "zip":
			return <ZipSvg />;
		case "mpg":
			return <MpgSvg />;
		default:
			return <FileSvg />;
	}
}

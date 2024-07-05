import styles from "./DownloadFile.module.scss";
import type { IFile } from "@/entities/message/types";
import { b64toBlob } from "@/shared/utils/b64toBlob";
import { FileIcon } from "@/shared/ui/FileIcon";
import { downloadFile } from "@/entities/message/api/messagesApi";
import { DownloadSvg } from "@/shared/ui/DownloadSvg";

interface IDownloadFile {
	file: IFile;
}

const imgExtensions = ["png", "jpg", "jpeg", "svg"];

export function DownloadFile({ file }: IDownloadFile) {
	if (imgExtensions.includes(file.extension)) {
		return (
			<div className={styles.fileImgBlock}>
				<div className={styles.overshadowing}>
					<div className={styles.downloadSvgBlock}>
						<DownloadSvg />
					</div>
				</div>
				<img
					className={styles.fileImg}
					src={file.url}
					alt="img"
					onClick={async () => {
						const blob = await downloadFile(`${file.name}.${file.extension}`);
						const url = URL.createObjectURL(b64toBlob(blob.file, file.type));
						const link = document.createElement("a");
						link.href = url;
						link.download = `${file.name}.${file.extension}`;

						document.body.appendChild(link);

						link.click();

						link.parentNode?.removeChild(link);
					}}
				/>
			</div>
		);
	}
	return (
		<div
			onClick={async () => {
				const blob = await downloadFile(`${file.name}.${file.extension}`);
				const url = URL.createObjectURL(b64toBlob(blob.file, file.type));
				const link = document.createElement("a");
				link.href = url;
				link.download = `${file.name}.${file.extension}`;

				document.body.appendChild(link);

				link.click();

				link.parentNode?.removeChild(link);
			}}
			className={styles.fileInfoBlock}
		>
			{`${file.name}.${file.extension}`}
			<FileIcon fileExtension={file.extension} />
		</div>
	);
}

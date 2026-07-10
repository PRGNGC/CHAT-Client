import styles from "./DownloadFile.module.scss";
import type { IFile } from "@/entities/message/types";
import { b64toBlob } from "@/shared/utils/b64toBlob";
import { FileIcon } from "@/shared/ui/FileIcon";
import { downloadFile } from "@/entities/message/api/messagesApi";
import { DownloadSvg } from "@/shared/ui/DownloadSvg";
import { ExpandSvg } from "@/shared/ui/ExpandSvg";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ImageModal } from "@/widgets/ImageModal";

interface IDownloadFile {
	file: IFile;
}

const imgExtensions = ["png", "jpg", "jpeg", "svg"];

export function DownloadFile({ file }: IDownloadFile) {
	const [expandImageModal, setExpandImageModal] = useState<boolean>(false);

	if (imgExtensions.includes(file.extension)) {
		return (
			<div className={styles.fileImgBlock}>
				<div className={styles.overshadowing}>
					<div
						className={styles.downloadSvgBlock}
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
					>
						<DownloadSvg />
					</div>
					<div
						className={styles.expandSvgBlock}
						onClick={() => setExpandImageModal(true)}
					>
						<ExpandSvg />
					</div>
				</div>
				<img
					className={styles.fileImg}
					src={file.url}
					alt="img"
					// onClick={async () => {
					// 	const blob = await downloadFile(`${file.name}.${file.extension}`);
					// 	const url = URL.createObjectURL(b64toBlob(blob.file, file.type));
					// 	const link = document.createElement("a");
					// 	link.href = url;
					// 	link.download = `${file.name}.${file.extension}`;

					// 	document.body.appendChild(link);

					// 	link.click();

					// 	link.parentNode?.removeChild(link);
					// }}
				/>
				{expandImageModal &&
					createPortal(
						<ImageModal
							onClose={setExpandImageModal}
							fileUrl={file.url}
						/>,
						document.body
					)}
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

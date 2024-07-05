import styles from "./CreateMessageForm.module.scss";
import { LightingSvg } from "@/shared/ui/LightingSvg";
import { ChainSvg } from "@/shared/ui/ChainSvg";
import { TagSvg } from "@/shared/ui/TagSvg";
import { SmileSvg } from "@/shared/ui/SmileSvg";
import { ClipSvg } from "@/shared/ui/ClipSvg";
import { useState } from "react";
import { CreateMessage } from "@/features/message/CreateMessage";
import { sendActiveMessageStatus } from "@/entities/message/api/messagesApi";
import { sendIdleMessageStatus } from "@/entities/message/api/messagesApi";
import { FileIcon } from "@/shared/ui/FileIcon";
import { DeleteSvg } from "@/shared/ui/DeleteSvg";
import { useSocketContext } from "@/app/contextProviders/useSocketContext";

export function CreateMessageForm() {
	const [message, setMessage] = useState<string>("");
	const [files, setFiles] = useState<File[] | null>(null);
	const socket = useSocketContext();

	return (
		<div className={styles.createMessageBlock}>
			<div className={styles.inputBlock}>
				<p className={styles.inputBlockPrompt}>Message</p>
				<textarea
					onChange={(e) => setMessage(e.target.value)}
					className={styles.inputField}
					onFocus={() => sendActiveMessageStatus(socket)}
					onBlur={() => sendIdleMessageStatus(socket)}
					value={message}
				/>
			</div>
			<div className={styles.attachedFiles}>
				{files?.map((file: File) => {
					return (
						<div
							key={crypto.randomUUID()}
							className={styles.attachedFile}
						>
							<div className={styles.attachedFileCommonInfo}>
								<p>{file.name}</p>
								<FileIcon fileExtension={file.name.split(".")[1]} />
							</div>
							<p
								className={styles.deleteFile}
								onClick={() => {
									setFiles((prev) => {
										const newFileArr = prev?.filter(
											(filee) => filee.name !== file.name
										);
										return newFileArr ? newFileArr : null;
									});
								}}
							>
								<DeleteSvg />
							</p>
						</div>
					);
				})}
			</div>
			<div className={styles.additionalFunctionality}>
				<div className={styles.additionalFunctionalityFirstBlock}>
					<LightingSvg />
					<p className={styles.boldSvg}>B</p>
					<p className={styles.italicSvg}>I</p>
					<ChainSvg />
					<TagSvg />
				</div>
				<div className={styles.additionalFunctionalitySecondBlock}>
					<p className={styles.alphabetSvg}>Aa</p>
					<p className={styles.atSvg}>@</p>
					<SmileSvg />
					<div className={styles.attachFileButton}>
						<input
							onChange={(e) => {
								const newFile = (e.target.files as FileList)[0];
								setFiles((prev) => {
									if (prev === null) {
										return [newFile];
									}
									return [...prev, newFile];
								});
							}}
							type="file"
						/>
						<ClipSvg />
					</div>
					<CreateMessage
						files={files}
						message={message}
						onEraseMessage={setMessage}
						onEraseFiles={setFiles}
					/>
				</div>
			</div>
		</div>
	);
}

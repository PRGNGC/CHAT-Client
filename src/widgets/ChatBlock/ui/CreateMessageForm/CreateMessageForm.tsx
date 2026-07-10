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
import { useRef } from "react";
import { sendMessage } from "@/entities/message";
import TextareaAutosize from "react-textarea-autosize";

export function CreateMessageForm() {
	const [message, setMessage] = useState<string>("");
	const [files, setFiles] = useState<File[] | null>(null);
	const socket = useSocketContext();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className={styles.createMessageBlock}>
			<div className={styles.inputBlock}>
				{/* <p className={styles.inputBlockPrompt}>Сообщение</p> */}
				{/* <textarea
					onChange={(e) => {
						setMessage(e.target.value);
						// textareaRef.current.style.height = "auto";
					}}
					className={styles.inputField}
					onFocus={() => sendActiveMessageStatus(socket)}
					onBlur={() => sendIdleMessageStatus(socket)}
					value={message}
					ref={textareaRef}
					rows={2}
					// запрет на перенос строки в textarea
					onKeyDown={(e) => {
						if (e.keyCode == 13 && !e.shiftKey) {
							e.preventDefault();
						}
					}}
					// отправка сообщения при нажатии на Enter
					onKeyUp={(e) => {
						// отслеживание нажатия на Enter
						if (e.keyCode == 13) {
							// проверка на пустое сообщение
							if (message === "" && files === null) return;

							sendMessage(socket, message, files);
							setFiles(null);
							setMessage("");
						}
					}}
				/> */}
				<TextareaAutosize
					onChange={(e) => {
						setMessage(e.target.value);
						// textareaRef.current.style.height = "auto";
					}}
					className={styles.inputField}
					onFocus={() => sendActiveMessageStatus(socket)}
					onBlur={() => sendIdleMessageStatus(socket)}
					value={message}
					ref={textareaRef}
					minRows={2}
					maxRows={4}
					// запрет на перенос строки в textarea
					onKeyDown={(e) => {
						if (e.keyCode == 13 && !e.shiftKey) {
							e.preventDefault();
						}
					}}
					// отправка сообщения при нажатии на Enter
					onKeyUp={(e) => {
						// отслеживание нажатия на Enter
						if (e.keyCode == 13) {
							// проверка на пустое сообщение
							if (message === "" && files === null) return;

							sendMessage(socket, message, files);
							setFiles(null);
							setMessage("");
						}
					}}
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
								{/* <FileIcon fileExtension={file.name.split(".")[1]} /> */}
								<FileIcon fileExtension={file.name.split(".").reverse()[0]} />
							</div>
							<p
								className={styles.deleteFile}
								onClick={() => {
									setFiles((prev) => {
										// проверка на наличие уже добавляемого файла
										const newFileArr = prev?.filter(
											(filee) => filee.name !== file.name
										);
										return newFileArr?.length >= 1 ? newFileArr : null;
										// return newFileArr ? newFileArr : null;
									});
								}}
							>
								{/* для тега DeleteSvg свойство cursor: pointer прописано в svg файле */}
								<DeleteSvg />
							</p>
						</div>
					);
				})}
			</div>
			<div className={styles.additionalFunctionality}>
				<div className={styles.additionalFunctionalityFirstBlock}>
					{/* для тега LightingSvg свойство cursor: pointer прописано в svg файле */}
					<LightingSvg />
					<p className={styles.boldSvg}>B</p>
					<p className={styles.italicSvg}>I</p>
					{/* для тега ChainSvg свойство cursor: pointer прописано в svg файле */}
					<ChainSvg />
					{/* для тега TagSvg свойство cursor: pointer прописано в svg файле */}
					<TagSvg />
				</div>
				<div className={styles.additionalFunctionalitySecondBlock}>
					<p className={styles.alphabetSvg}>Aa</p>
					<p className={styles.atSvg}>@</p>
					{/* для тега SmileSvg свойство cursor: pointer прописано в svg файле */}
					<SmileSvg />
					<div className={styles.attachFileButton}>
						<input
							onChange={(e) => {
								const newFile = (e.target.files as FileList)[0];
								// console.log("newFile", newFile);
								if (newFile !== undefined) {
									setFiles((prev) => {
										if (prev === null) {
											return [newFile];
										}
										return [...prev, newFile];
									});
								}
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

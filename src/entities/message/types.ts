export interface IFile {
	name: string;
	extension: string;
	file: string;
	type: string;
	url: string;
}

export interface IMessage {
	content: string;
	userName: string;
	userImg: string;
	userId: string;
	filesInfo: IFile[];
	type: string;
}

export interface ISocketMessage {
	message: IMessage;
	messageOrigin: string;
}

export const chatWrapperStyle = (props, state) => {

	let borderStyle = {};
	if (props._parent.trim().length === 0) {
		if (state.viewdetailscreen || state.threadmessageview) {
			borderStyle = {
				borderLeft: `1px solid ${props.theme.borderColor.primary}`,
				borderBottom: `1px solid ${props.theme.borderColor.primary}`,
			};
		} else {
			borderStyle = {
				borderLeft: `1px solid ${props.theme.borderColor.primary}`,
				borderRight: `1px solid ${props.theme.borderColor.primary}`,
				borderBottom: `1px solid ${props.theme.borderColor.primary}`,
			};
		}
	}

	const mq = [...props.theme.breakPoints];

	const secondaryViewWidth = (state.threadmessageview || state.viewdetailscreen) ? {
        width: "calc(100% - 400px)",
        [`@media ${mq[1]}, ${mq[2]}`]: {
            width: "100%",
        },
        [`@media ${mq[3]}, ${mq[4]}`]: {
            width: "0",
            display: "none",
        },
    } : {
        width: "100%",
    };

	return {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		boxSizing: "border-box",
		position: "relative",
		overflowX: "hidden",
    	overflowY: "scroll",
		fontFamily: `${props.theme.fontFamily}`,
		...borderStyle,
		...secondaryViewWidth,
		"*": {
			boxSizing: "border-box",
			fontFamily: `${props.theme.fontFamily}`,
			"::-webkit-scrollbar": {
				width: "8px",
				height: "4px",
			},
			"::-webkit-scrollbar-track": {
				background: "#ffffff00",
			},
			"::-webkit-scrollbar-thumb": {
				background: "#ccc",
				"&:hover": {
					background: "#aaa",
				},
			},
		},
	};
};

export const extHeader = context => {

	return {
		display: "inline-block",
		fontSize: "11px",
		fontWeight: "500",
		lineHeight: "12px",
		textTransform: "lowercase",
		padding: "0 10px",
		cursor: "pointer",
		color: context.theme.color.blue,
		"&:hover": {
			textDecoration: "underline",
		},
	};
};

export const threadContainer = context => {

	return {
		margin: "20px",
		padding: "10px",
		border: "1px solid #afabab",
		borderRadius: "20px"
	};
};

export const threadBox = context => {

	return {
		float: "left",
		width: "70px",
		height: "70px",
		borderRadius: "1px"
	};
};

export const threadAvatar = context => {

	return {
		float: "left",
		width: "70px",
		height: "70px",
		borderRadius: "1px"
	};
};

export const threadUserDetail = context => {

	return {
		float: "left",
		marginLeft: "8px",
		borderRadius: "1px",
    	lineHeight: "17px",
    	wordWrap: "break-word",
    	marginLeft: "8px",
	};
};



export const threadSender = context => {

	return {
		minHeight: "70px",
		lineHeight: "2",
		// backgroundColor: "#efdddd"
	};
};

export const threadReceiver = context => {

	return {
		minHeight: "70px",
		lineHeight: "2"
	};
};

export const detailName = context => {

	return {
		fontWeight: "700",
	};
};
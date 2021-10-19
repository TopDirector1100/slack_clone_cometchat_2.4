
export const wrapperStyle = context => {

	return {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		height: "100%",
		boxSizing: "border-box",
		fontFamily: `${context.theme.fontFamily}`,
		"*": {
			boxSizing: "border-box",
			fontFamily: `${context.theme.fontFamily}`,
		},
	};
};

export const headerStyle = context => {

	return {
		padding: "16px",
		width: "100%",
		backgroundColor: `${context.theme.backgroundColor.white}`,
		zIndex: "1",
		borderBottom: `1px solid ${context.theme.borderColor.primary}`,
		height: " 69px",
		display: "flex",
	};
};

export const headerWrapperStyle = () => {

    return {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    }
}

export const headerDetailStyle = () => {

    return {
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 40px)",
    }
}

export const headerTitleStyle = () => {

    return {
        margin: "0",
        fontSize: "15px",
        fontWight: "600",
        lineHeight: "22px",
        width: "100%",
    }
}

export const headerNameStyle = () => {

    return {
        fontSize: "13px",
        lineHeight: "20px",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
}

export const headerCloseStyle = (img, context) => {

    return {
        cursor: "pointer",
        width: "24px",
        height: "24px",
        mask: `url(${img}) center center no-repeat`,
        backgroundColor: `${context.theme.primaryColor}`
    }
}

export const messageContainerStyle = (event) => {

    return {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        transition: "background .3s ease-out .1s",
        width: "100%",
        zIndex: "100",
        minHeight: "calc(100% - 68px)",
        order: "2",
        ".chat__list": {
            minHeight: "250px",
            ".list__wrapper": {
                "::-webkit-scrollbar": {
                    display: "none"
                },
                scrollbarWidth: "none"
            }
        },
    }
}

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
		margin: "10px 20px",
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
		width: "50px",
		height: "50px",
		borderRadius: "15px",
		padding: "6px"
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
		minHeight: "50px",
		lineHeight: "1.7",
	};
};

export const threadReceiver = context => {

	return {
		minHeight: "50px",
		lineHeight: "1.7"
	};
};

export const detailName = context => {

	return {
		fontWeight: "700",
		marginRight: "10px"
	};
};

export const noResult = context => {

	return {
		fontSize: "20px",
    	margin: "0 auto",
    	position: "absolute",
    	top: "50%",
    	left: "40%",
		textAlign: "center",
		width: "40%"
	};
};

export const noResultImage = context => {

	return {
    	margin: "0 auto"
	};
};

export const chatSideBarBtnStyle = (img, props, context) => {

    const displayValue = (props.hasOwnProperty("sidebar") && props.sidebar === 0) ? { display: "none!important"} : {};

    const mq = [...context.theme.breakPoints];

    return {
        cursor: "pointer",
        display: "none",
        mask: `url(${img}) center center no-repeat`,
        backgroundColor: `${context.theme.primaryColor}`,
        width: "24px",
        height: "24px",
        float: "left",
        [`@media ${mq[1]}, ${mq[2]}`]: {
			display: "block"
		},
        ...displayValue
    }
}

export const chatContainerStyle = () => {

    return {
        display: "flex", 
        width: "100%", 
        height: "100%"
    }
}




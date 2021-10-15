export const chatsWrapperStyle = (props, theme) => {

    const borderStyle = (props._parent === "") ? {
        border: `1px solid ${theme.borderColor.primary}`
    } : {};

    return {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        backgroundColor: "#3f0e40",
        ...borderStyle,
        "*": {
            boxSizing: "border-box",
            "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
            },
            "::-webkit-scrollbar-track": {
                background: "#ffffff00"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                    background: "#aaa"
                }
            }
        }
    }
}

export const TitleHeaderStyle = theme => {

	return {
		padding: "16px",
		position: "relative",
		display: "flex",
		alignItems: "center",
		borderBottom: `1px solid #fff`,
		height: "70px",
        margin: "0",
        color:"#fff",
        marginBottom: "20px"
	};
};

export const chatsHeaderStyle = theme => {
	return {
		padding: "0 16px",
		display: "flex",
		alignItems: "center",
		height: "35px",
        backgroundColor: "#3f0e40",
        color: "#ede6e6",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#b994942e"
        }
	};
};

export const chatsHeaderStyleMore = theme => {
	return {
		padding: "0 16px",
		display: "flex",
		alignItems: "center",
		height: "35px",
        backgroundColor: "#3f0e40",
        color: "#ede6e6",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        position: "relative"
	};
};

export const chatsHeaderCloseStyle = (img, theme) => {

	const mq = [...theme.breakPoints];

	return {
		cursor: "pointer",
		display: "none",
		mask: `url(${img}) no-repeat left center`,
		backgroundColor: `${theme.primaryColor}`,
		height: "24px",
		width: "33%",
		[`@media ${mq[0]}`]: {
			display: "block!important",
		},
	};
};

export const chatsHeaderTitleStyle = (props) => {

    const alignment = (props.hasOwnProperty("enableCloseMenu") && props.enableCloseMenu.length > 0) ? {
        width: "33%",
        textAlign: "center"
    } : {};
    
    return {
        margin: "0",
        display: "inline-block",
        width: "100%",
        textAlign: "left",
        fontSize: "20px",
        backgroundColor: "#3f0e40",
        ...alignment,
        "&[dir=rtl]": {
            textAlign: "right",
        }
    }
}

export const materialIcons = () => {
    return {
        fontSize: "25px !important",
        marginRight: "10px"
    }
}

export const materialIcons_opt = () => {
    return {
        fontSize: "18px !important",
        marginRight: "10px",
        "&:hover": {
            cursor: "pointer",
        }
    }
}

export const chatsMsgStyle = () =>{

    return {
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
    }
}

export const chatsMsgTxtStyle = theme => {
    
	return {
		margin: "0",
		minHeight: "36px",
		color: `${theme.color.secondary}`,
		fontSize: "20px!important",
		fontWeight: "600",
		lineHeight: "30px",
		wordWrap: "break-word",
		padding: "0 16px",
	};
};

export const chatsListStyle = () => {

    return {
        // height: "calc(100% - 75px)",
        width: "100%",
        overflowY: "auto",
        margin: "0",
        padding: "0",
        backgroundColor: "#3f0e40",
        color: "#FFFFFF",
    }
}
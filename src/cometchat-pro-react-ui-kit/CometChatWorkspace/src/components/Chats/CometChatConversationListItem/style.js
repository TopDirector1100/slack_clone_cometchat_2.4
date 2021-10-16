export const listItem = (props) => {

    const selectedState = (props.selectedConversation 
        && props.selectedConversation.conversationId === props.conversation.conversationId) ? {
        backgroundColor: "#0870d8",
        '&:hover': {
            pointerEvents: "none"
        },
    } : {};

    return {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
        padding: "0px 16px",
        position: "relative",
        color: "#fff !important",
        '&:hover': {
            backgroundColor: "#b994942e",
        },
        ...selectedState,
        fontSize: "18px",
        fontWeight: "500",
        verticalAlign: "middle",
        margin: "5px 0"
    }
}

export const itemThumbnailStyle = () => {

    return {
        display: "inline-block",
        width: "36px",
        height: "36px",
        flexShrink: "0",
        padding: "5px",
        marginRight: "5px"
    }
}

export const itemChannelStyle = () => {

    return {
        display: "inline-block",
        width: "36px",
        height: "36px",
        flexShrink: "0",
        padding: "10px",
        lineHeight: "1",
        textAlign:"center"
    }
}

export const itemDetailStyle = () => {

    return {
        width: "calc(100% - 45px)",
        flexGrow: "1",
        // paddingLeft: "16px",
        "&[dir=rtl]": {
            paddingRight: "16px",
            paddingLeft: "0",
        },
        color: "#fff",
        '&:hover': {
        },
    }
}

export const itemRowStyle = () => {

    return {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    }
}

export const itemNameStyle = () => {

    return {
        fontSize: "16px",
        fontWeight: "200",
        display: "block",
        width: "calc(100% - 70px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
}

export const itemLastMsgStyle = (props) => {

    return {
        margin: "0",
        fontSize: "13px",
        width: "calc(100% - 50px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: "20px",
    }
}

export const itemLastMsgTimeStyle = (props) => {

    return {
        fontSize: "11px",
        width: "70px",
        textAlign: "right",
    }
}
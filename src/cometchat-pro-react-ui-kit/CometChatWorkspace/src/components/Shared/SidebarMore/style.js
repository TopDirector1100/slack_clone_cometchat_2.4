export const notificationContainerStyle = (props, keyframes) => {

    return {
        fontSize: "14px",
        boxSizing: "border-box",
        position: "absolute",
        zIndex: "5",
        width: "85%",
        maxWidth: "320px",
        top: "40px",
        left: "70%",
        transform: "translate(-50%, 0)"
    }
}

export const notificationStyle = (props, state) => {

    return {
        transition: ".3s ease",
        position: "relative",
        pointerEvents: "auto",
        overflow: "hidden",
        padding: "8px",
        marginBottom: "16px",
        fontSize: "13px",
        width: "100%",
        minHeight: "50px",
        boxShadow: "0 0 10px #999",
        color: "#222020",
        backgroundColor: "#f5f2f2",
        backgroundPosition: "15px",
        backgroundRepeat: "no-repeat",
        display: "block",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        borderRadius: "5px"
    }
}

export const notificationIconStyle = () => {

    return {
        marginRight: "16px",
        width: "25px",
        height: "25px",
        flexShrink: "0",
        "img": {
            maxWidth: "100%",
        }
    }
}

export const notificationMessageContainerStyle = () => {

    return {
        width: "calc(100% - 60px)"
    }
}

export const notificationMessageStyle = () => {

    return {
        margin: "0",
        textAlign: "left",
        marginLeft: "-1px",
    }
}

export const notificationCloseButtonStyle = () => {

    return {
        width: "25px",
        height: "25px",
        padding: "0",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        cursor:" pointer",
        "img": {
            flexShrink: "0",
            maxWidth: "100%"
        }
    }
}

export const iconStyle = (img, theme) => {

    return {
        width: "24px",
        height: "24px",
        display: "inline-block",
        mask: `url(${img}) center center no-repeat`,
        backgroundColor: `${theme.color.white}`,
    };
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

export const toast__item = () => {
    return {
        verticalAlign: "middle",
        display: "flex",
        height: "30px",
        padding: "10px 2px",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#cfcccc"
        }
    }
}


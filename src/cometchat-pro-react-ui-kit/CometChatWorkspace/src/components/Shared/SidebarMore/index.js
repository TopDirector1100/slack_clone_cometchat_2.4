import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import PropTypes from "prop-types";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import {
    notificationContainerStyle,
    notificationStyle,
    materialIcons_opt,
    toast__item
} from "./style";

import { 
	Comment, 
	AlternateEmail,
	TurnedInNot,
	Notes,
	Forum
} from '@material-ui/icons'

export class SidebarMore extends React.Component {

    constructor(props) {

        super(props);

        this._isMounted = false;
        this.state = { 
            type: "",
            message: ""
        };
    }

    render() {
        return (
            <div css={notificationContainerStyle(this.props, keyframes)} className="toast__notification">
                <div css={notificationStyle(this.props, this.state)} className="toast__container">
                    <div css={toast__item()} onClick={this.props.showThreads}>
                        <Comment css={materialIcons_opt()} className="materialIcons" />Threads
                    </div>
                    <div css={toast__item()} onClick={this.props.showReaction}><AlternateEmail css={materialIcons_opt()} className="materialIcons" />Mentions & reactions</div>
                    <hr />
                    <div css={toast__item()} onClick={this.props.showSavedItem}><TurnedInNot css={materialIcons_opt()} className="materialIcons" />Saved items</div>
                    <div css={toast__item()} onClick={this.props.showAllUnRead}><Notes css={materialIcons_opt()} className="materialIcons" />All unread</div>
                    <hr />
                    <div css={toast__item()} onClick={this.props.showAllDms}><Forum css={materialIcons_opt()} className="materialIcons" />All DMs</div>
                </div>
            </div>
        );
    }
}

SidebarMore.defaultProps = {
	type: "",
	message: "",
	icon: "",
	position: "center",
	autoDelete: true,
	dismissTime: 3000,
	lang: Translator.getDefaultLanguage(),
	theme: theme,
};

// SidebarMore.propTypes = {
// 	type: PropTypes.oneOf(Object.values(CometChatToastNotification.types).concat("")),
// 	message: PropTypes.string.isRequired,
// 	icon: PropTypes.string.isRequired,
// 	position: PropTypes.oneOf(["top-right", "bottom-right", "top-left", "bottom-left", "center"]),
// 	autoDelete: PropTypes.bool,
// 	dismissTime: PropTypes.number,
// 	lang: PropTypes.string,
// 	theme: PropTypes.object,
// };
import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import CometChatNavBar  from "./CometChatNavBar";
import { 
	CometChatMessages, 
	CometChatMessageThread,
	GetThreadMessages
	} from "../Messages";
import { CometChatIncomingCall, CometChatIncomingDirectCall } from "../Calls";

import { CometChatContextProvider } from "../../util/CometChatContext";
import * as enums from "../../util/enums.js";
import { theme } from "../../resources/theme";
import Translator from "../../resources/localization/translator";

import {
	unifiedStyle,
	unifiedSidebarStyle,
	unifiedMainStyle,
} from "./style";

class CometChatUI extends React.Component {

	loggedInUser = null;

	constructor(props) {
		
		super(props);
		this.state = {
			sidebarview: false,
			showThreads: false,
			showReactions: false,
			showUnReads: false,
			showAllDms: false,
			showSavedItems: false
		}

		this.navBarRef = React.createRef();
		this.contextProviderRef = React.createRef();
	}
	
	componentDidMount() {

		if (this.props.chatWithUser.length === 0 && this.props.chatWithGroup.length === 0) {
			this.toggleSideBar();
		}
	}

	navBarAction = (action, type, item) => {
		
		switch(action) {
			case enums.ACTIONS["ITEM_CLICKED"]:
				console.log("user type = ", item, type);
				this.itemClicked(item, type);
			break;
			case enums.ACTIONS["TOGGLE_SIDEBAR"]:
				this.toggleSideBar();
			break;
			default:
			break;
		}
	}
	
	itemClicked = (item, type) => {
		
		this.contextProviderRef.setTypeAndItem(type, item);    
		this.toggleSideBar()
	}

	actionHandler = (action, item, count, ...otherProps) => {
		
		switch(action) {
			case enums.ACTIONS["TOGGLE_SIDEBAR"]:
				this.toggleSideBar();
			break;
			case enums.GROUP_MEMBER_SCOPE_CHANGED:
			case enums.GROUP_MEMBER_KICKED:
			case enums.GROUP_MEMBER_BANNED:
				this.groupUpdated(action, item, count, ...otherProps);
			break;
			default:
			break;
		}
	}

	setDefault = () => {
		this.setState({
			showAllDms: false,
			showChatView: false,
			showReactions: false,
			showSavedItems: false,
			showThreads: false
		})
	}

	threadView = () => {
		this.setDefault();
		this.setState({showThreads: true})
		// this.itemClicked("user", "Clicked");
	}

	reactoinView = () => {
		this.setDefault();
		this.setState({showReactions: true})
	}

	dmsView = () => {
		this.setDefault();
		this.setState({showAllDms: true})
	}

	unreadView = () => {
		this.setDefault();
		this.setState({showUnReads: true})
	}

	chatListView = () => {
		this.setDefault();
		this.setState({showChatView: true})
	}

	toggleSideBar = () => {

		const sidebarview = this.state.sidebarview;
		this.setState({ sidebarview: !sidebarview });
	}

	/**
	 If the logged in user is banned, kicked or scope changed, update the chat window accordingly
	 */
	groupUpdated = (key, message, group, options) => {
		
		switch(key) {
			case enums.GROUP_MEMBER_BANNED:
			case enums.GROUP_MEMBER_KICKED: {
				
				if (this.contextProviderRef.state.type === CometChat.ACTION_TYPE.TYPE_GROUP 
				&& this.contextProviderRef.state.item.guid === group.guid
				&& options.user.uid === this.loggedInUser.uid) {

					this.contextProviderRef.setItem({});
					this.contextProviderRef.setType("");
				}
				break;
			}
			case enums.GROUP_MEMBER_SCOPE_CHANGED: {
				
				if (this.contextProviderRef.state.type === CometChat.ACTION_TYPE.TYPE_GROUP
				&& this.contextProviderRef.state.item.guid === group.guid
				&& options.user.uid === this.loggedInUser.uid) {

					const newObject = Object.assign({}, this.contextProviderRef.state.item, { "scope": options["scope"] })
					this.contextProviderRef.setItem(newObject);
					this.contextProviderRef.setType(CometChat.ACTION_TYPE.TYPE_GROUP);
				}
				break;
			}
			default:
			break;
		}
	}

	render() {

		let threadMessages = (
			<GetThreadMessages 
				theme={this.props.theme}
				lang={this.props.lang}
				_parent="unified"
			/>
		);

		let messageScreen = (
			<CometChatMessages 
				theme={this.props.theme}
				lang={this.props.lang}
				_parent="unified"
				actionGenerated={this.actionHandler} 
				flagShowThreads={this.state.showThreads}
				flagShowReactions={this.state.showReactions}
				flagShowUnreads={this.state.showUnReads}
				flagShowDMs={this.state.showAllDms}
			/>
		);
		return (
			<React.Fragment>
				<CometChatContextProvider ref={el => this.contextProviderRef = el}
					user={this.props.chatWithUser} 
					group={this.props.chatWithGroup} 
					language={this.props.lang}
					userId={this.props.userId}
				>
					<div css={unifiedStyle(this.props)} className="cometchat cometchat--unified" dir={Translator.getDirection(this.props.lang)}>
						<div css={unifiedSidebarStyle(this.state, this.props)} className="unified__sidebar">
							<CometChatNavBar
								ref={el => this.navBarRef = el}
								theme={this.props.theme}
								actionGenerated={this.navBarAction} 
								actionThread={this.threadView}
								actionMessage={this.chatListView}
								actionReaction={this.reactoinView}
								actionDms={this.dmsView}
								actionUnRead={this.unreadView}
							/>
						</div>
						<div css={unifiedMainStyle(this.state, this.props)} className="unified__main">
							{
								this.state.showThreads ? threadMessages : messageScreen
							}
						</div>
						<CometChatIncomingCall theme={this.props.theme} lang={this.props.lang} actionGenerated={this.actionHandler} />
						<CometChatIncomingDirectCall theme={this.props.theme} lang={this.props.lang} actionGenerated={this.actionHandler} />
					</div>
				</CometChatContextProvider>
			</React.Fragment>
		);
	}
}

// Specifies the default values for props:
CometChatUI.defaultProps = {
	lang: Translator.getDefaultLanguage(),
	theme: theme,
	chatWithUser: "",
	chatWithGroup: "",
	userId: ""
};

CometChatUI.propTypes = {
	lang: PropTypes.string,
	theme: PropTypes.object,
	chatWithUser: PropTypes.string,
	chatWithGroup: PropTypes.string,
	userId: PropTypes.string,
}

export { CometChatUI };
import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import CometChatNavBar  from "./CometChatNavBar";
import { 
	CometChatMessages, 
	GetThreadMessages,
	GetAllDMs,
	GetAllUnreads,
	GetMentionAndReaction
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

	moreOptionUser = null;

	constructor(props) {
		
		super(props);
		this.state = {
			sidebarview: false,
			showThreads: false,
			showReactions: false,
			showUnReads: false,
			showAllDms: false,
			showSavedItems: false,
			currentPageName: ""
		}

		this.navBarRef = React.createRef();
		this.contextProviderRef = React.createRef();
	}
	
	componentDidMount() {

		CometChat.getLoggedinUser()
		.then(user => {	
				this.moreOptionUser = user;
			})
		.catch(error => 
			console.log("Get Thread Messages Doesn't get user", error));

		if (this.props.chatWithUser.length === 0 && this.props.chatWithGroup.length === 0) {
			this.toggleSideBar();
		}
	}

	navBarAction = (action, type, item) => {
		
		switch(action) {
			case enums.ACTIONS["ITEM_CLICKED"]:
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

		this.toggleSideBar()
	}

	threadView = () => {
		this.contextProviderRef.setTypeAndItem("user", this.moreOptionUser);  
		this.setDefault();
		this.setState({showThreads: true, currentPageName:"threads"})
	}

	reactoinView = () => {
		this.contextProviderRef.setTypeAndItem("user", this.moreOptionUser); 
		this.setDefault();
		this.setState({showReactions: true, currentPageName:"reactions"})
	}

	dmsView = () => {
		this.contextProviderRef.setTypeAndItem("user", this.moreOptionUser); 
		this.setDefault();
		this.setState({showAllDms: true, currentPageName:"Dms"})
	}

	unreadView = () => {
		this.contextProviderRef.setTypeAndItem("user", this.moreOptionUser); 
		this.setDefault();
		this.setState({showUnReads: true, currentPageName:"unread"})
	}

	chatListView = () => {
		this.setDefault();
		this.setState({showChatView: true, currentPageName:"chat"})
	}

	toggleSideBar = () => {
		const sidebarview = this.state.sidebarview;
		const showThreads = this.state.showThreads;
		const showReactions = this.state.showReactions;
		const showAllDms = this.state.showAllDms;
		const showUnReads = this.state.showUnReads;
		const showChatView = this.state.showChatView;
		this.setState({ 
			sidebarview: !sidebarview,
			showThreads: !showThreads,
			showReactions: !showReactions,
			showAllDms: !showAllDms,
			showUnReads: !showUnReads,
			showChatView: !showChatView,
		});
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

	renderSwitch() {
		switch(this.state.currentPageName) {
		  	case 'threads':
				return  <GetThreadMessages 
					theme={this.props.theme}
					lang={this.props.lang}
					_parent="unified"
					actionGenerated={this.actionHandler}
				/>;
			case 'reactions':
				return <GetMentionAndReaction 
					theme={this.props.theme}
					lang={this.props.lang}
					_parent="unified"
					actionGenerated={this.actionHandler}
				/>;
			case 'Dms':
				return 	<GetAllDMs 
					theme={this.props.theme}
					lang={this.props.lang}
					_parent="unified"
					actionGenerated={this.actionHandler}
				/>;
			case 'unread':
				return <GetAllUnreads 
					theme={this.props.theme}
					lang={this.props.lang}
					_parent="unified"
					actionGenerated={this.actionHandler}
				/>;
			case 'allSaved':
				return ;
			case 'chat':
				return  <CometChatMessages 
					theme={this.props.theme}
					lang={this.props.lang}
					_parent="unified"
					actionGenerated={this.actionHandler} 
				/>;
		  default:
			return <CometChatMessages 
				theme={this.props.theme}
				lang={this.props.lang}
				_parent="unified"
				actionGenerated={this.actionHandler} 
			/>;
		}
	}

	render() {
		return (
			<React.Fragment>
				<CometChatContextProvider ref={el => this.contextProviderRef = el}
					user={this.props.chatWithUser} 
					group={this.props.chatWithGroup} 
					language={this.props.lang}
					userId={this.props.userId}
				>
					<div css={unifiedStyle(this.props)} className="cometchat cometchat--unified" dir={Translator.getDirection(this.props.lang)}>
						<div css={unifiedSidebarStyle(this.state, this.props)} 
							className="unified__sidebar"
						>
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
							this.renderSwitch()
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
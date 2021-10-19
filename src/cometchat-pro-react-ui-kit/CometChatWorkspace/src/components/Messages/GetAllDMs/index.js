import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { CometChat } from "@cometchat-pro/chat";

import { getMessageSentTime } from "../../../util/common";
import { CometChatContext } from "../../../util/CometChatContext"

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import { 
	threadAvatar,
	threadContainer,
	threadSender,
	threadReceiver,
	detailName,
	wrapperStyle,
	headerStyle,
	headerWrapperStyle,
	headerDetailStyle,
	headerTitleStyle,
	headerCloseStyle,
	messageContainerStyle,
	noResult,
	noResultImage,
	chatSideBarBtnStyle,
	chatContainerStyle,
	detailImage
} from "./style";

import * as enums from "../../../util/enums.js";
import menuIcon from "../CometChatMessageHeader/resources/menu.svg";
import {CometChatContextProvider} from "../../../util/CometChatContext";

class GetAllDMs extends React.PureComponent {
	static contextType = CometChatContext;
	loggedInUser;

	constructor(props, context) {
		super(props, context);
		this.state = {
			receipts: false,
			messageList: [],
			directMessages: []
		};
	}

	componentDidMount() {
		CometChat.getLoggedinUser()
		.then(user => {	
				this.loggedInUser = user;
				this.getThreads();
			})
		.catch(error => 
			this.errorHandler("Get Directed Messages Doesn't get user", error));
	}

	componentDidUpdate() {
	}

	toggleReadReceipts = () => {
		/**
		 * if delivery receipts feature is disabled
		 */
		this.context.FeatureRestriction.isDeliveryReceiptsEnabled()
			.then(response => {
				if (response !== this.state.receipts) {
					this.setState({ receipts: response });
				}
			})
			.catch(error => {
				if (this.state.receipts !== false) {
					this.setState({ receipts: false });
				}
			});
	};

	getThreads = async () => {
		if(!this.loggedInUser){
			this.context.getLoggedinUser().then(user => {
				this.loggedInUser = { ...user };
			});
		}
		else {
			let  UID = this.loggedInUser.uid;
			let limit = 30;
			var list = [];

			let conversationsRequest = new CometChat.ConversationsRequestBuilder()
				.setLimit(limit)
				.build();

			list = await conversationsRequest.fetchNext().then(
				conversationList => {
					return conversationList;
				}, error => {
					return [];
				}
			);

			let tempDMs = [];
			if(list.length > 0) {
				list.map((item, i) =>
				{
					if(item.lastMessage && item.lastMessage.sender.uid == UID) {
						tempDMs.push(item.lastMessage)
					}
				})
			}

			this.setState({directMessages: tempDMs})
		}
	}

	getContext = () => {
		if (this.props._parent.length) {
			return this.context;
		} else {
			return this.contextProviderRef.state;
		}
	};

	resetChat = () => {
		this.context.setItem({});
		this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
	};

	render() {
		console.log('dms = ', this.state.directMessages);
		/**
		 * If used as standalone component
		*/
		if (this.props._parent.trim().length === 0 
			&& this.props.chatWithUser.trim().length === 0 
			&& this.props.chatWithGroup.trim().length === 0) {
			return (
				<CometChatContextProvider ref={el => (this.contextProviderRef = el)} _component={enums.CONSTANTS["MESSAGES_COMPONENT"]} user={this.props.chatWithUser} group={this.props.chatWithGroup}>
					<div></div>
				</CometChatContextProvider>
			);
		} else if (this.props._parent.trim().length && Object.keys(this.getContext().item).length === 0) {
			return null;
		}

		let dmCmpt = (			
			<React.Fragment>
				<div css={wrapperStyle(this.context)} className="thread__chat">
					<div css={headerStyle(this.context)} className="chat__header">
						<div css={headerWrapperStyle()} className="header__wrapper">
							<div css={headerDetailStyle()} className="header__details">
								<div 
									css={chatSideBarBtnStyle(menuIcon, this.props, this.context)} 
									className="chat__sidebar-menu" 
									onClick={this.resetChat}>
								</div>
								<h6 css={headerTitleStyle()} className="header__title">
									{Translator.translate("All direct Messages", this.context.language)}
								</h6>
							</div>
						</div>
					</div>
					<div css={messageContainerStyle()} className="chat__message__container">
					{
						this.state.directMessages.length > 0 ?
							this.state.directMessages.map((item, index) =>{
								return(
									<div css={threadContainer(this.props, this.state)} key={index}>
										<div className="threadBox">
											<div className="reciever" css={threadReceiver()} >
												<img 
													css={threadAvatar()} 
													className="threadAvatar" 
													src={item.receiver.avatar} />
												<div className="threadUserDetail" >
													<span css={detailName()}>{item.receiver.name}</span> <br />
													<span>You: 
													{
														item.type == "audio" ? 
															"calling" 
															: item.text.includes("https://media1.giphy.com/") ?
															<img css={detailImage()} src={item.text} /> : item.text
													}
													</span>
												</div>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					
											</div>
										</div>
									</div>
								)
							})
						: 
						<div css={noResult()} >
							<img css={noResultImage()} src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f331.png" />
							See new activity in real time <br />
							When people react to your messages or mention you or your keywords, you’ll see it here.					 
						</div>
					}

					</div>
				</div>
			</React.Fragment>);

		let messageWrapper = dmCmpt;
		/*
		If used as a standalone component
		**/
		if (this.props._parent.trim().length === 0) {
			messageWrapper = (
				<CometChatContextProvider 
					ref={el => (this.contextProviderRef = el)} 
					user={this.props.chatWithUser} 
					group={this.props.chatWithGroup}
				>
					<div css={chatContainerStyle()}>{dmCmpt}</div>
				</CometChatContextProvider>
			);
		}

		return messageWrapper;
	}
}

// Specifies the default values for props:
GetAllDMs.defaultProps = {
	theme: theme,
};

GetAllDMs.propTypes = {
	theme: PropTypes.object,
};

export { GetAllDMs };

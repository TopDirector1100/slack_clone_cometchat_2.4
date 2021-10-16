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
	messageContainerStyle
} from "./style";

import clearIcon from "../CometChatMessageThread/resources/close.svg";
import * as enums from "../../../util/enums.js";

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
			this.errorHandler("Get Thread Messages Doesn't get user", error));
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
			let  b = this.loggedInUser.uid;
			let limit = 30;
			let list = [];
			let messagesRequest = new CometChat.MessagesRequestBuilder()
				.setUID("aaa")
				.setLimit(limit)
				.build();

			list = await messagesRequest.fetchPrevious().then(
				messages => {
					return messages;
				}, error => {
					console.log("Message fetching failed with error:", error);
					return [];
				}
			);

			let tempTheards = [];
			if(list.length > 0) {
				list.map((item, i) =>
				{
					if(item.parentMessageId) {
						tempTheards.push(item);
					}
				})
			}

			this.setState({directMessages: tempTheards})
		}
	}

	render() {
		console.log('dms = ', this.state.directMessages);

		return (
			<React.Fragment>
				<div css={wrapperStyle(this.context)} className="thread__chat">
					<div css={headerStyle(this.context)} className="chat__header">
						<div css={headerWrapperStyle()} className="header__wrapper">
							<div css={headerDetailStyle()} className="header__details">
								<h6 css={headerTitleStyle()} className="header__title">
									{Translator.translate("Direct Messages", this.context.language)}
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
													src={item.sender.avatar} />
												<div className="threadUserDetail" >
													<span css={detailName()}>{item.receiver.name}</span> <br />
													<span>{item.text}</span>
												</div>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					
											</div>
										</div>
									</div>
								)
							})
						: <div> There is no result </div>
					}

					</div>
				</div>
			</React.Fragment>
					
		);
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

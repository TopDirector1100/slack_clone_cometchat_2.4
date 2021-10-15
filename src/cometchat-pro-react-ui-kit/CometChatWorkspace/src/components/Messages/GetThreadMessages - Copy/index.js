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
	chatWrapperStyle,
	threadUserDetail,
	threadAvatar,
	extHeader,
	threadContainer,
	threadBox,
	threadSender,
	threadReceiver,
	detailName 
} from "./style";

import {
	CometChatMessageHeader, 
	// CometChatMessageList, 
	// CometChatMessageComposer, 
	// CometChatLiveReactions, 
	// CometChatMessageThread, 
	// CometChatImageViewer
} from "../";
import { connect } from 'react-redux';

// import blueDoubleTick from "./resources/message-read.svg";
// import greyDoubleTick from "./resources/message-delivered.svg";
// import greyTick from "./resources/message-sent.svg";
// import sendingTick from "./resources/wait.svg";
// import errorTick from "./resources/warning-small.svg";

class GetThreadMessages extends React.PureComponent {
	static contextType = CometChatContext;
	loggedInUser;

	constructor(props, context) {
		super(props, context);
		this.state = {
			receipts: false,
			messageList: [],
			threadMessages: []
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
			let UID = this.loggedInUser.uid;
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

			this.setState({threadMessages: tempTheards})
		}
	}

	render() {
		console.log('theard = ', this.state.threadMessages);

		return (
				<div css={chatWrapperStyle(this.props, this.state)} className="main__chat">
					<CometChatMessageHeader 
						lang={this.props.lang} 
						sidebar={this.props.sidebar} 
						viewdetail={this.props.viewdetail === false ? false : true} 
						actionGenerated={this.actionHandler} 
					/>
					{
						this.state.threadMessages.length > 0 ?
							this.state.threadMessages.map((item, index) =>{
								return(
									<div css={threadContainer()} key={index}>
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
											<div className="sender" css={threadSender()}>
												<img css={threadAvatar()} src={item.sender.avatar} />
												<div className="threadUserDetail" >
													<span css={detailName()}>{item.sender.name}</span> <br />
													<span>{item.text}</span>
												</div>
											</div>
										</div>
									</div>
								)
							})
						: <div>Loading...</div>
					}
				</div>
		);
	}
}

// Specifies the default values for props:
GetThreadMessages.defaultProps = {
	theme: theme,
};

GetThreadMessages.propTypes = {
	theme: PropTypes.object,
};

export { GetThreadMessages };

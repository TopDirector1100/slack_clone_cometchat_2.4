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
	noResultImage
} from "./style";

class GetMentionAndReaction extends React.PureComponent {
	static contextType = CometChatContext;
	loggedInUser;

	constructor(props, context) {
		super(props, context);
		this.state = {
			receipts: false,
			messageList: [],
			mentionAndReactions: []
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

			this.setState({mentionAndReactions: tempTheards})
		}
	}

	render() {
		console.log('dms = ', this.state.mentionAndReactions);

		return (
			<React.Fragment>
				<div css={wrapperStyle(this.context)} className="thread__chat">
					<div css={headerStyle(this.context)} className="chat__header">
						<div css={headerWrapperStyle()} className="header__wrapper">
							<div css={headerDetailStyle()} className="header__details">
								<h6 css={headerTitleStyle()} className="header__title">
									{Translator.translate("Mentions & reactions", this.context.language)}
								</h6>
							</div>
						</div>
					</div>
					<div css={messageContainerStyle()} className="chat__message__container">
					{
						this.state.mentionAndReactions.length > 0 ?
							this.state.mentionAndReactions.map((item, index) =>{
								return(
									<div css={threadContainer(this.props, this.state)} key={index}>
										<div className="threadBox">
											<div className="sender" css={threadSender()}>
												<img 
													css={threadAvatar()} 
													src={item.sender.avatar ? item.sender.avatar : "https://ca.slack-edge.com/T02J6BD2F32-U02HV9S5MTK-gfccba36b2b6-512" }/>
												<div className="threadUserDetail" >
													<span css={detailName()}>{item.sender.name}</span><span>{getMessageSentTime(item.sentAt)}</span> <br />
													<span>{item.text}</span>
												</div>
											</div>
										</div>
									</div>
								)
							})
						: <div css={noResult()} >
								<img css={noResultImage()} src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f331.png" />
								See new activity in real time <br />
								When people react to your messages or mention you or your keywords, you’ll see it here.					 
						</div>
					}

					</div>
				</div>
			</React.Fragment>
					
		);
	}
}

// Specifies the default values for props:
GetMentionAndReaction.defaultProps = {
	theme: theme,
};

GetMentionAndReaction.propTypes = {
	theme: PropTypes.object,
};

export { GetMentionAndReaction };

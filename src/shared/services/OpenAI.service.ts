import OpenAI from "openai";
import {environment} from "../../../environment";
import {IMessage, IMessageType} from "../interfaces/Message.model";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions";

class OpenAiService {
    async sendRequest(prompt: string, messageGroups: IMessage[][]) {
        const openAi = new OpenAI({
            apiKey: environment.apiKey,
            dangerouslyAllowBrowser: true
        });

        try {
            const messages = messageGroups.flat();
            const conversationContext = messages.map(message => {
                return {
                    role: message.type === IMessageType.REQUEST ? 'user' : 'assistant',
                    content: message.content
                } as ChatCompletionMessageParam;
            });

            const response = await openAi.chat.completions.create({
                model: "gpt-4.1",
                messages: [...conversationContext, {role: 'user', content: prompt}]
            });

            return response.choices[0].message.content;
        } catch (error) {
            return '';
        }
    }
}

export default OpenAiService;